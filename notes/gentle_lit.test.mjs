import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";

test("literature data is stored separately from the page", () => {
  assert.equal(existsSync(new URL("./gentle_lit.json", import.meta.url)), true);
  assert.equal(existsSync(new URL("./gentle_lit_tags.json", import.meta.url)), true);
});

test("the generated literature page has its own renderer", () => {
  assert.equal(existsSync(new URL("./gentle_lit_auto.html", import.meta.url)), true);
  assert.equal(existsSync(new URL("./gentle_lit_auto.js", import.meta.url)), true);
});

test("renderer places one literature record in every tagged subsection", async () => {
  const script = new URL("./gentle_lit_auto.js", import.meta.url);
  const renderer = existsSync(script) ? await import(script) : {};
  assert.equal(typeof renderer.organizeLiterature, "function");

  const groups = renderer.organizeLiterature(
    [
      { alias: "a", sectionAlias: "s1", sectionTitle: "First", subsectionTitle: "Alpha" },
      { alias: "b", sectionAlias: "s2", sectionTitle: "Second", subsectionTitle: null }
    ],
    [{ id: "paper", authors: "Author", tags: ["a", "b"] }]
  );

  assert.deepEqual(groups.map((section) => section.groups.map((group) => group.items.map((item) => item.id))), [[['paper']], [['paper']]]);
});

test("renderer keeps TOC numbering separate and uses the stored author name", async () => {
  const renderer = await import(new URL("./gentle_lit_auto.js", import.meta.url));

  assert.equal(renderer.tocLabel({ title: "Silting" }), "Silting");
  assert.equal(renderer.authorLabel({ authors: "Y.-Z. Liu, D. Liu, X. Ma" }), "Y.-Z. Liu, D. Liu, X. Ma");
  assert.equal(renderer.authorLabel({ authors: "Amiot, Plamondon, Schroll" }), "Amiot, Plamondon, Schroll");
});

test("literature JSON stores first-name initials for Chinese authors", () => {
  const literature = JSON.parse(readFileSync(new URL("./gentle_lit.json", import.meta.url), "utf8"));
  const item = literature.find((entry) => entry.id === "arxiv:2409.08686");
  assert.equal(item.authors, "Y.-Z. Liu, D. Liu, X. Ma");
});

test("newly catalogued literature is stored once with a valid category tag", () => {
  const literature = JSON.parse(readFileSync(new URL("./gentle_lit.json", import.meta.url), "utf8"));
  const tags = JSON.parse(readFileSync(new URL("./gentle_lit_tags.json", import.meta.url), "utf8"));
  const matches = literature.filter((entry) => entry.arxiv?.id === "2006.00009");

  assert.equal(matches.length, 1);
  assert.ok(matches[0].tags.includes("s5-something-fukaya-categories-deformation"));
  assert.ok(matches[0].tags.every((alias) => tags.some((tag) => tag.alias === alias)));
});

test("renderer sorts authors by first surname and then arXiv year", async () => {
  const renderer = await import(new URL("./gentle_lit_auto.js", import.meta.url));
  const items = [
    { authors: "A. Chan, Marczinzik", arxiv: { year: 2016 } },
    { authors: "Antipov, Zvonareva", arxiv: { year: 2019 } },
    { authors: "Adachi, Aihara, A. Chan", arxiv: { year: 2015 } },
    { authors: "Antipov, Zvonareva", arxiv: { year: 2017 } }
  ];

  assert.deepEqual(renderer.sortLiterature(items, "authors").map((item) => `${item.authors}:${item.arxiv.year}`), [
    "Adachi, Aihara, A. Chan:2015",
    "Antipov, Zvonareva:2017",
    "Antipov, Zvonareva:2019",
    "A. Chan, Marczinzik:2016"
  ]);
  assert.deepEqual(renderer.sortLiterature(items, "arxivYear").map((item) => `${item.authors}:${item.arxiv.year}`), [
    "Adachi, Aihara, A. Chan:2015",
    "A. Chan, Marczinzik:2016",
    "Antipov, Zvonareva:2017",
    "Antipov, Zvonareva:2019"
  ]);
});

test("Brauer graph algebra literature has the requested default author order", async () => {
  const renderer = await import(new URL("./gentle_lit_auto.js", import.meta.url));
  const literature = JSON.parse(readFileSync(new URL("./gentle_lit.json", import.meta.url), "utf8"));
  const brauerGraphItems = literature.filter((entry) => entry.tags.includes("s10-brauer-graph-algebras"));

  assert.deepEqual(renderer.sortLiterature(brauerGraphItems).slice(0, 4).map((item) => item.arxiv.id), [
    "1504.04827",
    "1711.05021",
    "1908.09645",
    "1607.05965"
  ]);
});

test("Brauer graph algebra references are catalogued first in their section", () => {
  const literature = JSON.parse(readFileSync(new URL("./gentle_lit.json", import.meta.url), "utf8"));
  const tags = JSON.parse(readFileSync(new URL("./gentle_lit_tags.json", import.meta.url), "utf8"));
  const ids = ["2103.12049", "1908.09645", "1711.05021", "1508.01721", "1401.6952"];
  const brauerGraphTag = "s10-brauer-graph-algebras";

  for (const id of ids) {
    const matches = literature.filter((entry) => entry.arxiv?.id === id);
    assert.equal(matches.length, 1, `${id} should be stored once`);
    assert.ok(matches[0].tags.includes(brauerGraphTag));
  }

  assert.equal(tags.find((tag) => tag.sectionAlias === "s10").alias, brauerGraphTag);
});

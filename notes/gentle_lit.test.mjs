import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";

test("literature data is stored separately from the page", () => {
    assert.equal(
        existsSync(new URL("./gentle_lit.json", import.meta.url)),
        true,
    );
    assert.equal(
        existsSync(new URL("./gentle_lit_tags.json", import.meta.url)),
        true,
    );
});

test("the generated literature page has its own renderer", () => {
    assert.equal(
        existsSync(new URL("./gentle_lit.html", import.meta.url)),
        true,
    );
    assert.equal(
        existsSync(new URL("./gentle_lit_auto.js", import.meta.url)),
        true,
    );
});

test("record tables expose mobile title display and copy controls", async () => {
    const html = readFileSync(
        new URL("./gentle_lit.html", import.meta.url),
        "utf8",
    );
    const script = readFileSync(
        new URL("./gentle_lit_auto.js", import.meta.url),
        "utf8",
    );
    const renderer = await import(
        new URL("./gentle_lit_auto.js", import.meta.url)
    );

    assert.doesNotMatch(
        html,
        /literature-info-dialog|info-authors|info-links/i,
    );
    assert.match(script, /title-cell/);
    assert.match(script, /show-title/);
    assert.match(script, /copy-title/);
    assert.match(script, /navigator\\.clipboard|writeText/);
    assert.equal(
        renderer.titleText({ title: "A title to copy" }),
        "A title to copy",
    );
    assert.equal(renderer.titleText({}), "Untitled literature");
});

test("mobile literature rows are single-column summaries with a title detail row", async () => {
    const html = readFileSync(
        new URL("./gentle_lit.html", import.meta.url),
        "utf8",
    );
    const script = readFileSync(
        new URL("./gentle_lit_auto.js", import.meta.url),
        "utf8",
    );
    const renderer = await import(
        new URL("./gentle_lit_auto.js", import.meta.url)
    );
    const item = {
        authors: "Adachi, Aihara, A. Chan",
        arxiv: {
            id: "1504.04827",
            url: "https://arxiv.org/abs/1504.04827",
            year: 2015,
        },
        published: { label: "DOI", url: "https://doi.org/example", year: 2016 },
        title: "A paper title",
    };

    assert.deepEqual(renderer.mobileSummary(item), {
        authors: "Adachi, Aihara, A. Chan",
        arxiv: { id: "1504.04827", url: "https://arxiv.org/abs/1504.04827" },
        published: { year: 2016, label: "DOI", url: "https://doi.org/example" },
        title: "A paper title",
    });
    assert.equal(renderer.titleToggleLabel(false), "Title");
    assert.equal(renderer.titleToggleLabel(true), "Hide title");
    assert.equal(renderer.desktopTitleToggleLabel(false), "Show");
    assert.equal(renderer.desktopTitleToggleLabel(true), "Hide");
  assert.match(html, /\.mobile-record/);
  assert.match(html, /\.mobile-meta\s*\{/);
  assert.match(html, /\.mobile-meta\s*\{[^}]*font-size:\s*\.9rem[^}]*font-weight:\s*400/s);
  assert.match(html, /\.mobile-meta \.code\s*\{[^}]*font:\s*inherit/s);
  assert.match(html, /\.mobile-title-button\s*\{[^}]*font:\s*inherit/s);
  assert.match(html, /\.title-cell\s*\{\s*width:\s*13ch/);
  assert.match(html, /\.arx\s*\{\s*width:\s*21ch/);
  assert.match(html, /\.pub\s*\{\s*width:\s*15ch/);
  assert.match(html, /table-layout:\s*fixed/);
  assert.match(script, /mobile-record/);
  assert.match(script, /mobile-meta/);
  assert.match(script, /mobile-title-line/);
  assert.match(script, /mobile-separator/);
  assert.match(script, /link\.textContent = kind === "arxiv" \? reference\.id : `\$\{reference\.year\} · \$\{reference\.label\}`/);
  assert.doesNotMatch(script, /line\.append\(year, separator, link\)/);
  assert.match(script, /titleSeparator\.textContent = "·"/);
  assert.match(script, /mobileTitleLine\.append\(mobilePublished, titleSeparator\)/);
  assert.match(script, /mobileTitleLine\.append\(mobileTitleButton\)/);
  assert.match(script, /title-detail-row/);
  assert.match(script, /colSpan\s*=\s*4/);
  assert.doesNotMatch(script, /mobile-copy-title/);
  assert.doesNotMatch(script, /createTextNode\("\| "\)/);
});

test("renderer places one literature record in every tagged subsection", async () => {
    const script = new URL("./gentle_lit_auto.js", import.meta.url);
    const renderer = existsSync(script) ? await import(script) : {};
    assert.equal(typeof renderer.organizeLiterature, "function");

    const groups = renderer.organizeLiterature(
        [
            {
                alias: "a",
                sectionAlias: "s1",
                sectionTitle: "First",
                subsectionTitle: "Alpha",
            },
            {
                alias: "b",
                sectionAlias: "s2",
                sectionTitle: "Second",
                subsectionTitle: null,
            },
        ],
        [{ id: "paper", authors: "Author", tags: ["a", "b"] }],
    );

    assert.deepEqual(
        groups.map((section) =>
            section.groups.map((group) => group.items.map((item) => item.id)),
        ),
        [[["paper"]], [["paper"]]],
    );
});

test("renderer keeps TOC numbering separate and uses the stored author name", async () => {
    const renderer = await import(
        new URL("./gentle_lit_auto.js", import.meta.url)
    );

    assert.equal(renderer.tocLabel({ title: "Silting" }), "Silting");
    assert.equal(
        renderer.authorLabel({ authors: "Y.-Z. Liu, D. Liu, X. Ma" }),
        "Y.-Z. Liu, D. Liu, X. Ma",
    );
    assert.equal(
        renderer.authorLabel({ authors: "Amiot, Plamondon, Schroll" }),
        "Amiot, Plamondon, Schroll",
    );
});

test("literature JSON stores first-name initials for Chinese authors", () => {
    const literature = JSON.parse(
        readFileSync(new URL("./gentle_lit.json", import.meta.url), "utf8"),
    );
    const item = literature.find((entry) => entry.id === "arxiv:2409.08686");
    assert.equal(item.authors, "Y.-Z. Liu, D. Liu, X. Ma");
});

test("newly catalogued literature is stored once with a valid category tag", () => {
    const literature = JSON.parse(
        readFileSync(new URL("./gentle_lit.json", import.meta.url), "utf8"),
    );
    const tags = JSON.parse(
        readFileSync(
            new URL("./gentle_lit_tags.json", import.meta.url),
            "utf8",
        ),
    );
    const matches = literature.filter(
        (entry) => entry.arxiv?.id === "2006.00009",
    );

    assert.equal(matches.length, 1);
    assert.ok(
        matches[0].tags.includes("s5-something-fukaya-categories-deformation"),
    );
    assert.ok(
        matches[0].tags.every((alias) =>
            tags.some((tag) => tag.alias === alias),
        ),
    );
});

test("renderer sorts authors by first surname and then arXiv year", async () => {
    const renderer = await import(
        new URL("./gentle_lit_auto.js", import.meta.url)
    );
    const items = [
        { authors: "A. Chan, Marczinzik", arxiv: { year: 2016 } },
        { authors: "Antipov, Zvonareva", arxiv: { year: 2019 } },
        { authors: "Adachi, Aihara, A. Chan", arxiv: { year: 2015 } },
        { authors: "Antipov, Zvonareva", arxiv: { year: 2017 } },
    ];

    assert.deepEqual(
        renderer
            .sortLiterature(items, "authors")
            .map((item) => `${item.authors}:${item.arxiv.year}`),
        [
            "Adachi, Aihara, A. Chan:2015",
            "Antipov, Zvonareva:2017",
            "Antipov, Zvonareva:2019",
            "A. Chan, Marczinzik:2016",
        ],
    );
    assert.deepEqual(
        renderer
            .sortLiterature(items, "arxivYear")
            .map((item) => `${item.authors}:${item.arxiv.year}`),
        [
            "Adachi, Aihara, A. Chan:2015",
            "A. Chan, Marczinzik:2016",
            "Antipov, Zvonareva:2017",
            "Antipov, Zvonareva:2019",
        ],
    );
});

test("Brauer graph algebra literature has the requested default author order", async () => {
    const renderer = await import(
        new URL("./gentle_lit_auto.js", import.meta.url)
    );
    const literature = JSON.parse(
        readFileSync(new URL("./gentle_lit.json", import.meta.url), "utf8"),
    );
    const brauerGraphItems = literature.filter((entry) =>
        entry.tags.includes("s10-brauer-graph-algebras"),
    );

    const sortedIds = renderer
        .sortLiterature(brauerGraphItems)
        .map((item) => item.arxiv?.id ?? item.id);
    assert.deepEqual(sortedIds.slice(0, 3), [
        "1504.04827",
        "1711.05021",
        "1908.09645",
    ]);
    assert.ok(
        sortedIds.indexOf("1607.05965") > sortedIds.indexOf("1908.09645"),
    );
});

test("Brauer graph algebra references are catalogued first in their section", () => {
    const literature = JSON.parse(
        readFileSync(new URL("./gentle_lit.json", import.meta.url), "utf8"),
    );
    const tags = JSON.parse(
        readFileSync(
            new URL("./gentle_lit_tags.json", import.meta.url),
            "utf8",
        ),
    );
    const ids = [
        "2103.12049",
        "1908.09645",
        "1711.05021",
        "1508.01721",
        "1401.6952",
    ];
    const brauerGraphTag = "s10-brauer-graph-algebras";

    for (const id of ids) {
        const matches = literature.filter((entry) => entry.arxiv?.id === id);
        assert.equal(matches.length, 1, `${id} should be stored once`);
        assert.ok(matches[0].tags.includes(brauerGraphTag));
    }

    assert.equal(
        tags.find((tag) => tag.sectionAlias === "s10").alias,
        brauerGraphTag,
    );
});

test("the scrape adds only abstract-verified records from the requested interval and journals", () => {
    const literature = JSON.parse(
        readFileSync(new URL("./gentle_lit.json", import.meta.url), "utf8"),
    );
    const tags = JSON.parse(
        readFileSync(
            new URL("./gentle_lit_tags.json", import.meta.url),
            "utf8",
        ),
    );
    const ids = [
        "2608.21777",
        "2608.22715",
        "2608.22929",
        "2305.12885",
        "2011.07364",
        "2102.08216",
        "2212.09105",
        "2507.03693",
        "2003.09797",
        "2303.06645",
        "2311.10178",
        "2407.02326",
    ];

    for (const id of ids) {
        const matches = literature.filter((entry) => entry.arxiv?.id === id);
        assert.equal(matches.length, 1, `${id} should be stored once`);
        assert.ok(
            matches[0].tags.length > 0,
            `${id} should have at least one category tag`,
        );
        assert.ok(
            matches[0].tags.every((alias) =>
                tags.some((tag) => tag.alias === alias),
            ),
            `${id} has an unknown tag`,
        );
    }
});

test("journal searches reconcile publication metadata with existing or new records", () => {
    const literature = JSON.parse(
        readFileSync(new URL("./gentle_lit.json", import.meta.url), "utf8"),
    );
    const expected = {
        2108.01925: {
            year: 2023,
            label: "DOI",
            url: "https://doi.org/10.1016/j.jalgebra.2023.03.013",
        },
        "2208.15000": {
            year: 2024,
            label: "DOI",
            url: "https://doi.org/10.1016/j.jpaa.2023.107503",
        },
        2206.11196: {
            year: 2026,
            label: "DOI",
            url: "https://doi.org/10.1093/imrn/rnag133",
        },
        2301.04398: {
            year: 2025,
            label: "DOI",
            url: "https://doi.org/10.1016/j.aim.2025.110284",
        },
        2301.05956: {
            year: 2024,
            label: "DOI",
            url: "https://doi.org/10.1007/s10468-024-10285-7",
        },
        2303.05326: {
            year: 2025,
            label: "DOI",
            url: "https://doi.org/10.5802/art.32",
        },
        2204.12138: {
            year: 2024,
            label: "DOI",
            url: "https://doi.org/10.1112/plms.12637",
        },
        2406.10634: {
            year: 2024,
            label: "DOI",
            url: "https://doi.org/10.1016/j.jalgebra.2024.05.030",
        },
        2407.13627: {
            year: 2026,
            label: "DOI",
            url: "https://doi.org/10.1016/j.jalgebra.2025.08.018",
        },
        2409.08333: {
            year: 2026,
            label: "DOI",
            url: "https://doi.org/10.1016/j.jpaa.2026.108343",
        },
        2407.04817: {
            year: 2026,
            label: "DOI",
            url: "https://doi.org/10.1016/j.jpaa.2026.108318",
        },
        2309.16061: {
            year: 2026,
            label: "DOI",
            url: "https://doi.org/10.1016/j.aim.2026.110905",
        },
        2405.15466: {
            year: 2026,
            label: "DOI",
            url: "https://doi.org/10.1016/j.aim.2026.111064",
        },
        2507.13945: {
            year: 2026,
            label: "DOI",
            url: "https://doi.org/10.1016/j.jalgebra.2026.06.021",
        },
        "2502.06410": {
            year: 2025,
            label: "DOI",
            url: "https://doi.org/10.1093/imrn/rnaf272",
        },
        1911.11719: {
            year: 2021,
            label: "DOI",
            url: "https://doi.org/10.1017/fms.2021.2",
        },
        2101.01939: {
            year: 2022,
            label: "DOI",
            url: "https://doi.org/10.1017/fms.2022.1",
        },
        2203.11563: {
            year: 2024,
            label: "DOI",
            url: "https://doi.org/10.1007/s10468-023-10233-x",
        },
        2309.02582: {
            year: 2025,
            label: "DOI",
            url: "https://doi.org/10.1080/00927872.2025.2473029",
        },
    };

    for (const [id, publication] of Object.entries(expected)) {
        const matches = literature.filter((entry) => entry.arxiv?.id === id);
        assert.equal(matches.length, 1, `${id} should be stored once`);
        assert.deepEqual(
            matches[0].published,
            publication,
            `${id} publication metadata is stale`,
        );
    }
});

test("the page records the last scrape date", () => {
    const html = readFileSync(
        new URL("./gentle_lit.html", import.meta.url),
        "utf8",
    );
    assert.match(html, /Last Scrape Date:\s*29 August 2026/);
});

import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";

const moduleUrl = new URL("./gentle_lit_validator.js", import.meta.url);

test("CSV engine parses quoted fields and preserves commas and line breaks", async () => {
    const validator = existsSync(moduleUrl) ? await import(moduleUrl) : {};
    assert.equal(typeof validator.parseCsv, "function");

    const rows = validator.parseCsv(
        [
            "id,authors,title,abstract",
            'x,"A. Author, B. Author","A, title","First line\nSecond line"',
        ].join("\n"),
    );

    assert.deepEqual(rows, [
        {
            id: "x",
            authors: "A. Author, B. Author",
            title: "A, title",
            abstract: "First line\nSecond line",
        },
    ]);
});

test("reviewing the queue marks selected rows for inclusion and the rest for exclusion", async () => {
    const validator = existsSync(moduleUrl) ? await import(moduleUrl) : {};
    assert.equal(typeof validator.applyReview, "function");

    const reviewed = validator.applyReview(
        [
            { id: "keep", decision: "" },
            { id: "skip", decision: "" },
        ],
        new Set(["keep"]),
        "2026-08-29T00:00:00.000Z",
    );

    assert.deepEqual(reviewed, [
        {
            id: "keep",
            decision: "include",
            reviewedAt: "2026-08-29T00:00:00.000Z",
        },
        {
            id: "skip",
            decision: "exclude",
            reviewedAt: "2026-08-29T00:00:00.000Z",
        },
    ]);
});

test("CSV serialization round-trips reviewed rows and creates a Codex handoff", async () => {
    const validator = existsSync(moduleUrl) ? await import(moduleUrl) : {};
    assert.equal(typeof validator.serializeCsv, "function");
    assert.equal(typeof validator.buildHandoffPrompt, "function");

    const rows = [
        { id: "x", reason: "Contains a comma, but remains one sentence." },
    ];
    const csv = validator.serializeCsv(rows, ["id", "reason"]);
    assert.deepEqual(validator.parseCsv(csv), rows);
    assert.match(
        validator.buildHandoffPrompt("reviewed.csv", 1),
        /\$update-gentle-lit/,
    );
    assert.match(
        validator.buildHandoffPrompt("reviewed.csv", 1),
        /reviewed\.csv/,
    );
});

test("validator page and discard queue expose the review contract", () => {
    const htmlPath = new URL("./validate.html", import.meta.url);
    const csvPath = new URL("./discarded_literature.csv", import.meta.url);
    assert.equal(existsSync(htmlPath), true);
    assert.equal(existsSync(csvPath), true);
    const html = readFileSync(htmlPath, "utf8");
    const script = readFileSync(
        new URL("./gentle_lit_validator.js", import.meta.url),
        "utf8",
    );
    const header = readFileSync(csvPath, "utf8").split(/\r?\n/, 1)[0];
    assert.match(html, /gentle_lit_validator\.js/);
    assert.match(script, /\.\.\/gentle_lit_tags\.json/);
    assert.match(html, /discarded_literature\.csv/);
    assert.match(html, /<dialog/i);
    assert.doesNotMatch(html, /abstract/i);
    assert.doesNotMatch(script, /row\.abstract|proper citation/i);
    assert.deepEqual(header.split(","), [
        "id",
        "authors",
        "title",
        "arxivUrl",
        "publishedUrl",
        "source",
        "journal",
        "suggestedTags",
        "reason",
        "decision",
        "reviewedAt",
    ]);
});

test("validator uses automatic loading and keyboard-first review controls", async () => {
    const html = readFileSync(
        new URL("./validate.html", import.meta.url),
        "utf8",
    );
    const script = readFileSync(
        new URL("./gentle_lit_validator.js", import.meta.url),
        "utf8",
    );
    const validator = await import(moduleUrl);

    assert.equal(typeof validator.moveFocusedIndex, "function");
    assert.equal(typeof validator.toggleSelection, "function");
    assert.equal(validator.moveFocusedIndex(0, -1, 3), 0);
    assert.equal(validator.moveFocusedIndex(0, 1, 3), 1);
    assert.equal(validator.moveFocusedIndex(2, 1, 3), 2);
    assert.equal(validator.moveFocusedIndex(-1, 1, 0), -1);
    assert.deepEqual(validator.toggleSelection({ id: "x", _selected: false }), {
        id: "x",
        _selected: true,
    });
    assert.deepEqual(validator.toggleSelection({ id: "x", _selected: true }), {
        id: "x",
        _selected: false,
    });

    assert.match(html, /id=["']review-status["']/);
    assert.match(html, /id=["']instructions["']/);
    assert.match(html, /ArrowUp|ArrowDown/);
    assert.match(html, /Space/);
    assert.doesNotMatch(html, /csv-file|Choose CSV|Download current queue/);
    assert.doesNotMatch(script, /elements\.file|Use [“"]Choose CSV/);
    assert.match(script, /focusedId/);
    assert.match(script, /keydown/);
});

test("public page does not expose the admin validator and Jekyll excludes its folder", () => {
    const publicPage = readFileSync(
        new URL("../gentle_lit.html", import.meta.url),
        "utf8",
    );
    const config = readFileSync(
        new URL("../../_config.yml", import.meta.url),
        "utf8",
    );
    assert.doesNotMatch(publicPage, /validator|discarded_literature/i);
  assert.match(config, /notes\/gentle/);
});

test("personal skill uses the precise explicit invocation name and reviewed-CSV workflow", () => {
    const skillPath =
        "C:/Users/Aaron Chan/.codex/skills/update-gentle-lit/SKILL.md";
    assert.equal(existsSync(skillPath), true);
    const skill = readFileSync(skillPath, "utf8");
  assert.match(skill, /name:\s*update-gentle-lit/);
  assert.match(skill, /notes\/gentle\/validate\.html/);
  assert.match(skill, /notes\/gentle\/discarded_literature\.csv/);
  assert.match(skill, /blank `decision` and blank `reviewedAt`/);
  assert.match(skill, /Never replace that queue/);
  assert.match(skill, /reviewed.*CSV|CSV.*reviewed/i);
    assert.match(skill, /single[- ]sentence|one (?:concise )?sentence/i);
    assert.match(skill, /import|add.*literature/i);
});

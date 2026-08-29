# Update Gentle Lit Review Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a human-review CSV loop and a single-page vanilla-JavaScript validator for borderline literature rejected during automated curation.

**Architecture:** `notes/gentle/discarded_literature.csv` is an append-only review queue. `notes/gentle/validate.html` loads it, resolves tag aliases from the existing tag JSON, and delegates CSV parsing, review-state changes, serialization, and handoff text to `notes/gentle/gentle_lit_validator.js`. The renamed personal skill `update-gentle-lit` documents both the scrape path and the reviewed-CSV import path; the static page exports reviewed decisions because a browser cannot reliably invoke Codex or overwrite a local file.

**Tech Stack:** Vanilla HTML, CSS, and JavaScript modules; browser File/Blob APIs; Node's built-in test runner; no third-party dependencies.

**Spec:** Approved design in the conversation immediately preceding this plan.

## Global Constraints

- Keep the validator single-page, dependency-free, and usable with a local HTTP server.
- Store one borderline candidate per CSV row and require a single-sentence discard reason.
- Require two confirmations before exporting decisions.
- A checked row becomes `include`; an unchecked row becomes `exclude` when the full queue is submitted.
- The Codex skill must re-check approved records' abstracts before modifying the JSON catalogue.
- Preserve the existing literature JSON/tag schema and history; never silently delete review rows.

---

### Task 1: CSV review engine

**Files:**

- Create: `notes/gentle/gentle_lit_validator.js`
- Test: `notes/gentle/gentle_lit_validator.test.mjs`

**Interfaces:**

- Produces `parseCsv(text)`, `serializeCsv(rows, headers)`, `applyReview(rows, selectedIds, reviewedAt)`, and `buildHandoffPrompt(fileName, count)` exports.

- [ ] **Step 1: Write failing tests** for quoted commas/newlines, review decisions, CSV round-tripping, and the handoff prompt.
- [ ] **Step 2: Run** `node --test notes/gentle/gentle_lit_validator.test.mjs`; confirm failure because the module does not exist.
- [ ] **Step 3: Implement** the pure CSV and review functions with no DOM dependency.
- [ ] **Step 4: Run** the focused test and then the existing literature test suite.

### Task 2: Review queue and validator page

**Files:**

- Create: `notes/gentle/discarded_literature.csv`
- Create: `notes/gentle/validate.html`
- Modify: `notes/gentle/gentle_lit_validator.js`
- Test: `notes/gentle/gentle_lit_validator.test.mjs`

**Interfaces:**

- The page consumes the CSV headers `id,authors,title,arxivUrl,publishedUrl,source,journal,suggestedTags,reason,decision,reviewedAt`.
- The page loads `gentle_lit_tags.json` to turn tag aliases into readable section/subsection suggestions.

- [ ] **Step 1: Extend failing tests** to require the CSV header, page controls, tag-data loading, one checkbox per record, two confirmation stages, and reviewed CSV download behavior.
- [ ] **Step 2: Run** the focused test; confirm the new page and header assertions fail.
- [ ] **Step 3: Implement** accessible semantic markup, responsive styling, pending/reviewed counts, search, checkbox selection, abstract details, and empty/error states.
- [ ] **Step 4: Implement** the two-stage confirmation: review summary plus explicit confirmation checkbox, followed by final confirmation before export.
- [ ] **Step 5: Run** the focused test and inspect the page through a local HTTP server.

### Task 3: Rename and extend the personal skill

**Files:**

- Move: `C:/Users/Aaron Chan/.codex/skills/curating-literature-databanks/` to `C:/Users/Aaron Chan/.codex/skills/update-gentle-lit/`
- Modify: `C:/Users/Aaron Chan/.codex/skills/update-gentle-lit/SKILL.md`
- Modify: `C:/Users/Aaron Chan/.codex/skills/update-gentle-lit/agents/openai.yaml`

**Interfaces:**

- Explicit invocation becomes `$update-gentle-lit`.
- The skill recognizes requests to process `notes/discarded_literature.csv` or a reviewed CSV.

- [ ] **Step 1: Add failing acceptance checks** for the new name, reviewed-CSV instructions, single-sentence reasons, and import-status handling.
- [ ] **Step 2: Run** the acceptance checks; confirm they fail against the old skill name/instructions.
- [ ] **Step 3: Move and update** the skill, preserving its incremental journal-search workflow and validator resource.
- [ ] **Step 4: Run** the skill validator and acceptance checks.

### Task 4: Full verification

**Files:**

- Test: `notes/gentle_lit.test.mjs`, `notes/gentle/gentle_lit_validator.test.mjs`

- [ ] **Step 1: Run** both Node test suites.
- [ ] **Step 2: Run** the skill validator and catalogue validator.
- [ ] **Step 3: Run** JavaScript syntax checks and `git diff --check`.
- [ ] **Step 4: Remove temporary acceptance fixtures and confirm only intended files remain.**

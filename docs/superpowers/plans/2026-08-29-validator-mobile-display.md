# Validator and Mobile Display Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Simplify the admin validator for rapid keyboard review and make the public literature table a compact single-column display on mobile.

**Architecture:** The validator continues to load `discarded_literature.csv` and `gentle_lit_tags.json` automatically over HTTP, but removes manual file controls and decorative presentation. Its state gains a focused visible-row index, with keyboard navigation and selection handled by small pure helpers. The public renderer keeps the existing desktop table and adds a mobile-only record summary plus full-width title-detail rows.

**Tech Stack:** Vanilla HTML, CSS, and JavaScript modules; Node's built-in test runner; no third-party dependencies.

**Spec:** Approved interaction and mobile-layout requirements in the current conversation; existing catalogue structure in `notes/gentle_lit.html` and `notes/gentle_lit_auto.js`.

## Global Constraints

- Do not change the literature JSON/tag schema or catalogue contents.
- Keep both pages dependency-free and compatible with the existing local HTTP-server workflow.
- Validator data is loaded automatically; do not add a file chooser or current-queue download control.
- Keep reviewed-CSV export because it is the output of the validator workflow.
- Use small, plain controls without decorative pills, oversized headings, theme controls, or metric cards.
- On mobile, omit the title copy action; retain desktop title copying.
- Maintain accessible focus indicators and reduced-motion behavior.

---

### Task 1: Public mobile literature rows

**Files:**

- Modify: `notes/gentle_lit.html`
- Modify: `notes/gentle_lit_auto.js`
- Test: `notes/gentle_lit.test.mjs`

**Interfaces:**

- `renderSections(sections, target)` continues to render the desktop table.
- Each literature row exposes a mobile-only summary containing author name, linked arXiv ID, publication year/DOI, and a `title` button.
- A title toggle inserts or removes a full-width title-detail row immediately after the literature row.

- [x] **Step 1: Add failing tests** for mobile summary markup, `title` button labeling, absence of mobile copy controls, and full-width title-detail rows.
- [x] **Step 2: Run** `node --test notes/gentle_lit.test.mjs`; confirm the new assertions fail against the current renderer.
- [x] **Step 3: Implement** the mobile summary and title-detail row while preserving desktop sort controls and desktop copy behavior.
- [x] **Step 4: Add responsive CSS** that hides desktop cells on small screens and presents one compact stacked record per row.
- [x] **Step 5: Run** the public test suite and inspect generated markup through a local HTTP server.

### Task 2: Functional validator layout and keyboard review

**Files:**

- Modify: `notes/gentle/validate.html`
- Modify: `notes/gentle/gentle_lit_validator.js`
- Test: `notes/gentle/gentle_lit_validator.test.mjs`

**Interfaces:**

- The page automatically fetches `./discarded_literature.csv` and `../gentle_lit_tags.json` on load.
- Exported pure helpers include `moveFocusedIndex(index, direction, visibleCount)` and `toggleSelection(row)`.
- Visible queue rows are focusable; `ArrowUp`/`ArrowDown` move focus and `Space` toggles inclusion.

- [x] **Step 1: Add failing tests** for automatic-only loading controls, plain instruction text, focused-row markup, bounded focus movement, and space-toggle behavior.
- [x] **Step 2: Run** `node --test notes/gentle/gentle_lit_validator.test.mjs`; confirm the new assertions fail.
- [x] **Step 3: Implement** the pure focus and selection helpers and wire keyboard events to visible queue rows.
- [x] **Step 4: Replace** the hero, file controls, large metric cards, and decorative shell with a compact header, table toolbar, fixed status sidebar, and instructions below the list.
- [x] **Step 5: Keep** review confirmation, reviewed CSV export, handoff prompt, filtering, and error states working.
- [x] **Step 6: Run** the focused validator tests and inspect the page through a local HTTP server.

### Task 3: Full verification

**Files:**

- Test: `notes/gentle_lit.test.mjs`
- Test: `notes/gentle/gentle_lit_validator.test.mjs`

- [x] **Step 1: Run** both Node test suites.
- [x] **Step 2: Run** JavaScript syntax checks and the catalogue validator.
- [x] **Step 3: Run** `git diff --check` and inspect the final diff for unrelated changes.

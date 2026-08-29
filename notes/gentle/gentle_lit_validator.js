export const CSV_HEADERS = [
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
  "reviewedAt"
];

export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  const pushField = () => {
    row.push(field);
    field = "";
  };
  const pushRow = () => {
    pushField();
    if (row.some((value) => value !== "")) rows.push(row);
    row = [];
  };

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"') {
        if (text[index + 1] === '"') {
          field += '"';
          index += 1;
        } else {
          quoted = false;
        }
      } else {
        field += character;
      }
    } else if (character === '"' && field === "") {
      quoted = true;
    } else if (character === ",") {
      pushField();
    } else if (character === "\n") {
      pushRow();
    } else if (character !== "\r") {
      field += character;
    }
  }

  if (quoted) throw new Error("CSV contains an unfinished quoted field");
  if (field !== "" || row.length > 0) pushRow();
  if (rows.length === 0) return [];

  const headers = rows.shift().map((header, index) => index === 0 ? header.replace(/^\uFEFF/, "") : header);
  if (headers.some((header) => header === "")) throw new Error("CSV contains an empty column name");
  if (new Set(headers).size !== headers.length) throw new Error("CSV contains duplicate column names");

  return rows.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])));
}

function csvValue(value) {
  const stringValue = String(value ?? "");
  return /[",\r\n]/.test(stringValue) ? `"${stringValue.replaceAll('"', '""')}"` : stringValue;
}

export function serializeCsv(rows, headers = CSV_HEADERS) {
  const lines = [headers.map(csvValue).join(",")];
  for (const row of rows) lines.push(headers.map((header) => csvValue(row[header])).join(","));
  return `${lines.join("\r\n")}\r\n`;
}

export function applyReview(rows, selectedIds, reviewedAt) {
  const selected = new Set(selectedIds);
  return rows.map((row) => ({
    ...row,
    decision: selected.has(row.id) ? "include" : "exclude",
    reviewedAt
  }));
}

export function moveFocusedIndex(index, direction, visibleCount) {
  if (visibleCount <= 0) return -1;
  if (index < 0) return direction < 0 ? visibleCount - 1 : 0;
  return Math.min(Math.max(index + direction, 0), visibleCount - 1);
}

export function toggleSelection(row) {
  return { ...row, _selected: !row._selected };
}

export function buildHandoffPrompt(fileName, count) {
  return `$update-gentle-lit\n\nProcess the reviewed discarded-literature CSV file "${fileName}". Re-check the abstract and source links for every row marked decision=include, add only valid literature to the JSON/tag files, preserve multi-tag placement, mark imported rows as imported, and run the catalogue validator. There are ${count} approved row(s).`;
}

function textCell(value, className = "") {
  const cell = document.createElement("td");
  if (className) cell.className = className;
  cell.textContent = value || "—";
  return cell;
}

function categoryLabel(value, tags) {
  const aliases = String(value || "").split(/[;|]/).map((alias) => alias.trim()).filter(Boolean);
  if (aliases.length === 0) return "—";
  return aliases.map((alias) => {
    const tag = tags.find((candidate) => candidate.alias === alias);
    if (!tag) return alias;
    return tag.subsectionTitle ? `${tag.sectionTitle} › ${tag.subsectionTitle}` : tag.sectionTitle;
  }).join("; ");
}

function downloadText(text, fileName) {
  const blob = new Blob([text], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

function initialisePage() {
  const state = { rows: [], tags: [], sourceName: "discarded_literature.csv", focusedId: null };
  const elements = {
    body: document.querySelector("#queue-body"),
    count: document.querySelector("#queue-count"),
    pending: document.querySelector("#pending-count"),
    selected: document.querySelector("#selected-count"),
    focused: document.querySelector("#focused-record"),
    status: document.querySelector("#status-message"),
    search: document.querySelector("#search"),
    filter: document.querySelector("#status-filter"),
    selectAll: document.querySelector("#select-visible"),
    clearAll: document.querySelector("#clear-visible"),
    review: document.querySelector("#review-selected"),
    dialog: document.querySelector("#review-dialog"),
    dialogSummary: document.querySelector("#review-summary"),
    confirmation: document.querySelector("#confirmation-check"),
    cancel: document.querySelector("#cancel-review"),
    confirm: document.querySelector("#confirm-review"),
    handoff: document.querySelector("#handoff"),
    handoffText: document.querySelector("#handoff-text"),
    copyHandoff: document.querySelector("#copy-handoff")
  };

  const setStatus = (message, kind = "") => {
    elements.status.textContent = message;
    elements.status.dataset.kind = kind;
  };

  const visibleRows = () => {
    const query = elements.search.value.trim().toLowerCase();
    const status = elements.filter.value;
    return state.rows.filter((row) => {
      const rowStatus = row.decision || "pending";
      const searchable = [row.id, row.authors, row.title, row.journal, row.reason, row.suggestedTags].join(" ").toLowerCase();
      return (status === "all" || rowStatus === status) && (!query || searchable.includes(query));
    });
  };

  const updateFocusStatus = () => {
    const row = state.rows.find((candidate) => candidate.id === state.focusedId);
    elements.focused.textContent = row
      ? `${row.authors || "Unknown authors"} — ${row.title || "Untitled candidate"}`
      : "No row focused.";
  };

  const updateRowFocus = () => {
    const domRows = [...elements.body.querySelectorAll("tr[data-row-id]")];
    domRows.forEach((row, index) => {
      const focused = row.dataset.rowId === state.focusedId;
      row.classList.toggle("is-focused", focused);
      row.tabIndex = state.focusedId ? (focused ? 0 : -1) : (index === 0 ? 0 : -1);
    });
  };

  const setFocusedRow = (rowId, moveFocus = false) => {
    state.focusedId = state.rows.some((row) => row.id === rowId) ? rowId : null;
    updateRowFocus();
    updateFocusStatus();
    if (moveFocus) {
      const target = [...elements.body.querySelectorAll("tr[data-row-id]")]
        .find((row) => row.dataset.rowId === rowId);
      target?.focus();
    }
  };

  const updateCounts = () => {
    const selected = state.rows.filter((row) => row._selected).length;
    const pending = state.rows.filter((row) => !row.decision || row.decision === "pending").length;
    elements.count.textContent = String(state.rows.length);
    elements.pending.textContent = String(pending);
    elements.selected.textContent = String(selected);
    elements.review.disabled = state.rows.length === 0;
  };

  const render = () => {
    const fragment = document.createDocumentFragment();
    const rows = visibleRows();
    if (!rows.some((row) => row.id === state.focusedId)) state.focusedId = null;
    rows.forEach((row, index) => {
      const tableRow = document.createElement("tr");
      tableRow.dataset.rowId = row.id;
      tableRow.tabIndex = state.focusedId ? (row.id === state.focusedId ? 0 : -1) : (index === 0 ? 0 : -1);
      tableRow.className = row.id === state.focusedId ? "is-focused" : "";
      tableRow.addEventListener("focus", () => setFocusedRow(row.id));
      tableRow.addEventListener("click", (event) => {
        if (!event.target.closest("a,button,input,select,textarea")) setFocusedRow(row.id);
      });
      tableRow.addEventListener("keydown", (event) => {
        const currentIndex = visibleRows().findIndex((visibleRow) => visibleRow.id === row.id);
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
          event.preventDefault();
          const direction = event.key === "ArrowUp" ? -1 : 1;
          const nextIndex = moveFocusedIndex(currentIndex, direction, rows.length);
          const nextRow = rows[nextIndex];
          if (nextRow) setFocusedRow(nextRow.id, true);
          return;
        }
        if (event.key === " " || event.code === "Space") {
          event.preventDefault();
          Object.assign(row, toggleSelection(row));
          checkbox.checked = Boolean(row._selected);
          updateCounts();
        }
      });

      const checkboxCell = document.createElement("td");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = Boolean(row._selected);
      checkbox.setAttribute("aria-label", `Include ${row.title || row.id}`);
      checkbox.addEventListener("change", () => {
        row._selected = checkbox.checked;
        setFocusedRow(row.id);
        updateCounts();
      });
      checkboxCell.append(checkbox);

      const workCell = document.createElement("td");
      workCell.className = "work-cell";
      const title = document.createElement("strong");
      title.textContent = row.title || "Untitled candidate";
      const authors = document.createElement("span");
      authors.textContent = row.authors || "Unknown authors";
      workCell.append(title, authors);

      const decision = document.createElement("span");
      decision.className = `decision decision-${row.decision || "pending"}`;
      decision.textContent = row.decision || "pending";

      tableRow.append(
        checkboxCell,
        workCell,
        textCell(row.source || row.journal || "—"),
        textCell(categoryLabel(row.suggestedTags, state.tags), "category-cell"),
        textCell(row.reason, "reason-cell"),
        linksCell(row),
        decisionCell(decision)
      );
      fragment.append(tableRow);
    });
    if (rows.length === 0) {
      const emptyRow = document.createElement("tr");
      const emptyCell = document.createElement("td");
      emptyCell.className = "empty";
      emptyCell.colSpan = 7;
      emptyCell.textContent = state.rows.length === 0 ? "No review records loaded." : "No records match this view.";
      emptyRow.append(emptyCell);
      fragment.append(emptyRow);
    }
    elements.body.replaceChildren(fragment);
    updateRowFocus();
    updateFocusStatus();
    updateCounts();
  };

  function decisionCell(decision) {
    const cell = document.createElement("td");
    cell.append(decision);
    return cell;
  }

  function linksCell(row) {
    const cell = document.createElement("td");
    const links = [[row.arxivUrl, "arXiv"], [row.publishedUrl, "Published"]].filter(([url]) => url);
    if (links.length === 0) {
      cell.className = "muted";
      cell.textContent = "—";
      return cell;
    }
    links.forEach(([url, label], index) => {
      if (index > 0) cell.append(document.createTextNode(" · "));
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = label;
      cell.append(link);
    });
    return cell;
  }

  const loadCsv = (text, sourceName) => {
    const rows = parseCsv(text);
    state.rows = rows.map((row) => ({ ...row, _selected: row.decision === "include" }));
    state.sourceName = sourceName;
    state.focusedId = null;
    elements.handoff.hidden = true;
    render();
    setStatus(`Loaded ${state.rows.length} review record${state.rows.length === 1 ? "" : "s"}.`, "success");
  };

  const loadDefaults = async () => {
    try {
      const csvResponse = await fetch("./discarded_literature.csv");
      if (!csvResponse.ok) throw new Error("discarded_literature.csv could not be loaded");
      loadCsv(await csvResponse.text(), "discarded_literature.csv");
      try {
        const tagResponse = await fetch("../gentle_lit_tags.json");
        state.tags = tagResponse.ok ? await tagResponse.json() : [];
        render();
      } catch {
        state.tags = [];
      }
    } catch (error) {
      state.tags = [];
      setStatus(`${error.message}. Open this page through a local HTTP(S) server so it can load the latest queue.`, "error");
      render();
    }
  };

  elements.search.addEventListener("input", render);
  elements.filter.addEventListener("change", render);
  elements.selectAll.addEventListener("click", () => {
    for (const row of visibleRows()) row._selected = true;
    render();
  });
  elements.clearAll.addEventListener("click", () => {
    for (const row of visibleRows()) row._selected = false;
    render();
  });

  elements.review.addEventListener("click", () => {
    const selected = state.rows.filter((row) => row._selected);
    elements.dialogSummary.textContent = `You selected ${selected.length} of ${state.rows.length} records. Checked records will be marked include; every unchecked record will be marked exclude in the exported review file.`;
    elements.confirmation.checked = false;
    if (typeof elements.dialog.showModal === "function") elements.dialog.showModal();
    else elements.dialog.hidden = false;
  });

  elements.cancel.addEventListener("click", () => {
    if (typeof elements.dialog.close === "function") elements.dialog.close();
    else elements.dialog.hidden = true;
  });

  elements.confirm.addEventListener("click", () => {
    if (!elements.confirmation.checked) {
      setStatus("Check the confirmation box before continuing.", "error");
      return;
    }
    const selected = state.rows.filter((row) => row._selected);
    if (!window.confirm(`Final confirmation: mark ${selected.length} record(s) include and all other records exclude?`)) return;
    const reviewedAt = new Date().toISOString();
    state.rows = applyReview(state.rows, selected.map((row) => row.id), reviewedAt);
    const csv = serializeCsv(state.rows, CSV_HEADERS);
    const fileName = "discarded_literature.reviewed.csv";
    downloadText(csv, fileName);
    const prompt = buildHandoffPrompt(fileName, selected.length);
    elements.handoffText.value = prompt;
    elements.handoff.hidden = false;
    if (typeof elements.dialog.close === "function") elements.dialog.close();
    else elements.dialog.hidden = true;
    render();
    setStatus("Reviewed CSV exported. Send it to Codex with the handoff prompt below.", "success");
  });

  elements.copyHandoff.addEventListener("click", async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(elements.handoffText.value);
      } else {
        elements.handoffText.select();
        document.execCommand("copy");
      }
      elements.copyHandoff.textContent = "Copied";
      setTimeout(() => { elements.copyHandoff.textContent = "Copy handoff"; }, 1400);
    } catch {
      setStatus("Copy was unavailable; select the handoff text and copy it manually.", "error");
    }
  });

  render();
  loadDefaults();
}

if (typeof document !== "undefined") initialisePage();

export function organizeLiterature(tags, literature) {
  const sections = new Map();

  for (const tag of tags) {
    if (!sections.has(tag.sectionAlias)) {
      sections.set(tag.sectionAlias, {
        alias: tag.sectionAlias,
        title: tag.sectionTitle,
        groups: []
      });
    }

    const section = sections.get(tag.sectionAlias);
    section.groups.push({ alias: tag.alias, title: tag.subsectionTitle, items: [] });
  }

  const groups = new Map(
    [...sections.values()].flatMap((section) => section.groups.map((group) => [group.alias, group]))
  );

  for (const item of literature) {
    for (const alias of item.tags) {
      const group = groups.get(alias);
      if (group && !group.items.some((listed) => listed.id === item.id)) group.items.push(item);
    }
  }

  return [...sections.values()];
}

export function tocLabel(section) {
  return section.title;
}

export function authorLabel(item) {
  return item.authorDisplay ?? item.authors;
}

export function titleText(item) {
  return item.title || "Untitled literature";
}

export function titleToggleLabel(expanded) {
  return expanded ? "Hide title" : "Title";
}

export function desktopTitleToggleLabel(expanded) {
  return expanded ? "Hide" : "Show";
}

export function mobileSummary(item) {
  return {
    authors: authorLabel(item),
    arxiv: item.arxiv ? { id: item.arxiv.id, url: item.arxiv.url } : null,
    published: item.published
      ? { year: item.published.year, label: item.published.label, url: item.published.url }
      : null,
    title: titleText(item)
  };
}

export function authorSurname(item) {
  const firstAuthor = authorLabel(item).split(",", 1)[0].trim();
  return firstAuthor.replace(/^(?:[A-Z][A-Za-z.-]*\.\s+)+/, "");
}

function arxivYear(item) {
  return item.arxiv?.year ?? Infinity;
}

export function sortLiterature(items, sortBy = "authors") {
  return [...items].sort((left, right) => {
    if (sortBy === "arxivYear") {
      return arxivYear(left) - arxivYear(right)
        || authorSurname(left).localeCompare(authorSurname(right))
        || authorLabel(left).localeCompare(authorLabel(right));
    }
    return authorSurname(left).localeCompare(authorSurname(right))
      || arxivYear(left) - arxivYear(right)
      || authorLabel(left).localeCompare(authorLabel(right));
  });
}

function addReference(cell, reference, className, kind) {
  cell.className = className;
  if (!reference) {
    const dash = document.createElement("span");
    dash.className = "dash";
    dash.textContent = "—";
    cell.append(dash);
    return;
  }

  const year = document.createElement("span");
  year.className = "yr";
  year.textContent = reference.year;
  const link = document.createElement("a");
  link.href = reference.url;
  link.textContent = kind === "arxiv" ? reference.id : reference.label;
  if (kind === "arxiv") link.className = "code";
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  cell.append(year, document.createTextNode(" "), link);
}

function addMobileReference(line, reference, kind) {
  const link = document.createElement("a");
  link.href = reference.url;
  link.textContent = kind === "arxiv" ? reference.id : `${reference.year} · ${reference.label}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  if (kind === "arxiv") link.className = "code";
  line.append(link);
}

async function copyTitle(text, button) {
  try {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.append(textarea);
        textarea.select();
        if (!document.execCommand("copy")) throw new Error("copy command failed");
        textarea.remove();
      }
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.append(textarea);
      textarea.select();
      if (!document.execCommand("copy")) throw new Error("copy command failed");
      textarea.remove();
    }
    button.textContent = "Copied";
    button.classList.add("copied");
  } catch {
    button.textContent = "Copy failed";
  }
  setTimeout(() => {
    button.textContent = "Copy";
    button.classList.remove("copied");
  }, 1400);
}

function createTable(items) {
  const table = document.createElement("table");
  const head = document.createElement("thead");
  const headingRow = document.createElement("tr");
  const body = document.createElement("tbody");
  let sortBy = "authors";
  const sortButtons = [];

  function renderRows() {
    const rows = document.createDocumentFragment();
    for (const item of sortLiterature(items, sortBy)) {
      const row = document.createElement("tr");
      row.className = "lit-row";
      if (item.title) row.title = item.title;
      const authors = document.createElement("td");
      authors.className = "auth";
      const desktopAuthor = document.createElement("span");
      desktopAuthor.className = "desktop-author";
      desktopAuthor.textContent = authorLabel(item);
      authors.append(desktopAuthor);

      const mobileRecord = document.createElement("div");
      mobileRecord.className = "mobile-record";
      const mobileAuthor = document.createElement("span");
      mobileAuthor.className = "mobile-author";
      mobileAuthor.textContent = mobileSummary(item).authors;
      const mobileMeta = document.createElement("div");
      mobileMeta.className = "mobile-meta";
      if (item.arxiv) {
        const mobileArxiv = document.createElement("span");
        mobileArxiv.className = "mobile-line";
        addMobileReference(mobileArxiv, item.arxiv, "arxiv");
        mobileMeta.append(mobileArxiv);
      }

      const titleCell = document.createElement("td");
      titleCell.className = "title-cell";
      const titleActions = document.createElement("div");
      titleActions.className = "title-actions";
      const showTitleButton = document.createElement("button");
      showTitleButton.type = "button";
      showTitleButton.className = "show-title";
      showTitleButton.textContent = desktopTitleToggleLabel(false);
      showTitleButton.setAttribute("aria-expanded", "false");
      showTitleButton.setAttribute("aria-label", "Show title");
      const copyTitleButton = document.createElement("button");
      copyTitleButton.type = "button";
      copyTitleButton.className = "copy-title";
      copyTitleButton.textContent = "Copy";
      copyTitleButton.setAttribute("aria-label", "Copy title");

      const mobileTitleButton = document.createElement("button");
      mobileTitleButton.type = "button";
      mobileTitleButton.className = "mobile-title-button";
      mobileTitleButton.textContent = titleToggleLabel(false);
      mobileTitleButton.setAttribute("aria-expanded", "false");
      mobileTitleButton.setAttribute("aria-label", "Show title");

      const titleDetailRow = document.createElement("tr");
      titleDetailRow.className = "title-detail-row";
      titleDetailRow.hidden = true;
      const titleDetail = document.createElement("td");
      titleDetail.className = "title-detail";
      titleDetail.colSpan = 4;
      titleDetail.textContent = titleText(item);
      titleDetailRow.append(titleDetail);

      const setTitleExpanded = (expanded) => {
        titleDetailRow.hidden = !expanded;
        showTitleButton.setAttribute("aria-expanded", String(expanded));
        showTitleButton.setAttribute("aria-label", expanded ? "Hide title" : "Show title");
        showTitleButton.textContent = desktopTitleToggleLabel(expanded);
        mobileTitleButton.setAttribute("aria-expanded", String(expanded));
        mobileTitleButton.setAttribute("aria-label", expanded ? "Hide title" : "Show title");
        mobileTitleButton.textContent = titleToggleLabel(expanded);
      };
      showTitleButton.addEventListener("click", () => setTitleExpanded(titleDetailRow.hidden));
      mobileTitleButton.addEventListener("click", () => setTitleExpanded(titleDetailRow.hidden));
      copyTitleButton.addEventListener("click", () => copyTitle(titleText(item), copyTitleButton));
      titleActions.append(showTitleButton, copyTitleButton);
      titleCell.append(titleActions);
      const mobileTitleLine = document.createElement("span");
      mobileTitleLine.className = "mobile-line mobile-title-line";
      if (item.published) {
        const mobilePublished = document.createElement("span");
        mobilePublished.className = "mobile-published";
        addMobileReference(mobilePublished, item.published, "published");
        const titleSeparator = document.createElement("span");
        titleSeparator.className = "mobile-separator";
        titleSeparator.textContent = "·";
        titleSeparator.setAttribute("aria-hidden", "true");
        mobileTitleLine.append(mobilePublished, titleSeparator);
      }
      mobileTitleLine.append(mobileTitleButton);
      mobileMeta.append(mobileTitleLine);
      mobileRecord.append(mobileAuthor, mobileMeta);
      authors.append(mobileRecord);

      const arxiv = document.createElement("td");
      addReference(arxiv, item.arxiv, "arx", "arxiv");
      const published = document.createElement("td");
      addReference(published, item.published, "pub", "published");
      row.append(authors, titleCell, arxiv, published);
      rows.append(row, titleDetailRow);
    }
    body.replaceChildren(rows);
    sortButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.sort === sortBy)));
  }

  for (const { title, key, className } of [
    { title: "Author", key: "authors", className: "auth" },
    { title: "Title", className: "title-cell" },
    { title: "arXiv year", key: "arxivYear", className: "arx" },
    { title: "Published", className: "pub" }
  ]) {
    const heading = document.createElement("th");
    heading.className = className;
    if (key) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "sort-button";
      button.dataset.sort = key;
      button.textContent = title;
      button.title = `Sort by ${title.toLowerCase()}`;
      button.addEventListener("click", () => {
        sortBy = key;
        renderRows();
      });
      sortButtons.push(button);
      heading.append(button);
    } else {
      heading.textContent = title;
    }
    headingRow.append(heading);
  }
  head.append(headingRow);
  renderRows();

  table.append(head, body);
  const wrapper = document.createElement("div");
  wrapper.className = "tw";
  wrapper.append(table);
  return wrapper;
}

function renderToc(sections, literatureCount, target) {
  const list = document.createElement("ol");
  list.className = "toc";
  sections.forEach((section) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${section.alias}`;
    link.textContent = tocLabel(section);
    item.append(link);
    list.append(item);
  });
  const total = document.createElement("p");
  total.className = "toc-total";
  total.textContent = `${literatureCount} literature items`;
  target.replaceChildren(total, list);
}

function renderSections(sections, target) {
  const fragment = document.createDocumentFragment();
  sections.forEach((section, index) => {
    const element = document.createElement("section");
    element.id = section.alias;
    const heading = document.createElement("h2");
    heading.textContent = `${index + 1}. ${section.title}`;
    element.append(heading);

    section.groups.forEach((group) => {
      if (group.title) {
        const subheading = document.createElement("h3");
        subheading.textContent = group.title;
        element.append(subheading);
      }
      element.append(createTable(group.items));
    });
    fragment.append(element);
  });
  target.replaceChildren(fragment);
}

function prefersDarkTheme() {
  const selectedTheme = document.documentElement.dataset.theme;
  return selectedTheme ? selectedTheme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function updateThemeToggle(button) {
  const dark = prefersDarkTheme();
  button.textContent = dark ? "☀" : "☾";
  button.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  button.title = button.getAttribute("aria-label");
}

function initialiseControls() {
  const themeToggle = document.querySelector("#theme-toggle");
  const scrollTop = document.querySelector("#scroll-top");
  const storedTheme = localStorage.getItem("gentle-lit-theme");
  if (storedTheme === "light" || storedTheme === "dark") document.documentElement.dataset.theme = storedTheme;
  updateThemeToggle(themeToggle);

  themeToggle.addEventListener("click", () => {
    const nextTheme = prefersDarkTheme() ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("gentle-lit-theme", nextTheme);
    updateThemeToggle(themeToggle);
  });

  const updateScrollTop = () => { scrollTop.hidden = window.scrollY < 240; };
  window.addEventListener("scroll", updateScrollTop, { passive: true });
  updateScrollTop();
  scrollTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

async function initialise() {
  const [tags, literature] = await Promise.all([
    fetch("./gentle_lit_tags.json").then((response) => response.ok ? response.json() : Promise.reject(new Error("tag data could not be loaded"))),
    fetch("./gentle_lit.json").then((response) => response.ok ? response.json() : Promise.reject(new Error("literature data could not be loaded")))
  ]);
  const sections = organizeLiterature(tags, literature);
  renderToc(sections, literature.length, document.querySelector("#toc"));
  renderSections(sections, document.querySelector("#literature"));
}

if (typeof document !== "undefined") {
  initialiseControls();
  initialise().catch((error) => {
    const message = document.querySelector("#load-error");
    message.hidden = false;
    message.textContent = `Unable to load the literature list: ${error.message}. Serve this page over HTTP(S), rather than opening it as a local file.`;
  });
}

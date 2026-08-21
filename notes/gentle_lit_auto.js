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
      if (item.title) row.title = item.title;
      const authors = document.createElement("td");
      authors.className = "auth";
      authors.textContent = authorLabel(item);

      const arxiv = document.createElement("td");
      addReference(arxiv, item.arxiv, "arx", "arxiv");
      const published = document.createElement("td");
      addReference(published, item.published, "pub", "published");
      row.append(authors, arxiv, published);
      rows.append(row);
    }
    body.replaceChildren(rows);
    sortButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.sort === sortBy)));
  }

  for (const { title, key, className } of [
    { title: "Author", key: "authors", className: "auth" },
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

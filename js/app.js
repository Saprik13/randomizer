let rows = [],
  counter = 0,
  lang = "ua";

const T = {
  ua: {
    heroTitle: "Рандомайзер",
    heroSub: "Розподіл учасників по групах",
    tabManual: "Вручну",
    tabImport: "Імпорт з таблиці",
    panelPlayers: "Список учасників",
    panelImport: "Вставте дані з Google Таблиць",
    colName: "Колонка імені",
    colRating: "Колонка рейтингу",
    pastePlaceholder: "Виділіть комірки → Ctrl+C → Ctrl+V сюди",
    importHint: "Формат: <code>Андрій\t1850</code> (табуляція між колонками).",
    btnAdd: "Додати",
    btnClear: "Очистити список",
    btnImport: "Імпортувати",
    btnClearPaste: "Очистити",
    labelGroups: "Кількість груп",
    labelSize: "Учасників у групі",
    btnGenerate: "Генерувати групи",
    resultTitle: "Результат",
    btnRepeat: "Повторити",
    namePh: "Ім'я",
    ratingPh: "Рейтинг",
    groupLabel: "Група",
    avgLabel: "Ø",
    tierTop: "топ",
    tierMid1: "сер+",
    tierMid2: "сер-",
    tierNew: "нов",
    feedImported: "Імпортовано",
    feedSkipped: "пропущено",
    feedNoData: "Немає даних.",
    feedFail: "Не вдалось розпізнати учасників.",
    warnMin: "Додайте хоча б 2 учасників.",
    warnGroups: (ng, n) => `Груп (${ng}) більше ніж учасників (${n}).`,
    infoExact: (n, ng, gs) => `✓ ${n} учасників → рівно ${ng} груп по ${gs}.`,
    infoOver: (ng, gs, cap, n) =>
      `⚠ Місць (${ng}×${gs}=${cap}) менше ніж учасників (${n}) — надлишок розподілиться рівномірно.`,
    infoUnder: (n, ng, gs) =>
      `ℹ ${n} учасників → ${ng} груп, деякі матимуть менше ${gs} ос.`,
  },
  en: {
    heroTitle: "Randomizer",
    heroSub: "Group distribution by rating",
    tabManual: "Manual",
    tabImport: "Import from sheet",
    panelPlayers: "Players list",
    panelImport: "Paste data from Google Sheets",
    colName: "Name column",
    colRating: "Rating column",
    pastePlaceholder: "Select cells → Ctrl+C → Ctrl+V here",
    importHint: "Format: <code>Andrew\t1850</code> (tab-separated columns).",
    btnAdd: "Add",
    btnClear: "Clear list",
    btnImport: "Import",
    btnClearPaste: "Clear",
    labelGroups: "Number of groups",
    labelSize: "Players per group",
    btnGenerate: "Generate groups",
    resultTitle: "Result",
    btnRepeat: "Reshuffle",
    namePh: "Name",
    ratingPh: "Rating",
    groupLabel: "Group",
    avgLabel: "Avg",
    tierTop: "top",
    tierMid1: "mid+",
    tierMid2: "mid-",
    tierNew: "new",
    feedImported: "Imported",
    feedSkipped: "skipped",
    feedNoData: "No data to import.",
    feedFail: "Could not parse any players.",
    warnMin: "Add at least 2 players.",
    warnGroups: (ng, n) => `Groups (${ng}) exceed players (${n}).`,
    infoExact: (n, ng, gs) => `✓ ${n} players → exactly ${ng} groups of ${gs}.`,
    infoOver: (ng, gs, cap, n) =>
      `⚠ Slots (${ng}×${gs}=${cap}) less than players (${n}) — overflow distributed evenly.`,
    infoUnder: (n, ng, gs) =>
      `ℹ ${n} players → ${ng} groups, some will have fewer than ${gs}.`,
  },
};

function t(key) {
  return T[lang][key] || key;
}

function setLang(l) {
  lang = l;
  document.getElementById("btn-ua").classList.toggle("active", l === "ua");
  document.getElementById("btn-en").classList.toggle("active", l === "en");
  document.getElementById("hero-title").textContent = t("heroTitle");
  document.getElementById("hero-sub").textContent = t("heroSub");
  document.getElementById("pasteArea").placeholder = t("pastePlaceholder");
  document.querySelectorAll("[data-t]").forEach((el) => {
    el.textContent = t(el.dataset.t);
  });
  document.querySelectorAll("[data-t-ph]").forEach((el) => {
    el.placeholder = t(el.dataset.tPh || el.dataset["t-ph"]);
  });
  rows.forEach((id) => {
    const ni = document.getElementById("name-" + id);
    const ri = document.getElementById("rating-" + id);
    if (ni) ni.placeholder = t("namePh");
    if (ri) ri.placeholder = t("ratingPh");
  });
  updatePreview();
  const grid = document.getElementById("groups-grid");
  if (grid.children.length) generate();
}

function switchTab(name, el) {
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".tab-content")
    .forEach((t) => t.classList.remove("active"));
  el.classList.add("active");
  document.getElementById("tab-" + name).classList.add("active");
}

function clearList() {
  document.getElementById("plist").innerHTML = "";
  rows = [];
  counter = 0;
  updatePreview();
}

function updatePreview() {
  const ps = getPs();
  const n = ps.length;
  const ng = parseInt(document.getElementById("groupCount").value) || 2;
  const gs = parseInt(document.getElementById("groupSize").value) || 4;
  const cap = ng * gs;
  const info = document.getElementById("info-msg");
  if (!n) {
    info.textContent = "";
    return;
  }
  const L = T[lang];
  if (cap < n) {
    info.innerHTML = L.infoOver(ng, gs, cap, n);
    info.style.color = "#e5a040";
  } else if (cap > n) {
    info.innerHTML = L.infoUnder(n, ng, gs);
    info.style.color = "#888";
  } else {
    info.innerHTML = L.infoExact(n, ng, gs);
    info.style.color = "#50c878";
  }
}

function addRow(name = "", rating = "") {
  counter++;
  const id = counter;
  rows.push(id);
  const div = document.createElement("div");
  div.className = "p-row";
  div.id = "row-" + id;
  div.innerHTML = `
    <input class="di" type="text" placeholder="${t("namePh")}" id="name-${id}" value="${name}" style="flex:1" oninput="updatePreview()">
    <input class="di" type="number" id="rating-${id}" placeholder="${t("ratingPh")}" value="${rating}" style="width:90px;text-align:center">
    <button class="btn-x" onclick="removeRow(${id})" aria-label="Remove">×</button>
  `;
  document.getElementById("plist").appendChild(div);
  updatePreview();
}

function removeRow(id) {
  document.getElementById("row-" + id)?.remove();
  rows = rows.filter((r) => r !== id);
  updatePreview();
}

function getPs() {
  return rows
    .map((id) => {
      const name = (document.getElementById("name-" + id)?.value || "").trim();
      const rating = parseFloat(document.getElementById("rating-" + id)?.value);
      return name ? { name, rating: isNaN(rating) ? 0 : rating } : null;
    })
    .filter(Boolean);
}

function importData() {
  const raw = document.getElementById("pasteArea").value;
  const cn = parseInt(document.getElementById("colName").value) - 1;
  const cr = parseInt(document.getElementById("colRating").value) - 1;
  hideFeed();
  if (!raw.trim()) {
    showFeed(t("feedNoData"), false);
    return;
  }
  const parsed = [],
    skipped = [];
  raw
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l)
    .forEach((line, i) => {
      const cols = line.split("\t");
      const name = (cols[cn] || "").trim().replace(/\r/g, "");
      const r = parseFloat(
        (cols[cr] || "").trim().replace(/\r/g, "").replace(",", "."),
      );
      if (!name) return;
      if (isNaN(r)) {
        skipped.push(i);
        return;
      }
      parsed.push([name, r]);
    });
  if (!parsed.length) {
    showFeed(t("feedFail"), false);
    return;
  }
  document.getElementById("plist").innerHTML = "";
  rows = [];
  counter = 0;
  parsed.forEach(([n, r]) => addRow(n, r));
  showFeed(
    `${t("feedImported")} ${parsed.length}` +
      (skipped.length ? `, ${t("feedSkipped")} ${skipped.length}` : ""),
    true,
  );
  document
    .querySelectorAll(".tab")
    .forEach((tb, i) => tb.classList.toggle("active", i === 0));
  document
    .querySelectorAll(".tab-content")
    .forEach((tc) => tc.classList.remove("active"));
  document.getElementById("tab-manual").classList.add("active");
}

function showFeed(msg, ok) {
  const el = document.getElementById(ok ? "feed-ok" : "feed-err");
  el.textContent = (ok ? "✓ " : "✕ ") + msg;
  el.style.display = "inline";
}
function hideFeed() {
  document.getElementById("feed-ok").style.display = "none";
  document.getElementById("feed-err").style.display = "none";
}

function generate() {
  const warn = document.getElementById("warning");
  warn.style.display = "none";
  const ps = getPs();
  const L = T[lang];
  if (ps.length < 2) {
    warn.textContent = t("warnMin");
    warn.style.display = "block";
    return;
  }
  const ng = parseInt(document.getElementById("groupCount").value) || 2;
  const gs = parseInt(document.getElementById("groupSize").value) || 4;
  if (ng > ps.length) {
    warn.textContent = L.warnGroups(ng, ps.length);
    warn.style.display = "block";
    return;
  }

  const sorted = [...ps].sort((a, b) => b.rating - a.rating);
  const n = sorted.length;
  const asgn = Array.from({ length: ng }, () => []);
  const chunks = [];
  for (let i = 0; i < n; i += ng) chunks.push(sorted.slice(i, i + ng));
  chunks.forEach((chunk, ci) => {
    const sh = [...chunk].sort(() => Math.random() - 0.5);
    const order = Array.from({ length: ng }, (_, i) => i);
    if (ci % 2 === 1) order.reverse();
    sh.forEach((p, i) => {
      if (i < ng) asgn[order[i]].push(p);
    });
  });
  const overflow = [];
  asgn.forEach((g) => {
    while (g.length > gs) overflow.push(g.pop());
  });
  overflow.sort(() => Math.random() - 0.5);
  overflow.forEach((p) => {
    asgn.reduce((a, b) => (a.length <= b.length ? a : b)).push(p);
  });
  renderGroups(asgn);
}

function tierLabel(rank, total) {
  const r = rank / total;
  const L = T[lang];
  if (r < 0.25) return ["t1", L.tierTop];
  if (r < 0.5) return ["t2", L.tierMid1];
  if (r < 0.75) return ["t3", L.tierMid2];
  return ["t4", L.tierNew];
}

function renderGroups(groups) {
  const grid = document.getElementById("groups-grid");
  grid.innerHTML = "";
  const all = groups.flat().sort((a, b) => b.rating - a.rating);
  groups.forEach((members, i) => {
    const card = document.createElement("div");
    card.className = "group-card";
    const avg = members.length
      ? members.reduce((s, m) => s + m.rating, 0) / members.length
      : 0;
    const html = [...members]
      .sort((a, b) => b.rating - a.rating)
      .map((m) => {
        const rank = all.findIndex(
          (p) => p.name === m.name && p.rating === m.rating,
        );
        const [cls, lbl] = tierLabel(rank, all.length);
        return `<div class="m-item">
        <span class="m-name">${m.name}</span>
        <span style="display:flex;align-items:center;gap:4px">
          <span class="badge ${cls}">${lbl}</span>
          <span class="m-rating">${m.rating}</span>
        </span>
      </div>`;
      })
      .join("");
    card.innerHTML = `
      <div class="group-title">${t("groupLabel")} ${i + 1} <span style="color:#333;font-weight:400">(${members.length})</span></div>
      ${html}
      <div class="g-avg">${t("avgLabel")} ${avg.toFixed(1)}</div>
    `;
    grid.appendChild(card);
  });
  document.getElementById("output").style.display = "block";
}

/*[
  ["Форманюк Андрій", 125],
  ["Бадира Олександр", 0],
  ["Корпусов Андрій", 93.75],
  ["Томчук Олег", 0],
  ["Сапронов Петро", 43.75],
  ["Любих Сергій", 43.75],
  ["Матвійчук Олександр", 62.5],
  ["Головень Юрій", 0],
].forEach(([n, r]) => addRow(n, r));
*/

let rows = [],
  counter = 0,
  lang = "ua",
  generationVariant = 0,
  lastGenerationKey = "";

function ukParticipantCount(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return `${count} учасник`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `${count} учасники`;
  }
  return `${count} учасників`;
}

const T = {
  ua: {
    skipLink: "Перейти до основного вмісту",
    languageSelect: "Вибір мови",
    languageUa: "Обрати українську мову",
    languageEn: "Обрати англійську мову",
    heroTitle: "Рандомайзер",
    heroSub: "Жеребкування груп",
    tabsLabel: "Спосіб введення учасників",
    tabManual: "Вручну",
    tabImport: "Імпорт з таблиці",
    panelPlayers: "Учасники",
    panelImport: "Вставте дані з Google Таблиць",
    importColumnsLegend: "Налаштування колонок імпорту",
    colName: "Колонка імені",
    colRating: "Колонка рейтингу",
    pasteLabel: "Дані учасників для імпорту",
    pastePlaceholder: "Виділіть комірки → Ctrl+C → Ctrl+V сюди",
    btnAdd: "Додати учасника",
    btnClear: "Очистити список",
    btnImport: "Імпортувати",
    btnClearPaste: "Очистити",
    distributionLegend: "Налаштування розподілу",
    labelGroups: "Кількість груп",
    labelSize: "Учасників у групі",
    distributionTitle: "Розподіл на групи",
    btnGenerate: "Генерувати групи",
    resultTitle: "Результат",
    btnRepeat: "Повторити",
    namePh: "Ім'я",
    ratingPh: "#",
    participantName: (index) => `Ім’я учасника ${index}`,
    participantRating: (index) => `Рейтинг учасника ${index}`,
    removeParticipant: (name, index) =>
      name
        ? `Видалити учасника ${name}`
        : `Видалити учасника ${index}`,
    participantCount: (count) => ukParticipantCount(count),
    groupLabel: "Група",
    avgLabel: "Ø",
    averageRating: "Середній рейтинг",
    ratingLabel: "Рейтинг",
    ratingCategory: "Рейтингова категорія",
    tierTop: "топ",
    tierMid1: "сер+",
    tierMid2: "сер-",
    tierNew: "нов",
    tierTopFull: "найвища",
    tierMid1Full: "вище середньої",
    tierMid2Full: "нижче середньої",
    tierNewFull: "початкова",
    feedImported: "Імпортовано",
    feedSkipped: "пропущено",
    feedNoData: "Немає даних.",
    feedFail: "Не вдалось розпізнати учасників.",
    listCleared: "Список учасників очищено.",
    pasteCleared: "Поле імпорту очищено.",
    participantRemoved: (name, index) =>
      name ? `Учасника ${name} видалено.` : `Учасника ${index} видалено.`,
    resultsReady: (count) =>
      `Результати готові. Створено ${count} ${
        count === 1 ? "групу" : count >= 2 && count <= 4 ? "групи" : "груп"
      }.`,
    warnMin: "Додайте хоча б 2 учасників.",
    warnGroups: (ng, n) => `Груп (${ng}) більше ніж учасників (${n}).`,
    infoExact: (n, ng, gs) => `✓ ${n} учасників → рівно ${ng} груп по ${gs}.`,
    infoOver: (ng, gs, cap, n) =>
      `⚠ Місць (${ng}×${gs}=${cap}) менше ніж учасників (${n}) — надлишок розподілиться рівномірно.`,
    infoUnder: (n, ng, gs) =>
      `ℹ ${n} учасників → ${ng} груп, деякі матимуть менше ${gs} ос.`,
  },
  en: {
    skipLink: "Skip to main content",
    languageSelect: "Language selection",
    languageUa: "Select Ukrainian",
    languageEn: "Select English",
    heroTitle: "Randomizer",
    heroSub: "Group draw",
    tabsLabel: "Participant entry method",
    tabManual: "Manual",
    tabImport: "Import from sheet",
    panelPlayers: "Players",
    panelImport: "Paste data from Google Sheets",
    importColumnsLegend: "Import column settings",
    colName: "Name column",
    colRating: "Rating column",
    pasteLabel: "Participant data to import",
    pastePlaceholder: "Select cells → Ctrl+C → Ctrl+V here",
    btnAdd: "Add participant",
    btnClear: "Clear list",
    btnImport: "Import",
    btnClearPaste: "Clear",
    distributionLegend: "Distribution settings",
    labelGroups: "Number of groups",
    labelSize: "Players per group",
    distributionTitle: "Group distribution",
    btnGenerate: "Generate groups",
    resultTitle: "Result",
    btnRepeat: "Regenerate",
    namePh: "Name",
    ratingPh: "#",
    participantName: (index) => `Participant ${index} name`,
    participantRating: (index) => `Participant ${index} rating`,
    removeParticipant: (name, index) =>
      name ? `Remove participant ${name}` : `Remove participant ${index}`,
    participantCount: (count) =>
      `${count} ${count === 1 ? "participant" : "participants"}`,
    groupLabel: "Group",
    avgLabel: "Avg",
    averageRating: "Average rating",
    ratingLabel: "Rating",
    ratingCategory: "Rating category",
    tierTop: "top",
    tierMid1: "mid+",
    tierMid2: "mid-",
    tierNew: "new",
    tierTopFull: "top",
    tierMid1Full: "above average",
    tierMid2Full: "below average",
    tierNewFull: "beginner",
    feedImported: "Imported",
    feedSkipped: "skipped",
    feedNoData: "No data to import.",
    feedFail: "Could not parse any players.",
    listCleared: "Participant list cleared.",
    pasteCleared: "Import field cleared.",
    participantRemoved: (name, index) =>
      name
        ? `Participant ${name} removed.`
        : `Participant ${index} removed.`,
    resultsReady: (count) =>
      `Results are ready. Created ${count} ${
        count === 1 ? "group" : "groups"
      }.`,
    warnMin: "Add at least 2 players.",
    warnGroups: (ng, n) => `Groups (${ng}) exceed players (${n}).`,
    infoExact: (n, ng, gs) => `✓ ${n} players → exactly ${ng} groups of ${gs}.`,
    infoOver: (ng, gs, cap, n) =>
      `⚠ Slots (${ng}×${gs}=${cap}) less than players (${n}) — overflow distributed evenly.`,
    infoUnder: (n, ng, gs) =>
      `ℹ ${n} players → ${ng} groups, some will have fewer than ${gs}.`,
  },
};

function t(key, ...args) {
  const value = T[lang][key];
  if (typeof value === "function") return value(...args);
  return value || key;
}

function setLang(l) {
  if (!T[l]) return;
  lang = l;
  document.documentElement.lang = l === "ua" ? "uk" : "en";
  ["ua", "en"].forEach((language) => {
    const button = document.getElementById(`btn-${language}`);
    const selected = language === l;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  document.getElementById("hero-title").textContent = t("heroTitle");
  document.getElementById("hero-sub").textContent = t("heroSub");
  document.querySelectorAll("[data-t]").forEach((el) => {
    el.textContent = t(el.dataset.t);
  });
  document.querySelectorAll("[data-t-ph]").forEach((el) => {
    el.placeholder = t(el.dataset.tPh || el.dataset["t-ph"]);
  });
  document.querySelectorAll("[data-t-aria-label]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.tAriaLabel));
  });
  updateParticipantAccessibility();
  updatePreview();
  const grid = document.getElementById("groups-grid");
  if (grid.children.length) {
    generate({
      reroll: false,
      focusResults: false,
      announceResult: false,
      focusError: false,
    });
  }
}

function activateTab(tab, { focus = true } = {}) {
  if (!tab) return;
  document.querySelectorAll('[role="tab"]').forEach((candidate) => {
    const selected = candidate === tab;
    candidate.classList.toggle("active", selected);
    candidate.setAttribute("aria-selected", String(selected));
    candidate.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(candidate.getAttribute("aria-controls"));
    if (panel) {
      panel.classList.toggle("active", selected);
      panel.hidden = !selected;
    }
  });
  if (focus) tab.focus();
}

function switchTab(name, el, options) {
  activateTab(el || document.getElementById(`tab-btn-${name}`), options);
}

function handleTabKeydown(event) {
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const index = tabs.indexOf(event.currentTarget);
  let targetIndex = index;
  if (event.key === "ArrowRight") targetIndex = (index + 1) % tabs.length;
  else if (event.key === "ArrowLeft") {
    targetIndex = (index - 1 + tabs.length) % tabs.length;
  } else if (event.key === "Home") targetIndex = 0;
  else if (event.key === "End") targetIndex = tabs.length - 1;
  else if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    activateTab(event.currentTarget);
    return;
  } else {
    return;
  }
  event.preventDefault();
  activateTab(tabs[targetIndex]);
}

function clearList() {
  document.getElementById("plist").replaceChildren();
  rows = [];
  counter = 0;
  updatePreview();
  announce(t("listCleared"));
}

function updatePreview() {
  const ps = getPs();
  const n = ps.length;
  const ng = parseInt(document.getElementById("groupCount").value) || 2;
  const gs = parseInt(document.getElementById("groupSize").value) || 4;
  const cap = ng * gs;
  const info = document.getElementById("info-msg");
  const visiblePlayerCount = document.getElementById("player-count-visible");
  const accessiblePlayerCount = document.getElementById("player-count-text");
  if (visiblePlayerCount) visiblePlayerCount.textContent = n;
  if (accessiblePlayerCount) {
    accessiblePlayerCount.textContent = t("participantCount", n);
  }
  if (!n) {
    info.textContent = "";
    info.hidden = true;
    return;
  }
  info.hidden = false;
  const L = T[lang];
  if (cap < n) {
    info.textContent = L.infoOver(ng, gs, cap, n);
    info.style.color = "#e5a040";
  } else if (cap > n) {
    info.textContent = L.infoUnder(n, ng, gs);
    info.style.color = "#888";
  } else {
    info.textContent = L.infoExact(n, ng, gs);
    info.style.color = "#50c878";
  }
}

function addRow(name = "", rating = "") {
  counter++;
  const id = counter;
  rows.push(id);
  const row = document.createElement("li");
  row.className = "p-row";
  row.id = `row-${id}`;

  const nameLabel = document.createElement("label");
  nameLabel.className = "visually-hidden";
  nameLabel.htmlFor = `name-${id}`;
  nameLabel.id = `name-label-${id}`;
  const nameInput = document.createElement("input");
  nameInput.className = "di player-name";
  nameInput.type = "text";
  nameInput.id = `name-${id}`;
  nameInput.placeholder = t("namePh");
  nameInput.value = name;
  nameInput.addEventListener("input", () => {
    updatePreview();
    updateParticipantAccessibility();
  });

  const ratingLabel = document.createElement("label");
  ratingLabel.className = "visually-hidden";
  ratingLabel.htmlFor = `rating-${id}`;
  ratingLabel.id = `rating-label-${id}`;
  const ratingInput = document.createElement("input");
  ratingInput.className = "di player-rating";
  ratingInput.type = "number";
  ratingInput.id = `rating-${id}`;
  ratingInput.placeholder = t("ratingPh");
  ratingInput.step = "any";
  ratingInput.inputMode = "decimal";
  ratingInput.value = rating;

  const removeButton = document.createElement("button");
  removeButton.className = "btn-x";
  removeButton.id = `remove-${id}`;
  removeButton.type = "button";
  removeButton.addEventListener("click", () => removeRow(id));
  const removeIcon = document.createElement("span");
  removeIcon.setAttribute("aria-hidden", "true");
  removeIcon.textContent = "×";
  const removeText = document.createElement("span");
  removeText.className = "visually-hidden remove-label";
  removeButton.append(removeIcon, removeText);

  row.append(
    nameLabel,
    nameInput,
    ratingLabel,
    ratingInput,
    removeButton,
  );
  document.getElementById("plist").appendChild(row);
  updateParticipantAccessibility();
  updatePreview();
}

function updateParticipantAccessibility() {
  rows.forEach((id, index) => {
    const position = index + 1;
    const nameInput = document.getElementById(`name-${id}`);
    const ratingInput = document.getElementById(`rating-${id}`);
    const nameLabel = document.getElementById(`name-label-${id}`);
    const ratingLabel = document.getElementById(`rating-label-${id}`);
    const removeLabel = document.querySelector(`#remove-${id} .remove-label`);
    if (nameInput) nameInput.placeholder = t("namePh");
    if (ratingInput) ratingInput.placeholder = t("ratingPh");
    if (nameLabel) nameLabel.textContent = t("participantName", position);
    if (ratingLabel) ratingLabel.textContent = t("participantRating", position);
    if (removeLabel) {
      removeLabel.textContent = t(
        "removeParticipant",
        nameInput?.value.trim() || "",
        position,
      );
    }
  });
}

function removeRow(id) {
  const index = rows.indexOf(id);
  const removedName = document.getElementById(`name-${id}`)?.value.trim() || "";
  document.getElementById(`row-${id}`)?.remove();
  rows = rows.filter((r) => r !== id);
  updateParticipantAccessibility();
  updatePreview();
  const neighborId = rows[index] ?? rows[index - 1];
  const focusTarget = neighborId
    ? document.getElementById(`remove-${neighborId}`)
    : document.getElementById("add-player-button");
  focusTarget?.focus();
  announce(t("participantRemoved", removedName, index + 1));
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
  document.getElementById("plist").replaceChildren();
  rows = [];
  counter = 0;
  parsed.forEach(([n, r]) => addRow(n, r));
  showFeed(
    `${t("feedImported")} ${parsed.length}` +
      (skipped.length ? `, ${t("feedSkipped")} ${skipped.length}` : ""),
    true,
  );
  activateTab(document.getElementById("tab-btn-manual"));
}

function showFeed(msg, ok) {
  const el = document.getElementById("import-feedback");
  const message = (ok ? "✓ " : "✕ ") + msg;
  el.className = ok ? "feed-ok" : "feed-err";
  if (ok) {
    el.removeAttribute("role");
    el.removeAttribute("aria-live");
    el.removeAttribute("aria-atomic");
  } else {
    el.setAttribute("role", "alert");
    el.setAttribute("aria-live", "assertive");
    el.setAttribute("aria-atomic", "true");
  }
  el.textContent = message;
  el.hidden = false;
  if (ok) {
    announce(message);
  } else {
    el.tabIndex = -1;
    el.focus();
  }
}

function hideFeed() {
  const el = document.getElementById("import-feedback");
  el.hidden = true;
  el.textContent = "";
}

function clearPasteArea() {
  document.getElementById("pasteArea").value = "";
  hideFeed();
  announce(t("pasteCleared"));
}

function announce(message) {
  const status = document.getElementById("app-status");
  status.textContent = "";
  window.requestAnimationFrame(() => {
    status.textContent = message;
  });
}

function seedPlayersSerpentine(players, groupCount, variant = 0) {
  if (!Number.isInteger(groupCount) || groupCount < 1) return [];

  const sorted = players
    .map((player, index) => ({ player, index }))
    .sort(
      (a, b) =>
        b.player.rating - a.player.rating || a.index - b.index,
    )
    .map(({ player }) => player);
  const groups = Array.from({ length: groupCount }, () => []);
  const baseSize = Math.floor(sorted.length / groupCount);
  let remainder = sorted.length % groupCount;
  const capacities = Array(groupCount).fill(baseSize);

  // Group 1 gets the first extra player. When possible, the remaining extras
  // go to groups 3, 4, ... so group 1 stays larger than group 2.
  if (remainder > 0) {
    capacities[0]++;
    remainder--;
  }
  for (let i = 2; remainder > 0 && i < groupCount; i++, remainder--) {
    capacities[i]++;
  }

  let groupIndex = 0;
  let direction = 1;
  const moveToNextGroup = () => {
    if (groupCount === 1) return;
    if (direction === 1 && groupIndex === groupCount - 1) {
      direction = -1;
    } else if (direction === -1 && groupIndex === 0) {
      direction = 1;
    } else {
      groupIndex += direction;
    }
  };

  const assigned = Array(groupCount).fill(0);
  const targets = sorted.map(() => {
    while (assigned[groupIndex] >= capacities[groupIndex]) {
      moveToNextGroup();
    }
    const target = groupIndex;
    assigned[target]++;
    moveToNextGroup();
    return target;
  });

  // Each variant swaps one adjacent rating pair that belongs to different
  // groups. Variant 0 keeps the reference serpentine seed. The top player at
  // index 0 is never moved, and adjacent swaps keep rating balance tight.
  const candidates = [];
  for (let i = 1; i < targets.length - 1; i++) {
    if (targets[i] !== targets[i + 1]) candidates.push(i);
  }
  const normalizedVariant =
    Number.isInteger(variant) && variant > 0 ? variant : 0;
  const phase = normalizedVariant % (candidates.length + 1);
  const seeded = [...sorted];
  if (phase > 0) {
    const index = candidates[phase - 1];
    [seeded[index], seeded[index + 1]] = [seeded[index + 1], seeded[index]];
  }

  seeded.forEach((player, index) => {
    groups[targets[index]].push(player);
  });

  return groups;
}

function showWarning(message, { focus = true } = {}) {
  const warn = document.getElementById("warning");
  warn.textContent = message;
  warn.hidden = false;
  if (focus) warn.focus();
}

function hideWarning() {
  const warn = document.getElementById("warning");
  warn.hidden = true;
  warn.textContent = "";
}

function generate({
  reroll = true,
  focusResults = true,
  announceResult = true,
  focusError = true,
} = {}) {
  hideWarning();
  const ps = getPs();
  const L = T[lang];
  if (ps.length < 2) {
    showWarning(t("warnMin"), { focus: focusError });
    return;
  }
  const ng = parseInt(document.getElementById("groupCount").value) || 2;
  if (ng > ps.length) {
    showWarning(L.warnGroups(ng, ps.length), { focus: focusError });
    return;
  }

  const generationKey = JSON.stringify([
    ng,
    ps.map(({ name, rating }) => [name, rating]),
  ]);
  if (generationKey !== lastGenerationKey) {
    lastGenerationKey = generationKey;
    generationVariant = 0;
  }
  const variant = reroll
    ? generationVariant++
    : Math.max(0, generationVariant - 1);

  renderGroups(seedPlayersSerpentine(ps, ng, variant), {
    focusResults,
    announceResult,
  });
}

function tierLabel(rank, total) {
  const r = rank / total;
  const L = T[lang];
  if (r < 0.25) return ["t1", L.tierTop, L.tierTopFull];
  if (r < 0.5) return ["t2", L.tierMid1, L.tierMid1Full];
  if (r < 0.75) return ["t3", L.tierMid2, L.tierMid2Full];
  return ["t4", L.tierNew, L.tierNewFull];
}

function createScreenReaderText(text) {
  const span = document.createElement("span");
  span.className = "visually-hidden";
  span.textContent = text;
  return span;
}

function renderGroups(
  groups,
  { focusResults = true, announceResult = true } = {},
) {
  const grid = document.getElementById("groups-grid");
  grid.replaceChildren();
  const all = groups.flat().sort((a, b) => b.rating - a.rating);
  groups.forEach((members, i) => {
    const card = document.createElement("article");
    card.className = "group-card";
    const headingId = `group-title-${i + 1}`;
    card.setAttribute("aria-labelledby", headingId);

    const avg = members.length
      ? members.reduce((s, m) => s + m.rating, 0) / members.length
      : 0;

    const heading = document.createElement("h3");
    heading.className = "group-title";
    heading.id = headingId;
    const headingText = document.createElement("span");
    headingText.textContent = `${t("groupLabel")} ${i + 1}`;
    const memberCount = document.createElement("span");
    memberCount.className = "member-count";
    const visibleCount = document.createElement("span");
    visibleCount.setAttribute("aria-hidden", "true");
    visibleCount.textContent = members.length;
    memberCount.append(
      visibleCount,
      createScreenReaderText(t("participantCount", members.length)),
    );
    heading.append(headingText, memberCount);

    const memberList = document.createElement("ul");
    memberList.className = "member-list";
    [...members]
      .sort((a, b) => b.rating - a.rating)
      .forEach((member) => {
        const rank = all.findIndex(
          (player) =>
            player.name === member.name && player.rating === member.rating,
        );
        const [tierClass, tierShort, tierFull] = tierLabel(rank, all.length);

        const item = document.createElement("li");
        item.className = "m-item";
        const name = document.createElement("span");
        name.className = "m-name";
        name.textContent = member.name;

        const meta = document.createElement("span");
        meta.className = "m-meta";
        const badge = document.createElement("span");
        badge.className = `badge ${tierClass}`;
        const visibleTier = document.createElement("span");
        visibleTier.setAttribute("aria-hidden", "true");
        visibleTier.textContent = tierShort;
        badge.append(
          visibleTier,
          createScreenReaderText(`${t("ratingCategory")}: ${tierFull}`),
        );

        const rating = document.createElement("span");
        rating.className = "m-rating";
        const visibleRating = document.createElement("span");
        visibleRating.setAttribute("aria-hidden", "true");
        visibleRating.textContent = member.rating;
        rating.append(
          visibleRating,
          createScreenReaderText(`${t("ratingLabel")}: ${member.rating}`),
        );

        meta.append(badge, rating);
        item.append(name, meta);
        memberList.appendChild(item);
      });

    const average = document.createElement("p");
    average.className = "g-avg";
    const visibleAverageLabel = document.createElement("span");
    visibleAverageLabel.className = "g-avg-label";
    visibleAverageLabel.setAttribute("aria-hidden", "true");
    visibleAverageLabel.textContent = t("avgLabel");
    const averageValue = document.createElement("strong");
    averageValue.textContent = avg.toFixed(1);
    average.append(
      visibleAverageLabel,
      createScreenReaderText(`${t("averageRating")}:`),
      averageValue,
    );

    card.append(heading, memberList, average);
    grid.appendChild(card);
  });

  document.getElementById("output").hidden = false;
  if (announceResult) announce(t("resultsReady", groups.length));
  if (focusResults) document.getElementById("results-heading").focus();
}

function bindApp() {
  document
    .getElementById("group-generator-form")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      generate();
    });
  document
    .getElementById("btn-ua")
    ?.addEventListener("click", () => setLang("ua"));
  document
    .getElementById("btn-en")
    ?.addEventListener("click", () => setLang("en"));
  document.querySelectorAll('[role="tab"]').forEach((tab) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", handleTabKeydown);
  });
  document
    .getElementById("clear-list-button")
    ?.addEventListener("click", clearList);
  document
    .getElementById("add-player-button")
    ?.addEventListener("click", () => addRow());
  document
    .getElementById("import-button")
    ?.addEventListener("click", importData);
  document
    .getElementById("clear-paste-button")
    ?.addEventListener("click", clearPasteArea);
  document
    .getElementById("groupCount")
    ?.addEventListener("input", updatePreview);
  document
    .getElementById("groupSize")
    ?.addEventListener("input", updatePreview);
  document
    .getElementById("repeat-groups-button")
    ?.addEventListener("click", () => generate());
  setLang(lang);
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindApp, {
      once: true,
    });
  } else {
    bindApp();
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { seedPlayersSerpentine };
}

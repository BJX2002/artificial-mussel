(function () {
  "use strict";

  const { strings, locations, events } = window.GAME_DATA;
  const STORAGE_KEY = "blue-bay-monitoring-v1";
  const SCREENS = Array.from({ length: 16 }, (_, i) => `S${String(i).padStart(2, "0")}`);
  const ASSIST_SCREENS = new Set(["S06", "S10", "S12"]);
  const BACK_MAP = { S01: "S00", S02: "S01", S03: "S02", S04: "S03", S05: "S04", S06: "S05", S08: "S07", S10: "S09", S12: "S11", S14: "S13" };
  const app = document.getElementById("app");
  const dialog = document.getElementById("evidence-dialog");
  const placementDialog = document.getElementById("placement-dialog");
  const toast = document.getElementById("toast");
  let monitorTimer = null;
  let toastTimer = null;

  function freshState(settings = {}) {
    return {
      version: 1,
      screen: "S00",
      uiLocale: settings.uiLocale || "zh-Hant",
      voiceLocale: settings.voiceLocale || "zh-HK",
      voiceMuted: settings.voiceMuted || false,
      seed: Number(new URLSearchParams(location.search).get("seed")) || Date.now() % 2147483647,
      methods: [],
      parts: [],
      conceptChoice: "",
      conceptCorrect: false,
      round1: {},
      round2: {},
      r1Revealed: [],
      r2Revealed: [],
      monitoringDone: false,
      eventIds: [],
      eventAnswers: {},
      report: { known: "", unknown: "", next: "" },
      assessment: null,
      hintTier: 0,
      hintByScreen: {},
      assistantMessage: "",
      transferChoice: "",
      transferCorrect: false
    };
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved || saved.version !== 1 || !SCREENS.includes(saved.screen)) return freshState();
      return { ...freshState(saved), ...saved, report: { ...freshState().report, ...(saved.report || {}) } };
    } catch (_) {
      return freshState();
    }
  }

  let state = loadState();

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function t(key, vars = {}) {
    const table = strings[state.uiLocale] || strings.en;
    let value = table[key] ?? strings.en[key] ?? key;
    for (const [name, replacement] of Object.entries(vars)) value = value.replaceAll(`{${name}}`, String(replacement));
    return value;
  }

  function loc(id) { return locations.find(item => item.id === id); }
  function locName(id) { return loc(id)?.names[state.uiLocale] || id; }
  function locClue(id) { return loc(id)?.clues[state.uiLocale] || ""; }
  function eventData(id) { return events.find(item => item.id === id); }
  function eventCopy(id) { return eventData(id)?.copy[state.uiLocale] || eventData(id)?.copy.en; }
  function checked(value, target) { return value === target ? "checked" : ""; }
  function disabled(value) { return value ? "disabled" : ""; }
  function screenNumber() { return Math.max(0, SCREENS.indexOf(state.screen)); }
  function labelForLevel(level) { return level === 3 ? t("higher") : level === 2 ? t("medium") : t("lower"); }
  function selectedIds(round) { return Object.keys(round === 1 ? state.round1 : state.round2); }
  function revealedIds(round) { return round === 1 ? state.r1Revealed : state.r2Revealed; }
  function allMonitored() { return [...new Set([...selectedIds(1), ...selectedIds(2)])]; }
  function isChinese() { return state.uiLocale !== "en"; }

  function stageTitle() {
    const key = {
      S00: "s00Title", S01: "s01Title", S02: "s02Title", S03: "s03Title", S04: "s04Title", S05: "s05Title",
      S06: "s06Title", S07: "s07Title", S08: "s08Title", S09: "s09Title", S10: "s10Title", S11: "s11Title",
      S12: "s12Title", S13: state.assessment?.complete ? "s13Complete" : "s13Gap", S14: "s14Title", S15: "s15Title"
    }[state.screen];
    return t(key || "appTitle");
  }

  function render() {
    if (monitorTimer) clearTimeout(monitorTimer);
    document.documentElement.lang = state.uiLocale === "en" ? "en" : state.uiLocale;
    document.title = `${t("appTitle")} · ${stageTitle()}`;
    const progress = Math.round((screenNumber() / 15) * 100);
    const canBack = Boolean(BACK_MAP[state.screen]);
    const canEvidence = screenNumber() >= 8 && screenNumber() <= 14;
    app.innerHTML = `
      <div class="app-shell">
        <header class="topbar">
          <div class="brand">
            <div class="brand-mark" aria-hidden="true">◉</div>
            <div class="brand-copy">
              <h1 class="brand-title">${t("appTitle")}</h1>
              <div class="brand-stage">${state.screen} · ${stageTitle()}</div>
            </div>
          </div>
          <nav class="top-actions" aria-label="${t("stageLabel")}">
            ${canBack ? `<button class="icon-button" data-action="back" aria-label="${t("back")}">← <span class="button-label">${t("back")}</span></button>` : ""}
            ${canEvidence ? `<button class="icon-button" data-action="open-evidence" aria-label="${t("evidence")}">▤ <span class="button-label">${t("evidence")}</span></button>` : ""}
            <button class="icon-button" data-action="voice-toggle" aria-label="${state.voiceMuted ? t("soundOff") : t("soundOn")}">${state.voiceMuted ? "🔇" : "🔊"}</button>
            <button class="icon-button" data-action="voice-replay" aria-label="${t("replay")}">↻</button>
          </nav>
          <div class="progress-track" aria-label="${t("stageLabel")}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}" role="progressbar"><div class="progress-fill" style="width:${progress}%"></div></div>
        </header>
        <div class="game-wrap">
          <section id="game-screen" class="screen ${state.screen === "S00" ? "compact" : ""}" tabindex="-1">
            ${renderScreen()}
          </section>
          ${ASSIST_SCREENS.has(state.screen) ? renderAssistant() : ""}
        </div>
      </div>`;
    bindPostRender();
  }

  function renderScreen() {
    switch (state.screen) {
      case "S00": return renderS00();
      case "S01": return renderS01();
      case "S02": return renderS02();
      case "S03": return renderS03();
      case "S04": return renderS04();
      case "S05": return renderS05();
      case "S06": return renderMapRound(1);
      case "S07": return renderS07();
      case "S08": return renderResults(1);
      case "S09": return renderS09();
      case "S10": return renderMapRound(2);
      case "S11": return renderResults(2);
      case "S12": return renderS12();
      case "S13": return renderS13();
      case "S14": return renderS14();
      case "S15": return renderS15();
      default: return renderS00();
    }
  }

  function renderS00() {
    return `<div class="hero-screen">
      <div class="hero-visual">
        <img src="assets/blue-bay-mission.png" alt="${isChinese() ? "藍灣研究站與人工青口監測任務概念圖" : "Concept art of Blue Bay Research Station and the Artificial Mussel monitoring mission"}">
        <div class="hero-badge">${t("demoNote")}</div>
      </div>
      <div class="setup-panel">
        <p class="eyebrow">${t("missionLabel")}</p>
        <h1>${t("s00Title")}</h1>
        <p class="lead">${t("s00Lead")}</p>
        <fieldset class="choice-group"><legend>${t("uiLanguage")}</legend><div class="segmented">
          ${localeRadio("ui-locale", "zh-Hant", t("zhHant"), state.uiLocale)}
          ${localeRadio("ui-locale", "zh-Hans", t("zhHans"), state.uiLocale)}
          ${localeRadio("ui-locale", "en", t("english"), state.uiLocale)}
        </div></fieldset>
        <fieldset class="choice-group"><legend>${t("voiceLanguage")}</legend><div class="segmented">
          ${localeRadio("voice-locale", "zh-CN", t("mandarin"), state.voiceLocale)}
          ${localeRadio("voice-locale", "zh-HK", t("cantonese"), state.voiceLocale)}
          ${localeRadio("voice-locale", "en-US", t("englishVoice"), state.voiceLocale)}
        </div></fieldset>
        <p class="small">✓ ${t("captions")}</p>
        <div class="actions"><button class="button primary" data-action="start">${t("start")} →</button></div>
      </div>
    </div>`;
  }

  function localeRadio(name, value, label, selected) {
    return `<label><input type="radio" name="${name}" value="${value}" ${checked(value, selected)}><span>${label}</span></label>`;
  }

  function renderS01() {
    return `<div class="screen-grid">
      <div class="mission-card emphasis">
        <p class="eyebrow" style="color:#9ce8df">${t("missionLabel")}</p>
        <h2>${t("s01Title")}</h2><p class="lead" style="color:#e3f7f7">${t("s01Body")}</p>
        <blockquote style="margin:2rem 0 0;padding:1rem 1.2rem;border-left:5px solid var(--gold);background:rgba(255,255,255,.08);border-radius:0 14px 14px 0">${t("s01Quote")}</blockquote>
      </div>
      <div class="mission-card"><h3>${t("s01Goal")}</h3><ul><li>${t("s01B1")}</li><li>${t("s01B2")}</li><li>${t("s01B3")}</li></ul>
        <div class="actions end"><button class="button primary" data-action="goto" data-screen="S02">${t("next")} →</button></div>
      </div>
    </div>`;
  }

  function renderS02() {
    const ready = state.methods.length === 2;
    return `<p class="eyebrow">${t("missionLabel")} · 02</p><h2>${t("s02Title")}</h2><p class="lead">${t("s02Lead")}</p>
      <div class="card-grid">
        ${methodCard("sample", "💧", t("sampleTitle"), t("sampleBody"), t("sampleTag"))}
        ${methodCard("am", "◉", t("amTitle"), t("amBody"), t("amTag"))}
      </div>
      <div class="feedback ${ready ? "good" : ""}">${ready ? t("methodReady") : t("selectBoth")}</div>
      <div class="actions end"><button class="button primary" data-action="goto" data-screen="S03" ${disabled(!ready)}>${t("next")} →</button></div>`;
  }

  function methodCard(id, icon, title, body, tag) {
    const on = state.methods.includes(id);
    return `<button class="method-card" data-action="toggle-method" data-id="${id}" aria-pressed="${on}"><div class="card-icon">${icon}</div><span class="tag">${tag}</span><h3>${title}</h3><p>${body}</p></button>`;
  }

  function renderS03() {
    const parts = [
      ["collect", "◌", t("collectPart"), t("collectDesc")],
      ["protect", "⬡", t("protectPart"), t("protectDesc")],
      ["anchor", "⌁", t("anchorPart"), t("anchorDesc")]
    ];
    const ready = state.parts.length === 3;
    return `<p class="eyebrow">${t("missionLabel")} · 03</p><h2>${t("s03Title")}</h2><p class="lead">${t("s03Lead")}</p>
      <div class="assembly-stage">
        <div class="device-visual" aria-label="${t("amTitle")}">${parts.map(([id, icon, title]) => `<div class="device-part ${state.parts.includes(id) ? "installed" : ""}"><span>${icon}</span><span>${state.parts.includes(id) ? title : "—"}</span></div>`).join("")}</div>
        <div class="part-list">${parts.map(([id, icon, title, desc]) => `<button class="button secondary part-button ${state.parts.includes(id) ? "done" : ""}" data-action="install-part" data-id="${id}" ${disabled(state.parts.includes(id))}><span class="card-icon" style="margin:0">${icon}</span><span><strong>${title}</strong><br><span class="small">${state.parts.includes(id) ? t("installed") : desc}</span></span></button>`).join("")}
          ${ready ? `<div class="feedback good">${t("assemblyReady")}</div>` : ""}
          <div class="actions end"><button class="button primary" data-action="goto" data-screen="S04" ${disabled(!ready)}>${t("next")} →</button></div>
        </div>
      </div>`;
  }

  function renderS04() {
    return `<div class="screen-grid reverse"><div class="mission-card">
      <p class="eyebrow">${t("missionLabel")} · 04</p><h2>${t("s04Title")}</h2><h3>${t("s04Question")}</h3>
      <div class="quiz-options">${["A","B","C"].map(letter => `<label class="option-row"><input type="radio" name="concept" value="${letter}" ${checked(letter, state.conceptChoice)}><span>${t(`s04${letter}`)}</span></label>`).join("")}</div>
      <div class="actions"><button class="button primary" data-action="check-concept" ${disabled(!state.conceptChoice)}>${t("submitAnswer")}</button>${state.conceptCorrect ? `<button class="button secondary" data-action="goto" data-screen="S05">${t("next")} →</button>` : ""}</div>
      ${state.conceptChoice && !state.conceptCorrect ? `<div class="feedback revise">${t("tryAgain")}</div>` : ""}${state.conceptCorrect ? `<div class="feedback good">${t("correct")}</div>` : ""}
      </div><div class="image-panel"><img src="assets/blue-bay-mission.png" alt="${t("amTitle")}"><div class="image-caption">${t("sampleTag")} + ${t("amTag")}</div></div></div>`;
  }

  function renderS05() {
    return `<p class="eyebrow">${t("missionLabel")} · 05</p><h2>${t("s05Title")}</h2><p class="lead">${t("s05Lead")}</p>
      <div class="card-grid">${locations.map(item => `<article class="location-card"><span class="tag ${item.role === "clue" ? "gold" : "green"}">${t(item.role === "clue" ? "clueSite" : "compareSite")}</span><h3>${locName(item.id)} <span class="small">${item.id}</span></h3><p>${locClue(item.id)}</p></article>`).join("")}</div>
      <div class="mission-card" style="background:var(--sky)"><p>① ${t("mapRule1")}</p><p>② ${t("mapRule2")}</p></div>
      <div class="actions end"><button class="button primary" data-action="goto" data-screen="S06">${t("beginRound1")} →</button></div>`;
  }

  function renderMapRound(round) {
    const selection = round === 1 ? state.round1 : state.round2;
    const ids = Object.keys(selection);
    const reasonsReady = ids.length === 2;
    return `<p class="eyebrow">${t("missionLabel")} · ${round === 1 ? "06" : "10"}</p><h2>${t(round === 1 ? "s06Title" : "s10Title")}</h2><p class="lead">${t(round === 1 ? "s06Lead" : "s10Lead")}</p>
      ${round === 2 ? renderEvidenceStrip() : ""}
      <div class="bay-layout">
        ${renderBayMap(round, ids)}
        <aside class="selection-panel"><div class="tag">${t("devicesLeft", { count: 2 - ids.length })}</div>
          ${ids.map(id => renderSelectionSlot(round, id, selection[id])).join("")}
          ${Array.from({ length: 2 - ids.length }, () => `<div class="empty-slot">${t("emptySlot")}</div>`).join("")}
          <div class="feedback ${reasonsReady ? "good" : ""}">${ids.length < 2 ? t("chooseTwo") : t("selected")}</div>
          <button class="button primary" data-action="confirm-round" data-round="${round}" ${disabled(!reasonsReady)}>${t(round === 1 ? "confirmRound1" : "confirmRound2")}</button>
        </aside>
      </div>`;
  }

  function renderBayMap(round, ids) {
    return `<div class="bay-map" role="group" aria-label="${t("s05Title")}"><div class="map-legend">${t("mapRule1")}</div><div class="map-current" aria-hidden="true"></div>
      ${locations.map(item => `<button class="map-pin ${item.css} ${ids.includes(item.id) ? "selected" : ""}" data-action="open-placement" data-round="${round}" data-id="${item.id}" aria-pressed="${ids.includes(item.id)}">${locName(item.id)}</button>`).join("")}
    </div>`;
  }

  function renderSelectionSlot(round, id, reason) {
    const detail = reasonDetails(round, id, reason);
    return `<div class="selection-slot"><div style="display:flex;justify-content:space-between;gap:.6rem"><strong>${locName(id)} <span class="small">${id}</span></strong><button class="button secondary" style="min-height:34px;padding:.35rem .55rem" data-action="remove-location" data-round="${round}" data-id="${id}" aria-label="${t("close")}">×</button></div><p class="small">${locClue(id)}</p>
      <div class="selection-purpose"><span aria-hidden="true">${detail.icon}</span><span><strong>${t("taskChosen")}：</strong>${detail.title}</span></div></div>`;
  }

  function reasonDetails(round, id, reason) {
    if (round === 1) return loc(id).role === "clue"
      ? { icon: "🔍", title: t("taskClueTitle"), body: t("taskClueBody") }
      : { icon: "↔", title: t("taskCompareTitle"), body: t("taskCompareBody") };
    const details = {
      fill: { icon: "?", title: t("taskFillTitle"), body: t("taskFillBody") },
      result: { icon: "📈", title: t("taskResultTitle"), body: t("taskResultBody") },
      compare: { icon: "↔", title: t("taskCompareTitle"), body: t("taskCompareBody") },
      event: { icon: "📌", title: t("taskEventTitle"), body: t("taskEventBody") },
      repeat: { icon: "↻", title: t("taskRepeatTitle"), body: t("taskRepeatBody") }
    };
    return details[reason] || details.fill;
  }

  function contextualReasons(id) {
    const r1Ids = selectedIds(1);
    const choices = [];
    const add = reason => { if (!choices.includes(reason)) choices.push(reason); };
    if (state.eventIds.some(eventId => eventData(eventId).recommendation.includes(id))) add("event");
    if (!r1Ids.includes(id) && ((id === "OFF" && r1Ids.some(rid => rid !== "OFF")) || (id !== "OFF" && r1Ids.includes("OFF")))) add("compare");
    if (!r1Ids.includes(id) && r1Ids.some(rid => loc(rid).signals.hm >= 2 || loc(rid).signals.rad >= 2)) add("result");
    if (!r1Ids.includes(id)) add("fill");
    if (r1Ids.includes(id)) add("repeat");
    return choices.slice(0, 2);
  }

  function openPlacement(round, id) {
    const selection = round === 1 ? state.round1 : state.round2;
    if (!Object.hasOwn(selection, id) && Object.keys(selection).length >= 2) { showToast(t("chooseTwo")); return; }
    const item = loc(id);
    const choices = round === 1 ? ["valid"] : contextualReasons(id);
    placementDialog.innerHTML = `<div class="placement-handle" aria-hidden="true"></div><div class="placement-head"><div><span class="tag ${item.role === "clue" ? "gold" : "green"}">${t(item.role === "clue" ? "clueSite" : "compareSite")}</span><h2>${locName(id)} <span class="small">${id}</span></h2></div><button class="dialog-close" style="color:var(--navy)" data-placement-close aria-label="${t("close")}">×</button></div><div class="placement-body"><p>${locClue(id)}</p><h3>${round === 1 ? t("placeHere") : t("placementQuestion")}</h3><div class="placement-options">${choices.map(reason => {
      const detail = reasonDetails(round, id, reason);
      return `<button class="task-card-button" data-action="confirm-placement" data-round="${round}" data-id="${id}" data-reason="${reason}"><span class="task-icon">${detail.icon}</span><span><strong>${detail.title}</strong><small>${detail.body}</small></span><span class="task-arrow">›</span></button>`;
    }).join("")}</div><button class="button secondary" style="width:100%" data-placement-close>${t("cancelPlacement")}</button></div>`;
    placementDialog.showModal();
  }

  function renderS07() {
    if (!state.monitoringDone) monitorTimer = setTimeout(() => { state.monitoringDone = true; persist(); render(); }, 3300);
    return `<p class="eyebrow">${t("round1")} · 07</p><h2>${t("s07Title")}</h2><p class="lead">${t("s07Lead")}</p>
      <div class="time-stage"><div class="time-content"><div class="time-number">${t("eightWeeks")}</div><h2 style="color:white">${t("weeks")}</h2><div class="time-progress"><div></div></div><p>${t("timeNote")}</p></div></div>
      <div class="actions end">${!state.monitoringDone ? `<button class="button secondary" data-action="skip-monitor">${t("skip")}</button>` : ""}<button class="button primary" data-action="goto" data-screen="S08" ${disabled(!state.monitoringDone)}>${t("retrieve")} →</button></div>`;
  }

  function renderResults(round) {
    const ids = selectedIds(round);
    const revealed = revealedIds(round);
    const all = ids.length === revealed.length;
    const screenCode = round === 1 ? "08" : "11";
    return `<p class="eyebrow">${t(round === 1 ? "round1" : "round2")} · ${screenCode}</p><h2>${t(round === 1 ? "s08Title" : "s11Title")}</h2><p class="lead">${t(round === 1 ? "s08Lead" : "s11Lead")}</p>
      ${round === 2 ? renderEvidenceStrip() : ""}
      <div class="result-grid">${ids.map(id => revealed.includes(id) ? renderResultCard(id) : `<article class="result-card" style="display:grid;place-items:center;min-height:220px"><div style="text-align:center"><div class="card-icon" style="margin:auto auto .8rem">?</div><strong>${locName(id)}</strong><p class="small">${t("result")}</p></div></article>`).join("")}</div>
      ${all ? `<div class="feedback good">${round === 1 ? t("allViewed") : t("resultGuard")}</div>` : ""}
      <div class="actions end">${!all ? `<button class="button gold" data-action="reveal-result" data-round="${round}">${t("revealNext")}</button>` : `<button class="button primary" data-action="goto" data-screen="${round === 1 ? "S09" : "S12"}">${t(round === 1 ? "viewEvents" : "openReport")} →</button>`}</div>`;
  }

  function renderResultCard(id) {
    const item = loc(id);
    return `<article class="result-card"><span class="tag">${t("retrieved")}</span><h3>${locName(id)} <span class="small">${id}</span></h3>${signalRow(t("signalHM"), item.signals.hm, false)}${signalRow(t("signalRAD"), item.signals.rad, true)}<p class="small">${t("resultGuard")}</p></article>`;
  }

  function signalRow(label, level, radioactive) {
    return `<div class="signal-row"><span>${label}<br><strong>${labelForLevel(level)}</strong></span><div class="signal-bars level-${level} ${radioactive ? "radioactive" : ""}" aria-label="${labelForLevel(level)}"><i></i><i></i><i></i></div></div>`;
  }

  function ensureEvents() {
    if (state.eventIds.length === 2) return;
    const order = seededShuffle(events.map(item => item.id), state.seed);
    state.eventIds = order.slice(0, 2);
    persist();
  }

  function seededShuffle(items, seed) {
    const result = [...items];
    let x = Math.abs(Number(seed)) || 1;
    function random() { x |= 0; x = x + 0x6D2B79F5 | 0; let q = Math.imul(x ^ x >>> 15, 1 | x); q = q + Math.imul(q ^ q >>> 7, 61 | q) ^ q; return ((q ^ q >>> 14) >>> 0) / 4294967296; }
    for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; }
    return result;
  }

  function renderS09() {
    ensureEvents();
    const ready = state.eventIds.every(id => state.eventAnswers[id]);
    return `<p class="eyebrow">${t("missionLabel")} · 09</p><h2>${t("s09Title")}</h2><p class="lead">${t("s09Lead")}</p><div class="event-list">
      ${state.eventIds.map((id, index) => renderEventCard(id, index)).join("")}</div>
      ${ready ? `<div class="feedback good">${t("eventsReady")}</div>` : ""}<div class="actions end"><button class="button primary" data-action="goto" data-screen="S10" ${disabled(!ready)}>${t("beginRound2")} →</button></div>`;
  }

  function renderEventCard(id, index) {
    const item = eventData(id); const copy = eventCopy(id); const answer = state.eventAnswers[id];
    return `<article class="event-card"><div class="event-number">${item.icon}<br><span class="small">${id}</span></div><div><span class="tag gold">${index + 1} / 2</span><h3>${copy.title}</h3><p>${copy.body}</p><strong>${t("eventChoose")}</strong><div class="event-choices">
      <button class="button secondary event-choice" data-action="answer-event" data-id="${id}" data-value="good" ${disabled(Boolean(answer))}>✓ ${copy.good}</button>
      <button class="button secondary event-choice" data-action="answer-event" data-id="${id}" data-value="bad" ${disabled(Boolean(answer))}>? ${copy.bad}</button></div>
      ${answer ? `<div class="feedback ${answer === "good" ? "good" : "revise"}">${t(answer === "good" ? "aligned" : "overclaim")}</div>` : ""}</div></article>`;
  }

  function renderEvidenceStrip() {
    const chips = [];
    state.r1Revealed.forEach(id => chips.push(`<span class="evidence-chip">${locName(id)} · ${labelForLevel(loc(id).signals.hm)} / ${labelForLevel(loc(id).signals.rad)}</span>`));
    state.eventIds.forEach(id => { if (state.eventAnswers[id]) chips.push(`<span class="evidence-chip">${eventData(id).icon} ${eventCopy(id).title}</span>`); });
    return `<div><strong>${t("previousEvidence")}</strong><div class="evidence-strip">${chips.join("")}</div></div>`;
  }

  function reportOptions() {
    const monitored = allMonitored();
    const known = [
      { id: "riv", label: t("reportKnownRiv") },
      { id: "off", label: t("reportKnownOff") },
      ...monitored.filter(id => loc(id).signals.hm === 1 && loc(id).signals.rad === 1).map(id => ({ id: `low-${id}`, label: t("reportKnownLow", { location: locName(id) }) })),
      { id: "safe", label: t("reportBadSafe") }, { id: "source", label: t("reportBadSource") }
    ];
    const unknown = [{ id: "source", label: t("reportUnknownSource") }, { id: "sites", label: t("reportUnknownSites") }, { id: "time", label: t("reportUnknownTime") }, { id: "safe", label: t("reportBadSafe") }];
    const next = [{ id: "fill", label: t("reportNextFill") }, { id: "repeat", label: t("reportNextRepeat") }, { id: "other", label: t("reportNextOther") }, { id: "none", label: t("reportNextNone") }];
    return { known, unknown, next };
  }

  function renderS12() {
    const options = reportOptions();
    const ready = state.report.known && state.report.unknown && state.report.next;
    return `<p class="eyebrow">${t("missionLabel")} · 12</p><h2>${t("s12Title")}</h2><p class="lead">${t("s12Lead")}</p>${renderEvidenceStrip()}
      <div class="report-grid">${reportColumn("known", t("known"), "✓", options.known)}${reportColumn("unknown", t("unknownCol"), "?", options.unknown)}${reportColumn("next", t("nextAction"), "→", options.next)}</div>
      ${!ready && Object.values(state.report).some(Boolean) ? `<div class="feedback revise">${t("reportIncomplete")}</div>` : ""}
      <div class="actions end"><button class="button primary" data-action="submit-report" ${disabled(!ready)}>${t("submitReport")}</button></div>`;
  }

  function reportColumn(field, title, icon, options) {
    return `<fieldset class="report-column"><legend><h3>${icon} ${title}</h3></legend><div class="report-options">${options.map(option => `<label class="option-row"><input type="radio" name="report-${field}" value="${option.id}" ${checked(option.id, state.report[field])}><span>${option.label}</span></label>`).join("")}</div></fieldset>`;
  }

  function evaluate() {
    const r1Ids = selectedIds(1); const r2Ids = selectedIds(2); const monitored = allMonitored();
    const r1Points = r1Ids.filter(id => state.round1[id] === "valid").length;
    const hasClue = monitored.some(id => loc(id).role === "clue");
    const hasCompare = monitored.some(id => loc(id).role === "compare");
    const coveragePoints = monitored.length >= 3 && hasClue && hasCompare ? 2 : monitored.length >= 2 ? 1 : 0;
    const r2ValidCount = r2Ids.filter(id => isRound2ReasonValid(id, state.round2[id], r1Ids, monitored)).length;
    const r2Points = r2ValidCount === 2 ? 3 : r2ValidCount === 1 ? 2 : 0;
    const knownValid = isKnownValid(state.report.known, monitored);
    const unknownValid = ["source", "time"].includes(state.report.unknown) || (state.report.unknown === "sites" && monitored.length < 4);
    const nextValid = ["repeat", "other"].includes(state.report.next) || (state.report.next === "fill" && monitored.length < 4);
    const reportPoints = [knownValid, unknownValid, nextValid].filter(Boolean).length;
    const gates = {
      coverage: monitored.length >= 3 && hasClue && hasCompare,
      r2: r2ValidCount >= 1,
      known: knownValid,
      unknown: unknownValid && state.report.unknown !== "safe",
      source: state.report.known !== "source",
      next: nextValid
    };
    const score = r1Points + coveragePoints + r2Points + reportPoints;
    let outcome = "COMPLETE_INDEPENDENT";
    if (!gates.coverage || !gates.r2) outcome = "EVIDENCE_GAP_ROUND2";
    else if (!gates.known || !gates.unknown || !gates.source || !gates.next) outcome = "EVIDENCE_GAP_REPORT";
    else if (score < 7) outcome = r2Points < 2 ? "EVIDENCE_GAP_ROUND2" : "EVIDENCE_GAP_REPORT";
    else if (state.hintTier >= 3) outcome = "COMPLETE_SUPPORTED";
    return { score, r1Points, coveragePoints, r2Points, reportPoints, gates, outcome, complete: outcome.startsWith("COMPLETE") };
  }

  function isRound2ReasonValid(id, reason, r1Ids, monitored) {
    if (reason === "fill") return !r1Ids.includes(id);
    if (reason === "result") return !r1Ids.includes(id) && r1Ids.some(rid => loc(rid).signals.hm >= 2 || loc(rid).signals.rad >= 2);
    if (reason === "compare") return (id === "OFF" && r1Ids.some(rid => rid !== "OFF")) || (id !== "OFF" && r1Ids.includes("OFF"));
    if (reason === "event") return state.eventIds.some(eventId => eventData(eventId).recommendation.includes(id));
    if (reason === "repeat") return r1Ids.includes(id) && monitored.length >= 3;
    return false;
  }

  function isKnownValid(choice, monitored) {
    if (choice === "riv") return monitored.includes("RIV") && monitored.some(id => ["RES", "OFF"].includes(id));
    if (choice === "off") return monitored.includes("OFF") && monitored.some(id => id !== "OFF");
    if (choice?.startsWith("low-")) { const id = choice.slice(4); return monitored.includes(id) && loc(id).signals.hm === 1 && loc(id).signals.rad === 1; }
    return false;
  }

  function renderS13() {
    const a = state.assessment || evaluate();
    const title = a.complete ? t(a.outcome === "COMPLETE_SUPPORTED" ? "s13Supported" : "s13Complete") : t("s13Gap");
    const angle = Math.round((a.score / 10) * 360);
    const gaps = [];
    if (!a.gates.unknown) gaps.push(t("gapUnknownSafe"));
    if (!a.gates.source) gaps.push(t("gapSource"));
    if (!a.gates.coverage) gaps.push(t("gapCoverage"));
    if (!a.gates.r2) gaps.push(t("gapR2"));
    if (!a.gates.next) gaps.push(t("gapNext"));
    if (!a.gates.known && gaps.length === 0) gaps.push(t("hintReportH1"));
    return `<p class="eyebrow">${t("missionLabel")} · 13</p><div class="screen-grid reverse"><div>
      <div class="score-ring" style="--score-angle:${angle}deg"><div class="score-value"><strong>${a.score}/10</strong><span class="small">${t("scoreLabel")}</span></div></div>
      <h2 style="margin-top:1.2rem">${title}</h2><p class="lead">${t(a.complete ? "s13LeadComplete" : "s13LeadGap")}</p>
      ${a.complete ? `<div class="actions"><button class="button primary" data-action="goto" data-screen="S14">${t("toRecap")} →</button></div>` : `<div class="actions"><button class="button primary" data-action="retry-gap">${a.outcome === "EVIDENCE_GAP_ROUND2" ? t("retryRound2") : t("editReport")}</button></div>`}
      </div><div>
        <section class="mission-card"><h3>${t("environmental")}</h3>${renderFindings()}</section>
        <section class="mission-card" style="margin-top:1rem"><h3>${t("investigation")}</h3>${a.complete ? `<div class="performance-grid"><div class="performance-card">✓ ${t("praiseCompare")}</div><div class="performance-card">✓ ${t("praiseAdjust")}</div><div class="performance-card">✓ ${t("praiseLimit")}</div><div class="performance-card">✓ ${t("praiseNext")}</div></div>` : `<div class="feedback revise">${gaps[0] || t("gapR2")}</div>`}</section>
      </div></div>`;
  }

  function renderFindings() {
    const monitored = allMonitored(); const lines = [];
    if (monitored.includes("RIV")) lines.push(t("reportKnownRiv"));
    if (monitored.includes("OFF")) lines.push(t("reportKnownOff"));
    monitored.filter(id => loc(id).signals.hm === 1 && loc(id).signals.rad === 1).forEach(id => lines.push(t("reportKnownLow", { location: locName(id) })));
    if (monitored.length < 4) lines.push(t("findingsUnknown"));
    lines.push(t("noSource"));
    return `<p>${t("findingsIntro")}</p><ul>${lines.map(line => `<li>${line}</li>`).join("")}</ul>`;
  }

  function renderS14() {
    const choices = [["A", t("transferA")], ["B", t("transferB")], ["C", t("transferC")]];
    return `<p class="eyebrow">${t("missionLabel")} · 14</p><h2>${t("s14Title")}</h2><div class="card-grid"><div class="recap-card"><div class="card-icon">1</div><p>${t("s14C1")}</p></div><div class="recap-card"><div class="card-icon">2</div><p>${t("s14C2")}</p></div><div class="recap-card"><div class="card-icon">3</div><p>${t("s14C3")}</p></div></div>
      <section class="mission-card" style="margin-top:1rem"><h3>${t("transferTitle")}</h3><p>${t("transferQ")}</p><div class="quiz-options">${choices.map(([id,label]) => `<label class="option-row"><input type="radio" name="transfer" value="${id}" ${checked(id, state.transferChoice)}><span>${label}</span></label>`).join("")}</div>
      <div class="actions"><button class="button secondary" data-action="check-transfer" ${disabled(!state.transferChoice)}>${t("checkAnswer")}</button>${state.transferCorrect ? `<button class="button primary" data-action="goto" data-screen="S15">${t("realScience")} →</button>` : ""}</div>
      ${state.transferChoice ? `<div class="feedback ${state.transferCorrect ? "good" : "revise"}">${t(state.transferCorrect ? "transferGood" : "transferRetry")}</div>` : ""}</section>`;
  }

  function renderS15() {
    return `<div class="screen-grid"><div><p class="eyebrow">${t("missionLabel")} · 15</p><h2>${t("s15Title")}</h2><p class="lead">${t("s15Lead")}</p><p>${t("s15Limit")}</p><div class="image-panel" style="min-height:300px"><img src="assets/blue-bay-mission.png" alt="${t("s15Title")}"></div><p class="small">${t("scienceNote")}</p></div>
      <div class="certificate"><div class="certificate-mark">◉</div><p class="eyebrow">${t("appTitle")}</p><h2>${t("certificateTitle")}</h2><p>${t("certificateBody")}</p><p class="small">${new Date().toLocaleDateString(state.uiLocale === "en" ? "en-GB" : state.uiLocale)}</p><div class="actions" style="justify-content:center"><button class="button secondary" data-action="print">${t("printCertificate")}</button><button class="button primary" data-action="restart">${t("playAgain")}</button></div></div></div>`;
  }

  function renderAssistant() {
    return `<aside class="assistant" aria-label="Assistant"><div class="assistant-avatar" aria-hidden="true">🐚</div><div class="assistant-panel"><p class="assistant-message">${state.assistantMessage || t("how")}</p><div class="assistant-actions"><button class="button secondary" data-action="how">${t("how")}</button><button class="button gold" data-action="hint">${t("hint")}</button></div></div></aside>`;
  }

  function bindPostRender() {
    if (state.screen === "S00") return;
    const screen = document.getElementById("game-screen");
    if (screen) screen.focus({ preventScroll: true });
  }

  function go(screen) {
    if (!SCREENS.includes(screen)) return;
    speechSynthesis.cancel();
    state.screen = screen;
    state.assistantMessage = "";
    persist(); render(); window.scrollTo({ top: 0, behavior: "smooth" });
    if (!state.voiceMuted) setTimeout(speakScreen, 180);
  }

  function showToast(message) {
    toast.textContent = message; toast.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
  }

  function speakScreen() {
    if (state.voiceMuted || !window.speechSynthesis) return;
    const keyMap = { S01: ["s01Title","s01Body"], S02: ["s02Title","s02Lead"], S03: ["s03Title","s03Lead"], S04: ["s04Title","s04Question"], S05: ["s05Title","s05Lead"], S06: ["s06Title","s06Lead"], S07: ["s07Title","s07Lead"], S08: ["s08Title","s08Lead"], S09: ["s09Title","s09Lead"], S10: ["s10Title","s10Lead"], S11: ["s11Title","s11Lead"], S12: ["s12Title","s12Lead"], S13: [state.assessment?.complete ? "s13Complete" : "s13Gap", state.assessment?.complete ? "s13LeadComplete" : "s13LeadGap"], S14: ["s14Title","transferQ"], S15: ["s15Title","s15Lead"] };
    const keys = keyMap[state.screen] || [];
    if (!keys.length) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(keys.map(key => t(key)).join(" "));
    utterance.lang = state.voiceLocale; utterance.rate = .96; utterance.pitch = 1.02;
    speechSynthesis.speak(utterance);
  }

  function openEvidence() {
    const monitored = allMonitored();
    const results = [...new Set([...state.r1Revealed, ...state.r2Revealed])];
    dialog.innerHTML = `<div class="dialog-head"><h2>${t("evidenceTitle")}</h2><button class="dialog-close" data-dialog-close aria-label="${t("close")}">×</button></div><div class="dialog-body">
      ${results.length ? results.map(id => `<article class="info-card" style="margin-bottom:.7rem"><strong>${t("resultFrom", { location: locName(id), hm: labelForLevel(loc(id).signals.hm), rad: labelForLevel(loc(id).signals.rad) })}</strong></article>`).join("") : `<p>${t("evidenceEmpty")}</p>`}
      ${state.eventIds.filter(id => state.eventAnswers[id]).map(id => `<article class="info-card" style="margin-bottom:.7rem"><strong>${t("eventEvidence", { title: eventCopy(id).title })}</strong><p>${eventCopy(id).body}</p></article>`).join("")}
      ${locations.filter(item => !monitored.includes(item.id)).map(item => `<div class="evidence-chip">${locName(item.id)} · ${t("monitoringUnknown")}</div>`).join("")}
    </div>`;
    dialog.showModal();
  }

  function provideHint(directRequest) {
    const screen = state.screen;
    const goals = { S06: "goalS06", S10: "goalS10", S12: "goalS12" };
    const prefixes = { S06: "hintR1H", S10: "hintR2H", S12: "hintReportH" };
    if (!goals[screen]) return;
    if (!directRequest) {
      state.assistantMessage = t("hintH0", { goal: t(goals[screen]) });
    } else {
      let tier = Math.min(3, (state.hintByScreen[screen] || 0) + 1);
      if (tier === 3 && (state.hintByScreen[screen] || 0) < 3 && !window.confirm(t("directWarn"))) return;
      state.hintByScreen[screen] = tier; state.hintTier = Math.max(state.hintTier, tier);
      state.assistantMessage = t(`${prefixes[screen]}${tier}`);
    }
    persist(); render();
  }

  function handleClick(event) {
    const button = event.target.closest("[data-action]");
    if (!button || button.disabled) return;
    const action = button.dataset.action;
    if (action === "start") {
      const settings = { uiLocale: state.uiLocale, voiceLocale: state.voiceLocale, voiceMuted: state.voiceMuted };
      state = freshState(settings); persist(); go("S01");
    } else if (action === "goto") go(button.dataset.screen);
    else if (action === "back") go(BACK_MAP[state.screen]);
    else if (action === "toggle-method") { const id = button.dataset.id; state.methods = state.methods.includes(id) ? state.methods.filter(x => x !== id) : [...state.methods, id]; persist(); render(); }
    else if (action === "install-part") { state.parts.push(button.dataset.id); persist(); render(); }
    else if (action === "check-concept") { state.conceptCorrect = state.conceptChoice === "A"; persist(); render(); }
    else if (action === "open-placement") openPlacement(Number(button.dataset.round), button.dataset.id);
    else if (action === "confirm-placement") confirmPlacement(Number(button.dataset.round), button.dataset.id, button.dataset.reason);
    else if (action === "remove-location") removeLocation(Number(button.dataset.round), button.dataset.id);
    else if (action === "confirm-round") confirmRound(Number(button.dataset.round));
    else if (action === "skip-monitor") { state.monitoringDone = true; persist(); render(); }
    else if (action === "reveal-result") revealResult(Number(button.dataset.round));
    else if (action === "answer-event") { state.eventAnswers[button.dataset.id] = button.dataset.value; persist(); render(); }
    else if (action === "submit-report") {
      try { state.assessment = evaluate(); persist(); go("S13"); }
      catch (error) { console.error("Assessment failed", error); showToast(error.message || "Assessment failed"); }
    }
    else if (action === "retry-gap") retryGap();
    else if (action === "check-transfer") { state.transferCorrect = state.transferChoice === "A"; persist(); render(); }
    else if (action === "open-evidence") openEvidence();
    else if (action === "voice-toggle") { state.voiceMuted = !state.voiceMuted; speechSynthesis.cancel(); persist(); render(); if (!state.voiceMuted) speakScreen(); }
    else if (action === "voice-replay") speakScreen();
    else if (action === "how") provideHint(false);
    else if (action === "hint") provideHint(true);
    else if (action === "print") window.print();
    else if (action === "restart") { if (window.confirm(t("restart") + "?")) { const settings = { uiLocale: state.uiLocale, voiceLocale: state.voiceLocale, voiceMuted: state.voiceMuted }; state = freshState(settings); persist(); render(); } }
  }

  function handleChange(event) {
    const target = event.target;
    if (target.name === "ui-locale") { state.uiLocale = target.value; persist(); render(); }
    else if (target.name === "voice-locale") { state.voiceLocale = target.value; persist(); }
    else if (target.name === "concept") { state.conceptChoice = target.value; state.conceptCorrect = false; persist(); render(); }
    else if (target.name?.startsWith("report-")) { state.report[target.name.slice(7)] = target.value; state.assessment = null; persist(); render(); }
    else if (target.name === "transfer") { state.transferChoice = target.value; state.transferCorrect = false; persist(); render(); }
  }

  function confirmPlacement(round, id, reason) {
    const selection = round === 1 ? state.round1 : state.round2;
    selection[id] = round === 1 ? "valid" : reason;
    const detail = reasonDetails(round, id, selection[id]);
    state.assistantMessage = `${locName(id)}：${detail.title}`;
    placementDialog.close();
    persist(); render();
  }

  function removeLocation(round, id) {
    const selection = round === 1 ? state.round1 : state.round2; delete selection[id]; persist(); render();
  }

  function confirmRound(round) {
    if (round === 1) { state.monitoringDone = false; state.r1Revealed = []; persist(); go("S07"); }
    else { state.r2Revealed = []; state.report = { known: "", unknown: "", next: "" }; state.assessment = null; persist(); go("S11"); }
  }

  function revealResult(round) {
    const ids = selectedIds(round); const revealed = round === 1 ? state.r1Revealed : state.r2Revealed;
    const next = ids.find(id => !revealed.includes(id)); if (next) revealed.push(next);
    persist(); render();
  }

  function retryGap() {
    if (state.assessment?.outcome === "EVIDENCE_GAP_ROUND2") {
      state.round2 = {}; state.r2Revealed = []; state.report = { known: "", unknown: "", next: "" }; state.assessment = null; go("S10");
    } else { state.assessment = null; go("S12"); }
  }

  app.addEventListener("click", handleClick);
  app.addEventListener("change", handleChange);
  dialog.addEventListener("click", event => { if (event.target.matches("[data-dialog-close]") || event.target === dialog) dialog.close(); });
  placementDialog.addEventListener("click", handleClick);
  placementDialog.addEventListener("click", event => { if (event.target.matches("[data-placement-close]") || event.target === placementDialog) placementDialog.close(); });
  render();
})();

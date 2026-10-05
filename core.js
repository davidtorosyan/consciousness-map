/* Shared core: everything the view scripts used to copy-paste.
   - CM.esc / CM.icons: HTML helpers
   - CM.favs / CM.history / CM.progress: browser storage
   - CM.share: result-link payloads
   - CM.tree: category -> school -> theory, built once from QUIZ_DATA
   - CM.route / CM.start: parse ?path= once, dispatch to exactly one view
   Load order: data/categories.js, data/quiz-data.js, core.js, view scripts,
   then CM.start(). */
(function () {
  "use strict";
  var CM = window.CM = {};

  /* ---------- language ----------
     index.html picks the language (CM_LANG) and, for anything but English,
     loads i18n/<lang>.js first, which sets window.CM_I18N = {ui: {...}} and
     swaps the translated quiz content into the data. UI text is written in
     English and passed through CM.t: the English text is the key, and a
     missing translation falls back to English. {name} placeholders are
     filled from vars (callers escape them). */
  CM.lang = window.CM_LANG || "en";
  var UI = (window.CM_I18N && window.CM_I18N.ui) || {};
  function fill(s, vars) {
    return vars ? s.replace(/\{(\w+)\}/g, function (m, k) { return k in vars ? vars[k] : m; }) : s;
  }
  CM.t = function (en, vars) {
    var s = UI[en];
    return fill(typeof s === "string" ? s : en, vars);
  };
  /* counted phrases: CM.tn(n, "{n} question", "{n} questions"). A
     translation is a list of plural forms (Russian: one, few, many). */
  CM.tn = function (n, one, many) {
    var forms = UI[one], s;
    if (Array.isArray(forms)) {
      var m10 = n % 10, m100 = n % 100;
      s = forms.length < 3 ? forms[n === 1 ? 0 : 1]
        : m10 === 1 && m100 !== 11 ? forms[0]
        : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? forms[1] : forms[2];
    } else s = n === 1 ? one : many;
    return fill(s, { n: n });
  };

  /* ---------- html ---------- */
  CM.esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  };
  CM.icons = {
    bookmark: '<svg class="bm-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 3.5h11V21l-5.5-3.8L6.5 21z"/></svg>',
    list: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="5" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="5" cy="18" r="1.5" fill="currentColor" stroke="none"/><line x1="10.5" y1="6" x2="20" y2="6"/><line x1="10.5" y1="12" x2="20" y2="12"/><line x1="10.5" y1="18" x2="20" y2="18"/></g></svg>',
    search: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><line x1="15.8" y1="15.8" x2="20.5" y2="20.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    history: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7.5V12l3.2 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    share: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 14.5V4"/><path d="M8 7.5 12 3.5l4 4"/><path d="M5 12.5v7h14v-7"/></g></svg>',
    dot: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="9"/></svg>',
  };
  /* breadcrumb: segs = [{label, href?}]; a seg with an href is a link */
  CM.trail = function (segs, extra) {
    return '<nav class="trail" aria-label="' + CM.t("Where you are") + '"><span class="here-dot"></span>' +
      segs.map(function (s, i) {
        var cls = "tseg" + (i === 0 ? " root" : "");
        var pre = i > 0 ? '<span class="sep">›</span>' : "";
        return pre + (s.href
          ? '<a class="' + cls + '" href="' + CM.esc(s.href) + '">' + CM.esc(s.label) + "</a>"
          : '<span class="' + cls + '">' + CM.esc(s.label) + "</span>");
      }).join("") + (extra || "") + "</nav>";
  };
  CM.setAccent = function (color) {
    if (color) document.documentElement.style.setProperty("--acc", color);
    else document.documentElement.style.removeProperty("--acc");
  };

  /* ---------- storage ---------- */
  function readJson(store, key) {
    try { return JSON.parse(store.getItem(key)); } catch (e) { return null; }
  }
  function writeJson(store, key, val) {
    try { store.setItem(key, JSON.stringify(val)); } catch (e) { /* private mode, quota */ }
  }
  function lsArray(key) { var v = readJson(window.localStorage, key); return Array.isArray(v) ? v : []; }

  /* bookmarks: [{id: "<catId>:<theoryKey>", name, tagline, url, catId, drill}] */
  var FAV_KEY = "cm_favorites_v1";
  CM.favs = {
    all: function () { return lsArray(FAV_KEY); },
    has: function (id) { return CM.favs.all().some(function (f) { return f.id === id; }); },
    remove: function (id) {
      writeJson(localStorage, FAV_KEY, CM.favs.all().filter(function (f) { return f.id !== id; }));
    },
    /* returns true when the theory is now bookmarked */
    toggle: function (node) {
      var id = CM.favId(node);
      if (CM.favs.has(id)) { CM.favs.remove(id); return false; }
      var f = CM.favs.all();
      f.push({ id: id, name: node.name, tagline: node.tagline, url: node.url,
        catId: node.category.key, drill: node.parent.quiz });
      writeJson(localStorage, FAV_KEY, f);
      return true;
    },
  };
  CM.favId = function (node) { return node.category.key + ":" + node.key; };

  /* finished quizzes, newest first: [{q, t, a: [answers], top}] */
  var HIST_KEY = "cm_history_v1", HIST_MAX = 30;
  CM.history = {
    all: function () { return lsArray(HIST_KEY); },
    add: function (entry) {
      var h = CM.history.all();
      h.unshift(entry);
      writeJson(localStorage, HIST_KEY, h.slice(0, HIST_MAX));
    },
    clear: function () { try { localStorage.removeItem(HIST_KEY); } catch (e) { /* ignore */ } },
  };

  /* in-progress answers survive reloads within a tab */
  CM.progress = {
    key: function (quizKey) { return "cm_progress_" + (quizKey || "main"); },
    get: function (quizKey) { return readJson(window.sessionStorage, CM.progress.key(quizKey)); },
    set: function (quizKey, answers) { writeJson(sessionStorage, CM.progress.key(quizKey), answers); },
    clear: function (quizKey) { try { sessionStorage.removeItem(CM.progress.key(quizKey)); } catch (e) { /* ignore */ } },
  };

  /* ---------- share payloads: base64url(JSON {v, q, a: "yns-"}) ---------- */
  function b64urlEncode(s) {
    try {
      return btoa(unescape(encodeURIComponent(s)))
        .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    } catch (e) { return ""; }
  }
  function b64urlDecode(s) {
    var b = String(s).replace(/-/g, "+").replace(/_/g, "/");
    while (b.length % 4) b += "=";
    return decodeURIComponent(escape(atob(b)));
  }
  var PACK = { yes: "y", no: "n", skip: "s" }, UNPACK = { y: "yes", n: "no", s: "skip" };
  CM.share = {
    encode: function (quizKey, answers) {
      return b64urlEncode(JSON.stringify({
        v: window.QUIZ_DATA_VERSION, q: quizKey || "main",
        a: answers.map(function (x) { return PACK[x] || "-"; }).join(""),
      }));
    },
    /* -> {quiz, answers} or null when the link is broken, for another quiz
       version, or doesn't match the quiz's length */
    decode: function (payload) {
      try {
        var p = JSON.parse(b64urlDecode(payload));
        if (!p || p.v !== window.QUIZ_DATA_VERSION) return null;
        var quiz = CM.quiz(p.q === "main" ? null : p.q);
        if (!quiz) return null;
        var a = Array.isArray(p.a) ? p.a
          : typeof p.a === "string" ? p.a.split("").map(function (c) { return UNPACK[c] || null; })
          : null;
        if (!a || a.length !== quiz.questions.length) return null;
        return { quiz: quiz, answers: a };
      } catch (e) { return null; }
    },
  };

  /* ---------- taxonomy tree ----------
     node: {kind: "category"|"school"|"theory", key, name, tagline, url, color,
            parent, category, children, quiz (drill key or null), path}
     path is the ?path= value: "materialism", "materialism/higher-order",
     "materialism/higher-order/<theory>". Schools are areas with `sub`.
     Theories LOC hasn't verified yet carry review: true. A theory with
     group: "<key>" holds the same positions on its quiz's questions as that
     sibling (its lead): it has no profile of its own, results show it on the
     lead's row, and node.lead / node.members link them. */
  var QD = window.QUIZ_DATA, DRILL = QD.drill || {};
  var byPath = {}, byKey = {};
  function add(node) { byPath[node.path] = node; byKey[node.kind + ":" + node.key] = node; return node; }
  function grow(node, drillKey) {
    var d = DRILL[drillKey];
    // an entry without questions (a one-theory category) is part of the map, not a quiz
    node.quiz = d && d.questions && d.questions.length ? drillKey : null;
    node.children = !d ? [] : d.areas.map(function (a) {
      var school = !!a.sub;
      var seg = school ? a.key.slice(node.category.key.length + 1) : a.key;
      var child = add({
        kind: school ? "school" : "theory", key: a.key, name: a.name,
        tagline: a.tagline || "", url: a.url || "", color: node.color,
        parent: node, category: node.category, path: node.path + "/" + seg,
        review: !!a.review, group: a.group || null, members: [],
      });
      if (school) grow(child, a.sub);
      else child.children = [];
      return child;
    });
    node.children.forEach(function (c) {
      if (!c.group) return;
      c.lead = node.children.filter(function (o) { return o.key === c.group; })[0] || null;
      if (c.lead) c.lead.members.push(c);
    });
  }
  CM.categories = window.LOC_CATEGORIES.map(function (c) {
    var node = { kind: "category", key: c.id, name: c.name, tagline: c.tagline,
      url: c.url, color: c.color, parent: null, path: c.id };
    node.category = node;
    add(node);
    grow(node, c.id);
    return node;
  });
  CM.nodeAt = function (path) { return byPath[path] || null; };
  CM.node = function (kind, key) { return byKey[kind + ":" + key] || null; };
  /* the category or school that owns a quiz key */
  CM.quizOwner = function (quizKey) {
    var d = DRILL[quizKey];
    if (!d) return null;
    return quizKey === d.categoryId ? CM.node("category", quizKey) : CM.node("school", quizKey);
  };
  CM.href = function (node, suffix) {
    return "?path=" + node.path + (suffix ? "/" + suffix : "");
  };

  /* a quiz: the main one (key null) or a category's/school's own.
     targets are the nodes it ranks. */
  CM.quiz = function (key) {
    if (!key || key === "main") {
      return { key: null, owner: null, data: QD.top, questions: QD.top.questions, targets: CM.categories };
    }
    var owner = CM.quizOwner(key);
    if (!owner) return null;
    // grouped theories ride on their lead's row
    return { key: key, owner: owner, data: DRILL[key], questions: DRILL[key].questions,
      targets: owner.children.filter(function (n) { return !n.lead; }) };
  };
  CM.quizHref = function (key) {
    var owner = key && CM.quizOwner(key);
    return owner ? CM.href(owner, "quiz") : "?path=quiz";
  };
  CM.quizName = function (key) {
    var owner = key && key !== "main" && CM.quizOwner(key);
    return owner ? owner.name : CM.t("Main quiz");
  };

  /* ---------- scoring ----------
     Every quiz is an axis quiz: answers place you on underlying axes, and a
     target's score is the cosine similarity between your positions and its
     profile, from -1 (opposite) to 1 (same). CM.ranked returns
     [{node, score, tier}] best first, tier one of strong / partial / none /
     against. */
  /* your position on each axis you answered something about, -1..1 */
  CM.positions = function (quiz, answers) {
    var sum = {}, weight = {};
    answers.forEach(function (ans, i) {
      if (ans !== "yes" && ans !== "no") return;
      var w = quiz.questions[i].axes || {}, sign = ans === "yes" ? 1 : -1;
      Object.keys(w).forEach(function (k) {
        sum[k] = (sum[k] || 0) + sign * w[k];
        weight[k] = (weight[k] || 0) + Math.abs(w[k]);
      });
    });
    var pos = {};
    Object.keys(sum).forEach(function (k) { if (weight[k]) pos[k] = sum[k] / weight[k]; });
    return pos;
  };
  CM.TIERS = { strong: CM.t("strong match"), partial: CM.t("partial match"), none: CM.t("no match"), against: CM.t("opposite view") };
  function axisScores(quiz, answers) {
    var pos = CM.positions(quiz, answers), keys = quiz.data.axes.map(function (x) { return x.key; });
    var un = Math.sqrt(keys.reduce(function (t, k) { return t + Math.pow(pos[k] || 0, 2); }, 0));
    var sc = {};
    quiz.targets.forEach(function (node) {
      var p = quiz.data.profiles[node.key] || {}, dot = 0, pn = 0;
      keys.forEach(function (k) { dot += (pos[k] || 0) * (p[k] || 0); pn += Math.pow(p[k] || 0, 2); });
      sc[node.key] = un && pn ? dot / (un * Math.sqrt(pn)) : 0;
    });
    return sc;
  }
  CM.ranked = function (quiz, answers) {
    var sc = axisScores(quiz, answers);
    // a "strong" match needs evidence: at least half the questions answered
    var answered = answers.filter(function (a) { return a === "yes" || a === "no"; }).length;
    // and no answers that contradict each other
    var enough = answered * 2 >= quiz.questions.length &&
      !CM.conflicts(quiz, answers).length && !CM.lopsided(quiz, answers);
    return quiz.targets.map(function (node, i) {
      var s = sc[node.key] || 0, tier;
      // thresholds from tools/eval-quiz.js score distributions: a typical
      // result has one or two strong matches
      tier = s >= 0.55 ? (enough ? "strong" : "partial") : s >= 0.25 ? "partial" : s > -0.25 ? "none" : "against";
      return { node: node, score: s, tier: tier, i: i };
    }).sort(function (a, b) { return b.score - a.score || a.i - b.i; });
  };
  /* pairs of answers that contradict each other: two questions asking
     opposite things, answered the same way */
  CM.conflicts = function (quiz, answers) {
    var out = [], qs = quiz.questions;
    for (var i = 0; i < qs.length; i++) for (var j = i + 1; j < qs.length; j++) {
      if (answers[i] !== answers[j] || (answers[i] !== "yes" && answers[i] !== "no")) continue;
      // only exact opposites: same axes, every weight reversed
      var ki = Object.keys(qs[i].axes), kj = Object.keys(qs[j].axes);
      var clash = ki.length === kj.length && ki.every(function (k) { return qs[j].axes[k] && qs[i].axes[k] * qs[j].axes[k] < 0; });
      if (clash) out.push([i, j]);
    }
    return out;
  };
  /* answered (nearly) everything the same way: "yes" or "no", else "".
     The statements point in different directions, so that's not a view. */
  CM.lopsided = function (quiz, answers) {
    var y = 0, n = 0;
    answers.forEach(function (a) { if (a === "yes") y++; else if (a === "no") n++; });
    if (y + n < 8) return "";
    return y >= 0.85 * (y + n) ? "yes" : n >= 0.85 * (y + n) ? "no" : "";
  };
  /* "You think X, Y and Z." from your strongest positions (axis quizzes) */
  CM.summary = function (quiz, answers, theirs) {
    if (CM.lopsided(quiz, answers)) return "";
    var pos = CM.positions(quiz, answers);
    var strong = quiz.data.axes.filter(function (x) { return Math.abs(pos[x.key] || 0) >= 0.5; })
      .sort(function (a, b) { return Math.abs(pos[b.key]) - Math.abs(pos[a.key]); })
      .slice(0, 3)
      .map(function (x) { return pos[x.key] > 0 ? x.yes : x.no; });
    if (!strong.length) return "";
    var last = strong.pop();
    return CM.t(theirs ? "They think {list}." : "You think {list}.", { list: (strong.length ? strong.join(", ") + CM.t(" and ") : "") + last });
  };

  /* ---------- result links ----------
     Own results live at ?path=results/<payload>, shared ones at share/<payload>.
     Pages opened from a result carry it as &r=<payload> (&shared=1). */
  CM.resultsHref = function (payload, shared) {
    return "?path=" + (shared ? "share/" : "results/") + payload;
  };
  CM.fromResults = function (href, from) {
    return from ? href + "&r=" + from.payload + (from.shared ? "&shared=1" : "") : href;
  };
  /* why a result scored the way it did, for the family/area `key` */
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function backToResults(from) {
    return '<div class="d-quiet"><a class="d-link" data-back-results href="' +
      CM.esc(CM.resultsHref(from.payload, from.shared)) + '">\u2039 ' + CM.t("Results") + "</a></div>";
  }
  /* axis quizzes: this target's stands, grouped by how your answers relate:
     agree (stated once), differ (both sides, so nothing is negated), not
     sure. Strongest stands first. */
  function compareHtml(r, key, from) {
    var t = CM.node("theory", key);
    if (t && t.lead) key = t.lead.key;   // a grouped theory holds its lead's positions
    var pos = CM.positions(r.quiz, r.answers), p = r.quiz.data.profiles[key] || {};
    var agree = [], differ = [], unsure = [];
    r.quiz.data.axes.filter(function (x) { return p[x.key]; })
      .sort(function (a, b) { return Math.abs(p[b.key]) - Math.abs(p[a.key]); })
      .forEach(function (x) {
        var theirs = p[x.key] > 0 ? x.yes : x.no, u = pos[x.key];
        if (u === undefined || Math.abs(u) < 0.25) unsure.push(theirs);
        else if (u * p[x.key] > 0) agree.push(theirs);
        else differ.push({ theirs: theirs, yours: u > 0 ? x.yes : x.no });
      });
    var total = agree.length + differ.length + unsure.length;
    if (!total) return "";
    var e = CM.esc;
    function group(cls, title, n, items) {
      return n ? '<div class="cmp-group ' + cls + '"><div class="cmp-title">' + title + " (" + n + ")</div>" + items + "</div>" : "";
    }
    var head = agree.length === total ? CM.tn(total, "You agree on its one point.", "You agree on all {n} of its points.")
      : !agree.length ? CM.tn(total, "You don\u2019t share its one point.", "You don\u2019t share any of its {n} points.")
      : CM.t("You agree on {a} of its {n} points.", { a: agree.length, n: total });
    return '<div class="qa-sec cmp"><div class="eyebrow">' + CM.t("COMPARED WITH YOUR ANSWERS") + "</div>" +
      '<p class="cmp-head">' + head + "</p>" +
      group("agree", "\u2713 " + CM.t("Where you agree"), agree.length,
        "<ul>" + agree.map(function (t) { return "<li>" + e(cap(t)) + "</li>"; }).join("") + "</ul>") +
      group("differ", "\u2717 " + CM.t("Where you differ"), differ.length, differ.map(function (d) {
        return '<div class="cmp-pair"><div><span class="who">' + CM.t("This view") + "</span>" + e(cap(d.theirs)) + "</div>" +
          '<div><span class="who">' + CM.t("You") + "</span>" + e(cap(d.yours)) + "</div></div>";
      }).join("")) +
      group("unsure", "? " + CM.t("Where you weren\u2019t sure"), unsure.length,
        "<ul>" + unsure.map(function (t) { return "<li>" + CM.t("This view") + ": " + e(t) + "</li>"; }).join("") + "</ul>") +
      "</div>" + backToResults(from);
  }
  CM.answerRows = function (from, key) {
    var r = from && CM.share.decode(from.payload);
    if (!r) return "";
    return compareHtml(r, key, from);
  };

  /* ---------- page chrome ----------
     trail on top, one card, footer. Quizzes add the progress row. */
  CM.LOC_URL = "https://loc.closertotruth.com/";
  /* "<page> — Landscape of Consciousness" */
  CM.title = function (page) { return (page ? page + " \u2014 " : "") + CM.t("Landscape of Consciousness"); };
  CM.frame = function (trailHtml, body, opts) {
    opts = opts || {};
    return trailHtml +
      (opts.progress ? '<div class="wz-dotsrow"><div class="q-bar" aria-hidden="true"><span id="wz-bar"></span></div><span class="q-count" id="wz-count"></span></div>' : "") +
      '<div class="wz-window" id="wz-window">' + body + "</div>" +
      '<footer class="wz-foot"><a href="?path=browse">' + CM.t("All categories") + "</a>" +
      '<span aria-hidden="true">·</span>' +
      '<a href="' + CM.LOC_URL + '" target="_blank" rel="noopener">' + CM.t("Landscape of Consciousness") + " \u2197</a></footer>";
  };
  /* bookmark toggles: <button data-bm="<theory key>">. As a pill it's
     labelled Save / Saved; otherwise it's just the icon. */
  CM.bookmarkButton = function (node, small, pill) {
    var on = CM.favs.has(CM.favId(node));
    var cls = pill ? "pill bm-pill" : "bm-btn" + (small ? " sm" : "");
    return '<button class="' + cls + (on ? " on" : "") + '" data-count="bookmark" data-bm="' + CM.esc(node.key) +
      '" aria-label="' + CM.t("Bookmark {name}", { name: CM.esc(node.name) }) + '" aria-pressed="' + on + '">' + CM.icons.bookmark +
      (pill ? "<span data-bm-label>" + (on ? CM.t("Saved") : CM.t("Save")) + "</span>" : "") + "</button>";
  };
  CM.bindBookmarks = function (root) {
    root.querySelectorAll("[data-bm]").forEach(function (el) {
      el.addEventListener("click", function (ev) {
        ev.preventDefault();
        var node = CM.node("theory", el.getAttribute("data-bm"));
        if (!node) return;
        var on = CM.favs.toggle(node);
        // the same theory can appear twice on a page (e.g. header and list)
        root.querySelectorAll('[data-bm="' + node.key + '"]').forEach(function (b) {
          b.classList.toggle("on", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
          var label = b.querySelector("[data-bm-label]");
          if (label) label.textContent = on ? CM.t("Saved") : CM.t("Save");
        });
      });
    });
  };
  /* "‹ Results" goes back in history when that's where we came from */
  CM.bindBackToResults = function (root) {
    var el = root.querySelector("[data-back-results]");
    if (!el) return;
    el.addEventListener("click", function (ev) {
      var ref = document.referrer, want = el.getAttribute("href");
      if (ref && ref.indexOf(location.origin) === 0 && ref.split("?")[1] === want.slice(1) && history.length > 1) {
        ev.preventDefault();
        history.back();
      }
    });
  };

  /* ---------- router: every view lives at / with ?path=<a/b/c> ----------
     route.view is one of: home, browse, saved, history, debug, quiz,
     results, group (a category or school), theory. */
  function param(name) {
    try { return new URLSearchParams(location.search).get(name); } catch (e) { return null; }
  }
  function parse() {
    var segs = (param("path") || "").split("/").filter(Boolean);
    var a = segs[0], n = segs.length;
    if (!n) {
      var r = param("r");
      if (r) return { view: "results", payload: r, shared: true };          // legacy ?r=
      var m = /^#\/category\/([^\/]+)/.exec(location.hash || "");           // legacy hash URLs
      var c = m && CM.node("category", m[1]);
      return c ? { view: "group", node: c } : { view: "home" };
    }
    if (n === 1 && (a === "browse" || a === "saved" || a === "history" || a === "debug")) return { view: a };
    if (n === 1 && a === "quiz") return { view: "quiz", quiz: null };
    if (a === "mega" && n <= 2) return { view: "mega", payload: segs[1] || null, shared: param("shared") === "1" };
    if (n === 2 && (a === "share" || a === "results")) return { view: "results", payload: segs[1], shared: a === "share" };
    var last = segs[n - 1];
    var mode = last === "quiz" || last === "browse" ? last : null;   // "browse": list opened
    var node = CM.nodeAt((mode ? segs.slice(0, -1) : segs).join("/"));
    if (!node) return null;
    if (mode === "quiz") return node.quiz ? { view: "quiz", quiz: node.quiz } : null;
    if (node.kind === "theory" && mode) return null;
    var from = param("r") ? { payload: param("r"), shared: param("shared") === "1" } : null;
    return { view: node.kind === "theory" ? "theory" : "group", node: node, from: from, expand: mode === "browse" };
  }
  CM.views = {};
  CM.route = null;
  CM.start = function () {
    var route = CM.route = parse();
    var view = route && CM.views[route.view];
    if (view) view(route);
    else CM.views.notFound();
    langPicker();
    if (CM.count) CM.count.page(route);   // analytics.js
  };
  /* language picker, bottom right on every page. Switching remembers the
     choice and reloads (the loader swaps the translated text in). */
  var LANG_NAMES = { en: "EN", ru: "RU" };
  function langPicker() {
    if (document.getElementById("lang-pick")) return;
    var box = document.createElement("div");
    box.id = "lang-pick";
    box.className = "lang-pick";
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", CM.t("Language"));
    box.innerHTML = Object.keys(LANG_NAMES).map(function (l) {
      return '<button type="button" data-lang="' + l + '" lang="' + l + '" aria-pressed="' + (l === CM.lang) + '"' +
        (l === CM.lang ? ' class="on"' : "") + ">" + LANG_NAMES[l] + "</button>";
    }).join("");
    box.addEventListener("click", function (ev) {
      var b = ev.target.closest && ev.target.closest("[data-lang]"), l = b && b.getAttribute("data-lang");
      if (!l || l === CM.lang) return;
      try { localStorage.setItem("cm_lang_v1", l); } catch (e) { /* storage blocked: ?lang= below still works */ }
      if (CM.count) CM.count.event("lang/" + l);
      var q = location.search.replace(/([?&])lang=[a-z]+&?/, "$1").replace(/[?&]$/, "");
      location.href = location.pathname + (q ? q + "&" : "?") + "lang=" + l + location.hash;
    });
    document.body.appendChild(box);
  }
  CM.views.notFound = function () {
    document.title = CM.title(CM.t("Not found"));
    document.getElementById("app").innerHTML = CM.trail([{ label: CM.t("Home"), href: "./" }]) +
      '<header class="hero"><div class="kicker">' + CM.t("NOT FOUND") + "</div><h1>" + CM.t("Nothing here.") + "</h1>" +
      '<p class="desc">' + CM.t("That page doesn\u2019t exist.") + "</p></header>" +
      '<div class="d-actions"><a class="pill" href="./">' + CM.t("Home") + "</a></div>";
  };
})();

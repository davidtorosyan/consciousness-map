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

  /* ---------- html ---------- */
  CM.esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  };
  CM.icons = {
    bookmark: '<svg class="bm-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 3.5h11V21l-5.5-3.8L6.5 21z"/></svg>',
    info: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" stroke-width="2"/><line x1="12" y1="11" x2="12" y2="16.6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="7.6" r="1.5" fill="currentColor"/></svg>',
    list: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="5" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="5" cy="18" r="1.5" fill="currentColor" stroke="none"/><line x1="10.5" y1="6" x2="20" y2="6"/><line x1="10.5" y1="12" x2="20" y2="12"/><line x1="10.5" y1="18" x2="20" y2="18"/></g></svg>',
    search: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><line x1="15.8" y1="15.8" x2="20.5" y2="20.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    history: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7.5V12l3.2 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    share: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 14.5V4"/><path d="M8 7.5 12 3.5l4 4"/><path d="M5 12.5v7h14v-7"/></g></svg>',
    dot: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="9"/></svg>',
  };
  /* breadcrumb: segs = [{label, href?}]; a seg with an href is a link */
  CM.trail = function (segs, extra) {
    return '<nav class="trail" aria-label="Where you are"><span class="here-dot"></span>' +
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
     "materialism/higher-order/<theory>". Schools are areas with `sub`. */
  var QD = window.QUIZ_DATA, DRILL = QD.drill || {};
  var byPath = {}, byKey = {};
  function add(node) { byPath[node.path] = node; byKey[node.kind + ":" + node.key] = node; return node; }
  function grow(node, drillKey) {
    var d = DRILL[drillKey];
    node.quiz = d ? drillKey : null;
    node.children = !d ? [] : d.areas.map(function (a) {
      var school = !!a.sub;
      var seg = school ? a.key.slice(node.category.key.length + 1) : a.key;
      var child = add({
        kind: school ? "school" : "theory", key: a.key, name: a.name,
        tagline: a.tagline || "", url: a.url || "", color: node.color,
        parent: node, category: node.category, path: node.path + "/" + seg,
      });
      if (school) grow(child, a.sub);
      else child.children = [];
      return child;
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
    return { key: key, owner: owner, data: DRILL[key], questions: DRILL[key].questions, targets: owner.children };
  };
  CM.quizHref = function (key) {
    var owner = key && CM.quizOwner(key);
    return owner ? CM.href(owner, "quiz") : "?path=quiz";
  };
  CM.quizName = function (key) {
    var owner = key && key !== "main" && CM.quizOwner(key);
    return owner ? owner.name : "Main quiz";
  };

  /* ---------- router: every view lives at / with ?path=<a/b/c> ---------- */
  function parse() {
    var segs = [];
    try { segs = (new URLSearchParams(location.search).get("path") || "").split("/").filter(Boolean); }
    catch (e) { /* ignore */ }
    var a = segs[0], n = segs.length;
    if (!n) {
      var r = null;
      try { r = new URLSearchParams(location.search).get("r"); } catch (e) { /* ignore */ }
      if (r) return { view: "results", payload: r, shared: true };          // legacy ?r=
      var m = /^#\/category\/([^\/]+)/.exec(location.hash || "");           // legacy hash URLs
      var c = m && CM.node("category", m[1]);
      return c ? { view: "category", node: c } : { view: "home" };
    }
    if (n === 1 && (a === "browse" || a === "saved" || a === "history" || a === "debug")) return { view: a };
    if (n === 1 && a === "quiz") return { view: "quiz", quiz: null };
    if (n === 2 && a === "share") return { view: "results", payload: segs[1], shared: true };
    var last = segs[n - 1];
    var mode = last === "quiz" || last === "browse" ? last : null;
    var node = CM.nodeAt((mode ? segs.slice(0, -1) : segs).join("/"));
    if (!node) return null;
    if (mode === "quiz") return node.quiz ? { view: "quiz", quiz: node.quiz } : null;
    if (node.kind === "theory") return mode ? null : { view: "theory", node: node };
    if (mode === "browse" || node.kind === "school") return { view: "list", node: node };
    return { view: "category", node: node };
  }
  CM.views = {};
  CM.route = null;
  CM.start = function () {
    var route = CM.route = parse();
    var view = route && CM.views[route.view];
    if (view) view(route);
    else CM.views.notFound();
  };
  CM.views.notFound = function () {
    document.title = "Not found — Landscape of Consciousness";
    document.getElementById("app").innerHTML = CM.trail([{ label: "Home", href: "./" }]) +
      '<header class="hero"><div class="kicker">NOT FOUND</div><h1>Nothing here.</h1>' +
      '<p class="desc">That page doesn’t exist.</p></header>' +
      '<div class="d-actions"><a class="pill" href="./">Home</a></div>';
  };
})();

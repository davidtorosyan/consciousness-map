/* The Consciousness Map — drill-down quiz.
   One question per screen, icon answers (yes / no / not sure / don't get it),
   ranked results, tap to drill in. Minimal text by design. */
(function () {
  "use strict";
  var D = window.MAP_DATA, QD = window.QUIZ_DATA;
  var app = document.getElementById("app");
  var bg = document.querySelector(".bg");
  var params = new URLSearchParams(location.search);
  var catParam = params.get("cat");
  var quizId = catParam && QD.cats && QD.cats[catParam] ? catParam : "top";

  function cardById(id) { return D.cards.find(function (c) { return c.id === id; }); }
  function quizDef() { return quizId === "top" ? QD.top : QD.cats[quizId]; }

  function setTerritory(t) {
    if (document.body.dataset.territory === t) return;
    bg.classList.add("fade");
    setTimeout(function () {
      if (t) document.body.dataset.territory = t;
      else document.body.removeAttribute("data-territory");
      bg.classList.remove("fade");
    }, 200);
  }

  /* targets: top -> the six categories; cat quiz -> that category's sub-views */
  function targets() {
    if (quizId === "top") {
      return D.cards.map(function (c) {
        return {
          key: c.id, name: c.name, tagline: c.short || c.tagline,
          quiz: !!(QD.cats && QD.cats[c.id]),
          quizUrl: "quiz.html?cat=" + c.id,
          mapUrl: "index.html#/category/" + c.id
        };
      });
    }
    var c = cardById(quizId);
    return c.subs.map(function (s) {
      return {
        key: s.id, name: s.name, tagline: s.tagline,
        quiz: false, quizUrl: null,
        mapUrl: "index.html#/leaf/" + c.id + "/" + s.id
      };
    });
  }

  /* ---------- session state ---------- */
  var S = null; // {answers: ["yes"|"no"|"skip"|null ...]}
  function freshSession() {
    var n = quizDef().questions.length;
    var a = []; for (var i = 0; i < n; i++) a.push(null);
    return { answers: a };
  }
  function scores() {
    var qs = quizDef().questions, sc = {};
    S.answers.forEach(function (ans, i) {
      if (ans !== "yes" && ans !== "no") return;
      var pts = qs[i][ans] || {};
      Object.keys(pts).forEach(function (k) { sc[k] = (sc[k] || 0) + pts[k]; });
    });
    return sc;
  }

  /* ---------- tiny router ---------- */
  var hist = [];
  function go(view, back) {
    document.documentElement.classList.toggle("nav-back", !!back);
    if (!back) hist.push(view); else hist.pop();
    setTerritory(quizId === "top" ? null : quizId);
    var apply = function () { render(view); window.scrollTo(0, 0); locked = false; };
    // backstop: never leave the UI untappable if a transition stalls
    setTimeout(function () { locked = false; }, 1500);
    if (document.startViewTransition) {
      try {
        var vt = document.startViewTransition(apply);
        if (vt && vt.finished && vt.finished.catch) vt.finished.catch(function () {});
      } catch (e) { apply(); }
    } else apply();
  }
  function backTo() {
    var prev = hist.length > 1 ? hist[hist.length - 2] : { name: "start" };
    go(prev, true);
  }

  /* ---------- shared chrome ---------- */
  function qtop(n, idx, showBack) {
    var dots = "";
    for (var i = 0; i < n; i++) {
      dots += '<span class="q-dot' + (i < idx ? " done" : i === idx ? " now" : "") + '"></span>';
    }
    return '<div class="q-top rise" style="--i:0">' +
      (showBack ? '<button class="icon-btn" data-act="back" aria-label="Back">‹</button>' : '<span></span>') +
      '<div class="q-dots" aria-hidden="true">' + dots + "</div>" +
      '<button class="icon-btn" data-act="restart" aria-label="Start over">↺</button></div>';
  }

  /* ---------- views ---------- */
  function startView() {
    var q = quizDef();
    var backLink = quizId === "top"
      ? '<a class="q-quiet" href="index.html">or browse the map instead</a>'
      : '<a class="q-quiet" href="quiz.html">← back to all quizzes</a>';
    return '<div class="q-start">' +
      '<div class="eyebrow rise" style="--i:0">A QUIZ · ' + q.kicker + "</div>" +
      '<h1 class="rise" style="--i:1">' + q.title + "</h1>" +
      '<p class="lede rise" style="--i:2">' + q.intro + "</p>" +
      '<button class="big-start rise" style="--i:3" data-act="start">Start</button>' +
      '<div class="rise" style="--i:4">' + backLink + "</div></div>";
  }

  function questionView(idx) {
    var qd = quizDef(), q = qd.questions[idx], n = qd.questions.length;
    var whyBtn = q.why
      ? '<button class="a-btn whyb" data-ans="why"><span class="ic">◇</span><span class="lb">Don\u2019t get it</span></button>'
      : "";
    var whyHtml = q.why
      ? '<div class="q-why" id="why"><div class="why-card">' + q.why + "</div></div>"
      : "";
    return qtop(n, idx, true) +
      '<div class="q-stage"><div class="rise" style="--i:1">' +
      '<div class="q-text">' + q.q + "</div>" + whyHtml + "</div>" +
      '<div class="a-grid rise" style="--i:2">' +
      '<button class="a-btn yes" data-ans="yes"><span class="ic">✓</span><span class="lb">Yes</span></button>' +
      '<button class="a-btn no" data-ans="no"><span class="ic">✗</span><span class="lb">No</span></button>' +
      '<button class="a-btn maybe" data-ans="skip"><span class="ic">?</span><span class="lb">Not sure</span></button>' +
      whyBtn + "</div></div>";
  }

  function resultsView() {
    var sc = scores(), ts = targets().slice();
    ts.sort(function (a, b) { return (sc[b.key] || 0) - (sc[a.key] || 0); });
    var max = 0;
    ts.forEach(function (t) { max = Math.max(max, sc[t.key] || 0); });
    var rows = ts.map(function (t, i) {
      var s = sc[t.key] || 0;
      var w = max > 0 ? Math.round((s / max) * 100) : 4;
      if (s === 0) w = 4;
      return '<button class="r-row rise' + (i === 0 ? " top1" : "") + '" style="--i:' + (i + 2) + '" data-target="' + t.key + '">' +
        '<span class="rank">' + (i + 1) + '</span>' +
        '<span class="nm">' + t.name + "</span>" +
        '<span class="barwrap"><span class="bar" style="width:' + w + '%"></span></span>' +
        '<span class="chev">›</span></button>';
    }).join("");
    return '<div class="q-top rise" style="--i:0"><span></span>' +
      '<div class="q-dots" aria-hidden="true"></div>' +
      '<button class="icon-btn" data-act="restart" aria-label="Start over">↺</button></div>' +
      '<div class="r-head rise" style="--i:1"><div class="eyebrow">YOUR ALIGNMENT</div>' +
      "<h1>Closest first.</h1></div>" + rows +
      '<div class="d-quiet rise" style="--i:9">' +
      '<button class="d-link" data-act="restart">↺ Retake</button>' +
      '<a class="d-link" href="index.html">Browse the map</a></div>';
  }

  function detailView(key) {
    var t = targets().find(function (x) { return x.key === key; });
    var primary = t.quiz
      ? '<a class="nav-btn primary" style="text-decoration:none;text-align:center" href="' + t.quizUrl + '">Start the \u201c' + t.name + '\u201d quiz</a>'
      : '<a class="nav-btn primary" style="text-decoration:none;text-align:center" href="' + t.mapUrl + '">See on the map</a>';
    var secondary = t.quiz
      ? '<a class="tool-btn" style="text-decoration:none" href="' + t.mapUrl + '"><span>Or explore <strong>' + t.name + '</strong> on the map</span><span class="arr">›</span></a>'
      : "";
    return '<div class="q-top rise" style="--i:0">' +
      '<button class="icon-btn" data-act="back" aria-label="Back">‹</button><span></span><span></span></div>' +
      '<div class="d-head"><div class="eyebrow rise" style="--i:1">' +
      (quizId === "top" ? "TERRITORY" : "VIEW") + "</div>" +
      '<h1 class="rise" style="--i:2">' + t.name + "</h1>" +
      '<p class="tag rise" style="--i:3">' + t.tagline + "</p></div>" +
      '<div class="d-actions rise" style="--i:4">' + primary + secondary + "</div>" +
      '<div class="d-quiet rise" style="--i:5">' +
      '<button class="d-link" data-act="back">‹ Back to results</button>' +
      '<button class="d-link" data-act="restart">↺ Retake quiz</button></div>';
  }

  /* ---------- render + events ---------- */
  var locked = false;
  function render(view) {
    var h;
    if (view.name === "start") h = startView();
    else if (view.name === "q") h = questionView(view.idx);
    else if (view.name === "results") h = resultsView();
    else h = detailView(view.key);
    app.innerHTML = h;
    bind(view);
  }

  function answer(idx, ans) {
    if (locked) return;
    if (ans === "why") {
      var w = document.getElementById("why");
      if (w) w.classList.toggle("open");
      return;
    }
    locked = true;
    S.answers[idx] = ans;
    var btn = app.querySelector('[data-ans="' + ans + '"]');
    if (btn && ans !== "skip") btn.classList.add(ans === "yes" ? "picked-yes" : "picked-no");
    var n = quizDef().questions.length;
    setTimeout(function () {
      if (idx + 1 < n) go({ name: "q", idx: idx + 1 });
      else go({ name: "results" });
    }, ans === "skip" ? 120 : 260);
  }

  function bind(view) {
    app.querySelectorAll("[data-act]").forEach(function (el) {
      el.addEventListener("click", function () {
        var act = el.dataset.act;
        if (act === "start") { S = freshSession(); go({ name: "q", idx: 0 }); }
        else if (act === "restart") { go({ name: "start" }); }
        else if (act === "back") { backTo(); }
      });
    });
    if (view.name === "q") {
      app.querySelectorAll("[data-ans]").forEach(function (el) {
        el.addEventListener("click", function () { answer(view.idx, el.dataset.ans); });
      });
    }
    if (view.name === "results") {
      app.querySelectorAll("[data-target]").forEach(function (el) {
        el.addEventListener("click", function () { go({ name: "detail", key: el.dataset.target }); });
      });
    }
  }

  go({ name: "start" });
})();

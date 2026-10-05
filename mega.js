/* The mega quiz: one adaptive quiz across every theory on the map.

   Every question from every quiz is available. Each theory is a candidate
   with a stance on the questions it takes a position on: its own quiz's
   profile, plus the stances it inherits from its school (in the category
   quiz) and its family (in the main quiz). Inherited stances count for less.

   Points: each Yes/No adds log-likelihood points to every candidate: a
   theory that agrees with the answer gains, one that disagrees loses, one
   with no stand is unchanged. "Not sure" changes nothing. The next question
   is the one expected to separate the leading candidates best (largest
   expected drop in uncertainty). The quiz stops when one theory clearly
   leads, or when no remaining question would help much.

   Grouped theories ride on their lead, as in the other quizzes. */
(function () {
  "use strict";
  var esc = CM.esc, I = CM.icons;
  var QD = window.QUIZ_DATA, DRILL = QD.drill;

  /* how likely someone who holds a theory answers in line with a stance */
  var AGREE = { own: { 2: 0.9, 1: 0.75 }, inherited: { 2: 0.8, 1: 0.65 } };
  /* how likely "Not sure" is: people who hold a view on a question rarely
     skip it, so a Not sure counts a little against theories that take a
     strong stand there (own stances only; inherited ones are looser) */
  var UNSURE = { 2: 0.12, 1: 0.2, none: 0.3 };
  var STOP = { sure: 0.5, lead: 3, minGain: 0.01, max: 40, min: 6 };   // tuned with tools/eval-mega.js

  var model = null;
  function build() {
    if (model) return model;
    var questions = [], seen = {};
    function addQuiz(key, data) {
      (data.questions || []).forEach(function (q, i) {
        if (!data.axes || seen[q.t]) return;   // the same text in two quizzes: ask it once
        seen[q.t] = true;
        var ax = Object.keys(q.axes)[0];
        questions.push({ quiz: key || "main", i: i, q: q, axis: (key || "main") + "." + ax, sign: q.axes[ax] });
      });
    }
    addQuiz(null, QD.top);
    Object.keys(DRILL).forEach(function (k) { addQuiz(k, DRILL[k]); });

    function copy(o) { var c = {}; Object.keys(o).forEach(function (k) { c[k] = o[k]; }); return c; }
    /* stances: "<quiz>.<axis>" -> [value, own?] */
    function stances(into, quizKey, profile, own) {
      Object.keys(profile || {}).forEach(function (a) { into[quizKey + "." + a] = [profile[a], own]; });
    }
    var hyps = [];
    CM.categories.forEach(function (cat) {
      var fam = {};
      stances(fam, "main", QD.top.profiles[cat.key], false);
      // equal weight per family, then per school, then per theory
      var groups = cat.quiz ? cat.children.filter(function (n) { return !n.lead; }) : [];
      groups.forEach(function (n) {
        var share = 1 / CM.categories.length / groups.length;
        if (n.kind === "theory") {
          var st = copy(fam);
          stances(st, cat.quiz, DRILL[cat.quiz].profiles[n.key], true);
          hyps.push({ node: n, prior: share, st: st });
        } else if (n.quiz) {
          var leads = n.children.filter(function (t) { return !t.lead; });
          var sch = copy(fam);
          stances(sch, cat.quiz, DRILL[cat.quiz].profiles[n.key], false);
          leads.forEach(function (t) {
            var st = copy(sch);
            stances(st, n.quiz, DRILL[n.quiz].profiles[t.key], true);
            hyps.push({ node: t, prior: share / leads.length, st: st });
          });
        }
      });
    });
    hyps.forEach(function (h) { h.logPrior = Math.log(h.prior); });
    var total = hyps.reduce(function (t, h) { return t + 1 + h.node.members.length; }, 0);
    // P(Yes) for every candidate on every question, computed once
    var py = questions.map(function (qq) { return hyps.map(function (h) { return pYes(h, qq); }); });
    var ps = questions.map(function (qq) { return hyps.map(function (h) { return pUnsure(h, qq); }); });
    model = { questions: questions, hyps: hyps, theories: total, py: py, ps: ps };
    return model;
  }

  /* P(Yes) for candidate h on question qq */
  function pYes(h, qq) {
    var s = h.st[qq.axis];
    if (!s) return 0.5;
    var v = s[0] * qq.sign, p = AGREE[s[1] ? "own" : "inherited"][Math.abs(v)];
    return v > 0 ? p : 1 - p;
  }
  function pUnsure(h, qq) {
    var s = h.st[qq.axis];
    return s && s[1] ? UNSURE[Math.abs(s[0])] : UNSURE.none;
  }
  /* answers: [[questionIndex, "yes"|"no"|"skip"], ...] -> probabilities per candidate */
  function posterior(answers) {
    var m = build();
    var lp = m.hyps.map(function (h) {
      var s = h.logPrior;
      return s;
    });
    answers.forEach(function (a) {
      var row = m.py[a[0]], us = m.ps[a[0]], i;
      if (a[1] === "skip") { for (i = 0; i < lp.length; i++) lp[i] += Math.log(us[i]); return; }
      var yes = a[1] === "yes";
      for (i = 0; i < lp.length; i++) lp[i] += Math.log((1 - us[i]) * (yes ? row[i] : 1 - row[i]));
    });
    var mx = Math.max.apply(null, lp), z = 0;
    var pr = lp.map(function (x) { var e = Math.exp(x - mx); z += e; return e; });
    return pr.map(function (x) { return x / z; });
  }
  function entropy(pr) {
    var h = 0;
    pr.forEach(function (p) { if (p > 0) h -= p * Math.log(p); });
    return h / Math.LN2;
  }
  /* the unasked question with the largest expected information gain */
  function nextQuestion(answers, pr) {
    var m = build(), asked = {}, H = entropy(pr), best = -1, bestGain = 0;
    answers.forEach(function (a) { asked[a[0]] = true; });
    m.py.forEach(function (row, qi) {
      if (asked[qi]) return;
      // expected uncertainty left after the answer (Yes, No or Not sure)
      var us = m.ps[qi], n = row.length, py = 0, pn = 0, pu = 0, i;
      var wy = new Array(n), wn = new Array(n), wu = new Array(n);
      for (i = 0; i < n; i++) {
        wu[i] = pr[i] * us[i]; wy[i] = pr[i] * (1 - us[i]) * row[i]; wn[i] = pr[i] * (1 - us[i]) * (1 - row[i]);
        py += wy[i]; pn += wn[i]; pu += wu[i];
      }
      function h(w, z) { var e = 0; for (var j = 0; j < n; j++) { var x = w[j] / z; if (x > 0) e -= x * Math.log(x); } return e; }
      var gain = H - (py * h(wy, py) + pn * h(wn, pn) + pu * h(wu, pu)) / Math.LN2;
      if (gain > bestGain) { bestGain = gain; best = qi; }
    });
    return { index: best, gain: bestGain };
  }
  /* where the quiz stands: ranked candidates, and the next question or null */
  function step(answers) {
    var m = build(), pr = posterior(answers);
    var ranked = m.hyps.map(function (h, i) { return { node: h.node, p: pr[i] }; })
      .sort(function (a, b) { return b.p - a.p; });
    var answered = answers.filter(function (a) { return a[1] === "yes" || a[1] === "no"; }).length;
    var nx = nextQuestion(answers, pr);
    // stop when one theory is clearly ahead, or nothing left would help
    var done = answers.length >= STOP.max || nx.index < 0 ||
      (answered >= STOP.min && ((ranked[0].p >= STOP.sure && ranked[0].p >= STOP.lead * ranked[1].p) || nx.gain < STOP.minGain));
    return { ranked: ranked, next: done ? null : nx.index, answered: answered };
  }

  /* payload: base64url of "<version>|<q><a><q><a>..." with each question
     index as 2 base-36 digits and each answer as y/n/s */
  var PACK = { yes: "y", no: "n", skip: "s" }, UNPACK = { y: "yes", n: "no", s: "skip" };
  function encode(answers) {
    var s = window.QUIZ_DATA_VERSION + "|" + answers.map(function (a) {
      return ("0" + a[0].toString(36)).slice(-2) + PACK[a[1]];
    }).join("");
    return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  function decode(payload) {
    try {
      var b = String(payload).replace(/-/g, "+").replace(/_/g, "/");
      while (b.length % 4) b += "=";
      var s = atob(b).split("|");
      if (s[0] !== window.QUIZ_DATA_VERSION || s.length !== 2 || s[1].length % 3) return null;
      var out = [], n = build().questions.length;
      for (var i = 0; i < s[1].length; i += 3) {
        var qi = parseInt(s[1].slice(i, i + 2), 36), a = UNPACK[s[1][i + 2]];
        if (!(qi >= 0 && qi < n) || !a) return null;
        out.push([qi, a]);
      }
      return out;
    } catch (e) { return null; }
  }
  CM.mega = { build: build, posterior: posterior, step: step, encode: encode, decode: decode, STOP: STOP, AGREE: AGREE, UNSURE: UNSURE };

  /* ---------- the quiz ---------- */
  if (typeof document === "undefined") return;   // loaded by the node tools
  var app = document.getElementById("app");
  function ev(name) { if (CM.count) CM.count.event(name); }
  function trail(label) { return CM.trail([{ label: CM.t("Home"), href: "./" }, { label: label }]); }

  CM.views.mega = function (route) {
    if (route.payload) return results(route);
    var m = build(), answers = [], locked = false, finished = false;
    document.title = CM.title(CM.t("Mega quiz"));
    app.innerHTML = CM.frame(trail(CM.t("Mega quiz")),
      '<div class="q-backrow" id="wz-back" style="display:none"><button class="q-backbtn" aria-label="' + CM.t("Previous question") + '">‹</button></div>' +
      '<div class="wz-body" id="wz-body"></div>', { progress: true });
    var body = document.getElementById("wz-body"), backRow = document.getElementById("wz-back");
    backRow.querySelector("button").addEventListener("click", function () {
      if (locked || !answers.length) return;
      answers.pop();
      CM.progress.set("mega", answers);
      show();
    });
    window.addEventListener("pagehide", function () {
      if (!finished && answers.length) ev("mega-left/at-q" + (answers.length + 1));
    });

    function setBody(html, after) {
      body.classList.add("wz-leave");
      setTimeout(function () {
        body.innerHTML = html;
        body.classList.remove("wz-leave");
        if (after) after();
        locked = false;
      }, 100);
    }
    function show() {
      var st = step(answers);
      if (st.next === null) return finish();
      locked = true;
      var q = m.questions[st.next].q, top = st.ranked[0].p;
      // the bar shows how sure the quiz is, not how far through you are
      document.getElementById("wz-bar").style.width = Math.round(100 * Math.min(1, top / STOP.sure)) + "%";
      document.getElementById("wz-count").textContent = CM.t("Question {n}", { n: answers.length + 1 });
      backRow.style.display = answers.length ? "" : "none";
      function btn(cls, ans, ic, label) {
        return '<button class="a-btn ' + cls + '" data-ans="' + ans + '"><span class="ic">' + ic + '</span><span class="lb">' + label + "</span></button>";
      }
      setBody('<div class="q-qwrap"><div class="q-text">' + esc(q.t) + "</div></div>" +
        '<div class="a-grid">' + btn("yes", "yes", "✓", CM.t("Yes")) + btn("no", "no", "✗", CM.t("No")) +
        btn("maybe", "skip", "?", CM.t("Not sure")) +
        (q.why ? '<button class="a-btn whyb" data-ans="why"><span class="ic">◇</span><span class="lb">' + CM.t("Don\u2019t get it") + "</span></button>" : "") + "</div>" +
        (q.why ? '<div class="q-why" id="why"><div class="why-card">' + esc(q.why) + "</div></div>" : "") +
        (answers.length >= STOP.min ? '<button class="q-quiet" data-act="stop" style="width:100%">' + CM.t("Show my results now") + "</button>" : ""),
      function () {
        body.querySelectorAll("[data-ans]").forEach(function (el) {
          el.addEventListener("click", function () { answer(st.next, el.getAttribute("data-ans"), el); });
        });
        var stop = body.querySelector('[data-act="stop"]');
        if (stop) stop.addEventListener("click", function () { ev("mega-stopped-early"); finish(); });
      });
    }
    function answer(qi, ans, el) {
      if (locked) return;
      if (ans === "why") {
        var w = document.getElementById("why"), open = !w.classList.contains("open");
        w.classList.toggle("open", open);
        w.style.maxHeight = open ? w.scrollHeight + "px" : "";
        return;
      }
      locked = true;
      answers.push([qi, ans]);
      CM.progress.set("mega", answers);
      ev("mega-answer/q" + answers.length + "/" + (ans === "skip" ? "not-sure" : ans));
      el.classList.add("picked-" + ans);
      setTimeout(show, 120);
    }
    function finish() {
      finished = true;
      CM.progress.clear("mega");
      var st = step(answers), payload = encode(answers);
      ev("mega-finish/" + answers.length + "-questions");
      if (st.answered) {
        ev("mega-result/top/" + st.ranked[0].node.key);
        CM.history.add({ q: "mega", t: Date.now(), p: payload, top: st.ranked[0].node.name });
      }
      location.replace("?path=mega/" + payload);
    }

    var saved = CM.progress.get("mega");
    if (Array.isArray(saved) && saved.length && decode(encode(saved))) {
      setBody('<div class="q-start"><div class="eyebrow">' + CM.t("MEGA QUIZ") + "</div><h1>" + CM.t("Pick up where you left off?") + "</h1>" +
        '<button class="big-start" data-act="resume">' + CM.t("Resume \u2014 question {n}", { n: saved.length + 1 }) + "</button>" +
        '<button class="q-quiet" data-act="restart" style="width:100%">' + CM.t("Start over instead") + "</button></div>", function () {
        body.querySelector('[data-act="resume"]').addEventListener("click", function () { answers = saved; show(); });
        body.querySelector('[data-act="restart"]').addEventListener("click", function () { answers = []; CM.progress.clear("mega"); show(); });
      });
    } else {
      ev("mega-start");
      setBody('<div class="q-start"><div class="eyebrow">' + CM.t("MEGA QUIZ") + "</div><h1>" + CM.t("Every theory at once") + "</h1>" +
        '<p class="lede">' + CM.t("One quiz across all {n} theories on the map. Each answer picks the next most useful question, and it stops when one theory clearly fits. It might take ten questions or forty.", { n: build().theories }) + "</p>" +
        '<button class="big-start" data-act="go">' + CM.t("Start") + "</button></div>", function () {
        body.querySelector('[data-act="go"]').addEventListener("click", show);
      });
    }
  };

  /* ---------- results ---------- */
  function results(route) {
    var answers = decode(route.payload);
    document.title = CM.title(CM.t("Mega quiz results"));
    if (!answers) {
      app.innerHTML = CM.frame(trail(CM.t("Results")), '<div class="q-start"><div class="eyebrow">' + CM.t("RESULTS") + "</div>" +
        "<h1>" + CM.t("That link didn\u2019t work.") + '</h1><p class="lede">' + CM.t("It may be from an older version of the quiz.") + "</p>" +
        '<a class="q-quiet" href="?path=mega">' + CM.t("Take the mega quiz") + "</a></div>");
      return;
    }
    var st = step(answers), top = st.ranked.slice(0, 8).filter(function (x, i) { return i < 3 || x.p >= 0.02; });
    // how the likelihood splits across families
    var fam = {};
    st.ranked.forEach(function (x) { fam[x.node.category.key] = (fam[x.node.category.key] || 0) + x.p; });
    var fams = CM.categories.filter(function (c) { return fam[c.key] >= 0.1; })
      .sort(function (a, b) { return fam[b.key] - fam[a.key]; });
    function pct(p) { return p >= 0.995 ? "99%" : p < 0.01 ? "<1%" : Math.round(100 * p) + "%"; }
    var rows = top.map(function (x, i) {
      var t = x.node;
      return '<div class="r-row' + (i === 0 ? " top1" : "") + '" style="--bm:' + esc(t.color) + ";--tint:" + esc(t.color) + '">' +
        '<a class="r-open" data-count="open-mega-result-' + (i + 1) + '" href="' + esc(CM.href(t)) + '">' +
        '<span class="rank">' + (i + 1) + "</span>" +
        '<span class="nm">' + esc(t.name) +
        (t.members.length ? '<span class="also">' + CM.t("same answers:") + " " + t.members.map(function (m) { return esc(m.name); }).join(" · ") + "</span>" : "") +
        '<span class="also">' + esc(t.parent.name) + " · " + CM.t("{p} likely", { p: pct(x.p) }) + "</span></span></a>" +
        CM.bookmarkButton(t, true) + "</div>";
    }).join("");
    var lead = st.ranked[0].node, deeper = lead.parent;
    var next = route.shared
      ? '<a class="pill wide" href="?path=mega">' + I.search + "<span>" + CM.t("Take the mega quiz yourself") + "</span></a>"
      : deeper.quiz ? '<a class="pill wide" data-count="mega-next-quiz" href="' + CM.href(deeper, "quiz") + '">' + I.search +
        "<span>" + CM.t("Take the {name} quiz", { name: esc(deeper.name) }) + "</span></a>" : "";
    var famText = fams.slice(0, 2).map(function (c) { return esc(c.name) + " (" + pct(fam[c.key]) + ")"; }).join(CM.t(", then "));
    app.innerHTML = CM.frame(trail(CM.t("Mega quiz results")),
      '<div class="r-head"><button class="head-share" data-share data-count="share-mega">' + I.share + "<span>" + CM.t("Share") + "</span></button>" +
      '<div class="eyebrow">' + CM.t("MEGA QUIZ") + "</div><h1>" + CM.t("Most likely first.") + "</h1>" +
      '<p class="r-summary">' + (fams.length
        ? CM.tn(st.answered, "From {n} answer, mostly {fams}.", "From {n} answers, mostly {fams}.").replace("{fams}", famText)
        : CM.tn(st.answered, "From {n} answer.", "From {n} answers.")) + "</p>" +
      (!st.answered ? '<div class="r-note">' + CM.t("You didn\u2019t answer Yes or No to anything, so nothing stands out yet.") + "</div>" : "") +
      "</div>" + rows + (next ? '<div class="d-actions">' + next + "</div>" : ""));
    var btn = app.querySelector("[data-share]");
    btn.addEventListener("click", function () {
      var url = location.href.split("?")[0] + "?path=mega/" + route.payload + "&shared=1";
      var label = btn.querySelector("span");
      function done(msg) { label.textContent = msg; setTimeout(function () { label.textContent = CM.t("Share"); }, 1800); }
      if (navigator.share) navigator.share({ title: CM.t("My consciousness-map results"), url: url }).then(function () { done(CM.t("Shared")); }, function () {});
      else if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(function () { done(CM.t("Link copied")); }, function () { done(CM.t("Couldn\u2019t copy")); });
      else done(CM.t("Couldn\u2019t copy"));
    });
    CM.bindBookmarks(app);
  }
})();

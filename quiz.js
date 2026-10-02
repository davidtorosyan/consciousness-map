/* Quizzes and their results.
   A quiz runs in-page, one question at a time, inside a persistent card:
   only the card's contents transition. Answers: yes / no / not sure, plus
   "don't get it", which reveals the question's explanation. Finishing
   records the result in history and replaces the quiz URL with the
   results URL, so every screen after the questions is a real page. */
(function () {
  "use strict";
  var esc = CM.esc, I = CM.icons;
  var app = document.getElementById("app");

  /* breadcrumb for a quiz's pages: Home › Category › School › <label> */
  function quizTrail(quiz, label, extra) {
    var segs = [{ label: "Home", href: "./" }];
    var chain = [];
    for (var n = quiz.owner; n; n = n.parent) chain.unshift(n);
    chain.forEach(function (n) { segs.push({ label: n.name, href: CM.href(n) }); });
    segs.push({ label: label });
    return CM.trail(segs, extra);
  }

  /* ---------- the quiz ---------- */
  CM.views.quiz = function (route) {
    var quiz = CM.quiz(route.quiz);
    var qs = quiz.questions, n = qs.length;
    var answers = null, idx = 0, locked = false;
    if (quiz.owner) CM.setAccent(quiz.owner.color);
    document.title = (quiz.owner ? quiz.owner.name + " quiz" : "Quiz") + " — Landscape of Consciousness";
    app.innerHTML = CM.frame(quizTrail(quiz, "Quiz"),
      '<div class="q-backrow" id="wz-back" style="display:none"><button class="q-backbtn" aria-label="Previous question">‹</button></div>' +
      '<div class="wz-body" id="wz-body"></div>', { progress: true });
    var body = document.getElementById("wz-body");
    var backRow = document.getElementById("wz-back");
    backRow.querySelector("button").addEventListener("click", function () {
      if (idx > 0 && !locked) show(idx - 1);
    });

    /* a bar, not one dot per question: 26 dots overflowed a phone */
    function renderProgress(i) {
      document.getElementById("wz-bar").style.width = (i < 0 ? 0 : Math.round(100 * i / n)) + "%";
      document.getElementById("wz-count").textContent = i >= 0 && i < n ? (i + 1) + " of " + n : "";
    }
    /* swap the card's contents with a quick fade */
    function setBody(html, after) {
      body.classList.add("wz-leave");
      setTimeout(function () {
        body.innerHTML = html;
        body.classList.remove("wz-leave");
        body.classList.add("wz-enter");
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { body.classList.remove("wz-enter"); });
        });
        if (after) after();
        locked = false;
      }, 100);
    }

    function questionHtml(i) {
      var q = qs[i], prev = answers[i];
      function btn(cls, ans, ic, label) {
        var picked = prev === ans ? " picked-" + ans : "";
        return '<button class="a-btn ' + cls + picked + '" data-ans="' + ans + '"><span class="ic">' + ic +
          '</span><span class="lb">' + label + "</span></button>";
      }
      return '<div class="q-qwrap"><div class="q-text">' + esc(q.t) + "</div></div>" +
        '<div class="a-grid">' +
        btn("yes", "yes", "✓", "Yes") + btn("no", "no", "✗", "No") +
        btn("maybe", "skip", "?", "Not sure") +
        (q.why ? '<button class="a-btn whyb" data-ans="why"><span class="ic">◇</span><span class="lb">Don’t get it</span></button>' : "") +
        "</div>" +
        (q.why ? '<div class="q-why" id="why"><div class="why-card">' + esc(q.why) + "</div></div>" : "");
    }
    function show(i) {
      idx = i;
      locked = true;
      renderProgress(i);
      backRow.style.display = i > 0 ? "" : "none";
      setBody(questionHtml(i), function () {
        body.querySelectorAll("[data-ans]").forEach(function (el) {
          el.addEventListener("click", function () { answer(el.getAttribute("data-ans"), el); });
        });
      });
    }
    function answer(ans, el) {
      if (locked) return;
      if (ans === "why") {
        var w = document.getElementById("why");
        var open = !w.classList.contains("open");
        w.classList.toggle("open", open);
        w.style.maxHeight = open ? w.scrollHeight + "px" : "";   // size to content: never clip
        return;
      }
      locked = true;
      answers[idx] = ans;
      CM.progress.set(quiz.key, answers);
      el.classList.add("picked-" + ans);
      setTimeout(function () {
        if (idx + 1 < n) show(idx + 1);
        else finish();
      }, 120);
    }
    function finish() {
      CM.progress.clear(quiz.key);
      if (answers.some(function (a) { return a === "yes" || a === "no"; })) {
        var top = CM.ranked(quiz, answers)[0];
        CM.history.add({ q: quiz.key || "main", t: Date.now(), a: answers.slice(), top: top ? top.node.name : "" });
      }
      location.replace(CM.resultsHref(CM.share.encode(quiz.key, answers)));
    }

    /* a half-finished quiz offers to resume; otherwise straight into Q1 */
    function fresh() { var a = []; for (var k = 0; k < n; k++) a.push(null); return a; }
    var saved = CM.progress.get(quiz.key);
    var partial = Array.isArray(saved) && saved.length === n &&
      saved.some(function (x) { return !!x; }) && saved.some(function (x) { return !x; });
    if (!partial) { answers = fresh(); show(0); return; }
    var resumeAt = 0;
    while (resumeAt < n && saved[resumeAt]) resumeAt++;
    renderProgress(-1);
    setBody('<div class="q-start"><div class="eyebrow">' + esc(quiz.data.kicker) + "</div>" +
      "<h1>" + esc(quiz.data.title) + "</h1>" +
      '<button class="big-start" data-act="resume">Resume — question ' + (resumeAt + 1) + " of " + n + "</button>" +
      '<button class="q-quiet" data-act="restart" style="width:100%">Start over instead</button></div>', function () {
      body.querySelector('[data-act="resume"]').addEventListener("click", function () { answers = saved; show(resumeAt); });
      body.querySelector('[data-act="restart"]').addEventListener("click", function () { answers = fresh(); show(0); });
    });
  };

  /* ---------- results ---------- */
  function shareUrl(payload) {
    return location.href.split("?")[0].split("#")[0] + CM.resultsHref(payload, true);
  }
  function share(btn, payload) {
    var label = btn.querySelector("span"), was = label.textContent;
    function done(text) {
      label.textContent = text;
      setTimeout(function () { label.textContent = was; }, 1800);
    }
    var url = shareUrl(payload);
    // native share sheet where available (iOS), clipboard everywhere else
    if (navigator.share) {
      navigator.share({ title: "My consciousness-map results", url: url }).then(function () { done("Shared"); }, function () { /* dismissed */ });
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () { done("Link copied"); }, function () { done("Couldn\u2019t copy"); });
    } else done("Couldn\u2019t copy");
  }
  /* tiers come from CM.ranked: strong / partial / none, plus "against" on
     axis quizzes, where a family can hold the opposite of your views */
  var LEGEND = { strong: "strong match", partial: "partial", none: "", against: "opposite" };

  CM.views.results = function (route) {
    var r = CM.share.decode(route.payload);
    document.title = "Results — Landscape of Consciousness";
    if (!r) {
      app.innerHTML = CM.frame(CM.trail([{ label: "Home", href: "./" }, { label: "Results" }]),
        '<div class="q-start"><div class="eyebrow">RESULTS</div>' +
        "<h1>That link didn’t work.</h1>" +
        '<p class="lede">It may be from an older version of the quiz.</p>' +
        '<a class="q-quiet" href="?path=quiz">Take the quiz instead</a></div>');
      return;
    }
    var quiz = r.quiz, from = { payload: route.payload, shared: route.shared };
    if (quiz.owner) CM.setAccent(quiz.owner.color);
    var ranked = CM.ranked(quiz, r.answers);
    var answered = r.answers.filter(function (a) { return a === "yes" || a === "no"; }).length;
    var conflicts = CM.conflicts(quiz, r.answers), summary = CM.summary(quiz, r.answers);
    var rows = ranked.map(function (x, i) {
      var t = x.node, matched = x.tier === "strong" || x.tier === "partial";
      return '<div class="r-row' + (i === 0 && matched ? " top1" : "") + '" style="--bm:' + esc(t.color) + ";--tint:" + esc(t.color) + '">' +
        '<a class="r-open" href="' + esc(CM.fromResults(CM.href(t), from)) + '">' +
        '<span class="rank">' + (i + 1) + "</span>" +
        '<span class="nm">' + esc(t.name) +
        (x.tier === "none" ? "" : '<span class="tier ' + x.tier + '">' + LEGEND[x.tier] + "</span>") + "</span>" +
        "</a>" + (t.kind === "theory" ? CM.bookmarkButton(t, true) : "") + "</div>";
    }).join("");
    var lopsided = CM.lopsided(quiz, r.answers);
    var notes = !answered
      ? "You didn\u2019t answer Yes or No to anything, so nothing stands out yet."
      : lopsided
        ? "You answered " + (lopsided === "yes" ? "Yes" : "No") + " to almost everything, but the statements point in different directions, so this is only a rough guide."
      : conflicts.length
        ? "Some of your answers point in opposite directions (questions " + conflicts.map(function (p) {
            return (p[0] + 1) + " and " + (p[1] + 1);
          }).join("; ") + "), so read this as a rough guide."
        : "";
    // one obvious next step: someone else's result -> take it yourself;
    // your own -> go deeper into your top match
    var top = ranked[0], next = "";
    if (route.shared) {
      next = '<a class="pill wide" href="' + CM.quizHref(quiz.key) + '">' + I.search + "<span>Take this quiz yourself</span></a>";
    } else if (top && (top.tier === "strong" || top.tier === "partial")) {
      next = top.node.quiz
        ? '<a class="pill wide" href="' + CM.href(top.node, "quiz") + '">' + I.search + "<span>Take the " + esc(top.node.name) + " quiz</span></a>"
        : '<a class="pill wide" href="' + esc(CM.fromResults(CM.href(top.node), from)) + '">' + I.list + "<span>Read about your top match</span></a>";
    }
    app.innerHTML = CM.frame(quizTrail(quiz, "Results"),
      '<div class="r-head"><button class="head-share" data-share>' + I.share + "<span>Share</span></button>" +
      '<div class="eyebrow">' + (route.shared ? "SHARED RESULT" : "YOUR RESULTS") + "</div>" +
      "<h1>Closest first.</h1>" +
      (summary ? '<p class="r-summary">' + esc(route.shared ? summary.replace(/^You think/, "They think") : summary) + "</p>" : "") +
      (notes ? '<div class="r-note">' + notes + "</div>" : "") +
      "</div>" + rows +
      (next ? '<div class="d-actions">' + next + "</div>" : ""));
    var btn = app.querySelector("[data-share]");
    btn.addEventListener("click", function () { share(btn, route.payload); });
    CM.bindBookmarks(app);
  };
})();

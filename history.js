/* Past quiz results (the localStorage list quizzes write when finished).
   Each entry links to its results through a share payload. */
(function () {
  "use strict";
  var esc = CM.esc, I = CM.icons, t = CM.t;

  function dateStr(t) {
    try { return new Date(t).toLocaleDateString(CM.lang, { month: "short", day: "numeric" }); }
    catch (e) { return ""; }
  }
  function entryHtml(e, i) {
    var mega = e.q === "mega";
    var href = mega ? "?path=mega/" + e.p : CM.resultsHref(CM.share.encode(e.q === "main" ? null : e.q, e.a || []));
    return '<a class="fav-card rise" style="--i:' + Math.min(i + 2, 9) + ';text-decoration:none;color:inherit" href="' + esc(href) + '">' +
      '<div class="grow"><div class="fav-name">' + esc(mega ? t("Mega quiz") : CM.quizName(e.q)) + "</div>" +
      (e.top ? '<div class="fav-tag">' + t("Closest: {name}", { name: esc(e.top) }) + "</div>" : "") +
      '<div class="fav-meta"><span>' + esc(dateStr(e.t)) + "</span></div>" +
      "</div></a>";
  }

  function render() {
    var h = CM.history.all();
    var out = CM.trail([{ label: t("Home"), href: "./" }, { label: t("History") }]) +
      '<header class="hero rise" style="--i:1"><div class="kicker">' + t("HISTORY") + "</div><h1>" + t("Past quizzes") + "</h1>";
    if (h.length) {
      out += '<p class="desc">' + CM.tn(h.length, "{n} quiz completed.", "{n} quizzes completed.") + "</p></header>" +
        h.map(entryHtml).join("") +
        '<div style="text-align:center;margin-top:22px"><button data-clear style="background:none;border:none;cursor:pointer;font:inherit;font-size:14px;color:var(--faint);text-decoration:underline;text-underline-offset:4px;padding:10px 4px">' + t("Clear history") + "</button></div>";
    } else {
      out += '<p class="desc">' + t("Nothing here yet. Finish a quiz and it will land here.") + "</p></header>" +
        '<div class="d-actions"><a class="pill rise" style="--i:2" href="?path=quiz">' + I.search + "<span>" + t("Quiz") + "</span></a></div>";
    }
    var app = document.getElementById("app");
    app.innerHTML = out;
    var clr = app.querySelector("[data-clear]");
    if (clr) clr.addEventListener("click", function () { CM.history.clear(); render(); });
  }

  CM.views.history = function () {
    document.title = CM.title(t("Quiz history"));
    render();
  };
})();

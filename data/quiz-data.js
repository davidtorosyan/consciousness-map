/* Quiz data shared by every quiz, plus the category and school quizzes.
   The main quiz lives in data/main-quiz.js (loaded after this file). */
// Bump this whenever quiz questions change: shared result links carry the
// version they were made with, and links from a different version are rejected.
window.QUIZ_DATA_VERSION = "20261002e";
(function () {
  "use strict";
  var cats = {};
  window.LOC_CATEGORIES.forEach(function (c) {
    cats[c.id] = { name: c.name, color: c.color, tagline: c.tagline, url: c.url };
  });
  window.QUIZ_DATA = {
    cats: cats,
    order: window.LOC_CATEGORIES.map(function (c) { return c.id; }),
    top: null,   // data/main-quiz.js
  };
})();

/* Category and school quizzes, keyed by category id or "<category>-<school>".
   Each lives in its own file, data/quiz-<key>.js (an axis quiz, like the main
   quiz), loaded after this one; see index.html's list. */
window.QUIZ_DATA.drill = {};

/* Phenomenology has a single theory on LOC, so it has no quiz: its page
   leads straight to the theory. The entry stays for the map tree. */
window.QUIZ_DATA.drill["phenomenology"] = {
  name: "Phenomenology",
  color: "#FF5733",
  categoryId: "phenomenology",
  areas: [
    { key: "varela-s-neurophenomenology", name: "Varela\u2019s Neurophenomenology",
      tagline: "First-person reports guide brain science.",
      url: "https://loc.closertotruth.com/theory/varela-s-neurophenomenology" }
  ],
  questions: []
};

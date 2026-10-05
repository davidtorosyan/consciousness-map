/* Quiz data shared by every quiz, plus the category and school quizzes.
   The main quiz lives in data/main-quiz.js (loaded after this file). */
// Bump this whenever quiz questions change: shared result links carry the
// version they were made with, and links from a different version are rejected.
window.QUIZ_DATA_VERSION = "20261003a";
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

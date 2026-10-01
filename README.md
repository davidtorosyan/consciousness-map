# The Consciousness Map

A phone-first guide to theories of consciousness, organised by the eleven
categories of the [Landscape of Consciousness](https://loc.closertotruth.com/)
(LOC). Take a short quiz to see which families of theories you lean toward,
drill into a category's own quiz, or browse categories → schools → theories,
each linking to its LOC entry.

Live: https://davidtorosyan.github.io/consciousness-map/

## Structure

Everything is served from `index.html`; the view is chosen by `?path=`.

| File | What it is |
| --- | --- |
| `index.html` | The only real page. Loads the data and scripts below, then `CM.start()`. |
| `core.js` | Shared helpers, storage, share links, the category → school → theory tree, and the router. |
| `app.js` | Home, the category list, category/school pages, theory pages, debug page. |
| `quiz.js` | Quizzes (in-page, one question at a time) and results. |
| `saved.js`, `history.js` | Bookmarked theories and past quiz results (localStorage). |
| `data/categories.js` | The 11 LOC categories: names, colors, taglines, URLs. |
| `data/quiz-data.js` | Every quiz: the top-level one and one per category/school. |
| `styles.css`, `quiz.css` | All styling. |
| `quiz.html`, `favorites.html`, `history.html` | Redirects from old URLs. |
| `deploy.sh` | Check, cache-bust, commit and push to `main`. |
| `tools/check.js` | Syntax lint and quiz-data integrity checks. |
| `tools/smoke.js` | Headless phone-size walk-through of every page. |
| `archive/` | Data from earlier versions, kept for reference. Not loaded. |

## URLs

| `?path=` | View |
| --- | --- |
| *(empty)* | Home |
| `browse` | All 11 categories |
| `quiz` | Top-level quiz |
| `<cat>`, `<cat>/<school>` | A category or school: its quiz and what's inside it |
| `<cat>/quiz`, `<cat>/<school>/quiz` | That category's or school's quiz |
| `<cat>/<theory>`, `<cat>/<school>/<theory>` | A theory |
| `results/<payload>` | Your result (where a finished quiz lands) |
| `share/<payload>` | Someone's shared result |
| `saved`, `history`, `debug` | Bookmarks, past results, quiz stats |

Pages opened from a result carry it as `&r=<payload>` and show how your
answers lined up. Every screen except the questions themselves is a real
URL, so the browser's back button always does the obvious thing.

Legacy forms still work: `<…>/browse` (same as without it), `?r=<payload>`,
`#/category/<cat>`, `quiz.html`, `favorites.html`, `history.html`.

## Deploy

GitHub Pages serves `main`. Run `./deploy.sh "message"`.

Work in progress is tracked in `PLAN.md`.

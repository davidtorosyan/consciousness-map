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
| `index.html` | The only real page. Loads the data and scripts below. |
| `app.js` | Home, category list, category page, debug page. |
| `quiz.js` | Quizzes, results, theory/school detail, browse lists. |
| `saved.js`, `history.js` | Bookmarked theories and past quiz results (localStorage). |
| `data/categories.js` | The 11 LOC categories: names, colors, taglines, URLs. |
| `data/quiz-data.js` | Every quiz: the top-level one and one per category/school. |
| `styles.css`, `quiz.css` | All styling. |
| `quiz.html`, `favorites.html`, `history.html` | Redirects from old URLs. |
| `deploy.sh` | Lint, cache-bust, commit and push to `main`. |
| `archive/` | Data from earlier versions, kept for reference. Not loaded. |

## URLs

| `?path=` | View |
| --- | --- |
| *(empty)* | Home |
| `browse` | All 11 categories |
| `quiz` | Top-level quiz |
| `<cat>` | Category page |
| `<cat>/quiz`, `<cat>/<school>/quiz` | A category's or school's quiz |
| `<cat>/browse`, `<cat>/<school>/browse` | Its schools or theories |
| `<cat>/<theory>`, `<cat>/<school>/<theory>` | A theory |
| `share/<payload>` | Shared quiz result |
| `saved`, `history`, `debug` | Bookmarks, past results, quiz stats |

## Deploy

GitHub Pages serves `main`. Run `./deploy.sh "message"`.

Work in progress is tracked in `PLAN.md`.

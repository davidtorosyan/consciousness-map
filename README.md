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
| `index.html` | The only real page: a loader that reads `version.json` and loads the files below as `?v=<build>`, then calls `CM.start()`. |
| `version.json` | The live build id, written by `deploy.sh` (`"dev"` = never cache). |
| `core.js` | Shared helpers, storage, share links, the category → school → theory tree, and the router. |
| `analytics.js` | Anonymous usage counts (page views, quiz funnel, answers, results) sent to GoatCounter; event names are listed at the top of the file. |
| `app.js` | Home, the category list, category/school pages, theory pages, debug page. |
| `quiz.js` | Quizzes (in-page, one question at a time) and results. |
| `saved.js`, `history.js` | Bookmarked theories and past quiz results (localStorage). |
| `data/categories.js` | The 11 LOC categories: names, colors, taglines, URLs. |
| `data/main-quiz.js` | The main quiz: the axes families disagree on, each family's position on them, and the questions. |
| `data/quiz-<key>.js` | One per category or school quiz (e.g. `quiz-panpsychisms.js`, `quiz-materialism-higher-order.js`): axis quizzes like the main quiz. |
| `data/quiz-data.js` | `QUIZ_DATA_VERSION` and the category list the quizzes hang off. |
| `styles.css`, `quiz.css` | All styling. |
| `quiz.html`, `favorites.html`, `history.html` | Redirects from old URLs. |
| `deploy.sh` | Check, write a new build id, commit and push to `main`. |
| `tools/check.js` | Syntax lint and quiz-data integrity checks. |
| `data/loc-theories.json` | Source data: every theory on the Landscape of Consciousness, pulled verbatim from the site. Not loaded by the site — see below. |
| `tools/smoke.js` | Headless phone-size walk-through of every page. |
| `tools/scaffold-axis-quiz.js`, `tools/integrate-quiz.js` | Start a new axis quiz from a category's theory list; swap a finished one into the site. |
| `tools/eval-quiz.js` | Checks every axis quiz sorts people correctly: ideal and noisy synthetic respondents, edge cases, and role-played thinkers (`tools/eval-thinkers*.json`). |
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

## LOC theory source data

`data/loc-theories.json` is a straight dump of the
[Landscape of Consciousness](https://loc.closertotruth.com/) (LOC) theory
pages, kept here as the source of truth for onboarding new theories. It is
not loaded by the site and contains no quiz content — just what LOC itself
publishes, copied from the structured data on each theory page:

- `name`, `slug`, `url` — the theory and where it lives on LOC
- `category` / `subcategory` — LOC's own placement (subcategory is null
  where LOC has none)
- `kind` — `theory`, or `overview` for LOC's category/school overview
  entries (their LOC shortcode is "Overview")
- `summary` — LOC's one-paragraph summary of the theory
- `claims` — the page's "Key Takeaways" (Core Claim, How It Works,
  Distinguishing Idea, …) as `{title, text}` pairs; some pages have none
  on LOC, so `claims` is empty for those
- `theorists` — who the theory is attached to (name, role, LOC's
  per-person verified flag)
- `verified`, `verificationStatus`, `verifiedAt`, `verifiedBy` — LOC's
  review state for the entry, exactly as published
- `publicationDate`, `sourceUpdatedAt` — LOC's own dates for the entry
- `pulledAt` — the date this entry was pulled (also `lastPull` at the top
  of the file for the pull as a whole)

The top level also has an `unavailable` list: pages linked from LOC's
sitemap or homepage that returned 404 when pulled.

To refresh it, run:

```sh
node tools/scrape-loc.js
```

That re-reads LOC's sitemap plus the homepage's theory links, fetches
every theory page, and rewrites `data/loc-theories.json`. Counts and dates
in the file are from the last run — check `lastPull` before relying on it.

## Deploy

GitHub Pages serves `main`. Run `./deploy.sh "message"`.

Work in progress is tracked in `PLAN.md`.

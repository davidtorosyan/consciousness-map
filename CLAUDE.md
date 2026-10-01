# Notes for agents working on this repo

A static, phone-first site that maps theories of consciousness onto the
[Landscape of Consciousness](https://loc.closertotruth.com/) (LOC) taxonomy.
No build step, no dependencies, served as-is by GitHub Pages from `main`.
See `README.md` for the file layout and `PLAN.md` for work in progress.

## Conventions

- **Plain browser JavaScript.** ES5-style (`var`, `function`, IIFEs) to match
  the existing code. No frameworks, bundlers or npm packages in the site.
- **Every view lives at `/` with `?path=a/b/c`.** Old URLs (`quiz.html`,
  `favorites.html`, `history.html`, `?r=`, `#/category/…`) must keep working;
  they are in shared links and people's bookmarks.
- **Escape data in HTML.** Views are built from strings; anything that comes
  from data or storage goes through `esc()`.
- **LOC names are canonical.** Category names, colors and theory names follow
  LOC exactly. Taglines and quiz wording are ours.
- **Bump `QUIZ_DATA_VERSION`** in `data/quiz-data.js` whenever questions
  change; shared result links carry it and old ones are rejected.
- **localStorage keys** (`cm_favorites_v1`, `cm_history_v1`) hold users' data.
  Don't change their shape without a migration.

## Checking your work

```sh
node tools/check.js          # data integrity + syntax lint (no dependencies)
node tools/smoke.js          # headless browser walk-through (needs Playwright)
python3 -m http.server 8765  # then open http://localhost:8765/
```

Run both checks before committing. `deploy.sh` runs them too.

## Deploying

`./deploy.sh "message"` runs the checks, writes a new build id to
`version.json`, commits, and pushes to `main`. Only the owner deploys; agents
work on branches.

Cache busting: GitHub Pages lets browsers cache every file for 10 minutes,
`index.html` included. So `index.html` is a small loader: it fetches
`version.json` with the cache bypassed and loads every script and stylesheet
as `?v=<build>`. New scripts or stylesheets go in its `JS`/`CSS` lists, not
in `<script>`/`<link>` tags. The committed `version.json` says `"dev"`, which
means "never cache" (handy locally; also the safe fallback). The home footer
shows the build a device is running.

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
- **Every page has one clear call to action**, visible without scrolling.
  Category/school pages: take the quiz (browsing is a quiet secondary link).
  Results: go deeper. Secondary actions are visually quieter than the primary.
- **Escape data in HTML.** Views are built from strings; anything that comes
  from data or storage goes through `esc()`.
- **LOC names are canonical.** Category names, colors and theory names follow
  LOC exactly. Taglines and quiz wording are ours.
- **Bump `QUIZ_DATA_VERSION`** in `data/quiz-data.js` whenever questions
  change; shared result links carry it and old ones are rejected.
- **Analytics** (`analytics.js`, GoatCounter): no cookies, nothing personal.
  New interactions worth counting get a `data-count="<what>"` attribute;
  answers are counted one question at a time, never as a set, and
  nothing that could identify a person is sent.
- **localStorage keys** (`cm_favorites_v1`, `cm_history_v1`) hold users' data.
  Don't change their shape without a migration.

## Checking your work

```sh
node tools/check.js          # data integrity + syntax lint (no dependencies)
node tools/eval-quiz.js      # do the axis quizzes sort people correctly?
node tools/smoke.js          # headless browser walk-through (needs Playwright)
python3 -m http.server 8765  # then open http://localhost:8765/
```

Run the checks before committing. `deploy.sh` runs them too.

Axis quizzes: the main quiz (`data/main-quiz.js`) and, as they're rebuilt,
category quizzes (`data/quiz-<key>.js`, e.g. Panpsychisms) score by axes:
questions measure positions on a few underlying questions, targets
(families or theories) have positions on them, and a match is cosine
similarity. Each question measures exactly one axis (two-axis questions
pushed No-answerers the wrong way; `check.js` enforces it). Give targets
their justified rejections, not just their signature, or sparse profiles get
swamped. After changing questions or positions, run `tools/eval-quiz.js`;
every target's ideal respondent must still rank first. Re-run the blind
role-play (`tools/eval-thinkers*.json`) after changing question wording.
Hard cap: 12 questions per quiz (`check.js` fails above it); fewer is
better. Theories LOC hasn't verified carry `review: true` (check.js compares
names and status with `data/loc-theories.json`). When a quiz can't tell a
theory from a sibling, give it `group: "<sibling key>"` and no profile: it
shares that row in results. Leave out theories a quiz can't place credibly;
the site never lists theories its quizzes don't cover.
New quiz files go in `index.html`'s loader list; the tools read it.
`tools/scaffold-axis-quiz.js <key>` starts one from a quiz's theory list and
`tools/integrate-quiz.js <key>` swaps a finished file into the site.

## Deploying

`./deploy.sh "message"` runs the checks, writes a new build id to
`version.json`, commits, and pushes to `main`. Agents have the owner's
standing go-ahead to deploy without asking: commit on the working branch,
fast-forward `main` to it, run `./deploy.sh` from `main` (it refuses if the
checks fail), then fast-forward the branch to `main` again.

Cache busting: GitHub Pages lets browsers cache every file for 10 minutes,
`index.html` included. So `index.html` is a small loader: it fetches
`version.json` with the cache bypassed and loads every script and stylesheet
as `?v=<build>`. New scripts or stylesheets go in its `JS`/`CSS` lists, not
in `<script>`/`<link>` tags. The committed `version.json` says `"dev"`, which
means "never cache" (handy locally; also the safe fallback). The home footer
shows the build a device is running.

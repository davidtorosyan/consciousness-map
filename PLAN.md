# Cleanup plan

Working plan for the technical and UX cleanup that followed the October 2026
repo review. Product work (quiz redesign, scoring, theory content) is
**deliberately out of scope** here and listed at the bottom so it isn't lost.

Each item below is one commit (or a small group) on
`claude/repo-review-feedback-93q9gm`. Tick items off as they land.

## Technical

- [x] **T1. Docs.** This plan, a `CLAUDE.md` with conventions for agents, and a
      README that describes the current site (it still describes V3: six
      territory cards, `map-data.js`, `build_data.py`).
- [x] **T2. Data checks.** `tools/check.js`: one Node script, no dependencies,
      that loads the data the way the browser does and fails on broken
      references (scored keys that aren't areas, schools without a quiz,
      missing URLs, duplicate keys, quizzes over the question cap as a
      warning). `deploy.sh` runs it; the ad-hoc inline-script lint moves into
      it too.
- [x] **T3. Remove dead code.** `tools/build_data.py` (writes a file that no
      longer exists, reads `~/workspace/...`), unused `version.json`, the V3
      territory palettes and other unreferenced CSS.
- [x] **T4. One shared core.** `core.js` owns everything the four scripts
      currently copy-paste: HTML escaping, icons, localStorage/sessionStorage
      access, share-link encoding, and a **taxonomy tree** built once from
      `QUIZ_DATA` (category → school → theory, each node knowing its URL, its
      parent and its quiz). Nesting is derived from `area.sub`, not from
      key-prefix matching.
- [x] **T5. One router.** `core.js` parses `?path=` once into a route object;
      `index.html` dispatches to exactly one view. Replaces the
      `window.CM_CLAIMED` "first script to recognise the URL wins" pattern.
- [x] **T6. One navigation model: every screen is a real URL.** Only the
      question-by-question flow stays in-page. Results get their own URL
      (`?path=results/<payload>`); tapping a result opens the real
      category/school/theory page with the answers carried along (`&r=`), so
      the browser's back button just works. Removes the in-page history stack
      and the `pushState`/`replaceState`/`popstate` patches. The category page
      and its "browse" list become one page.
- [x] **T7. Escape everything.** All data-derived text goes through `esc()`.
- [x] **T8. Smoke test.** `tools/smoke.js` drives the site in headless
      Chromium (Playwright, if installed) through home → quiz → results →
      detail → back, every category/school/theory page, and fails on JS errors
      or horizontal overflow at phone width.
- [x] **T9. Safer deploy.** `deploy.sh` runs both checks, refuses to run off
      `main` (it committed to the current branch but always pushed `main`),
      refuses untracked files instead of sweeping them in with `git add -A`,
      no longer makes empty commits, and uses `sed -i.bak` so it also works
      with macOS sed.

All existing URLs (`?path=…`, legacy `?r=`, `quiz.html`, `favorites.html`,
`history.html`, `#/category/…`) keep working.

## UX

- [x] **U1. No horizontal scroll.** Progress dots become a progress bar
      (26 dots pushed "1 of 26" off-screen); long breadcrumbs wrap.
- [ ] **U2. Home.** One-sentence intro to what the Landscape of Consciousness
      is; History/Saved only shown once they have something in them; Debug
      link removed from the public footer (page still at `?path=debug`).
- [ ] **U3. Results.**
      Legend reads as match strength (strong / partial / none), and "none" is
      a neutral grey instead of red, since it mostly means "didn't come up".
      One share button and one way home instead of two of each. A clear next
      step: "Go deeper: take the <top match> quiz".
- [ ] **U4. Lists.** Category/school lists show each item's tagline and drop
      the meaningless 1–N numbering (numbers stay on results, where rank
      means something).
- [ ] **U5. Detail pages aren't dead ends.** Bookmark and "Read on LOC ↗"
      become labelled buttons; the ⓘ icon that silently left the site goes
      away; theory pages list the other theories in the same school.
- [ ] **U6. Consistent wording.** "Browse the map" vs the list-icon "Browse"
      meant different things. One name per destination.
- [ ] **U7. Contrast.** Raise the faint/muted greys to pass WCAG AA on the
      dark background.

## Later: product (not in this pass)

- Rebuild the top-level quiz around trade-off questions that actually split
  people; today every question scores exactly one target on "Yes".
- "No" answers that push you *toward* a view you just rejected
  (all-No → Dualisms ranks #2).
- Sub-quizzes over the 12-question cap (Idealisms 26, Dualisms 23,
  Anomalous 23, Challenge 21, …) and the one-question Phenomenology quiz.
- Real content on theory/school pages (descriptions, objections, who holds it).
- "Don't get it" text that explains rather than argues.
- Quantum & Dimensions school names are ours, not LOC's; label or realign.
- A one-sentence results summary.

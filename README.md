# The Consciousness Map (V3)

A phone-first guided map of consciousness theories. No quiz scoring — just
"pick the closest, go deeper": six top-level territory cards, subcategories
under each, and theory lists with links to Closer to Truth entries.

Live: https://davidtorosyan.github.io/consciousness-map/

## Structure

- `index.html` — shell
- `styles.css` — all styling (dark cinematic theme, per-territory palettes)
- `app.js` — tiny SPA router (landing → territory → theory list), View Transitions API
- `data/map-data.js` — generated; taxonomy + 120 theories + CTT links
- `tools/build_data.py` — regenerates `data/map-data.js` from
  `~/workspace/consciousness-theory-quiz/data/theories.js` plus the taxonomy
  defined in the script

## Taxonomy source

`~/workspace/consciousness-map-v3/taxonomy-draft.md` — the reviewed draft this
was built from (6 top-level cards; "Just the brain" has the full 7-subcategory
level 2).

## Deploy

GitHub Pages auto-deploys from `main` (legacy build, path `/`). Bump `version.json`
on each release.

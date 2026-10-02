#!/bin/bash
# deploy.sh — cache-busting deploy for the Consciousness Map.
# Writes a new build id to version.json, which index.html's loader reads
# (bypassing the cache) to load every asset as ?v=<build>. Phones see a
# deploy as soon as GitHub Pages publishes it. Then commits and pushes main.
#
# Usage: ./deploy.sh "commit message"
set -euo pipefail
cd "$(dirname "$0")"

MSG="${1:-Site update}"
V="$(date +%Y%m%d-%H%M%S)"

# GitHub Pages serves main; committing anywhere else and pushing main
# would silently ship nothing.
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$BRANCH" != "main" ]; then
  echo "deploy: on '$BRANCH', not main. Merge to main first." >&2
  exit 1
fi
# Only ship what git already knows about: new files must be added on purpose.
UNTRACKED="$(git ls-files --others --exclude-standard)"
if [ -n "$UNTRACKED" ]; then
  echo "deploy: untracked files (git add them, or add them to .gitignore):" >&2
  echo "$UNTRACKED" >&2
  exit 1
fi

# Checks: every script parses, the quiz data is consistent, every family's
# ideal respondent lands on that family, and (when Playwright is installed)
# every page renders and the main flows work.
node tools/check.js
node tools/eval-quiz.js > /dev/null || { echo "deploy: tools/eval-quiz.js failed; run it to see why" >&2; exit 1; }
node tools/smoke.js

printf '{"v":"%s"}\n' "$V" > version.json

git add -u
git commit -m "$MSG"
git push origin main
echo "Deployed with asset version v=$V"

#!/bin/bash
# deploy.sh — cache-busting deploy for the Consciousness Map.
# Stamps local .js/.css asset URLs with a version (?v=...), so phones
# and browsers always fetch fresh files after a deploy instead of
# serving stale cached copies. Then commits and pushes main.
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

# Checks: every script parses, the quiz data is consistent, and (when
# Playwright is installed) every page renders and the main flows work.
node tools/check.js
node tools/smoke.js

for f in *.html; do
  # strip any previous stamp
  sed -i.bak -E 's/\?v=[0-9]{8}-[0-9]{6}//g' "$f"
  # stamp local (non-absolute) .js/.css asset URLs
  sed -i.bak -E 's/((src|href)=")([^":]+\.(js|css))(")/\1\3?v='"$V"'\5/g' "$f"
  rm -f "$f.bak"
done

git add -u
git commit -m "$MSG"
git push origin main
echo "Deployed with asset version v=$V"

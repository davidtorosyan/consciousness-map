#!/bin/bash
# deploy.sh — cache-busting deploy for the Consciousness Map.
# Stamps local .js/.css asset URLs with a version (?v=...), so phones
# and browsers always fetch fresh files after a deploy instead of
# serving stale cached copies. Then commits and pushes.
#
# Usage: ./deploy.sh "commit message"
set -euo pipefail
cd "$(dirname "$0")"

MSG="${1:-Site update}"
V="$(date +%Y%m%d-%H%M%S)"

for f in index.html quiz.html favorites.html history.html; do
  # strip any previous stamp
  sed -i -E 's/\?v=[0-9]{8}-[0-9]{6}//g' "$f"
  # stamp local (non-absolute) .js/.css asset URLs
  sed -i -E 's/((src|href)=")([^":]+\.(js|css))(")/\1\3?v='"$V"'\5/g' "$f"
done

git add -A
git commit -m "$MSG" --allow-empty
git push origin main
echo "Deployed with asset version v=$V"

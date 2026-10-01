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

# pre-deploy lint: every standalone .js file and every inline <script> block
# must parse. (A single syntax error in an inline script blanks the whole page.)
for f in app.js quiz.js saved.js history.js data/categories.js data/quiz-data.js; do
  node --check "$f" || { echo "LINT FAIL: $f"; exit 1; }
done
for f in index.html quiz.html favorites.html history.html; do
  python3 - "$f" <<'PYEOF' > /tmp/inline-check.js
import re, sys
html = open(sys.argv[1]).read()
blocks = [m.group(1) for m in re.finditer(r'<script>(.*?)</script>', html, re.S)]
print("\n".join(blocks))
PYEOF
  [ -s /tmp/inline-check.js ] || continue
  node --check /tmp/inline-check.js || { echo "LINT FAIL: inline script in $f"; exit 1; }
done
echo "lint ok"

# ASI hazard lint: a line containing only `return` (value on the next line)
# silently returns undefined. node --check cannot catch this.
if grep -rln --include='*.js' -E '^\s*return\s*$' app.js quiz.js saved.js history.js data/categories.js data/quiz-data.js; then
  echo "LINT FAIL: lone 'return' line (ASI returns undefined) in the files above"; exit 1
fi

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

#!/bin/bash
# we only want to lint the staged
for file in $(git diff --cached --name-only | grep -E 'src/.+\.(js|jsx|vue)$')
do
  git show ":$file" | npx eslint --format node_modules/eslint-formatter-markdown/markdown.js --stdin --stdin-filename "$file" -o ".todo/${file}.lint.md"
done

# if [ $? -ne 0 ]; then
#   echo "
#   ESLint <b style='color: red;'>failed</b> on staged files.<br>
#   See: <a href="#">.lint-todo</a> directory fo details.<br>
#   Check lint problems with <b><code>npm run lint:staged</code></b>.<br>
#   "
#   exit 1 # exit with failure status
# fi

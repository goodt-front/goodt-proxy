#!/bin/sh
# we only want to lint differed from master
for file in $(git diff --stat --cached --name-only origin/master | grep -E '\.(js|jsx|vue|ts|tsx)$')
do
  git show ":$file" | npx eslint --format node_modules/eslint-formatter-markdown/markdown.js --stdin --stdin-filename "$file" -o ".todo/${file}.lint.md"
done

# if [ $? -ne 0 ]; then
#   echo "
#   ✖ ESLint errors during push.
#   <br>
#   ESLint <b style='color: red;'>failed</b> on staged files.<br>
#   See: <a href="#">.lint-todo</a> directory fo details.<br>
#   Check lint problems with <b><code>npm run lint:staged</code></b>.<br>
#   <br>"
#   exit 1 # exit with failure status
# fi
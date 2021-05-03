#!/bin/sh
# we only want to lint the staged
for file in $(git diff --cached --name-only | grep -E '\.(js|jsx|ts|vue)$')
do
  git show ":$file" | npx eslint --format friendly --stdin --stdin-filename "$file"
  git show ":$file" | npx eslint --format node_modules/eslint-formatter-markdown/markdown.js --stdin --stdin-filename "$file" -o ".todo/lint/${file}.lint.md"
done

if [ $? -ne 0 ]; then
  echo "
  ESLint failed on staged files.
  See: .lint-todo directory fo details.
  Please check your code and try again.
  You can run ESLint manually via npm run lint:staged."
  exit 1 # exit with failure status
fi

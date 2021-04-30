#!/bin/sh
# we only want to lint differed from master
for file in $(git diff --stat --cached --name-only origin/master | grep -E '\.(js|jsx|vue|ts|tsx)$')

do
  git show ":$file" | npx eslint --format friendly --stdin --stdin-filename "$file"

  if [ $? -ne 0 ]; then
    echo "ESLint failed on staged file '$file'. Please check your code and try again. You can run ESLint manually via npm run lint."
    exit 1 # exit with failure status
  fi
done

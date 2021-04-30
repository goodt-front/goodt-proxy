#!/bin/sh
npx eslint --format node_modules/eslint-formatter-markdown/markdown.js src/ -o ".todo/lint/all.lint.md"
export EFF_ABSOLUTE_PATHS=true
npx eslint --format friendly src/

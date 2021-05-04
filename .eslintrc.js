const { isProd } = require('./.utils');

module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', 'plugin:jsdoc/recommended', '@vue/airbnb', 'prettier'],
    parserOptions: {
        parser: '@babel/eslint-parser',
        sourceType: 'module',
        allowImportExportEverywhere: true
    },
    rules: {
        'no-unused-vars': isProd ? 'warning' : 0,
        // allow console.log during development only
        'no-console': isProd ? 'error' : 0,
        // allow debugger during development only
        'no-debugger': isProd ? 'error' : 0,

        // Editor-specific rule override
        // offs
        'no-underscore-dangle': 0,
        'no-plusplus': 0,
        'import/no-extraneous-dependencies': 0,
        // warns
        'no-alert': 'warn',
        'import/prefer-default-export': 'warn',
        // jsdoc
        'jsdoc/newline-after-description': 0,
        'jsdoc/require-returns-description': 0 // Recommended
    },
    settings: {
        jsdoc: {
            mode: 'typescript',
            tagNamePreference: {
                returns: 'return'
            }
        }
    }
};

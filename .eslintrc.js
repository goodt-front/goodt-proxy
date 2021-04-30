const { isProd } = require('./.utils');

module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', '@vue/airbnb', 'prettier'],
    parserOptions: {
        parser: '@babel/eslint-parser',
        sourceType: 'module',
        allowImportExportEverywhere: true
    },
    rules: {
        'no-unused-vars': isProd ? 'warning' : 'off',
        // allow console.log during development only
        'no-console': isProd ? 'error' : 'off',
        // allow debugger during development only
        'no-debugger': isProd ? 'error' : 'off',

        // Editor-specific rule override
        // offs
        'no-underscore-dangle': 'off',
        'no-plusplus': 'off',
        'import/no-extraneous-dependencies': 'off',
        // warns
        'no-alert': 'warn',
        'import/prefer-default-export': 'warn'
    }
};

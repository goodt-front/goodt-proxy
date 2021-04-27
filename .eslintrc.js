const { isProd } = require('./.utils');

module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['eslint:recommended', 'plugin:vue/essential'],
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
        allowImportExportEverywhere: true
    },
    rules: {
        'no-unused-vars': isProd ? 'warning' : 'off',
        // allow console.log during development only
        'no-console': isProd ? 'error' : 'off',
        // allow debugger during development only
        'no-debugger': isProd ? 'error' : 'off'
    }
};

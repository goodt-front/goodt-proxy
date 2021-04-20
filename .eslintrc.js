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
        'no-unused-vars': 'off'
    }
};

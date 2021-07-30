module.exports = {
    root: true,
    env: {
        node: true
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@babel/eslint-parser',
        sourceType: 'module',
        allowImportExportEverywhere: true
    },

    extends: ['prettier']
    // plugins: ['putout']
};

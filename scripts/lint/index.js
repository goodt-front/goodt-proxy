const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', 'airbnb-base', 'prettier'],
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
        'import/resolver': {
            // https://github.com/benmosher/eslint-plugin-import/issues/1396
            [require.resolve('eslint-import-resolver-node')]: {},
            [require.resolve('eslint-import-resolver-webpack')]: {
                config: require.resolve('@vue/cli-service/webpack.config.js')
            }
        },
        'import/extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
        jsdoc: {
            mode: 'typescript',
            tagNamePreference: {
                returns: 'return'
            }
        }
    }
};

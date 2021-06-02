const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', 'airbnb-base', 'prettier'],
    plugins: ['unicorn', 'radar'],
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
        'import/prefer-default-export': 0,
        // jsdoc
        'jsdoc/newline-after-description': 0,
        'jsdoc/require-returns-description': 0, // Recommended
        //
        'id-length': [
            'error',
            {
                min: 3,
                max: 40,
                exceptions: [
                    '_',
                    'x',
                    'e',
                    'h',
                    'i',
                    '$c',
                    'id',
                    'vm',
                    'ns',
                    'of',
                    'in',
                    'tr',
                    'td',
                    'to'
                ]
            }
        ],
        //
        'unicorn/prevent-abbreviations': [
            'error',
            {
                extendDefaultAllowList: false,
                checkProperties: true,
                allowList: {
                    i: true,
                    acc: true,
                    Acc: true,
                    prev: true,
                    env: true,
                    Env: true,
                    lib: true,
                    elem: true,
                    Elem: true,
                    arg: true,
                    args: true,
                    Args: true,
                    attrs: true,
                    Attrs: true,
                    attr: true,
                    Attr: true,
                    param: true,
                    params: true,
                    Params: true,
                    Param: true,
                    props: true,
                    Props: true,
                    prop: true,
                    var: true,
                    vars: true,
                    src: true,
                    Vars: true,
                    val: true,
                    Val: true,
                    fn: true
                }
            }
        ]
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

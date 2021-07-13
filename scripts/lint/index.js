const isProd = process.env.NODE_ENV === 'production';

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

    extends: [
        'airbnb-base',
        'plugin:vue/recommended',
        'plugin:vue-scoped-css/recommended',
        'prettier'
    ],
    plugins: ['unicorn', 'radar', 'vue-scoped-css', 'vue'],

    rules: {
        // Common
        'no-unused-vars': isProd ? 'warning' : 0,
        // allow console.log during development only
        'no-console': isProd ? 'error' : 0,
        // allow debugger during development only
        'no-debugger': isProd ? 'error' : 0,

        // Vue.js specific
        'vue/v-on-function-call': ['error', 'never'],

        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: {
                    max: 3,
                    allowFirstLine: true
                },
                multiline: {
                    max: 1,
                    allowFirstLine: false
                }
            }
        ],
        'vue/match-component-file-name': 'error',
        'vue/no-static-inline-styles': [
            'error',
            {
                allowBinding: true
            }
        ],
        'vue/no-side-effects-in-computed-properties': ['error', 'always'],

        'vue-scoped-css/enforce-style-type': ['error', { allows: ['scoped', 'module'] }],
        'vue-scoped-css/no-unused-selector': 0,
        'vue-scoped-css/require-selector-used-inside': 0,

        // Editor specific
        // offs
        'no-plusplus': 0,
        'import/no-extraneous-dependencies': 0,
        // warns
        'no-underscore-dangle': 'warn',
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
                    'y',
                    'e',
                    'h',
                    'i',
                    'j',
                    '$c',
                    'id',
                    'vm',
                    'ns',
                    'of',
                    'in',
                    'tr',
                    'td',
                    'to',
                    'el'
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
                    fn: true,
                    num: true,
                    el: true
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

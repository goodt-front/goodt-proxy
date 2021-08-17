const isProduction = process.env.NODE_ENV === 'production';

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
    plugins: ['unicorn', 'radar', 'vue-scoped-css', 'vue', 'goodt-rules', 'putout'],

    rules: {
        /* goodt-rules */
        'goodt-rules/component-name-regex': 2,
        'goodt-rules/data-boolean-key-naming': 2,
        'goodt-rules/deprecate-member-expression': [
            'error',
            { name: 'triggerStateChange', use: 'this.$storeCommit()' },
            { name: 'listenStateChange', use: 'watch: { $storeState(state) { ... } }' },
            { name: 'triggerNavigate', use: 'this.$routeNavigate()' },
            { name: 'Http', use: '"createTransport(HttpTransportSymbol, options)" factory' },
            { name: 'HttpAuth', use: '"createTransport(HttpAuthTransportSymbol, options)" factory' }
        ],

        /* eslint-recommended */
        'no-unused-vars': isProduction ? 'warning' : 0,
        // allow console.log during development only
        'no-console': isProduction ? 'error' : 0,
        // allow debugger during development only
        'no-debugger': isProduction ? 'error' : 0,

        'no-underscore-dangle': [
            'error',
            {
                allowAfterSuper: true,
                allowAfterThis: true,
                enforceInMethodNames: false,
                allowAfterThisConstructor: true
            }
        ],
        'class-methods-use-this': 'off',

        // offs
        'no-plusplus': 0,
        // warns
        'no-alert': 'warn',
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

        'import/no-extraneous-dependencies': 0,
        'import/prefer-default-export': 0,

        // unicorn
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
                    opt: true,
                    vars: true,
                    src: true,
                    Vars: true,
                    val: true,
                    Val: true,
                    vm: true,
                    fn: true,
                    num: true,
                    el: true,
                    $el: true
                }
            }
        ],

        /* eslint-plugin-vue */
        'vue/comment-directive': 0,
        'vue/v-on-function-call': ['error', 'never'],

        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: {
                    max: 20,
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
        'vue/no-side-effects-in-computed-properties': 'error',

        //
        'vue-scoped-css/enforce-style-type': ['error', { allows: ['scoped', 'module'] }],
        'vue-scoped-css/no-unused-selector': 0,
        'vue-scoped-css/require-selector-used-inside': 0,

        // Editor specific

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

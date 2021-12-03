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

    extends: ['airbnb-base', 'plugin:vue/recommended', 'plugin:vue-scoped-css/recommended', 'prettier'],
    plugins: [
        'unicorn',
        'radar',
        'more',
        'unused-imports',
        'better-mutation',
        'vue',
        'vue-scoped-css',
        'goodt-rules',
        'ban',
        'putout'
    ],

    rules: {
        /* goodt-rules */
        'goodt-rules/component-name-regex': 'error',
        'goodt-rules/data-boolean-key-naming': 'error',
        'goodt-rules/deprecate-member-expression': [
            'error',
            { name: 'triggerStateChange', use: 'this.$storeCommit()' },
            { name: 'listenStateChange', use: 'watch: { $storeState(state) { ... } }' },
            { name: 'triggerNavigate', use: 'this.$routeNavigate()' },
            {
                name: 'Http',
                use: '"createTransport(HttpTransportSymbol, options)" factory or Service instead'
            },
            {
                name: 'HttpAuth',
                use: '"createTransport(HttpAuthTransportSymbol, options)" factory or Service instead'
            },
            {
                name: 'createWidgetApiService',
                use: '"useApiServiceMixin" form scaffold for creating service instance'
            },
            {
                name: 'OrgStructureApiService',
                use: 'common service with "useOrgStructureApiServiceMixin" from "import { useOrgStructureApiServiceMixin } from \'@goodt-common/api\';"'
            },
            {
                name: 'LearningApiService',
                use: 'common service with "useLearningApiServiceMixin" from "import { useLearningApiServiceMixin } from \'@goodt-common/api\';"'
            },
            {
                name: 'LearningCourseApiService',
                use: 'common service with "useLearningApiServiceMixin" from "import { useLearningApiServiceMixin } from \'@goodt-common/api\';"'
            },
            {
                name: 'ApiService',
                use: 'specify more semantic service class name (or remove if it is created by scaffold and not unused)'
            },
            {
                name: 'Service',
                use: 'migrate to more specific api service usage (extend BaseApiService) or reuse existing common one'
            },
            { name: 'serviceOrgstructure', use: '"orgStructureApi" property name instead' },
            { name: 'serviceOrgStructure', use: '"orgStructureApi" property name instead' },
            { name: 'serviceTasksettings', use: '"taskSettingsApi" property name instead' },
            { name: 'serviceTaskSettings', use: '"taskSettingsApi" property name instead' }
        ],
        'goodt-rules/no-long-prop-chains': ['error', { depth: 3 }],
        'ban/ban': [
            2,
            {
                name: 'createApiService',
                message:
                    'Using "createApiService" is deprecated. Reuse "useApiServiceMixin" form scaffold to inject service instance'
            },
            {
                name: 'createOrgStructureApiService',
                message:
                    'Using "createOrgStructureApiService" is deprecated. Reuse "useApiServiceMixin" from scaffold to inject service instance'
            },
            {
                name: 'createOrgstructureApiService',
                use: 'Using "createOrgstructureApiService" is deprecated. Reuse "useApiServiceMixin" from scaffold to inject service instance'
            },
            {
                name: 'createTaskSettingsApiService',
                message:
                    'Using "createTaskSettingsApiService" is deprecated. Reuse "useApiServiceMixin" from scaffold to inject service instance'
            },
            {
                name: 'createTasksettingsApiService',
                use: 'Using "createTasksettingsApiService" is deprecated. Reuse "useApiServiceMixin" from scaffold to inject service instance'
            },
            {
                name: 'useApiServiceMixin',
                message: 'Specify more semantic function name or remove if it is unused'
            },
            {
                name: 'createOrgStructureApiService',
                message:
                    'Use common service with "useOrgStructureApiServiceMixin" from "import { useOrgStructureApiServiceMixin } from \'@goodt-common/api\';"'
            },
            {
                name: 'ApiEndpointPaths',
                message: 'Importing and direct using of "ApiEndpointPaths" is not allowed'
            }
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
                    Prev: true,
                    env: true,
                    Env: true,
                    lib: true,
                    elem: true,
                    Elem: true,
                    Elem: true,
                    arg: true,
                    Arg: true,
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
                    Prop: true,
                    var: true,
                    Var: true,
                    opt: true,
                    vars: true,
                    src: true,
                    Vars: true,
                    val: true,
                    Val: true,
                    vm: true,
                    Vm: true,
                    fn: true,
                    Fn: true,
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

        'more/no-numeric-endings-for-variables': 'error',
        'more/force-native-methods': 'error',
        'more/prefer-includes': 'error',

        'unused-imports/no-unused-imports': 'error',

        'better-mutation/no-mutating-functions': 'error',
        /*
        'better-mutation/no-mutating-methods': 'error',
        'better-mutation/no-mutation': 'error',
         */
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

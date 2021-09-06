const disallowedClasses = require('@goodt/postcss-config/tw-ignored-classes');

module.exports = {
    ignoreFiles: ['**/*.js', '**/*.ts'],
    defaultSeverity: 'error',
    processors: [
        [
            '@mapbox/stylelint-processor-arbitrary-tags',
            {
                fileFilterRegex: ['\\.vue$']
            }
        ]
    ],
    extends: [
        'stylelint-config-recommended',
        'stylelint-config-skyscanner',
        'stylelint-declaration-strict-value'
    ],
    plugins: [],
    rules: {
        'selector-disallowed-list': disallowedClasses.classes,
        'scss/at-rule-no-unknown': 0,
        'at-rule-allowed-list': ['apply', 'tailwind', 'b', 'e', 'm'],
        'no-empty-source': 0,
        'order/properties-order': 0,
        'at-rule-no-unknown': 'warning',
        'at-rule-empty-line-before': 0,
        'selector-pseudo-element-colon-notation': 'warning',
        'selector-max-compound-selectors': 'warning',
        'scale-unlimited/declaration-strict-value': [['/color$/', 'font-size', 'font-family']]
    }
};

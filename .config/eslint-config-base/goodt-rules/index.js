module.exports = {
    rules: {
        'component-name-regex': require('./rules/component-name-regex'),
        'deprecate-member-expression': require('./rules/deprecate-member-expression'),
        'data-boolean-key-naming': require('./rules/data-boolean-key-naming')
    },
    configs: {
        base: require('./configs/base')
    },
    processors: {
        '.vue': require.resolve('eslint-plugin-vue/lib/processor')
    }
};

module.exports = {
    rules: {
        'component-name-regex': require('./rules/component-name-regex')
    },
    configs: {
        base: require('./configs/base')
    },
    processors: {
        '.vue': require.resolve('eslint-plugin-vue/lib/processor')
    }
};

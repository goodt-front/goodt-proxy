module.exports = {
    extends: ['@goodt/eslint-config-base', 'plugin:jsdoc/recommended'],
    settings: {
        jsdoc: {
            mode: 'typescript',
            tagNamePreference: {
                returns: 'return'
            }
        }
    }
};

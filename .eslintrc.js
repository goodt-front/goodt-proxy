module.exports = {
    extends: ['@goodt/base', 'plugin:jsdoc/recommended'],
    settings: {
        jsdoc: {
            mode: 'typescript',
            tagNamePreference: {
                returns: 'return'
            }
        }
    }
};

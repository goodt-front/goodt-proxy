const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const importPlugin = require('postcss-import');
const nested = require('postcss-nested');
const postcssBem = require('postcss-bem-fix');
const variables = require('postcss-advanced-variables');

const removeDeclaration = (env = process.env.NODE_ENV) => {
    if (env !== 'production') {
        return [];
    }
    const twIgnoredClasses = require('@goodt/postcss-config/tw-ignored-classes');
    const removeDeclarationPlugin = require('postcss-remove-declaration');
    const removeDeclarationsData = Object.fromEntries(
        twIgnoredClasses.classes.map((classSelector) => [classSelector, '*'])
    ); // Removes all properties from conflicting classes

    return [removeDeclarationPlugin({ remove: removeDeclarationsData })];
};

const plugins = [
    importPlugin,
    variables,
    postcssBem({
        style: 'bem',
        separators: {
            modifier: '--'
        },
        shortcuts: {
            component: 'b',
            descendent: 'e',
            modifier: 'm'
        }
    }),
    tailwindcss,
    nested,
    ...removeDeclaration(),
    autoprefixer
];

module.exports = {
    plugins
};

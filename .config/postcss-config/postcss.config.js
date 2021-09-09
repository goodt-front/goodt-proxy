const variables = require('postcss-advanced-variables');
const nested = require('postcss-nested');
const postcssBem = require('postcss-bem-fix');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
/*
const importPlugin = require('postcss-import');
*/

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

const postcssOnlyPlugins = [
    /* importPlugin, */
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
    nested
];

const commonPlugins = [tailwindcss, ...removeDeclaration(), autoprefixer];

module.exports = (api) => {
    // `api.file` - path to the file
    // `api.mode` - `mode` value of webpack, please read https://webpack.js.org/configuration/mode/
    // `api.webpackLoaderContext` - loader context for complex use cases
    // `api.env` - alias `api.mode` for compatibility with `postcss-cli`
    // `api.options` - the `postcssOptions` options    plugins
    if (/goodt-framework-css$/.test(api.file)) {
        return {
            plugins: [autoprefixer]
        };
    }

    if (/\.less$/.test(api.file)) {
        return {
            plugins: commonPlugins
        };
    }

    return {
        plugins: [...postcssOnlyPlugins, ...commonPlugins]
    };
};

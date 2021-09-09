const path = require('path');
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

const postcssOnlyPlugins = (env) => [
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
    nested,
    tailwindcss
];

const commonPlugins = (env = 'production') => [
    // purgecss,
    ...removeDeclaration(env),
    autoprefixer
];

module.exports = (api) => {
    // `api.file` - path to the file
    // `api.mode` - `mode` value of webpack, please read https://webpack.js.org/configuration/mode/
    // `api.webpackLoaderContext` - loader context for complex use cases
    // `api.env` - alias `api.mode` for compatibility with `postcss-cli`
    // `api.options` - the `postcssOptions` options    plugins
    const {
        env,
        options: { excludePatterns = [] }
    } = api;
    const { basename, dirname } = api.file;
    const pathName = path.join(dirname, basename);

    if (excludePatterns.some((re) => re.test(pathName))) {
        return {
            plugins: [autoprefixer]
        };
    }
    if (/\.(less|css)$/.test(basename)) {
        return {
            plugins: commonPlugins(env)
        };
    }

    return {
        plugins: [...postcssOnlyPlugins(env), ...commonPlugins(env)]
    };
};

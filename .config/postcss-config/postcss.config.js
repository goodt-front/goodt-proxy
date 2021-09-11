const path = require('path');
const variables = require('postcss-advanced-variables');
const nested = require('postcss-nested');
const postcssBem = require('postcss-bem-fix');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
/*
const importPlugin = require('postcss-import');
*/

/*
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
*/

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
    // ...removeDeclaration(env),
    // autoprefixer
];

const basePlugins = () => [autoprefixer];

module.exports = (api) => {
    // `api.mode` - `mode` value of webpack, please read https://webpack.js.org/configuration/mode/
    // `api.webpackLoaderContext` - loader context for complex use cases
    // `api.env` - alias `api.mode` for compatibility with `postcss-cli`
    // `api.options` - the `postcssOptions` options    plugins
    const { file, env = 'development' } = api;

    const isVite = file == null;
    if (isVite) {
        return {
            plugins: [...basePlugins(env), ...commonPlugins(env), ...postcssOnlyPlugins(env)]
        };
    }

    const { options: { excludePatterns = [] } = {} } = api;
    const { basename, dirname } = file;
    const pathName = path.join(dirname, basename);

    let plugins = basePlugins(env);

    if (excludePatterns.some((re) => re.test(pathName))) {
        return {
            plugins
        };
    }

    plugins = [...commonPlugins(env), ...plugins];
    if (/\.(less|css)$/.test(basename)) {
        return {
            plugins
        };
    }

    plugins = [...postcssOnlyPlugins(env), ...plugins];

    return {
        plugins
    };
};

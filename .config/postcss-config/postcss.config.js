const path = require('path');
const variables = require('postcss-advanced-variables');
const nested = require('postcss-nested');
const postcssBem = require('postcss-bem-fix');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const px2rem = require('postcss-plugin-px2rem');

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

const BASE_PLUGINS = [
    autoprefixer,
    px2rem({
        rootValue: 16,
        selectorBlackList: [':root']
    })
];

const POSTCSS_ONLY_PLUGINS = [
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

const postcssOnlyPluginsByEnv = (/* env */) => POSTCSS_ONLY_PLUGINS;
const basePluginsByEnv = (/* env */) => BASE_PLUGINS;

module.exports = (api) => {
    // `api.mode` - `mode` value of webpack, please read https://webpack.js.org/configuration/mode/
    // `api.webpackLoaderContext` - loader context for complex use cases
    // `api.env` - alias `api.mode` for compatibility with `postcss-cli`
    // `api.options` - the `postcssOptions` options    plugins
    const { file, env = 'development' } = api;

    // BASE PLUGINS BY ENV
    const basePlugins = basePluginsByEnv(env);
    const postcssPlugins = postcssOnlyPluginsByEnv(env);

    // VITE, DEVELOPMENT MODE
    const isVite = file == null;
    if (isVite) {
        return {
            plugins: [...basePlugins, ...postcssPlugins]
        };
    }

    // WEBPACK
    const { options: { excludePatterns = [] } = {} } = api;
    const { basename, dirname } = file;

    const isOnlyBasePlugins = [
        // process css and less only with base
        /\.(less|css)$/.test(basename),
        // or exclude files by pattern
        excludePatterns.some((re) => re.test(path.join(dirname, basename)))
    ].some(Boolean);

    // BASE PLUGINS
    if (isOnlyBasePlugins) {
        return {
            plugins: basePlugins
        };
    }

    // BASE + POSTCSS-SPECIFIC PLUGINS
    return {
        plugins: [...postcssPlugins, ...basePlugins]
    };
};

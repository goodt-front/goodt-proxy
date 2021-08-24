/**
 * Jest config extensions.
 * For jest config simplicity and readability.
 */

/**
 * @example
 * const { pathsToModuleNameMapper } = require('ts-jest/utils')
 *
 * const {
 *  compilerOptions: { paths },
 * } = require('../tsconfig.json')
 *
 * module.exports.moduleNameMapper = {
 *  ...pathsToModuleNameMapper(paths, { prefix: '<rootDir>/' }),
 * }
 *
 * module.exports.transform = {
 * '.+\\.(pcss)$': 'jest-transform-stub',
 * }
 */

/**
 * ES-module package names to ignore in jest babel transpile
 * @type {string}
 */
const esModules = [
    'goodt-dremio-sdk', //
    '@goodt-wcore/core', //
    'goodteditor-ui', //
    'goodteditor-wcore' //
].join('|');
const buildTransformIgnorePatterns = (esModules) => [`<rootDir>/node_modules/(?!(${esModules})/)`];

module.exports = {
    verbose: true,
    preset: '@vue/cli-plugin-unit-jest/presets/default',
    moduleDirectories: ['src', 'node_modules'],
    transformIgnorePatterns: buildTransformIgnorePatterns(esModules),
    roots: ['<rootDir>/src/', '<rootDir>/tests/'],
    testMatch: ['**/tests/**/*.test.[jt]s?(x)', '**/__tests__/*.[jt]s?(x)']
};

module.exports.buildTransformIgnorePatterns = buildTransformIgnorePatterns;

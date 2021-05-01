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
const esModules = [].join('|');

module.exports.transformIgnorePatterns = [`<rootDir>/node_modules/(?!(${esModules})/)`];

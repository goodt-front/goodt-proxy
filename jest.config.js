const { transformIgnorePatterns } = require('./tests/.jest');

module.exports = {
    verbose: true,
    preset: '@vue/cli-plugin-unit-jest/presets/default',
    moduleDirectories: ['src', 'node_modules'],
    transformIgnorePatterns,
    testMatch: ['**/tests/**/*.test.[jt]s?(x)', '**/__tests__/*.[jt]s?(x)']
};

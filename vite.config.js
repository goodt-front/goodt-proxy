const { createVuePlugin } = require('vite-plugin-vue2');
const path = require('path');

module.exports = {
    plugins: [createVuePlugin()],
    resolve: {
        alias: {
            '@goodt-wcore/core': path.resolve(__dirname, '/src/core')
        }
    }
};

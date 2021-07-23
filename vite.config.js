const path = require('path');
const { createVuePlugin } = require('vite-plugin-vue2');
const { dependencies } = require('./package.json');

const alias = Object.entries(dependencies)
    .filter(([name]) => name.indexOf('@goodt') === 0)
    .reduce((obj, [name, value]) => {
        obj[name] = path.resolve(__dirname, value.replace('file:', ''));
        return obj;
    }, {});

module.exports = {
    plugins: [createVuePlugin()],
    resolve: { alias }
};

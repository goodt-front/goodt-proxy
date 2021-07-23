/* eslint-disable */
const webpack = require('webpack');

// @see https://github.com/npm/npm/pull/5518
module.exports = {
    lintOnSave: false,
    devServer: {
        port: 3000
    },
    pages: {
        index: {
            entry: 'src/dev/index.js'
        }
    },
    productionSourceMap: false,
    filenameHashing: true,
    css: {
        extract: false
    },
    configureWebpack: (config) => {
        //config.output.libraryExport = 'default';
        config.plugins.push(
            new webpack.DefinePlugin({
                VERSION: JSON.stringify(require('./package.json').version)
            })
        );
    }
};

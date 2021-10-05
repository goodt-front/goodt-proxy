/* eslint-disable */
const webpack = require('webpack');
const isDev = process.env.NODE_ENV !== 'production';
const fs = require('fs');

// @see https://github.com/npm/npm/pull/5518
module.exports = {
    lintOnSave: false,
    devServer: {
        port: 3000,
        https: {
            key: isDev ? fs.readFileSync('./localhost.key') : null,
            cert: isDev ? fs.readFileSync('./localhost.cert') : null
        }
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

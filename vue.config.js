/* eslint-disable */
const webpack = require('webpack');
const { isProd } = require('./.utils');

// @see https://github.com/npm/npm/pull/5518
module.exports = {
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
    configureWebpack: config => {
        if (isProd) {
            config.externals = {
                ...config.externals
                /*
                lodash: {
                    commonjs: 'lodash',
                    commonjs2: 'lodash',
                    amd: 'lodash',
                    root: '_'
                }
                */
            };
        }
        // we have a named export lib
        //config.output.libraryExport = 'default';
        config.plugins.push(
            new webpack.DefinePlugin({
                VERSION: JSON.stringify(require('./package.json').version)
            })
        );
    }
};

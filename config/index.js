'use strict';
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');
const glob = require('glob');

var build = {
    env: require('./prod.env'),
    port:8081,
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist/'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    port: 8081,
    bundleAnalyzerReport: process.env.npm_config_report
},

//根据getEntry获取所有入口主页面
pages = getEntry('src/pages/**/*.html');

//每个入口页面生成一个入口添加到build中
for (var pathname in pages) {
    build[pathname] = path.resolve(__dirname, '../dist/' + pathname + '.html')
};





module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
          '/api': {
            // target:'http://10.0.4.206:8080',
            // target: 'http://192.168.2.10:8082',
            target: 'http://ceshi.marathonbm.com',
            changeOrigin: true,
            pathRewrite: {
              '/api': '/'
            }
          },
          '/ms': {
            target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
            changeOrigin: true
          }
        },

        // Various Dev Server settings
        host: '0.0.0.0', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: false
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',

        /**
         * Source Maps
         */

        productionSourceMap: false,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
};


function getEntry(globPath) {
    var entries = {},
        basename;

    glob.sync(globPath).forEach(function (entry) {

        basename = path.basename(entry, path.extname(entry));
        entries[basename] = entry;
    });
    return entries;
}
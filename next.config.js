require('dotenv').config();
const withCSS = require('@zeit/next-sass');
// const withOffline = require('next-offline');
const withPWA = require('next-pwa');

module.exports = withPWA(
    withCSS({
        env: {
            API_URL: process.env.API_URL,
            ENV: process.env.ENV,
            BUILD_DATE:
                new Date().toLocaleDateString() +
                ' ' +
                new Date().toLocaleTimeString(),
        },
        cssModules: true,
        cssLoaderOptions: {
            importLoaders: 1,
            localIdentName: '[local]__[hash:base64:5]',
        },
        sassLoaderOptions: {
            includePaths: ['styles'],
        },
        pwa: {
            dest: 'public',
        },
    })
);

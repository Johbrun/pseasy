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
                FIREBASE_FIREBASE_API_KEY: process.env.FIREBASE_FIREBASE_API_KEY,
                FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
                FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
                FIREBASE_PROJECT_ID:process.env.FIREBASE_PROJECT_ID,
                FIREBASE_STORAGE_BUCKET:process.env.FIREBASE_STORAGE_BUCKET,
                FIREBASE_MESSAGING_SENDER_ID:process.env.FIREBASE_MESSAGING_SENDER_ID,
                FIREBASE_APP_ID:process.env.FIREBASE_APP_ID,
                FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
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

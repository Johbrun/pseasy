require('dotenv').config()
const withCSS = require("@zeit/next-sass");
const withOffline = require('next-offline')

module.exports = withOffline(withCSS({
  env: {
    API_URL: process.env.API_URL || 'https://pseasy.now.sh'
  },
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]__[hash:base64:5]"
  },
  sassLoaderOptions: {
    includePaths: ["styles"]
  }
}));

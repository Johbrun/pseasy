const withCSS = require("@zeit/next-sass");
const withOffline = require('next-offline')

module.exports = withOffline(withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]__[hash:base64:5]"
  },
  sassLoaderOptions: {
    includePaths: ["styles"]
  }
}));

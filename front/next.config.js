const withCSS = require("@zeit/next-sass");

module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]__[hash:base64:5]"
  },
  sassLoaderOptions: {
    includePaths: ["styles"]
  }
});

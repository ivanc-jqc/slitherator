const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  mode: "development",

  entry: "./content/slither.js",

  output: {
    filename: "content.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js',
      }],
    })
  ],
  target: "web"
};
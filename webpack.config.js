const path = require("path");

module.exports = {
  mode: "development",

  entry: "./slither.js",

  output: {
    filename: "content.js",
    path: path.resolve(__dirname, "dist")
  },

  target: "web"
};

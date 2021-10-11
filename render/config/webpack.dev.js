const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const mode = "development";
module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    hot: true,
    static: path.join(__dirname, "../dist-main"),
    historyApiFallback: {
      index: "./index.html",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public/index.html"),
      filename: "index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});

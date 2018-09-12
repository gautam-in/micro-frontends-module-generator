const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const common = [];

const client = [
  new webpack.DefinePlugin({
    __SERVER__: "false",
    __CLIENT__: "true"
  }),
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[name].[id].css"
  })
];

const server = [
  new webpack.DefinePlugin({
    __SERVER__: "true",
    __CLIENT__: "false"
  })
];

const shared = [
  new webpack.DefinePlugin({
    __SERVER__: "false",
    __CLIENT__: "true"
  }),
  new MiniCssExtractPlugin({
    filename: "[name].css"
  })
];

module.exports = {
  common,
  client,
  server,
  shared
};

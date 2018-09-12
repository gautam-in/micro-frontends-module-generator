//

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const babelLoader = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: "babel-loader"
};

const cssLoaderClient = {
  test: /\.css$/,
  exclude: /node_modules/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: "css-loader"
    }
  ]
};

// Write css files from node_modules to its own vendor.css file
const externalCssLoaderClient = {
  test: /\.css$/,
  include: /node_modules/,
  use: [MiniCssExtractPlugin.loader, "css-loader"]
};

const client = [
  {
    oneOf: [babelLoader, cssLoaderClient, externalCssLoaderClient]
  }
];
const server = [
  {
    oneOf: [babelLoader]
  }
];

module.exports = {
  client,
  server
};

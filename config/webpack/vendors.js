const path = require("path");
const paths = require("../paths");
const { shared: sharedLoaders } = require("./loaders");
const resolvers = require("./resolvers");
const nodeExternals = require("webpack-node-externals");
const plugins = require("./plugins");

module.exports = (env, args) => {
  return {
    name: "externals",
    mode: env || process.env.NODE_ENV || "development",
    target: "web",
    devtool: "eval-source-map",
    entry: {
      vendors: path.resolve(__dirname, "../../src/vendors.js")
    },
    output: {
      path: path.join(paths.sharedBuild),
      filename: "[name].js",
      libraryTarget: "umd",
      globalObject: "this"
    },
    module: {
      rules: sharedLoaders
    },
    resolve: { ...resolvers },
    plugins: [...plugins.common, ...plugins.shared],
    stats: true
  };
};

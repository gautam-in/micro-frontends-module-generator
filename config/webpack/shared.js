const path = require("path");
const paths = require("../paths");
const { client: clientLoaders } = require("./loaders");
const resolvers = require("./resolvers");
const nodeExternals = require("webpack-node-externals");
const plugins = require("./plugins");

module.exports = (env, args) => {
  return {
    name: "client",
    target: "node",
    mode: env || process.env.NODE_ENV || "development",
    devtool: "eval-source-map",
    externals: [
      nodeExternals({
        // we still want imported css from external files to be bundled otherwise 3rd party packages
        // which require us to include their own css would not work properly
        whitelist: /\.css$/
      })
    ],
    entry: {
      left: path.resolve(__dirname, "../../src/modules/Left/Left.js"),
      "left.store": path.resolve(
        __dirname,
        "../../src/modules/Left/store/index.js"
      ),
      right: path.resolve(__dirname, "../../src/modules/Right/Right.js"),
      "right.store": path.resolve(
        __dirname,
        "../../src/modules/Right/store/index.js"
      )
    },
    plugins: [...plugins.shared],
    output: {
      path: path.join(paths.sharedBuild),
      filename: "[name].js",
      libraryTarget: "commonjs2"
    },
    module: {
      rules: clientLoaders
    },
    resolve: { ...resolvers },
    optimization: {
      namedModules: true,
      noEmitOnErrors: true
    },
    stats: true
  };
};

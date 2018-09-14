const path = require("path");
const paths = require("../paths");
const { shared: sharedLoaders } = require("./loaders");
const resolvers = require("./resolvers");
const nodeExternals = require("webpack-node-externals");
const plugins = require("./plugins");
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = (env, args) => {
  const moduleName = args.module;
  const moduleNameLowerCase = moduleName.toLowerCase();
  return {
    name: "client",
    mode: env || process.env.NODE_ENV || "development",
    target: "web",
    devtool: "eval-source-map",
    entry: {
      configureStore: path.resolve(__dirname, "../../src/configureStore.js"),
      globalReducer: path.resolve(__dirname, "../../src/global/reducer"),
      [moduleNameLowerCase]: path.resolve(
        __dirname,
        "../../src/modules/" + moduleName + "/" + moduleName + ".js"
      )
    },
    output: {
      path: path.join(paths.sharedBuild),
      filename: "[name].js",
      libraryTarget: "umd",
      // chunkFilename: `${moduleNameLowerCase}.[name].js`,
      globalObject: "this"
    },
    module: {
      rules: sharedLoaders
    },
    resolve: { ...resolvers },
    plugins: [
      ...plugins.common,
      ...plugins.shared,
      new ManifestPlugin({
        fileName: moduleNameLowerCase + ".manifest.json"
      })
    ],
    optimization: {
      namedModules: true,
      noEmitOnErrors: true
      // splitChunks: {
      //   cacheGroups: {
      //     commons: {
      //       test: /[\\/]node_modules[\\/]/,
      //       name: "vendor",
      //       chunks: "all"
      //     }
      //   }
      // }
    },
    stats: true
  };
};

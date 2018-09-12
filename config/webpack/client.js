const path = require("path");
const paths = require("../paths");
const { client: clientLoaders } = require("./loaders");
const resolvers = require("./resolvers");
const plugins = require("./plugins");

module.exports = (env, args) => {
  const moduleName = args.module;
  const moduleNameLowerCase = moduleName.toLowerCase();
  return {
    name: "client",
    target: "web",
    mode: env || process.env.NODE_ENV || "development",
    devtool: "eval-source-map",
    entry: {
      [moduleNameLowerCase]: [
        "@babel/polyfill",
        path.resolve(
          __dirname,
          `../../src/modules/${moduleName}/${moduleName}.client.js`
        )
      ]
    },
    output: {
      path: path.join(paths.clientBuild),
      filename: `${moduleNameLowerCase}.bundle.js`,
      publicPath: "/",
      chunkFilename: `${moduleNameLowerCase}.[name].bundle.js`
    },
    module: {
      rules: clientLoaders
    },
    resolve: { ...resolvers },
    plugins: [...plugins.common, ...plugins.client],
    node: {
      dgram: "empty",
      fs: "empty",
      net: "empty",
      tls: "empty",
      child_process: "empty"
    },
    optimization: {
      namedModules: true,
      noEmitOnErrors: true,
      // concatenateModules: true,
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all"
          }
        }
      }
    },
    stats: true
  };
};

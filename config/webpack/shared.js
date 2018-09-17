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
      // globalReducer: path.resolve(__dirname, "../../src/global/reducer"),
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
    externals: [
      {
        react: {
          amd: "react",
          commonjs: "react",
          commonjs2: "react",
          root: "React"
        }
      },
      {
        redux: {
          amd: "redux",
          commonjs: "redux",
          commonjs2: "redux",
          root: "Redux"
        }
      },
      {
        "react-dom": {
          amd: "react-dom",
          commonjs: "react-dom",
          commonjs2: "react-dom",
          root: "ReactDom"
        }
      },
      {
        "react-redux": {
          amd: "react-redux",
          commonjs: "react-redux",
          commonjs2: "react-redux",
          root: "ReactRedux"
        }
      },
      {
        "redux-dynamic-reducer": {
          amd: "redux-dynamic-reducer",
          commonjs: "redux-dynamic-reducer",
          commonjs2: "redux-dynamic-reducer",
          root: "ReduxDynamicReducer"
        }
      },
      {
        "react-redux-subspace": {
          amd: "react-redux-subspace",
          commonjs: "react-redux-subspace",
          commonjs2: "react-redux-subspace",
          root: "ReactReduxSubspace"
        }
      },
      {
        "redux-thunk": {
          amd: "redux-thunk",
          commonjs: "redux-thunk",
          commonjs2: "redux-thunk",
          root: "ReduxThunk"
        }
      }
    ],
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

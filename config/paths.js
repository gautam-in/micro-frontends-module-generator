const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const paths = {
  clientBuild: resolveApp("build/client"),
  serverBuild: resolveApp("build/server"),
  sharedBuild: resolveApp("build/shared"),
  src: resolveApp("src")
};

paths.resolveModules = [paths.src, "node_modules"];

module.exports = paths;

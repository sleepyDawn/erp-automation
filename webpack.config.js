const path = require("path");
const webpackDevConfig = require("./webpack.dev");
const webpackProdConfig = require("./webpack.prod");

module.exports = (env) => {
  // console.log("checking env: ", env);
  if (env.production) {
    return webpackProdConfig;
  }
  return webpackDevConfig;
};

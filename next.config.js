const path = require("path");

module.exports = {
  target: "serverless",
  webpack: (config) => {
    config.resolve.alias["~"] = path.resolve(__dirname, "src/pages");
    return config;
  },
  env: {},
};

const js = require("@eslint/js");

const nodeGlobals = {
  Buffer: "readonly",
  __dirname: "readonly",
  __filename: "readonly",
  console: "readonly",
  exports: "readonly",
  fetch: "readonly",
  global: "readonly",
  module: "readonly",
  process: "readonly",
  require: "readonly",
  setImmediate: "readonly",
  setTimeout: "readonly"
};

module.exports = [
  {
    ignores: ["client/**", "node_modules/**"]
  },
  {
    files: [
      "app.js",
      "server.js",
      "config/**/*.js",
      "helpers/**/*.js",
      "models/**/*.js",
      "routes/**/*.js",
      "validation/**/*.js",
      "test/**/*.js"
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: nodeGlobals
    },
    rules: {
      ...js.configs.recommended.rules
    }
  }
];
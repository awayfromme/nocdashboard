module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  settings: {
    react: {
      version: "17.0"
    }
  },
  globals: {
    describe: "readonly",
    expect: "readonly",
    it: "readonly"
  },
  rules: {
    "no-extra-semi": "off",
    "no-unused-vars": "off",
    "react/no-deprecated": "off",
    "react/prop-types": "off"
  }
};

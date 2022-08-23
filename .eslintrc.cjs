module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: "airbnb-base",
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "consistent-return": "off",
    quotes: [2, "double", { avoidEscape: true }],
    "import/extensions": "off",
    camelcase: "off",
    "no-console": "off",
    "import/prefer-default-export": "off",
    "max-len": "off",
    "prefer-promise-reject-errors": "off",
  },
};

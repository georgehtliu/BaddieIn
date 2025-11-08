module.exports = {
  root: true,
  env: {
    browser: true,
    es2023: true
  },
  extends: ['eslint:recommended', 'plugin:react-hooks/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  rules: {},
  settings: {
    react: {
      version: 'detect'
    }
  }
};


module.exports = {
    env: {
      browser: true,
      commonjs: true,
      es6: true,
      node: true,
      jest: true,
      mongo: true
    },
    extends: [
      'plugin:react/recommended',
      'airbnb',
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
    },
    plugins: [
      'react',
    ],
    rules: {
      "no-underscore-dangle": 0,
      "no-param-reassign": [2, { "props": false }],
      "react/prop-types": 0,
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    },
  };
  
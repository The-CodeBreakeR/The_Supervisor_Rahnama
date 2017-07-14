module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: 'standard',
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "ignore",
    }],
    'new-cap': ['error', { 'newIsCapExceptionPattern': '^window.', 'capIsNew': false }],
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single', {'avoidEscape': true}],
    'semi': ['error', 'never'],
    'comma-dangle': [2, 'always-multiline'],
    'no-return-assign': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'standard/no-callback-literal': 'off',
  },
}

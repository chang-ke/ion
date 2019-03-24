module.exports = {
  plugins: ['prettier'],
  extends: ['eslint-config-alloy/react'],
  rules: {
    'prettier/prettier': 'error',
    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore',
      },
    ],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: false,
      },
    ],
    'react/jsx-indent': ['error', 2],
    'object-curly-spacing': ['error', 'always'],
  },
};

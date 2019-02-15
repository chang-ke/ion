module.exports = {
  parser: 'typescript-eslint-parser',
  plugins: ['prettier'],
  extends: ['eslint-config-alloy/typescript'],
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
        flatTernaryExpressions: true,
      },
    ],
    'object-curly-spacing': ['error', 'always'],
    'typescript/class-name-casing': 'error',
  },
};

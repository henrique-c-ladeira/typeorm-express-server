module.exports = {
  extends: [
    'standard-with-typescript',
    'eslint:recommended'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 0,
    semi: ['error', 'always'],
    '@typescript-eslint/semi': ['off']
  }
};

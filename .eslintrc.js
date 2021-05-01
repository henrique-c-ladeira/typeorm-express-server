module.exports = {
  env: {
    jest: true
  },
  extends: [
    'standard-with-typescript',
    'eslint:recommended',
    'prettier'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 0,
    semi: ['error', 'always'],
    '@typescript-eslint/semi': ['off'],
    'no-undef': 'off',
    'prettier/prettier': 1
  },
  plugins: ['prettier']
};

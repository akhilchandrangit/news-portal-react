module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
    'react-hooks/rules-of-hooks': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'react-hooks/exhaustive-deps': 0,
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
};

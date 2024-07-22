module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    'cypress/globals': true // Adiciona as definições globais do Cypress
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:cypress/recommended', // Adiciona as regras recomendadas do Cypress
    'prettier' // Adiciona Prettier para garantir formatação consistente
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'react/react-in-jsx-scope': 'off' // Adiciona suporte para projetos Next.js ou novos projetos React
  }
};

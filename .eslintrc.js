module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'airbnb/hooks', 'plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'import/no-unresolved': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'avoid',
        endOfLine: 'auto',
        printWidth: 180,
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'no-use-before-define': 'off',
    'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/extensions': ['error', 'never', { png: 'always' }],
    'react/prop-types': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'import/prefer-default-export': 0,
    'global-require': 0,
    'no-plusplus': 0,
  },
  overrides: [
    {
      files: ['src/translation/**/*.ts'],
      rules: {
        'prettier/prettier': 'off',
      },
    },
  ],
};

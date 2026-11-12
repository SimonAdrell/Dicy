const reactNativeConfig = require('@react-native/eslint-config/flat');
const jestPlugin = require('eslint-plugin-jest');

module.exports = [
  {
    ignores: [
      'android/**/build/**',
      'android/.gradle/**',
      'ios/build/**',
      'ios/Pods/**',
      'vendor/**',
      'coverage/**',
    ],
  },

  ...reactNativeConfig,

  {
    rules: {
      // Catches S6479: array index used as JSX key
      'react/no-array-index-key': 'error',
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // Catches S1128: unused imports/variables — promote from warn to error
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
      // Turn off the base rule; the TS-aware version above covers it
      'no-unused-vars': 'off',
      // Catches S6551: object coerced to string via default Object.toString()
      '@typescript-eslint/no-base-to-string': 'error',
    },
  },

  {
    files: ['jest.setup.js', '**/__tests__/**', '**/*.test.*', '**/*.spec.*'],
    languageOptions: {
      globals: {
        ...jestPlugin.environments.globals.globals,
      },
    },
  },
];

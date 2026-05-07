module.exports = {
  root: true,
  extends: [
    '@react-native',
  ],
  rules: {
    // Catches S6479: array index used as JSX key
    'react/no-array-index-key': 'error',

    // Catches S1128: unused imports/variables — promote from warn to error
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true, varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
    // Turn off the base rule; the TS-aware version above covers it
    'no-unused-vars': 'off',
    // Removed in @typescript-eslint v8 but still referenced by @react-native/eslint-config v0.77
    '@typescript-eslint/func-call-spacing': 'off',
  },
  overrides: [
    {
      files: ['jest.setup.js', '**/__tests__/**', '**/*.test.*', '**/*.spec.*'],
      env: { jest: true },
    },
  ],
};

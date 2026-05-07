module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:testing-library/react-native',
  ],
  rules: {
    // Catches S6479: array index used as JSX key
    'react/no-array-index-key': 'error',

    // Catches S1128: unused imports/variables — promote from warn to error
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],
    // Turn off the base rule; the TS-aware version above covers it
    'no-unused-vars': 'off',
  },
};

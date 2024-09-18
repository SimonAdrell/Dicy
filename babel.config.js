module.exports = {
  presets: ['module:@react-native/babel-preset',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          "@components": "./src/components",
          "@helpers": "./src/utils/helpers",
          "@styles": "./src/styles",
        }
      }
    ]
  ]
};

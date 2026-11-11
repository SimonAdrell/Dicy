const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// Path aliases. Keep in sync with tsconfig.json "paths" and the jest
// "moduleNameMapper" in package.json.
const aliases = {
  '@components': path.resolve(__dirname, 'src/components'),
  '@helpers': path.resolve(__dirname, 'src/utils/helpers'),
  '@styles': path.resolve(__dirname, 'src/styles'),
};

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    resolveRequest: (context, moduleName, platform) => {
      for (const [alias, target] of Object.entries(aliases)) {
        if (moduleName === alias || moduleName.startsWith(`${alias}/`)) {
          return context.resolveRequest(
            context,
            target + moduleName.slice(alias.length),
            platform,
          );
        }
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

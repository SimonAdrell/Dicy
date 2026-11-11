import './src/utils/polyfills/backHandler';

jest.mock('react-native-image-crop-picker', () => {
    return {
      openPicker: jest.fn().mockImplementation(() => Promise.resolve()),
      openCamera: jest.fn().mockImplementation(() => Promise.resolve()),
    };
  });

jest.mock('@sayem314/react-native-keep-awake', () => ({
    useKeepAwake: jest.fn(),
    activateKeepAwake: jest.fn(),
    deactivateKeepAwake: jest.fn(),
    default: () => null,
  }));
  
// react-native-mmkv v4 swaps in an in-memory store under Jest, but still
// imports the Nitro runtime at module load. Stub it so that import doesn't
// look for the native TurboModule.
jest.mock('react-native-nitro-modules', () => ({
    NitroModules: {
      createHybridObject: jest.fn(() => {
        throw new Error('NitroModules are not available in Jest');
      }),
    },
  }));

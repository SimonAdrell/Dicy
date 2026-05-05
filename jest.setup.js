import './src/utils/polyfills/backHandler';
import {NativeModules} from 'react-native';

NativeModules.ImagePickerManager = {
    showImagePicker: jest.fn(),
    launchCamera: jest.fn(),
    launchImageLibrary: jest.fn(),
  };
  
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
  
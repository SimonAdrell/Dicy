import 'react-native';
import React from 'react';
import App from '../App';
import ReactTestRenderer from 'react-test-renderer';
jest.mock('@helpers/Image/ImageTaker');

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => { }),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => { },
  },
}));
jest.mock('react-native-mmkv-storage', () => ({
  MMKVLoader: jest.fn().mockImplementation(() => {
    return {
      setAccessibleIOS: jest.fn().mockReturnThis(),
      withEncryption: () => ({
        initialize: () => ({
          getItem: async () => jest.fn(),
          setItem: async () => jest.fn(),
        }),
      }),
      initialize: () => ({
        getItem: async () => jest.fn(),
        setItem: async () => jest.fn(),
      }),
      withInstanceID: () => ({
        initialize: () => ({
          getItem: async () => jest.fn(),
          setItem: async () => jest.fn(),
        }),
      }),
    };
  }),
  IOSAccessibleStates: {
    WHEN_UNLOCKED: 'AccessibleWhenUnlocked',
    AFTER_FIRST_UNLOCK: 'AccessibleAfterFirstUnlock',
    ALWAYS: 'AccessibleAlways',
    WHEN_PASSCODE_SET_THIS_DEVICE_ONLY:
      'AccessibleWhenPasscodeSetThisDeviceOnly',
    WHEN_UNLOCKED_THIS_DEVICE_ONLY: 'AccessibleWhenUnlockedThisDeviceOnly',
    AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY:
      'AccessibleAfterFirstUnlockThisDeviceOnly',
    ALWAYS_THIS_DEVICE_ONLY: 'AccessibleAlwaysThisDeviceOnly',
  },
}));

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useFocusEffect: jest.fn(() => ({})),
  };
});


test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});

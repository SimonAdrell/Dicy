import {createMMKV} from 'react-native-mmkv';

const languageStorage = (key: string): ItemStorage<string> => {
  const storage = createMMKV();
  return {
    save: (languageCode: string) => storage.set(key, languageCode),
    get: () => storage.getString(key),
    addListener: (onValueChanged: (key: string) => void): storageListener => {
      let addedListener = storage.addOnValueChangedListener(onValueChanged);
      return {
        remove: () => {
          addedListener.remove();
        },
      };
    },
  };
};

export {languageStorage};

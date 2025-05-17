import { MMKVLoader } from "react-native-mmkv-storage";

const languageStorage = (key: string): StorageMmkv<string> => {
    const MMKV = new MMKVLoader()
        .withInstanceID("languageStorage")
        .initialize();
    return {
        save: (languageCode: string) => {
            MMKV.setStringAsync(key, languageCode);
        },
        get: async () => {
            return await MMKV.getStringAsync(key) as string;
        }
    }
}

export { languageStorage };
import { MMKVLoader } from "react-native-mmkv-storage";

const languageStorage = (key: string): storage<string> => {
    const MMKV = new MMKVLoader().initialize();
    return {
        save: async (languageCode: string) => {
            await MMKV.setStringAsync(key, languageCode);
        },
        get: async () => {
            return await MMKV.getStringAsync(key) as string;
        }
    }
}

export { languageStorage };
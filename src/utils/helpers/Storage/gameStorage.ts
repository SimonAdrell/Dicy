import { MMKVLoader } from "react-native-mmkv-storage";
import { Game } from "../Game/Game";

const gameStorage = (key: string): storage<Array<Game>> => {
    const MMKV = new MMKVLoader().initialize();
    return {
        save: async (games: Array<Game>) => {
            await MMKV.setArrayAsync(key, games);
        },
        get: async () => {
            return await MMKV.getArrayAsync(key) as Array<Game>;
        }
    }
}

export default gameStorage;
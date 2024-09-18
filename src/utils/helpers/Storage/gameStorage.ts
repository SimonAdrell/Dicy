import { MMKV } from "react-native-mmkv";
import { Game } from "../Game/Game";

const gameStorage = (key: string): storage<Game> => {
    const storage = new MMKV()
    return {
        save: (games: Array<Game>) => {
            storage.set(key, JSON.stringify(games));
        },
        get: () => {
            const gameString = storage.getString(key);
            if (gameString != undefined) {
                const games: Array<Game> = JSON.parse(gameString);
                return games;
            }
            return {} as Array<Game>;
        },
        addListener: (onValueChanged: (key: string) => void): storageListener => {
            let addedListener = storage.addOnValueChangedListener(onValueChanged)
            return {
                remove: () => {
                    addedListener.remove()
                }
            }
        }
    }
}

export default gameStorage;
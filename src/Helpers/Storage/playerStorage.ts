import { MMKV } from 'react-native-mmkv'
import { PlayerDto } from '../../library/components/players/playerObject';


const playerStorage = (key: string):storage<PlayerDto> => {
    const storage = new MMKV()
    return {
        save: (players: Array<PlayerDto>) => {
            storage.set(key, JSON.stringify(players));
        },
        get: () => {
            const playersString = storage.getString(key);
            if (playersString != undefined) {
                const players: Array<PlayerDto> = JSON.parse(playersString);
                return players;
            }
            return {} as Array<PlayerDto>;
        },
        addListener: (onValueChanged: (key: string) => void) : storageListener => {
            let addedListener = storage.addOnValueChangedListener(onValueChanged)
            return {
                remove: () => {
                    addedListener.remove()
                }
            }
        }
    }
};

export default playerStorage;
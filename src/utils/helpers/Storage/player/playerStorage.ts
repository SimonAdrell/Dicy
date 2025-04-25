import { PlayerDto } from '@components/players/playerObject';
import { MMKVLoader } from 'react-native-mmkv-storage';

const playerDtoStorage = (key: string): storage<Array<PlayerDto>> => {
    const MMKV = new MMKVLoader().initialize();
    return {
        save: async (players: Array<PlayerDto>) => {
            await MMKV.setArrayAsync(key, players);
        },
        get: async () => {
            return await MMKV.getArrayAsync(key) as Array<PlayerDto>;
        }
    }
};

export default playerDtoStorage;
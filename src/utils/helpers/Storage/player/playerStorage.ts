import { PlayerDto } from '@components/players/playerObject';
import { MMKVLoader } from 'react-native-mmkv-storage';

const playerDtoStorage = (key: string): StorageMmkv<Array<PlayerDto>> => {
    const MMKV = new MMKVLoader().initialize();
    return {
        save: (players: Array<PlayerDto>) => {
            MMKV.setArrayAsync(key, players);
        },
        get: async () => {
            return await MMKV.getArrayAsync(key) as Array<PlayerDto>;
        }
    }
};

export default playerDtoStorage;
import { MMKV } from 'react-native-mmkv'
import { PlayerDto } from './playerObject';
export const storage = new MMKV()

export const getPlayers = () => {
    const playersString = storage.getString('players');
    if (playersString != undefined) {
        const players: Array<PlayerDto> = JSON.parse(playersString);
        return players;
    }
    return {} as Array<PlayerDto>;
};

export const setPlayer = (players: Array<PlayerDto>) => {
    storage.set('players', JSON.stringify(players));
}
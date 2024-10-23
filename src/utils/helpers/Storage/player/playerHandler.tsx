import playerDtoStorage from './playerStorage';
import {PlayerDto} from '@components/players/playerObject';

export interface IPlayerHandler {
  getPlayers: () => Array<PlayerDto>;
  savePlayers: (players: Array<PlayerDto>) => void;
  setListener: (listener: (key: string) => void) => storageListener;
}

const playerStorageHandler = (): IPlayerHandler => {
  const playerStorage: storage<PlayerDto> = playerDtoStorage('players');
  return {
    getPlayers: () => playerStorage.get(),
    savePlayers: (players: Array<PlayerDto>) => playerStorage.save(players),
    setListener: (listener: (key: string) => void) =>
      playerStorage.addListener(listener),
  };
};

export default playerStorageHandler;

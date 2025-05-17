import playerDtoStorage from './playerStorage';
import { PlayerDto } from '@components/players/playerObject';

export interface IPlayerHandler {
  getPlayers: () => Promise<Array<PlayerDto>>;
  savePlayers: (players: Array<PlayerDto>) => Promise<void>;
}

const playerStorageHandler = (): IPlayerHandler => {
  const playerStorage: StorageMmkv<Array<PlayerDto>> = playerDtoStorage('players');
  return {
    getPlayers: async () => playerStorage.get(),
    savePlayers: async (players: Array<PlayerDto>) => playerStorage.save(players),
  };
};

export default playerStorageHandler;
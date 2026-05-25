import {MMKV} from 'react-native-mmkv';
import {gameType} from '@helpers/Game/gameType';

const storage = new MMKV();

const bonusScoreKey = (typeOfGame: gameType): string => {
  switch (typeOfGame) {
    case gameType.maxiYatzy:
    case gameType.maxiYatzyTypDown:
      return 'bonusScore_maxiYatzy';
    case gameType.yatzy:
      return 'bonusScore_yatzy';
  }
};

const bonusScoreStorage = (key: string): itemStorage<number> => {
  return {
    save: (value: number) => storage.set(key, value),
    get: () => storage.getNumber(key),
    addListener: (onValueChanged: (key: string) => void): storageListener => {
      const addedListener = storage.addOnValueChangedListener(onValueChanged);
      return {
        remove: () => {
          addedListener.remove();
        },
      };
    },
  };
};

export {bonusScoreStorage, bonusScoreKey};

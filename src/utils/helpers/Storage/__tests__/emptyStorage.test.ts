import playerDtoStorage from '../player/playerStorage';
import gameStorage from '../gameStorage';

describe('array storage with nothing saved', () => {
  it('returns an empty array of players', () => {
    expect(playerDtoStorage('emptyStorage.players').get()).toEqual([]);
  });

  it('returns an empty array of games', () => {
    expect(gameStorage('emptyStorage.games').get()).toEqual([]);
  });
});

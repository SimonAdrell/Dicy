import {fireEvent, render} from '@testing-library/react-native';
import Player from '../player';
import gameHelper from '@helpers/Game/gameHelper';
import {gameType} from '@helpers/Game/gameType';
import {PlayerDto} from '../playerObject';
jest.mock('@helpers/Image/ImageTaker');

async function renderPlayer() {
  const gamingHelper = gameHelper(undefined);
  gamingHelper.generateNewGame(gameType.maxiYatzy);

  const testPlayer: PlayerDto = {
    name: 'TestPlayer 1',
    imageUrl: '',
    playerId: 0,
    plusImage: false,
    currentScore: 0,
    order: 1,
  };

  const {getByText} = await render(
    <Player gamingHelper={gamingHelper} playerDto={testPlayer} />,
  );
  return {gamingHelper, testPlayer, item: getByText(testPlayer.name)};
}

describe('player', () => {
  it('Adds player to player list', async () => {
    const {gamingHelper, testPlayer, item} = await renderPlayer();

    await fireEvent(item, 'click');

    expect(gamingHelper.getPlayers()).toContain(testPlayer);
  });

  it('Removes player to player list', async () => {
    const {gamingHelper, testPlayer, item} = await renderPlayer();

    await fireEvent(item, 'click');
    expect(gamingHelper.getPlayers()).toContainEqual(testPlayer);

    await fireEvent(item, 'click');
    expect(
      gamingHelper.getPlayers()?.some(player => player == testPlayer),
    ).toBe(false);
  });
});

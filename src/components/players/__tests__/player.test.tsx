import {fireEvent, render, screen} from '@testing-library/react-native';
import Player from '../player';
import {PlayerDto} from '../playerObject';
import {GameProvider} from '@helpers/Game/gameContext';
import {createGameProbe} from '../__testUtils__/gameProbe';
jest.mock('@helpers/Image/ImageTaker');

const testPlayer: PlayerDto = {
  name: 'TestPlayer 1',
  imageUrl: '',
  playerId: 0,
  plusImage: false,
  currentScore: 0,
  order: 1,
};

async function renderPlayer() {
  const probe = createGameProbe();
  await render(
    <GameProvider>
      <Player playerDto={testPlayer} />
      <probe.Probe />
    </GameProvider>,
  );
  return {probe, item: screen.getByText(testPlayer.name)};
}

describe('player', () => {
  it('Adds player to player list', async () => {
    const {probe, item} = await renderPlayer();

    await fireEvent.press(item);

    expect(probe.playerIds()).toEqual([testPlayer.playerId]);
  });

  it('Removes player to player list', async () => {
    const {probe, item} = await renderPlayer();

    await fireEvent.press(item);
    expect(probe.playerIds()).toEqual([testPlayer.playerId]);

    await fireEvent.press(item);
    expect(probe.playerIds()).toEqual([]);
  });

  it('does not mutate the player it was given', async () => {
    const {item} = await renderPlayer();

    await fireEvent.press(item);

    expect(testPlayer.order).toBe(1);
  });
});

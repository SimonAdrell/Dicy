import {fireEvent, render, screen} from '@testing-library/react-native';
import {PlayerDto} from '../playerObject';
import PlayerList from '../playerList';
import {sortPlayersByOrder} from '@helpers/Player/PlayerHelper';
import {GameProvider} from '@helpers/Game/gameContext';
import {createGameProbe} from '../__testUtils__/gameProbe';
jest.mock('@helpers/Image/ImageTaker');
jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));
const makePlayer = (playerId: number): PlayerDto => ({
  name: `TestPlayer ${playerId + 1}`,
  imageUrl: '',
  playerId,
  plusImage: false,
  currentScore: 0,
  order: undefined,
});

async function renderPlayerList() {
  const probe = createGameProbe();
  const testPlayer = makePlayer(0);
  const testPlayer2 = makePlayer(1);

  await render(
    <GameProvider>
      <PlayerList players={[testPlayer, testPlayer2]} />
      <probe.Probe />
    </GameProvider>,
  );

  return {
    probe,
    testPlayer,
    testPlayer2,
    item: screen.getByText(testPlayer.name),
    item2: screen.getByText(testPlayer2.name),
  };
}

describe('playerList', () => {
  it('Adds player to player list', async () => {
    const {probe, item, item2} = await renderPlayerList();

    await fireEvent.press(item);
    await fireEvent.press(item2);

    expect(probe.playerIds()).toEqual([0, 1]);
  });

  it('Removes player from player list after added', async () => {
    const {probe, item, item2} = await renderPlayerList();

    // Add player One, add player Two, remove player Two
    await fireEvent.press(item);
    await fireEvent.press(item2);
    await fireEvent.press(item2);

    expect(probe.playerIds()).toEqual([0]);
  });

  it('When players is removed then added, order is changed', async () => {
    const {probe, item, item2} = await renderPlayerList();
    const sortedIds = () =>
      [...probe.players()].sort(sortPlayersByOrder).map(p => p.playerId);

    // Add player One, then player Two
    await fireEvent.press(item);
    await fireEvent.press(item2);
    expect(sortedIds()).toEqual([0, 1]);

    // Remove both
    await fireEvent.press(item);
    await fireEvent.press(item2);
    expect(sortedIds()).toEqual([]);

    // Add player Two, then player One
    await fireEvent.press(item2);
    await fireEvent.press(item);
    expect(sortedIds()).toEqual([1, 0]);
  });
});

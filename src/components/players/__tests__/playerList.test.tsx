import {fireEvent, render, screen} from '@testing-library/react-native';
import gameHelper from '@helpers/Game/gameHelper';
import {gameType} from '@helpers/Game/gameType';
import {PlayerDto} from '../playerObject';
import PlayerList from '../playerList';
import {sortPlayersByOrder} from '@helpers/Player/PlayerHelper';
import {GameProvider} from '@helpers/Game/gameContext';
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
  const gamingHelper = gameHelper(undefined);
  gamingHelper.generateNewGame(gameType.maxiYatzy);
  const testPlayer = makePlayer(0);
  const testPlayer2 = makePlayer(1);

  await render(
    <GameProvider>
      <PlayerList
        gamingHelper={gamingHelper}
        players={[testPlayer, testPlayer2]}
      />
    </GameProvider>,
  );

  return {
    gamingHelper,
    testPlayer,
    testPlayer2,
    item: screen.getByText(testPlayer.name),
    item2: screen.getByText(testPlayer2.name),
  };
}

describe('playerList', () => {
  it('Adds player to player list', async () => {
    const {gamingHelper, testPlayer, testPlayer2, item, item2} =
      await renderPlayerList();

    await fireEvent(item, 'click');
    await fireEvent(item2, 'click');

    expect(gamingHelper.getPlayers()).toContain(testPlayer);
    expect(gamingHelper.getPlayers()).toContain(testPlayer2);
  });

  it('Removes player from player list after added', async () => {
    const {gamingHelper, testPlayer, testPlayer2, item, item2} =
      await renderPlayerList();

    // Add player One, add player Two, remove player Two
    await fireEvent(item, 'click');
    await fireEvent(item2, 'click');
    await fireEvent(item2, 'click');

    const players = gamingHelper.getPlayers();
    expect(players).toContain(testPlayer);
    expect(players?.some(player => player == testPlayer2)).toBe(false);
  });

  it('When players is removed then added, order is changed', async () => {
    const {gamingHelper, testPlayer, testPlayer2, item, item2} =
      await renderPlayerList();
    const sortedPlayers = () =>
      gamingHelper.getPlayers()?.sort(sortPlayersByOrder);

    // Add player One, then player Two
    await fireEvent(item, 'click');
    await fireEvent(item2, 'click');
    expect(sortedPlayers()?.[0]).toEqual(testPlayer);
    expect(sortedPlayers()?.[1]).toEqual(testPlayer2);

    // Remove both
    await fireEvent(item, 'click');
    await fireEvent(item2, 'click');
    expect(gamingHelper.getPlayers()?.some(p => p == testPlayer)).toBe(false);
    expect(gamingHelper.getPlayers()?.some(p => p == testPlayer2)).toBe(false);

    // Add player Two, then player One
    await fireEvent(item2, 'click');
    await fireEvent(item, 'click');
    expect(sortedPlayers()?.[0]).toEqual(testPlayer2);
    expect(sortedPlayers()?.[1]).toEqual(testPlayer);
  });
});

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
describe('playerList', () => {
  it('Adds player to player list', async () => {
    // Arrange
    var gamingHelper = gameHelper(undefined);
    gamingHelper.generateNewGame(gameType.maxiYatzy);

    const testPlayer: PlayerDto = {
      name: 'TestPlayer 1',
      imageUrl: '',
      playerId: 0,
      plusImage: false,
      currentScore: 0,
      order: undefined,
    };

    const testPlayer2: PlayerDto = {
      name: 'TestPlayer 2',
      imageUrl: '',
      playerId: 1,
      plusImage: false,
      currentScore: 0,
      order: undefined,
    };

    await render(
      <GameProvider>
        <PlayerList
          gamingHelper={gamingHelper}
          players={[testPlayer, testPlayer2]}
        />
      </GameProvider>,
    );

    // Act
    const item = screen.getByText(testPlayer.name);
    const item2 = screen.getByText(testPlayer2.name);

    await fireEvent(item, 'click');
    await fireEvent(item2, 'click');

    // Assert
    expect(gamingHelper.getPlayers()).toContain(testPlayer);
    expect(gamingHelper.getPlayers()).toContain(testPlayer2);
  });

  it('Removes player from player list after added', async () => {
    // Arrange
    var gamingHelper = gameHelper(undefined);
    gamingHelper.generateNewGame(gameType.maxiYatzy);

    const testPlayer: PlayerDto = {
      name: 'TestPlayer 1',
      imageUrl: '',
      playerId: 0,
      plusImage: false,
      currentScore: 0,
      order: undefined,
    };

    const testPlayer2: PlayerDto = {
      name: 'TestPlayer 2',
      imageUrl: '',
      playerId: 1,
      plusImage: false,
      currentScore: 0,
      order: undefined,
    };

    await render(
      <GameProvider>
        <PlayerList
          gamingHelper={gamingHelper}
          players={[testPlayer, testPlayer2]}
        />
      </GameProvider>,
    );

    // Act
    const item = screen.getByText(testPlayer.name);
    const item2 = screen.getByText(testPlayer2.name);

    // Add player One
    await fireEvent(item, 'click');

    // Add player Two
    await fireEvent(item2, 'click');

    // Remove player Two
    await fireEvent(item2, 'click');

    // Assert

    let players = gamingHelper.getPlayers();

    expect(players).toContain(testPlayer);
    expect(players?.some(player => player == testPlayer2)).toBe(false);
  });

  it('When players is removed then added, order is changed', async () => {
    // Arrange

    var gamingHelper = gameHelper(undefined);
    gamingHelper.generateNewGame(gameType.maxiYatzy);

    const testPlayer: PlayerDto = {
      name: 'TestPlayer 1',
      imageUrl: '',
      playerId: 0,
      plusImage: false,
      currentScore: 0,
      order: undefined,
    };

    const testPlayer2: PlayerDto = {
      name: 'TestPlayer 2',
      imageUrl: '',
      playerId: 1,
      plusImage: false,
      currentScore: 0,
      order: undefined,
    };

    await render(
      <GameProvider>
        <PlayerList
          gamingHelper={gamingHelper}
          players={[testPlayer, testPlayer2]}
        />
      </GameProvider>,
    );

    // Act
    const item = screen.getByText(testPlayer.name);
    const item2 = screen.getByText(testPlayer2.name);

    // Add player One
    await fireEvent(item, 'click');

    // Add player Two
    await fireEvent(item2, 'click');

    expect(gamingHelper.getPlayers()?.sort(sortPlayersByOrder)[0]).toEqual(
      testPlayer,
    );
    expect(gamingHelper.getPlayers()?.sort(sortPlayersByOrder)[1]).toEqual(
      testPlayer2,
    );

    // Removes player One
    await fireEvent(item, 'click');

    // Removes player Two
    await fireEvent(item2, 'click');

    expect(
      gamingHelper.getPlayers()?.some(player => player == testPlayer),
    ).toBe(false);
    expect(
      gamingHelper.getPlayers()?.some(player => player == testPlayer2),
    ).toBe(false);

    // Adds player Two
    await fireEvent(item2, 'click');

    // Adds player One
    await fireEvent(item, 'click');

    gamingHelper.getPlayers()?.sort(sortPlayersByOrder);

    expect(gamingHelper.getPlayers()?.sort(sortPlayersByOrder)[0]).toEqual(
      testPlayer2,
    );
    expect(gamingHelper.getPlayers()?.sort(sortPlayersByOrder)[1]).toEqual(
      testPlayer,
    );
  });
});

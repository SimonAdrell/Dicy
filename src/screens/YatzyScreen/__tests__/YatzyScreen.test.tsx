import {fireEvent, render, screen} from '@testing-library/react-native';
import {Alert} from 'react-native';
import {TFunction} from 'i18next';
import YatzyScreen from '../YatzyScreen';
import {GameProvider} from '@helpers/Game/gameContext';
import {gameType} from '@helpers/Game/gameType';
import gameHelper from '@helpers/Game/gameHelper';
import {PlayerDto} from '@components/players/playerObject';
import {Game} from '@helpers/Game/Game';

const t = ((s: string) => s) as unknown as TFunction<'translation', undefined>;

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (s: string) => s,
    i18n: {changeLanguage: () => new Promise(() => {})},
  }),
}));

// The screen is rendered without a navigator here.
const mockUsePreventRemove = jest.fn();
jest.mock('@react-navigation/native', () => ({
  usePreventRemove: (...args: unknown[]) => mockUsePreventRemove(...args),
}));

let mockSeededGame: Game | undefined;

jest.mock('@helpers/Game/gameContext', () => {
  const React = require('react');
  const Ctx = React.createContext(undefined);
  const GameProvider = ({children}: {children: React.ReactNode}) => {
    const [game, setGame] = React.useState(mockSeededGame);
    return React.createElement(
      Ctx.Provider,
      {value: {game, setGame}},
      children,
    );
  };
  const useGame = () => React.useContext(Ctx);
  return {GameProvider, useGame};
});

jest.mock('@helpers/Storage/player/playerHandler', () => ({
  __esModule: true,
  default: () => ({
    getPlayers: () => [],
    savePlayers: () => {},
    setListener: () => ({remove: () => {}}),
  }),
}));

const makePlayer = (id: number, name: string): PlayerDto => ({
  playerId: id,
  name,
  imageUrl: '',
  plusImage: false,
  currentScore: 0,
  order: id,
});

function seedGame(players: PlayerDto[]): Game {
  const helper = gameHelper(undefined);
  helper.generateNewGame(gameType.maxiYatzy);
  helper.setPlayers(players, t);
  return helper.getGame();
}

function renderYatzyScreen(players: PlayerDto[]) {
  mockSeededGame = seedGame(players);
  return render(
    <GameProvider>
      <YatzyScreen navigation={{} as any} route={{} as any} />
    </GameProvider>,
  );
}

describe('YatzyScreen integration', () => {
  it('renders one column header per player', async () => {
    const a = makePlayer(0, 'Alice');
    const b = makePlayer(1, 'Bob');
    await renderYatzyScreen([a, b]);

    expect(await screen.findByText(/Alice/)).toBeTruthy();
    expect(await screen.findByText(/Bob/)).toBeTruthy();
  });

  it('renders the expected total of cells (one per player per row) without crashing', async () => {
    const a = makePlayer(0, 'Alice');
    const b = makePlayer(1, 'Bob');
    const {getAllByTestId} = await renderYatzyScreen([a, b]);

    const cells = getAllByTestId('scoreCell');
    // 6 upper + 13 middle (maxiYatzy) + 1 lower = 20 rows, × 2 players = 40
    // score cells.
    expect(cells).toHaveLength(40);
  });

  it('does not crash when a cell is pressed on the live screen', async () => {
    const a = makePlayer(0, 'Alice');
    const b = makePlayer(1, 'Bob');
    const {getAllByTestId} = await renderYatzyScreen([a, b]);

    const cells = getAllByTestId('scoreCell');
    await expect(fireEvent.press(cells[0])).resolves.toBeUndefined();
  });

  describe('leaving the game', () => {
    type PreventRemoveArgs = [
      boolean,
      (event: {data: {action: unknown}}) => void,
    ];
    const lastGuard = () =>
      mockUsePreventRemove.mock.calls.at(-1) as PreventRemoveArgs;

    async function renderWithNavigation() {
      const dispatch = jest.fn();
      mockSeededGame = seedGame([makePlayer(0, 'Alice')]);
      await render(
        <GameProvider>
          <YatzyScreen navigation={{dispatch} as any} route={{} as any} />
        </GameProvider>,
      );
      return dispatch;
    }

    async function enterScore(score: string) {
      await fireEvent.press(screen.getAllByTestId('scoreCell')[0]);
      await fireEvent.changeText(
        (await screen.findAllByTestId('scoreInput'))[0],
        score,
      );
      await fireEvent.press(screen.getByText('yatzyScreen.savePoints'));
    }

    beforeEach(() => {
      mockUsePreventRemove.mockClear();
    });

    it('does not guard an empty sheet', async () => {
      await renderWithNavigation();

      expect(lastGuard()[0]).toBe(false);
    });

    it('guards the sheet once a score has been entered', async () => {
      await renderWithNavigation();

      await enterScore('3');

      expect(lastGuard()[0]).toBe(true);
    });

    it('asks first and only leaves when confirmed', async () => {
      const alert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
      const dispatch = await renderWithNavigation();
      await enterScore('3');
      const action = {type: 'GO_BACK'};

      lastGuard()[1]({data: {action}});

      expect(alert).toHaveBeenCalledTimes(1);
      expect(dispatch).not.toHaveBeenCalled();
      const buttons = alert.mock.calls[0][2] ?? [];
      buttons.find(b => b.style === 'cancel')?.onPress?.();
      expect(dispatch).not.toHaveBeenCalled();
      buttons.find(b => b.style === 'destructive')?.onPress?.();
      expect(dispatch).toHaveBeenCalledWith(action);
      alert.mockRestore();
    });
  });
});

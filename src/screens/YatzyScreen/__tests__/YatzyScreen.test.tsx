import { fireEvent, render, screen, act } from '@testing-library/react-native';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import YatzyScreen from '../YatzyScreen';
import { GameProvider } from '@helpers/Game/gameContext';
import { gameType } from '@helpers/Game/gameType';
import gameHelper from '@helpers/Game/gameHelper';
import { PlayerDto } from '@components/players/playerObject';
import { Game } from '@helpers/Game/Game';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (s: string) => s,
    i18n: { changeLanguage: () => new Promise(() => {}) },
  }),
}));

let mockSeededGame: Game | undefined;

jest.mock('@helpers/Game/gameContext', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  const Ctx = React.createContext(undefined);
  const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const [game, setGame] = React.useState(mockSeededGame);
    return React.createElement(Ctx.Provider, { value: { game, setGame } }, children);
  };
  const useGame = () => React.useContext(Ctx);
  return { GameProvider, useGame };
});

jest.mock('@helpers/Storage/player/playerHandler', () => ({
  __esModule: true,
  default: () => ({
    getPlayers: () => [],
    savePlayers: () => {},
    setListener: () => ({ remove: () => {} }),
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
  const { t } = useTranslation();
  const helper = gameHelper(undefined);
  helper.generateNewGame(gameType.maxiYatzy);
  helper.setPlayers(players, t);
  return helper.getGame();
}

function renderYatzyScreen(players: PlayerDto[]) {
  mockSeededGame = seedGame(players);
  return render(
    <GameProvider>
      <YatzyScreen
        navigation={{} as any}
        route={{} as any}
      />
    </GameProvider>,
  );
}

describe('YatzyScreen integration', () => {
  it('renders one column header per player', async () => {
    const a = makePlayer(0, 'Alice');
    const b = makePlayer(1, 'Bob');
    renderYatzyScreen([a, b]);

    await screen.findByText(/Alice/);
    await screen.findByText(/Bob/);
  });

  it('renders the expected total of cells (one per player per row) without crashing', async () => {
    const a = makePlayer(0, 'Alice');
    const b = makePlayer(1, 'Bob');
    const { UNSAFE_getAllByType } = renderYatzyScreen([a, b]);

    const touchables = UNSAFE_getAllByType(TouchableOpacity);
    // 6 upper + 12 middle (maxiYatzy) + 1 lower = 19 rows, × 2 players = 38
    // score cells. Plus a few NextButton/etc. touchables on the screen.
    expect(touchables.length).toBeGreaterThanOrEqual(38);
  });

  it('does not crash when a cell is pressed on the live screen', async () => {
    const a = makePlayer(0, 'Alice');
    const b = makePlayer(1, 'Bob');
    const { UNSAFE_getAllByType } = renderYatzyScreen([a, b]);

    const touchables = UNSAFE_getAllByType(TouchableOpacity);
    expect(() =>
      act(() => {
        fireEvent.press(touchables[0]);
      }),
    ).not.toThrow();
  });
});

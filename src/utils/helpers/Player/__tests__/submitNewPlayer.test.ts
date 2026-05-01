import { TFunction } from 'i18next';
import { PlayerDto } from '@components/players/playerObject';
import { Game } from '@helpers/Game/Game';
import { submitNewPlayer } from '../PlayerHelper';

const mockTranslate = ((s: string) => s) as unknown as TFunction<'translation', undefined>;

let mockStoredPlayers: PlayerDto[] = [];

jest.mock('@helpers/Storage/player/playerHandler', () => ({
  __esModule: true,
  default: () => ({
    getPlayers: () => mockStoredPlayers,
    savePlayers: (p: PlayerDto[]) => {
      mockStoredPlayers = p;
    },
    setListener: () => ({ remove: () => {} }),
  }),
}));

describe('submitNewPlayer', () => {
  beforeEach(() => {
    mockStoredPlayers = [];
  });

  it('creates a game when none exists and stores the new player', () => {
    let game: Game | undefined;
    submitNewPlayer('Alice', '', mockTranslate, undefined, g =>
      (game = typeof g === 'function' ? g(undefined) : g),
    );

    expect(game).toBeDefined();
    expect(game?.players).toHaveLength(1);
    expect(game?.players?.[0].name).toBe('Alice');
  });

  it('assigns sequential playerIds', () => {
    let game: Game | undefined;
    const setGame = (g: any) => (game = typeof g === 'function' ? g(game) : g);

    submitNewPlayer('A', '', mockTranslate, undefined, setGame);
    submitNewPlayer('B', '', mockTranslate, game, setGame);
    submitNewPlayer('C', '', mockTranslate, game, setGame);

    expect(game?.players?.map(p => p.playerId)).toEqual([0, 1, 2]);
  });

  it('assigns sequential, defined order values to each new player', () => {
    let game: Game | undefined;
    const setGame = (g: any) => (game = typeof g === 'function' ? g(game) : g);

    submitNewPlayer('A', '', mockTranslate, undefined, setGame);
    submitNewPlayer('B', '', mockTranslate, game, setGame);
    submitNewPlayer('C', '', mockTranslate, game, setGame);

    const orders = game?.players?.map(p => p.order);
    expect(orders).toEqual([0, 1, 2]);
    orders?.forEach(o => expect(o).not.toBeUndefined());
  });

  it('does not change existing players when a new one is added', () => {
    let game: Game | undefined;
    const setGame = (g: any) => (game = typeof g === 'function' ? g(game) : g);

    submitNewPlayer('A', '', mockTranslate, undefined, setGame);
    const firstSnapshot = { ...game?.players?.[0] };

    submitNewPlayer('B', '', mockTranslate, game, setGame);
    const aAfter = game?.players?.find(p => p.name === 'A');

    expect(aAfter?.playerId).toBe(firstSnapshot.playerId);
    expect(aAfter?.order).toBe(firstSnapshot.order);
  });

  it('initialises an empty PlayerScore array per row for the new player', () => {
    let game: Game | undefined;
    const setGame = (g: any) => (game = typeof g === 'function' ? g(game) : g);

    submitNewPlayer('A', '', mockTranslate, undefined, setGame);
    submitNewPlayer('B', '', mockTranslate, game, setGame);

    const onesRow = game?.upper?.[0];
    expect(onesRow?.PlayerScore).toHaveLength(2);
    onesRow?.PlayerScore.forEach(ps => expect(ps.score).toBeUndefined());
  });
});

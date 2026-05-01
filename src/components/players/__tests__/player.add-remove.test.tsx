import { fireEvent, render } from '@testing-library/react-native';
import Player from '../player';
import gameHelper from '@helpers/Game/gameHelper';
import { gameType } from '@helpers/Game/gameType';
import { PlayerDto } from '../playerObject';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (s: string) => s,
    i18n: { changeLanguage: () => new Promise(() => {}) },
  }),
}));

jest.mock('@helpers/Storage/player/playerHandler', () => ({
  __esModule: true,
  default: () => ({
    getPlayers: () => [],
    savePlayers: () => {},
    setListener: () => ({ remove: () => {} }),
  }),
}));

const makeDto = (id: number, name: string): PlayerDto => ({
  playerId: id,
  name,
  imageUrl: '',
  plusImage: false,
  currentScore: 0,
  order: undefined,
});

describe('Player component – add/remove from game', () => {
  it('assigns order=0 to the first player added to a fresh game', () => {
    const helper = gameHelper(undefined);
    helper.generateNewGame(gameType.maxiYatzy);

    const dto = makeDto(0, 'Alice');
    const { getByText } = render(<Player playerDto={dto} gamingHelper={helper} />);
    fireEvent.press(getByText('Alice'));

    expect(helper.getPlayers()).toHaveLength(1);
    expect(helper.getPlayers()?.[0].playerId).toBe(0);
    expect(helper.getPlayers()?.[0].order).toBe(0);
  });

  it('assigns sequential order values when adding several players', () => {
    const helper = gameHelper(undefined);
    helper.generateNewGame(gameType.maxiYatzy);

    const a = makeDto(0, 'Alice');
    const b = makeDto(1, 'Bob');
    fireEvent.press(render(<Player playerDto={a} gamingHelper={helper} />).getByText('Alice'));
    fireEvent.press(render(<Player playerDto={b} gamingHelper={helper} />).getByText('Bob'));

    const ordered = helper.getPlayers() ?? [];
    expect(ordered.find(p => p.playerId === a.playerId)?.order).toBe(0);
    expect(ordered.find(p => p.playerId === b.playerId)?.order).toBe(1);
  });

  it('removes a player from the game when toggled twice', () => {
    const helper = gameHelper(undefined);
    helper.generateNewGame(gameType.maxiYatzy);

    const dto = makeDto(0, 'Alice');
    const { getByText } = render(<Player playerDto={dto} gamingHelper={helper} />);
    fireEvent.press(getByText('Alice')); // add
    fireEvent.press(getByText('Alice')); // remove

    expect(helper.getPlayers()).toHaveLength(0);
  });
});

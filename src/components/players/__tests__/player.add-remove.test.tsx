import {fireEvent, render, screen} from '@testing-library/react-native';
import Player from '../player';
import {PlayerDto} from '../playerObject';
import {GameProvider} from '@helpers/Game/gameContext';
import {createGameProbe} from '../__testUtils__/gameProbe';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (s: string) => s,
    i18n: {changeLanguage: () => new Promise(() => {})},
  }),
}));

let mockStoredPlayers: PlayerDto[] = [];

jest.mock('@helpers/Storage/player/playerHandler', () => ({
  __esModule: true,
  default: () => ({
    getPlayers: () => mockStoredPlayers,
    savePlayers: (players: PlayerDto[]) => {
      mockStoredPlayers = players;
    },
    setListener: () => ({remove: () => {}}),
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

async function renderPlayers(dtos: PlayerDto[]) {
  const probe = createGameProbe();
  mockStoredPlayers = dtos;
  await render(
    <GameProvider>
      {dtos.map(dto => (
        <Player key={dto.playerId} playerDto={dto} />
      ))}
      <probe.Probe />
    </GameProvider>,
  );
  return probe;
}

describe('Player component – add/remove from game', () => {
  it('assigns order=0 to the first player added to a fresh game', async () => {
    const probe = await renderPlayers([makeDto(0, 'Alice')]);

    await fireEvent.press(screen.getByText('Alice'));

    expect(probe.players()).toHaveLength(1);
    expect(probe.players()[0].playerId).toBe(0);
    expect(probe.players()[0].order).toBe(0);
  });

  it('assigns sequential order values when adding several players', async () => {
    const probe = await renderPlayers([makeDto(0, 'Alice'), makeDto(1, 'Bob')]);

    await fireEvent.press(screen.getByText('Alice'));
    await fireEvent.press(screen.getByText('Bob'));

    expect(probe.players().map(p => [p.playerId, p.order])).toEqual([
      [0, 0],
      [1, 1],
    ]);
  });

  it('removes a player from the game when toggled twice', async () => {
    const probe = await renderPlayers([makeDto(0, 'Alice')]);

    await fireEvent.press(screen.getByText('Alice')); // add
    await fireEvent.press(screen.getByText('Alice')); // remove

    expect(probe.players()).toHaveLength(0);
  });

  it('closes the gap in the order when a player is removed', async () => {
    const probe = await renderPlayers([
      makeDto(0, 'Alice'),
      makeDto(1, 'Bob'),
      makeDto(2, 'Cleo'),
    ]);

    await fireEvent.press(screen.getByText('Alice'));
    await fireEvent.press(screen.getByText('Bob'));
    await fireEvent.press(screen.getByText('Cleo'));
    await fireEvent.press(screen.getByText('Bob')); // remove the middle one

    expect(probe.players().map(p => [p.playerId, p.order])).toEqual([
      [0, 0],
      [2, 1],
    ]);
  });

  it('removes a deleted player from the game and from storage', async () => {
    const probe = await renderPlayers([makeDto(0, 'Alice'), makeDto(1, 'Bob')]);

    await fireEvent.press(screen.getByText('Alice'));
    await fireEvent.press(screen.getByText('Bob'));
    await fireEvent(screen.getByText('Alice'), 'longPress');
    await fireEvent.press(screen.getAllByText('player.positive')[0]);

    expect(probe.playerIds()).toEqual([1]);
    expect(mockStoredPlayers.map(p => p.playerId)).toEqual([1]);
  });
});

import {fireEvent, render} from '@testing-library/react-native';
import {TFunction} from 'i18next';
import Row from '../row';
import gameHelper from '@helpers/Game/gameHelper';
import {gameType} from '@helpers/Game/gameType';
import {PlayerDto} from '@components/players/playerObject';
import {GameState} from '@helpers/Game/GameState';
import {GameScore} from '@helpers/Game/GameScore';
import {PlayerScore} from '@helpers/Game/PlayerScore';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {changeLanguage: () => new Promise(() => {})},
  }),
}));

const t = ((s: string) => s) as unknown as TFunction<'translation', undefined>;

const makePlayer = (
  playerId: number,
  name: string,
  order?: number,
): PlayerDto => ({
  playerId,
  name,
  imageUrl: '',
  plusImage: false,
  currentScore: 0,
  order,
});

function setupOnesRow(players: PlayerDto[]): GameState {
  const helper = gameHelper(undefined);
  helper.generateNewGame(gameType.maxiYatzy);
  helper.setPlayers(players, t);
  return (helper.getGame().upper ?? [])[0];
}

describe('Row component – column to player mapping', () => {
  it('passes the correct PlayerScore to onPress for each column when players have order: undefined', async () => {
    const playerA = makePlayer(0, 'A');
    const playerB = makePlayer(1, 'B');
    const onesRow = setupOnesRow([playerA, playerB]);

    const onPress = jest.fn();
    const {getAllByTestId} = await render(
      <Row
        GameState={onesRow}
        backgroundColor=""
        doneCellStyle={{}}
        removedCellStyle={{}}
        onPress={onPress}
      />,
    );

    // The Row renders one score cell per player column.
    const cells = getAllByTestId('scoreCell');
    expect(cells).toHaveLength(2);

    await fireEvent.press(cells[0]);
    expect(onPress).toHaveBeenLastCalledWith(
      expect.objectContaining({
        player: expect.objectContaining({playerId: playerA.playerId}),
      }),
      onesRow.score,
    );

    await fireEvent.press(cells[1]);
    expect(onPress).toHaveBeenLastCalledWith(
      expect.objectContaining({
        player: expect.objectContaining({playerId: playerB.playerId}),
      }),
      onesRow.score,
    );
  });

  it('keeps each cell bound to its player after the GameState is replaced with an updated one', async () => {
    const playerA = makePlayer(0, 'A');
    const playerB = makePlayer(1, 'B');
    const helper = gameHelper(undefined);
    helper.generateNewGame(gameType.maxiYatzy);
    helper.setPlayers([playerA, playerB], t);

    const before = (helper.getGame().upper ?? [])[0];
    const aCell = before.PlayerScore.find(
      ps => ps.player.playerId === playerA.playerId,
    );
    if (!aCell) {
      throw new Error('A cell missing');
    }
    helper.scoreHandler().updatePlayerScore(before.score, {...aCell, score: 5});
    const after = (helper.getGame().upper ?? [])[0];

    const onPress = jest.fn();
    const {getAllByTestId} = await render(
      <Row
        GameState={after}
        backgroundColor=""
        doneCellStyle={{}}
        removedCellStyle={{}}
        onPress={onPress}
      />,
    );

    const cells = getAllByTestId('scoreCell');

    // Column 0 must still belong to player A (now with the score).
    await fireEvent.press(cells[0]);
    expect(onPress).toHaveBeenLastCalledWith(
      expect.objectContaining({
        player: expect.objectContaining({playerId: playerA.playerId}),
        score: 5,
      }),
      after.score,
    );

    // Column 1 must still belong to player B (unscored).
    await fireEvent.press(cells[1]);
    const lastCall: [PlayerScore, GameScore] =
      onPress.mock.calls[onPress.mock.calls.length - 1];
    expect(lastCall[0].player.playerId).toBe(playerB.playerId);
    expect(lastCall[0].score).toBeUndefined();
  });
});

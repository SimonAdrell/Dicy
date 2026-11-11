import {render, screen} from '@testing-library/react-native';
import BonusRow from '../bonusRow';
import {gameHelperType} from '@helpers/Game/gameHelperType';
import {PlayerDto} from '@components/players/playerObject';

const makePlayer = (id: number): PlayerDto => ({
  playerId: id,
  name: 'Alice',
  imageUrl: '',
  plusImage: false,
  currentScore: 0,
  order: 0,
});

const makeHelper = (
  upperScore: number,
  bonusLimit = 63,
  bonusScore = 50,
): gameHelperType =>
  ({
    getGame: () => ({bonusLimit, bonusScore}) as any,
    scoreHandler: () => ({
      getPlayersUpperScore: () => [{player: makePlayer(1), score: upperScore}],
    }),
  }) as unknown as gameHelperType;

describe('BonusRow', () => {
  it.each([
    ['regardless of earned status', 0],
    ['when the player has not yet earned it', 30],
    ['when the player has earned it', 63],
  ])('shows the bonus score %s', async (_case, upperScore) => {
    await render(
      <BonusRow backgroundColor="#fff" GameHelper={makeHelper(upperScore)} />,
    );
    expect(screen.getByText('+50')).toBeTruthy();
  });

  it('reflects a custom bonusScore value', async () => {
    await render(
      <BonusRow backgroundColor="#fff" GameHelper={makeHelper(0, 63, 100)} />,
    );
    expect(screen.getByText('+100')).toBeTruthy();
  });

  it('renders one cell per player', async () => {
    const helper = {
      getGame: () => ({bonusLimit: 63, bonusScore: 50}) as any,
      scoreHandler: () => ({
        getPlayersUpperScore: () => [
          {player: makePlayer(1), score: 0},
          {player: makePlayer(2), score: 0},
          {player: makePlayer(3), score: 0},
        ],
      }),
    } as unknown as gameHelperType;
    await render(<BonusRow backgroundColor="#fff" GameHelper={helper} />);
    expect(screen.getAllByText('+50')).toHaveLength(3);
  });
});

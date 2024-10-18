import {render} from '@testing-library/react-native';
import {gameType} from '../../../utils/helpers/Game/gameType';
import {PlayerDto} from '../../players/playerObject';
import BonusRow from '../bonusRow';
import gameHelper from '../../../utils/helpers/Game/gameHelper';

describe('bonusRow', () => {
  it('renders BonsRow Yatzy correctly', () => {
    // Arrange
    var gamingHelper = gameHelper(undefined);
    gamingHelper.generateNewGame(gameType.maxiYatzy);

    var testPlayers = new Array<PlayerDto>();

    testPlayers.push({
      name: 'TestPlayer 1',
      imageUrl: '',
      playerId: 0,
      plusImage: false,
      currentScore: 0,
      order: 1,
    });

    testPlayers.push({
      name: 'TestPlayer 2',
      imageUrl: '',
      playerId: 1,
      plusImage: false,
      currentScore: 0,
      order: 2,
    });

    gamingHelper.setPlayers(testPlayers, t);

    // Act
    const {getByPlaceholderText, getByText, getAllByText} = render(
      <BonusRow backgroundColor={''} GameHelper={gamingHelper} />,
    );

    // Assert
    const maxiYatzyElements = getAllByText('Bonus');
    expect(maxiYatzyElements).toHaveLength(1);
  });
});

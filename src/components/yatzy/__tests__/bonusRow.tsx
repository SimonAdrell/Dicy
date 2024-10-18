import {render} from '@testing-library/react-native';
import {gameType} from '../../../utils/helpers/Game/gameType';
import {PlayerDto} from '../../players/playerObject';
import BonusRow from '../bonusRow';
import gameHelper from '../../../utils/helpers/Game/gameHelper';
import {useTranslation} from 'react-i18next';

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        // You can include here any property your component may use
      },
    };
  },
}));

describe('bonusRow', () => {
  it('renders BonsRow Yatzy correctly', () => {
    // Arrange
    const {t, i18n} = useTranslation();

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
    const {getAllByText} = render(
      <BonusRow backgroundColor={''} GameHelper={gamingHelper} />,
    );

    // Assert
    const maxiYatzyElements = getAllByText('Bonus');
    expect(maxiYatzyElements).toHaveLength(1);
  });
});

import { render } from '@testing-library/react-native';
import GameTypeItem from '../gameTypeItem';

describe('renders GameTypeItem', () => {
  it('renders GameTypeItem Maxi Yatzy correctly', () => {
    // Arrange
    const onSelectedMock = jest.fn((): void => { });
    const onMock = new onSelectedMock();

    // Act
    const { getByPlaceholderText, getByText, getAllByText } = render(
      <GameTypeItem
        gameName={'Maxi Yatzy'}
        gameTagLine={'Played with 6 six-sided dice'}
        IconName={'dice-6'}
        onSelected={() => { }}
      />,
    );

    // Assert
    const maxiYatxuElements = getAllByText('Maxi Yatzy');
    expect(maxiYatxuElements).toHaveLength(1);
  });
});

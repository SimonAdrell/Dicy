import {fireEvent, render, screen} from '@testing-library/react-native';
import GameTypeItem from '../gameTypeItem';

const baseProps = {
  gameName: 'Maxi Yatzy',
  gameTagLine: 'Played with 6 six-sided dice',
  pips: 6,
  categories: 20,
  bonusLimit: 75,
  onSelected: jest.fn(),
};

describe('GameTypeItem', () => {
  it('renders the game name and tagline', () => {
    render(<GameTypeItem {...baseProps} />);
    expect(screen.getByText('Maxi Yatzy')).toBeTruthy();
    expect(screen.getByText('Played with 6 six-sided dice')).toBeTruthy();
  });

  it('renders the category count and bonus limit in the stats footer', () => {
    render(<GameTypeItem {...baseProps} />);
    expect(screen.getByText('20')).toBeTruthy();
    expect(screen.getByText('75')).toBeTruthy();
  });

  it('calls onSelected when pressed', () => {
    const onSelected = jest.fn();
    render(<GameTypeItem {...baseProps} onSelected={onSelected} />);
    fireEvent.press(screen.getByText('Maxi Yatzy'));
    expect(onSelected).toHaveBeenCalledTimes(1);
  });

  it('renders a die face with the correct pip count', () => {
    render(<GameTypeItem {...baseProps} pips={5} />);
    expect(screen.getAllByTestId('pip')).toHaveLength(5);
  });
});

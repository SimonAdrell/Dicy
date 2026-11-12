import {render, screen} from '@testing-library/react-native';
import DieFace from '../DieFace';

describe('DieFace', () => {
  it.each([
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6],
  ])('renders %i pip(s) for face value %i', async (pips, expectedCount) => {
    await render(<DieFace pips={pips} />);
    expect(screen.getAllByTestId('pip')).toHaveLength(expectedCount);
  });

  it('renders zero pips for an unknown face value', async () => {
    await render(<DieFace pips={7} />);
    expect(screen.queryAllByTestId('pip')).toHaveLength(0);
  });

  it('renders without crashing for both tone values', async () => {
    await expect(
      render(<DieFace pips={5} tone="light" />),
    ).resolves.toBeDefined();
    await expect(
      render(<DieFace pips={5} tone="dark" />),
    ).resolves.toBeDefined();
  });
});

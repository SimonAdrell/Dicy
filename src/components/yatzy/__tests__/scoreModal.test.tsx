import { fireEvent, render, screen, act } from '@testing-library/react-native';
import { TextInput } from 'react-native';
import { AddScoreModal } from '../scoreModal';
import { PlayerDto } from '@components/players/playerObject';
import { GameScore } from '@helpers/Game/GameScore';
import { PlayerScore } from '@helpers/Game/PlayerScore';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (s: string) => s,
    i18n: { changeLanguage: () => new Promise(() => {}) },
  }),
}));

const playerA: PlayerDto = {
  playerId: 0,
  name: 'Alice',
  imageUrl: '',
  plusImage: false,
  currentScore: 0,
  order: 0,
};

const onesScore: GameScore = { name: 'ones', topScore: 6 };
const aliceCell: PlayerScore = { player: playerA, isRemoved: false, score: undefined };

describe('AddScoreModal.onSave', () => {
  it('calls onExit with the new playerScore when a score is entered', () => {
    const onExit = jest.fn();
    const hideModal = jest.fn();
    render(
      <AddScoreModal
        players={[playerA]}
        scoreToBeUpdated={onesScore}
        playerScore={aliceCell}
        visible={true}
        onExit={onExit}
        hideModal={hideModal}
      />,
    );

    // The modal is visible, so its TextInput is in the tree (the second
    // TextInput is rendered when modalShown is false at first paint).
    const inputs = screen.UNSAFE_getAllByType(TextInput);
    fireEvent.changeText(inputs[inputs.length - 1], '5');

    fireEvent.press(screen.getByText('yatzyScreen.savePoints'));

    expect(onExit).toHaveBeenCalledTimes(1);
    expect(onExit).toHaveBeenCalledWith(
      expect.objectContaining({
        player: expect.objectContaining({ playerId: playerA.playerId }),
        score: 5,
        isRemoved: false,
      }),
      onesScore,
    );
  });

  it('calls onExit with undefined when nothing changed', () => {
    const onExit = jest.fn();
    render(
      <AddScoreModal
        players={[playerA]}
        scoreToBeUpdated={onesScore}
        playerScore={aliceCell}
        visible={true}
        onExit={onExit}
        hideModal={() => {}}
      />,
    );

    fireEvent.press(screen.getByText('yatzyScreen.savePoints'));

    expect(onExit).toHaveBeenCalledTimes(1);
    expect(onExit).toHaveBeenCalledWith(undefined, onesScore);
  });

  it('passes isRemoved=true through onExit when the cross-out switch is toggled', () => {
    const onExit = jest.fn();
    render(
      <AddScoreModal
        players={[playerA]}
        scoreToBeUpdated={onesScore}
        playerScore={aliceCell}
        visible={true}
        onExit={onExit}
        hideModal={() => {}}
      />,
    );

    const switches = screen.UNSAFE_getAllByProps({ value: false }).filter(
      (n: any) => typeof n.props.onValueChange === 'function',
    );
    expect(switches.length).toBeGreaterThan(0);
    act(() => {
      switches[0].props.onValueChange();
    });

    fireEvent.press(screen.getByText('yatzyScreen.savePoints'));

    expect(onExit).toHaveBeenCalledTimes(1);
    expect(onExit).toHaveBeenCalledWith(
      expect.objectContaining({
        player: expect.objectContaining({ playerId: playerA.playerId }),
        isRemoved: true,
      }),
      onesScore,
    );
  });
});

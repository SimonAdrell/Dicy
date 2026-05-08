import { act, fireEvent, render, screen } from '@testing-library/react-native';
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

const onesScore: GameScore = { name: 'Ones', topScore: 6 };
const straightScore: GameScore = { name: 'Small straight', topScore: 15, setScore: 15 };
const aliceCell: PlayerScore = { player: playerA, isRemoved: false, score: undefined };

const defaultProps = {
  players: [playerA],
  scoreToBeUpdated: onesScore,
  playerScore: aliceCell,
  visible: true,
  onExit: jest.fn(),
  hideModal: jest.fn(),
};

/* ── Numpad interaction ─────────────────────────────────────────── */

describe('AddScoreModal — numpad', () => {
  it('appends digits when numpad keys are pressed', () => {
    render(<AddScoreModal {...defaultProps} />);
    fireEvent.press(screen.getByText('1'));
    fireEvent.press(screen.getByText('2'));
    // The score display should show "12"
    expect(screen.getByText('12')).toBeTruthy();
  });

  it('clears the value when C is pressed', () => {
    render(<AddScoreModal {...defaultProps} />);
    fireEvent.press(screen.getByText('5'));
    fireEvent.press(screen.getByText('C'));
    expect(screen.queryByText('5')).toBeNull();
  });

  it('removes the last character when ⌫ is pressed', () => {
    render(<AddScoreModal {...defaultProps} />);
    fireEvent.press(screen.getByText('2'));
    fireEvent.press(screen.getByText('4'));
    fireEvent.press(screen.getByText('⌫'));
    expect(screen.getByText('2')).toBeTruthy();
    expect(screen.queryByText('24')).toBeNull();
  });

  it('does nothing when ⌫ is pressed on an empty value', () => {
    expect(() => {
      render(<AddScoreModal {...defaultProps} />);
      fireEvent.press(screen.getByText('⌫'));
    }).not.toThrow();
  });
});

/* ── Save behaviour ─────────────────────────────────────────────── */

describe('AddScoreModal — onSave', () => {
  it('calls onExit with the entered score when numpad digits are pressed then Save', () => {
    const onExit = jest.fn();
    render(<AddScoreModal {...defaultProps} onExit={onExit} />);

    fireEvent.press(screen.getByText('5'));
    fireEvent.press(screen.getByText('yatzyScreen.savePoints'));

    expect(onExit).toHaveBeenCalledTimes(1);
    expect(onExit).toHaveBeenCalledWith(
      expect.objectContaining({ score: 5, isRemoved: false }),
      onesScore,
    );
  });

  it('calls onExit with undefined when nothing changed', () => {
    const onExit = jest.fn();
    render(<AddScoreModal {...defaultProps} onExit={onExit} />);

    fireEvent.press(screen.getByText('yatzyScreen.savePoints'));

    expect(onExit).toHaveBeenCalledWith(undefined, onesScore);
  });

  it('passes isRemoved=true when the cross-out toggle is switched', () => {
    const onExit = jest.fn();
    render(<AddScoreModal {...defaultProps} onExit={onExit} />);

    act(() => {
      screen.getByText('yatzyScreen.crossOut')
        .parent?.parent?.findAll(n => n.props.onValueChange)?.[0]
        ?.props.onValueChange();
    });

    fireEvent.press(screen.getByText('yatzyScreen.savePoints'));

    expect(onExit).toHaveBeenCalledWith(
      expect.objectContaining({ isRemoved: true }),
      onesScore,
    );
  });
});

/* ── Fixed-score (setScore) quick-fill ──────────────────────────── */

describe('AddScoreModal — setScore quick-fill', () => {
  it('shows the SET hint for categories that have a setScore', () => {
    render(<AddScoreModal {...defaultProps} scoreToBeUpdated={straightScore} />);
    expect(screen.getByText('SET 15')).toBeTruthy();
  });

  it('does not show the SET hint for categories without a setScore', () => {
    render(<AddScoreModal {...defaultProps} scoreToBeUpdated={onesScore} />);
    expect(screen.queryByText(/^SET /)).toBeNull();
  });

  it('shows the quick-fill button when value is empty and category has setScore', () => {
    render(<AddScoreModal {...defaultProps} scoreToBeUpdated={straightScore} />);
    expect(screen.getByText('Score the set value · 15')).toBeTruthy();
  });

  it('pre-fills the score when the quick-fill button is pressed', () => {
    render(<AddScoreModal {...defaultProps} scoreToBeUpdated={straightScore} />);
    fireEvent.press(screen.getByText('Score the set value · 15'));
    expect(screen.getByText('15')).toBeTruthy();
  });

  it('hides the quick-fill button once a value is entered', () => {
    render(<AddScoreModal {...defaultProps} scoreToBeUpdated={straightScore} />);
    fireEvent.press(screen.getByText('1'));
    expect(screen.queryByText('Score the set value · 15')).toBeNull();
  });
});

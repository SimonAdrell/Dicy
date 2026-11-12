import {fireEvent, render, screen} from '@testing-library/react-native';
import {AddScoreModal} from '../scoreModal';
import {PlayerDto} from '@components/players/playerObject';
import {GameScore} from '@helpers/Game/GameScore';
import {PlayerScore} from '@helpers/Game/PlayerScore';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (s: string) => s,
    i18n: {changeLanguage: () => new Promise(() => {})},
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

const onesScore: GameScore = {name: 'Ones', topScore: 6};
const aliceCell: PlayerScore = {
  player: playerA,
  isRemoved: false,
  score: undefined,
};

const defaultProps = {
  players: [playerA],
  scoreToBeUpdated: onesScore,
  playerScore: aliceCell,
  visible: true,
  onExit: jest.fn(),
  hideModal: jest.fn(),
};

/* ── Save behaviour ─────────────────────────────────────────────── */

describe('AddScoreModal — onSave', () => {
  it('calls onExit with the entered score when a value is typed then Save', async () => {
    const onExit = jest.fn();
    await render(<AddScoreModal {...defaultProps} onExit={onExit} />);

    await fireEvent.changeText(screen.getByTestId('scoreInput'), '5');
    await fireEvent.press(screen.getByText('yatzyScreen.savePoints'));

    expect(onExit).toHaveBeenCalledTimes(1);
    expect(onExit).toHaveBeenCalledWith(
      expect.objectContaining({score: 5, isRemoved: false}),
      onesScore,
    );
  });

  it('calls onExit with undefined when nothing changed', async () => {
    const onExit = jest.fn();
    await render(<AddScoreModal {...defaultProps} onExit={onExit} />);

    await fireEvent.press(screen.getByText('yatzyScreen.savePoints'));

    expect(onExit).toHaveBeenCalledWith(undefined, onesScore);
  });

  it('passes isRemoved=true when the cross-out toggle is switched', async () => {
    const onExit = jest.fn();
    await render(<AddScoreModal {...defaultProps} onExit={onExit} />);

    await fireEvent(screen.getByTestId('crossOutSwitch'), 'valueChange', true);

    await fireEvent.press(screen.getByText('yatzyScreen.savePoints'));

    expect(onExit).toHaveBeenCalledWith(
      expect.objectContaining({isRemoved: true}),
      onesScore,
    );
  });
});

import {
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { useState } from 'react';
import { Avatar } from '../players/PlayerAvatar';
import { PlayerDto } from '../players/playerObject';
import Modal from 'react-native-modal';
import React from 'react';
import { PlayerScore } from '@helpers/Game/PlayerScore';
import { GameScore } from '@helpers/Game/GameScore';
import { modalStyle, SharedStyle } from '@styles/sharedStyle';
import { useTranslation } from 'react-i18next';
import NextButton from '@components/shared/button';

export type scoreModalProps = {
  scoreToBeUpdated: GameScore | undefined;
  playerScore: PlayerScore | undefined;
  visible: boolean;
  players: PlayerDto[];
  hideModal: () => void;
  onExit: (
    playerScore: PlayerScore | undefined,
    scoreToBeUpdated: GameScore | undefined,
  ) => void;
};

const NUMPAD_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'];

export function AddScoreModal(options: scoreModalProps) {
  const { t } = useTranslation();
  const [isRemoved, onEnabledChange] = useState(options.playerScore?.isRemoved);
  const toggleSwitch = () => onEnabledChange(previousState => !previousState);
  const [scoreString, onChangeScore] = useState<string>('');
  const [player, onChangePlayer] = useState<PlayerDto | undefined>(
    getPlayer(options.playerScore?.player.playerId),
  );

  function clearModal() {
    onEnabledChange(false);
    onChangePlayer(undefined);
    onChangeScore('');
  }

  function exitModal(
    playerScore: PlayerScore | undefined,
    scoreToBeUpdated: GameScore | undefined,
  ) {
    options.onExit(playerScore, scoreToBeUpdated);
    clearModal();
    options.hideModal();
  }

  function getValidNumber(): number {
    const scoreNumber = Number(scoreString);
    if (scoreNumber === undefined) return -1;
    if (scoreNumber === null) return -1;
    if (scoreNumber === 0) return -1;
    if (isNaN(scoreNumber)) return -1;
    return scoreNumber;
  }

  const onSave = () => {
    const scoreNumber = getValidNumber();
    if (options.playerScore === undefined) {
      exitModal(undefined, options.scoreToBeUpdated);
      return;
    }
    const playerScore: PlayerScore = {
      isRemoved: isRemoved,
      score: undefined,
      player: options.playerScore?.player,
    };
    playerScore.isRemoved = isRemoved;
    if (scoreNumber > -1) {
      playerScore.score = scoreNumber;
    }
    const isChanged = checkIfPlayerScoreIsChanged(playerScore);
    if (isChanged) {
      exitModal(playerScore, options.scoreToBeUpdated);
    } else {
      exitModal(undefined, options.scoreToBeUpdated);
    }
  };

  function checkIfPlayerScoreIsChanged(playerScore: PlayerScore) {
    let isChanged = false;
    if (options.playerScore?.isRemoved !== playerScore.isRemoved) isChanged = true;
    if (options.playerScore?.score !== playerScore.score) isChanged = true;
    return isChanged;
  }

  function getPlayer(playerId: number | undefined): PlayerDto | undefined {
    if (playerId === undefined) return undefined;
    return options.players.filter(p => p.playerId === playerId).find(() => true);
  }

  const onModalShow = () => {
    onChangePlayer(getPlayer(options.playerScore?.player.playerId));
    if (options.playerScore?.score)
      onChangeScore(options.playerScore.score.toLocaleString());
    onEnabledChange(options.playerScore?.isRemoved);
  };

  const onModalWillHide = () => exitModal(undefined, options.scoreToBeUpdated);

  const handleNumpadKey = (key: string) => {
    if (key === 'C') {
      onChangeScore('');
      return;
    }
    if (key === '⌫') {
      onChangeScore(v => v.slice(0, -1));
      return;
    }
    onChangeScore(v => (v + key).replace(/^0+(?=\d)/, ''));
  };

  const setScore = options.scoreToBeUpdated?.setScore;

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const mstyle = modalStyle(isDarkMode);
  const sStyle = SharedStyle(isDarkMode);

  return (
    <View>
      <Modal
        style={mstyle.modal}
        isVisible={options.visible}
        onBackdropPress={() => exitModal(undefined, options.scoreToBeUpdated)}
        onModalShow={onModalShow}
        onModalWillHide={onModalWillHide}>
        <View style={mstyle.centeredView}>
          <View style={mstyle.modalView}>
            {/* Player avatar + name */}
            <View style={mstyle.modalText}>
              <Avatar
                src={player === undefined ? undefined : player.imageUrl}
                imageHeight={72}
              />
              <Text style={[sStyle.fontColor, { fontSize: 14, marginTop: 4 }]}>
                {player?.name}
              </Text>
            </View>

            {/* Category name */}
            <Text
              style={[
                mstyle.modalText,
                { fontSize: 20, fontWeight: '700' },
                isRemoved ? { textDecorationLine: 'line-through' } : {},
              ]}>
              {options.scoreToBeUpdated?.name}
            </Text>

            {/* SET hint for fixed-score categories */}
            {setScore != null && (
              <Text style={[mstyle.tinyModalText, { opacity: 0.6 }]}>
                SET {setScore}
              </Text>
            )}

            {/* Score display */}
            <View style={[numpadStyles.scoreDisplay, isRemoved && { opacity: 0.4 }]}>
              <Text
                style={[
                  numpadStyles.scoreText,
                  isRemoved && { textDecorationLine: 'line-through' },
                ]}>
                {scoreString || ''}
              </Text>
            </View>

            {/* Quick-fill button for fixed-score categories */}
            {setScore != null && !isRemoved && scoreString === '' && (
              <TouchableOpacity
                style={numpadStyles.quickFillButton}
                onPress={() => onChangeScore(String(setScore))}>
                <Text style={numpadStyles.quickFillText}>
                  Score the set value · {setScore}
                </Text>
              </TouchableOpacity>
            )}

            {/* Numpad */}
            <View style={numpadStyles.numpad}>
              {NUMPAD_KEYS.map(key => {
                const isAction = key === 'C' || key === '⌫';
                return (
                  <TouchableOpacity
                    key={key}
                    disabled={!!isRemoved}
                    onPress={() => handleNumpadKey(key)}
                    style={[
                      numpadStyles.key,
                      isAction ? numpadStyles.keyAction : numpadStyles.keyDigit,
                      isRemoved ? numpadStyles.keyDisabled : {},
                    ]}>
                    <Text style={numpadStyles.keyText}>{key}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Cross-out toggle */}
            <View style={[mstyle.formView, { flexDirection: 'row', gap: 12 }]}>
              <Text style={[mstyle.tinyModalText, { margin: 0 }]}>
                {t('yatzyScreen.crossOut')}
              </Text>
              <Switch
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isRemoved}
                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
              />
            </View>

            {/* Save button */}
            <View style={mstyle.saveView}>
              <NextButton onPress={onSave} text={t('yatzyScreen.savePoints')} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const numpadStyles = StyleSheet.create({
  scoreDisplay: {
    backgroundColor: '#214540',
    borderRadius: 14,
    padding: 16,
    minHeight: 64,
    marginVertical: 12,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    color: '#fff8f1',
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: -1,
    minWidth: 20,
    textAlign: 'center',
  },
  quickFillButton: {
    backgroundColor: 'rgba(255,199,0,0.22)',
    borderWidth: 1,
    borderColor: 'rgba(255,199,0,0.55)',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginBottom: 8,
    alignSelf: 'center',
  },
  quickFillText: {
    color: '#063b35',
    fontSize: 13,
    fontWeight: '600',
  },
  numpad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
    width: '100%',
  },
  key: {
    width: '30%',
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  keyDigit: {
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  keyAction: {
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
  keyDisabled: {
    opacity: 0.4,
  },
  keyText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#063b35',
  },
});

import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
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
import NextButton from 'components/shared/button';

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

export function AddScoreModal(options: scoreModalProps) {
  const { t } = useTranslation();
  const [isRemoved, onEnabledChange] = useState(options.playerScore?.isRemoved);
  const toggleSwitch = () => onEnabledChange(previousState => !previousState);
  const [scoreString, onChangeScore] = useState<string>('');
  const [player, onChangePlayer] = useState<PlayerDto | undefined>(
    getPlayer(options.playerScore?.player.playerId),
  );
  const inputRef = React.useRef<TextInput | null>(null);
  const [modalShown, setModalShown] = useState(false);

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
    setModalShown(false);
  }

  function getValidNumber(): number {
    var scoreNumber = Number(scoreString);
    if (scoreNumber === undefined) return -1;

    if (scoreNumber === null) return -1;

    if (scoreNumber === 0) return -1;

    if (isNaN(scoreNumber)) return -1;

    return scoreNumber;
  }

  const onSave = () => {
    var scoreNumber = getValidNumber();
    if (options.playerScore === undefined) {
      exitModal(undefined, options.scoreToBeUpdated);
      return;
    }
    var playerScore: PlayerScore = {
      isRemoved: isRemoved,
      score: undefined,
      player: options.playerScore?.player,
    };
    playerScore.isRemoved = isRemoved;
    if (scoreNumber > -1) {
      playerScore.score = scoreNumber;
    }
    var isChanged: boolean = checkIfPlayerScoreIsChanged(playerScore);
    if (isChanged) exitModal(playerScore, options.scoreToBeUpdated);

    exitModal(undefined, options.scoreToBeUpdated);
  };

  function checkIfPlayerScoreIsChanged(playerScore: PlayerScore) {
    var isChanged: boolean = false;
    if (options.playerScore?.isRemoved != playerScore.isRemoved) {
      isChanged = true;
    }
    if (options.playerScore?.score != playerScore.score) {
      isChanged = true;
    }
    return isChanged;
  }

  function getPlayer(playerId: number | undefined): PlayerDto | undefined {
    if (playerId === undefined) {
      return undefined;
    }
    return options.players
      .filter(p => p.playerId === playerId)
      .find(() => true);
  }

  const onModalShow = () => {
    setModalShown(true);
    onChangePlayer(getPlayer(options.playerScore?.player.playerId));
    if (options.playerScore?.score)
      onChangeScore(options.playerScore?.score.toLocaleString());
    onEnabledChange(options.playerScore?.isRemoved);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const onModalWillHide = () => {
    exitModal(undefined, options.scoreToBeUpdated);
  };

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const mstyle = modalStyle(isDarkMode);
  const sStyle = SharedStyle(isDarkMode);
  return (
    <View>
      <Modal
        style={mstyle.modal}
        isVisible={options.visible}
        onBackdropPress={() => {
          exitModal(undefined, options.scoreToBeUpdated);
        }}
        onModalShow={onModalShow}
        onModalWillHide={onModalWillHide}>
        <View style={mstyle.centeredView}>
          <View style={mstyle.modalView}>
            <View style={mstyle.modalText}>
              <Avatar
                src={player === undefined ? undefined : player.imageUrl}
                imageHeight={100}></Avatar>
              <Text style={[sStyle.fontColor, { fontSize: 18 }]}>
                {player === undefined ? undefined : player.name}
              </Text>
            </View>
            <Text style={mstyle.modalText}>
              {options.scoreToBeUpdated?.name}
            </Text>
            <Text style={mstyle.tinyModalText}>
              Max: {options.scoreToBeUpdated?.topScore}
            </Text>
            <View style={mstyle.formView}>
              {modalShown && (
                <TextInput
                  autoFocus={true}
                  ref={inputRef}
                  value={scoreString}
                  onChangeText={onChangeScore}
                  keyboardType="number-pad"
                  style={mstyle.textInput}></TextInput>
              )}
              {!modalShown && (
                <TextInput
                  style={mstyle.textInput}
                  onChangeText={onChangeScore}
                />
              )}
            </View>
            <View style={mstyle.formView}>
              <Switch
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isRemoved}
              />
              <Text>{t('yatzyScreen.crossOut')}</Text>
            </View>
            <View style={mstyle.saveView}>
              <NextButton onPress={onSave} text={t('yatzyScreen.savePoints')}></NextButton>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
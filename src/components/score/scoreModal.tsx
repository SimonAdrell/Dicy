import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import Modal from 'react-native-modal';
import React, { useRef, useState } from 'react';
import { gameHelperType } from '@helpers/Game/gameHelperType';
import { ScoreModalPlayer } from './playerScoreRow';
import LottieView from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import { modalStyle } from '@styles/sharedStyle';
import NextButton from '@components/shared/button';
export type playersScoreModalProps = {
  GameHelper: gameHelperType;
  visible: boolean;
  onExit: () => void;
};

export function PlayersScoreModal(options: playersScoreModalProps) {
  const { t } = useTranslation();
  function exitModal() {
    options.onExit();
    setAnimationVisibility(true);
  }
  var [animate, setAnimationVisibility] = useState<boolean>(true);
  var playersTotalScore = options.GameHelper.getPlayers()?.slice();
  const confettiRef = useRef<LottieView>(null);
  function triggerConfetti() {
    confettiRef.current?.play(0);
  }
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const mStyle = modalStyle(isDarkMode);
  return (
    <View>
      <Modal
        style={mStyle.modal}
        isVisible={options.visible}
        onBackdropPress={exitModal}
        onModalWillHide={exitModal}
        onShow={triggerConfetti}>
        <View style={mStyle.centeredView}>
          {animate && (
            <View
              style={{
                pointerEvents: 'none',
                height: '100%',
                width: '100%',
                position: 'absolute',
                zIndex: 1,
              }}>
              <LottieView
                ref={confettiRef}
                source={require('../../../assets/confetti.json')}
                autoPlay={false}
                loop={false}
                style={mStyle.lottie}
                resizeMode="cover"
                onAnimationFinish={() => {
                  setAnimationVisibility(false);
                }}
              />
            </View>
          )}

          <View style={mStyle.modalView}>
            <View style={mStyle.modalText}>
              {playersTotalScore
                ?.sort((a, b) => b.currentScore - a.currentScore)
                .map((element, index) => {
                  return (
                    <ScoreModalPlayer
                      key={index + ''}
                      place={(index += 1)}
                      player={element}
                      style={mStyle.playerRow}
                    />
                  );
                })}
            </View>
            <NextButton text={t('yatzyScreen.close')} onPress={exitModal}></NextButton>
          </View>
        </View>
      </Modal>
    </View>
  );
}

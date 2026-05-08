import {useColorScheme, View} from 'react-native';
import Modal from 'react-native-modal';
import React, {useRef, useMemo, useState} from 'react';
import {gameHelperType} from '@helpers/Game/gameHelperType';
import {ScoreModalPlayer} from './playerScoreRow';
import LottieView from 'lottie-react-native';
import {useTranslation} from 'react-i18next';
import {modalStyle, SharedStyle} from '@styles/sharedStyle';
import NextButton from '@components/shared/button';
export type playersScoreModalProps = {
  GameHelper: gameHelperType;
  visible: boolean;
  onExit: () => void;
};

export function PlayersScoreModal(options: playersScoreModalProps) {
  const {t} = useTranslation();
  function exitModal() {
    options.onExit();
    setAnimationVisibility(true);
  }
  const [animate, setAnimationVisibility] = useState<boolean>(true);
  const playersTotalScore = useMemo(
    () =>
      options.visible
        ? options.GameHelper.getPlayers()
            ?.slice()
            .sort((a, b) => b.currentScore - a.currentScore)
        : undefined,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options.visible],
  );
  const confettiRef = useRef<LottieView>(null);
  function triggerConfetti() {
    confettiRef.current?.play(0);
  }
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const mStyle = modalStyle(isDarkMode);
  const sStyle = SharedStyle(isDarkMode);
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
              {playersTotalScore?.map((element, index) => {
                const isWinner = index === 0;
                return (
                  <ScoreModalPlayer
                    key={element.playerId.toString()}
                    place={index + 1}
                    player={element}
                    style={[
                      mStyle.playerRow,
                      isWinner
                        ? {backgroundColor: '#FFC700'}
                        : sStyle.itemBackground,
                    ]}
                  />
                );
              })}
            </View>
            <NextButton text={t('yatzyScreen.close')} onPress={exitModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

import { Text, useColorScheme, View } from 'react-native';
import { TextInput } from 'react-native';
import React, { useState } from 'react';
import { AvatarCreation } from './PlayerAvatar';
import Modal from 'react-native-modal';
import { takenImage } from '@helpers/Image/takenImage';
import { useTranslation } from 'react-i18next';
import NextButton from '@components/shared/button';
import { modalStyle } from '@styles/sharedStyle';

export type AddUserModalProps = {
  readonly visible: boolean;
  readonly onSubmit: (playerName: string, imageUrl: string) => void;
  readonly onBackdropPress: () => void;
};

export function AddUserModal({
  visible,
  onSubmit,
  onBackdropPress,
}: AddUserModalProps) {
  const { t } = useTranslation();
  const [playerName, setPlayerName] = useState<string>('');
  const [playerImage, setPlayerImage] = useState<string>('');
  const onSavePress = () => {
    onSubmit(playerName, playerImage);
    setPlayerName('');
    setPlayerImage('');
  };
  const onAvatarChange = (image: takenImage) => {
    setPlayerImage(image.path);
  };
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const mstyle = modalStyle(isDarkMode)
  return (
    <View>
      <Modal
        animationIn="slideInUp"
        style={mstyle.modal}
        isVisible={visible}
        onBackdropPress={onBackdropPress}>
        <View style={mstyle.centeredView}>
          <View style={mstyle.modalView}>
            <Text style={mstyle.modalText}>{t('player.addPlayerHeader')}</Text>
            <View style={mstyle.modalText}>
              <AvatarCreation onChange={onAvatarChange}></AvatarCreation>

            </View>
            <View style={mstyle.formView}>
              <TextInput
                placeholder={t('player.addNewPlayerPlaceHolder')}
                value={playerName}
                autoFocus={true}
                onChangeText={setPlayerName}
                testID="App.username"
                style={mstyle.textInput}></TextInput>
            </View>
            <View style={mstyle.saveView}>
              <NextButton onPress={onSavePress} text={t('player.addNewPlayerSaveButton')}></NextButton>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

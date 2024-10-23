import {Pressable, Text, View} from 'react-native';
import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {AvatarCreation} from './PlayerAvatar';
import Modal from 'react-native-modal';
import {sharedStyle} from '@styles/sharedStyle';
import {takenImage} from '@helpers/Image/takenImage';
import {useTranslation} from 'react-i18next';

export type AddUserModalProps = {
  name: string;
  visible: boolean;
  onSubmit: (playerName: string, imageUrl: string) => void;
  onBackdropPress: () => void;
};

export function AddUserModal({
  visible,
  onSubmit,
  onBackdropPress,
}: AddUserModalProps) {
  const {t} = useTranslation();
  const [playerName, onChangePlayerName] = React.useState<string>('');
  const [playerImage, OnChangePlayerImage] = React.useState<string>('');
  const onSavePress = () => {
    onSubmit(playerName, playerImage);
    onChangePlayerName('');
    OnChangePlayerImage('');
  };
  const onAvatarChange = (image: takenImage) => {
    OnChangePlayerImage(image.path);
  };

  return (
    <View>
      <Modal
        animationIn="slideInUp"
        style={styles.modal}
        isVisible={visible}
        onBackdropPress={onBackdropPress}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{t('player.addPlayerHeader')}</Text>
            <View style={styles.formView}>
              <AvatarCreation onChange={onAvatarChange}></AvatarCreation>
              <TextInput
                placeholder={t('player.addNewPlayerPlaceHolder')}
                value={playerName}
                autoFocus={true}
                onChangeText={onChangePlayerName}
                testID="App.username"
                style={styles.textInput}></TextInput>
            </View>
            <View style={styles.lowerView}>
              <View style={styles.saveView}>
                <Pressable role="button" onPress={onSavePress}>
                  <Text style={styles.saveText}>
                    {t('player.addNewPlayerSaveButton')}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
    padding: 10,
  },
  textInput: {
    fontSize: 14,
    lineHeight: 32,
    width: 300,
    borderColor: '#6750A4',
    marginTop: 40,
    borderRadius: 6,
    borderWidth: 2,
    paddingLeft: 10,
    color: sharedStyle.darkFontColor.color,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  lowerView: {
    backgroundColor: '#F7F7F7',
    width: '100%',
    padding: 10,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  modalView: {
    borderRadius: 20,
    backgroundColor: '#FFF',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 15,
    color: sharedStyle.darkFontColor.color,
  },
  formView: {
    alignItems: 'center',
    padding: 20,
  },
  saveView: {
    alignItems: 'flex-end',
  },
  saveText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    backgroundColor: '#FFC700',
    fontWeight: 'bold',
  },
});

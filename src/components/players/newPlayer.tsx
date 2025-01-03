import { StyleSheet, View, TouchableOpacity, useColorScheme } from 'react-native';
import { AddUserModal } from './addPlayerModal';
import { useState } from 'react';
import { NewPlayerAvatar } from './PlayerAvatar';
import { useTranslation } from 'react-i18next';
import { submitNewPlayer } from '@helpers/Player/PlayerHelper';
import { useGame } from '@helpers/Game/gameContext';
import { SharedStyle } from '@styles/sharedStyle';

export default function NewPlayerIcon() {
  const { t } = useTranslation();
  const { setGame, game } = useGame();
  const [modalVisible, setModalVisible] = useState(false);
  const onPress = () => {
    setModalVisible(true);
  };
  const onPlayerSubmit = (playerName: string, imageUrl: string) => {
    setModalVisible(false);
    submitNewPlayer(playerName, imageUrl, t, game, setGame);
  };

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const sStyle = SharedStyle(isDarkMode);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.wrapperContainer}>
          <NewPlayerAvatar
            imageHeight={75}
            style={[styles.avatarStyle, sStyle.itemBackground]}></NewPlayerAvatar>
        </View>
        <AddUserModal
          name={t('player.addPlayerHeader')}
          visible={modalVisible}
          onSubmit={onPlayerSubmit}
          onBackdropPress={() => {
            setModalVisible(false);
          }}></AddUserModal>
      </View>
    </TouchableOpacity>
  );
}

var styles = StyleSheet.create({
  container: {
    bottom: 10,
  },
  wrapperContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    right: 10,
  },
  avatarStyle: {
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

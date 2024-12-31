import {View, Text, ViewProps, Pressable, useColorScheme} from 'react-native';
import style from './addPlayer.styles';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AddUserModal} from './addPlayerModal';
import {useState} from 'react';
import {submitNewPlayer} from '@helpers/Player/PlayerHelper';
import {useGame} from '@helpers/Game/gameContext';

interface addNewPlayerProps extends ViewProps {}

const AddNewPlayer = (options: addNewPlayerProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {t} = useTranslation();
  const {setGame, game} = useGame();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  const submitPlayer = (playerName: string, imageUrl: string) => {
    setModalVisible(false);
    submitNewPlayer(playerName, imageUrl, t, game, setGame);
  };

  const playerStyle = style(isDarkMode);
  return (
    <Pressable
      testID="addPlayer.Plus"
      style={[style(isDarkMode).container]}
      {...options}
      onPress={() => setModalVisible(true)}>
      <View style={playerStyle.iconContainer}>
        <Icon name="plus" style={playerStyle.iconStyle}></Icon>
      </View>
      <View style={playerStyle.textContainer}>
        <Text style={playerStyle.textStyle}>{t('player.addPlayerHeader')}</Text>
      </View>
      <AddUserModal
        name={t('player.addPlayerHeader')}
        visible={modalVisible}
        onSubmit={submitPlayer}
        onBackdropPress={() => {
          setModalVisible(false);
        }}></AddUserModal>
    </Pressable>
  );
};

export default AddNewPlayer;

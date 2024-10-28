import {Alert, SafeAreaView, View} from 'react-native';
import NewPlayerIcon from '@components/players/newPlayer';
import {useEffect, useState} from 'react';
import {PlayerDto} from '@components/players/playerObject';
import {RootStackParamList} from '../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import playerStorageHandler from '@helpers/Storage/player/playerHandler';
import {useGame} from '@helpers/Game/gameContext';
import gameHelper from '@helpers/Game/gameHelper';
import PlayerList from '@components/players/playerList';
import styles from './PlayerScreen.styles';
import NextButton from '@components/shared/button';
import {useTranslation} from 'react-i18next';
import NewPlayer from '@components/players/newPlayer';
type Props = NativeStackScreenProps<RootStackParamList, 'PlayerPicker'>;

export default function PlayerScreen({navigation}: Props) {
  const {t} = useTranslation();
  const playerHandler = playerStorageHandler();
  const {setGame, game} = useGame();
  let gamingHelper = gameHelper(game);

  const [players, setActivePlayers] = useState<Array<PlayerDto>>(
    playerHandler.getPlayers(),
  );
  useEffect(() => {
    let listener = playerHandler.setListener((changedKey: string) => {
      if (changedKey === 'players')
        setActivePlayers(playerHandler.getPlayers());
    });
    return () => {
      listener.remove();
    };
  }, []);

  const savePlayersToGame = () => {
    if (gamingHelper.getPlayers()?.length) {
      setGame(gamingHelper.getGame());
      navigation.navigate('Yatzy');
    } else {
      Alert.alert(t('player.missingPlayer'));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperContainer}>
        <View style={styles.playersWrapper}>
          <PlayerList
            players={players}
            gamingHelper={gamingHelper}></PlayerList>
        </View>
        <NewPlayer></NewPlayer>
        <NextButton
          text={t('navigation.next')}
          onPress={() => {
            savePlayersToGame();
          }}></NextButton>
      </View>
    </SafeAreaView>
  );
}

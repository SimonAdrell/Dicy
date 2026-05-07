import {Alert, SafeAreaView, Text, useColorScheme, View} from 'react-native';
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
import {SharedStyle} from '@styles/sharedStyle';
import DieFace from '@components/shared/DieFace';
import {gameType} from '@helpers/Game/gameType';

type Props = NativeStackScreenProps<RootStackParamList, 'PlayerPicker'>;

function gamePips(type: gameType | undefined): number {
  return type === gameType.yatzy ? 5 : 6;
}

export default function PlayerScreen({navigation}: Props) {
  const {t} = useTranslation();
  const playerHandler = playerStorageHandler();
  const {setGame, game} = useGame();
  let gamingHelper = gameHelper(game);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const sStyle = SharedStyle(isDarkMode);

  const [players, setActivePlayers] = useState<Array<PlayerDto>>(
    playerHandler.getPlayers(),
  );
  useEffect(() => {
    let listener = playerHandler.setListener((changedKey: string) => {
      if (changedKey === 'players') {
        setActivePlayers(playerHandler.getPlayers());
      }
    });
    return () => {
      listener.remove();
    };
    // playerHandler is recreated every render; listing it would cause an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const savePlayersToGame = () => {
    if (gamingHelper.getPlayers()?.length) {
      setGame(gamingHelper.getGame());
      navigation.navigate('Yatzy');
    } else {
      Alert.alert(t('player.missingPlayer'));
    }
  };

  const gameTypeName =
    game?.gameType === gameType.yatzy
      ? t('gameType.yatzy.name')
      : t('gameType.maxiYatzy.name');

  return (
    <SafeAreaView style={[styles.container, sStyle.containerBackground]}>
      <View style={styles.wrapperContainer}>
        {/* Game context header */}
        <View style={styles.gameHeader}>
          <DieFace pips={gamePips(game?.gameType)} size={36} tone="light" />
          <View style={styles.gameHeaderText}>
            <Text style={styles.gameHeaderTitle}>{gameTypeName}</Text>
            <Text style={styles.gameHeaderSubtitle}>
              {t('player.pickPlayers')}
            </Text>
          </View>
        </View>

        <View style={styles.playersWrapper}>
          <PlayerList players={players} gamingHelper={gamingHelper} />
        </View>
        <NewPlayer />
        <NextButton
          text={t('navigation.next')}
          onPress={() => {
            savePlayersToGame();
          }}
        />
      </View>
    </SafeAreaView>
  );
}

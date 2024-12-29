import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, Text, useColorScheme, View } from 'react-native';
import { RootStackParamList } from '../../../App';
import { useState } from 'react';
import { PlayerDto } from '@components/players/playerObject';
import { Avatar } from '@components/players/PlayerAvatar';
import Row from '@components/yatzy/row';
import SumRow from '@components/yatzy/maxiYatzySumRow';
import { AddScoreModal } from '@components/yatzy/scoreModal';
import BonusRow from '@components/yatzy/bonusRow';
import playerStorageHandler from '@helpers/Storage/player/playerHandler';
import gameHelper from '@helpers/Game/gameHelper';
import { PlayerScore } from '@helpers/Game/PlayerScore';
import { useGame } from '@helpers/Game/gameContext';
import { GameScore } from '@helpers/Game/GameScore';
import { PlayersScoreModal } from '@components/score/scoreModal';
import { sortPlayersByOrder } from '@helpers/Player/PlayerHelper';
import styles from './YatzyScreen.styles';
import NextButton from '@components/shared/button';
import { useTranslation } from 'react-i18next';
import { SharedStyle } from '@styles/sharedStyle';

type Props = NativeStackScreenProps<RootStackParamList, 'Yatzy'>;

export default function YatzyScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const playerHandler = playerStorageHandler();
  const [players] = useState<Array<PlayerDto>>(playerHandler.getPlayers());
  const { game } = useGame();

  const [scoreModalVisible, setScoreModalVisible] = useState(false);
  const [totalVisibility, setTotalVisibility] = useState(false);
  const [currentPlayerScore, setCurrentPlayerScore] = useState<PlayerScore>();
  const [currentGameScore, setCurrentGameScore] = useState<GameScore>();

  const onRowPress = (
    playerScore: PlayerScore,
    scoreToBeUpdated: GameScore,
  ) => {
    setCurrentPlayerScore(playerScore);
    setCurrentGameScore(scoreToBeUpdated);
    setScoreModalVisible(!scoreModalVisible);
  };
  let gamingHelper = gameHelper(game);

  const updateGame = (
    playerScore: PlayerScore | undefined,
    scoreToBeUpdated: GameScore | undefined,
  ) => {
    setScoreModalVisible(!scoreModalVisible);
    if (playerScore === undefined) return;
    if (scoreToBeUpdated === undefined) return;

    gamingHelper
      .scoreHandler()
      .updatePlayerScore(scoreToBeUpdated, playerScore);
  };
  const color1: string = '#FFF';
  const color2: string = '#F1F3F9';


  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const sStyle = SharedStyle(isDarkMode)
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.title}></View>
        {game?.players?.sort(sortPlayersByOrder).map(player => {
          return (
            <View key={player.playerId} style={[styles.player]}>
              <Avatar imageHeight={40} src={player.imageUrl}></Avatar>
              <Text style={[styles.playerName, sStyle.fontColor]}>
                {player.name}{' '}
              </Text>
            </View>
          );
        })}
      </View>
      <ScrollView style={[styles.board]}>
        {game?.upper?.map((element, index) => {
          return (
            <Row
              onPress={onRowPress}
              GameState={element}
              key={300 + index}
              backgroundColor={index % 2 == 0 ? color1 : color2}
              doneCellStyle={
                index % 2 == 0 ? styles.doneCell1 : styles.doneCell2
              }
              removedCellStyle={
                index % 2 == 0 ? styles.removedCell1 : styles.removedCell2
              }
            />
          );
        })}
        <SumRow GameHelper={gamingHelper} backgroundColor={'#fff8f1'} />
        <BonusRow
          GameHelper={gamingHelper}
          backgroundColor={'#fff8f1'}></BonusRow>
        {game?.middle?.map((element, index) => {
          return (
            <Row
              onPress={onRowPress}
              GameState={element}
              key={100 + index}
              backgroundColor={index % 2 == 0 ? color1 : color2}
              doneCellStyle={
                index % 2 == 0 ? styles.doneCell1 : styles.doneCell2
              }
              removedCellStyle={
                index % 2 == 0 ? styles.removedCell1 : styles.removedCell2
              }
            />
          );
        })}
        {game?.lower?.map((element, index) => {
          return (
            <Row
              onPress={onRowPress}
              GameState={element}
              key={200 + index}
              backgroundColor={index % 2 == 0 ? color2 : color1}
              doneCellStyle={
                index % 2 == 0 ? styles.doneCell1 : styles.doneCell2
              }
              removedCellStyle={
                index % 2 == 0 ? styles.removedCell1 : styles.removedCell2
              }
            />
          );
        })}
      </ScrollView>
      <NextButton
        text={t('yatzyScreen.showWinner')}
        onPress={() => {
          setTotalVisibility(!totalVisibility);
        }}
      />
      <AddScoreModal
        players={players}
        scoreToBeUpdated={currentGameScore}
        playerScore={currentPlayerScore}
        visible={scoreModalVisible}
        onExit={updateGame}
        hideModal={() => setScoreModalVisible(false)}></AddScoreModal>
      <PlayersScoreModal
        GameHelper={gamingHelper}
        visible={totalVisibility}
        onExit={() => {
          setTotalVisibility(false);
        }}
      />
    </View>
  );
}

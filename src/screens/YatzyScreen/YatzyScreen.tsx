import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {RootStackParamList} from '../../../App';
import {useMemo, useState} from 'react';
import {PlayerDto} from '@components/players/playerObject';
import {Avatar} from '@components/players/PlayerAvatar';
import Row from '@components/yatzy/row';
import SumRow from '@components/yatzy/maxiYatzySumRow';
import {AddScoreModal} from '@components/yatzy/scoreModal';
import BonusRow from '@components/yatzy/bonusRow';
import playerStorageHandler from '@helpers/Storage/player/playerHandler';
import gameHelper from '@helpers/Game/gameHelper';
import {PlayerScore} from '@helpers/Game/PlayerScore';
import {useGame} from '@helpers/Game/gameContext';
import {GameScore} from '@helpers/Game/GameScore';
import {PlayersScoreModal} from '@components/score/scoreModal';
import {sortPlayersByOrder} from '@helpers/Player/PlayerHelper';
import styles from './YatzyScreen.styles';
import NextButton from '@components/shared/button';
import {useTranslation} from 'react-i18next';
import {SharedStyle} from '@styles/sharedStyle';
import {useKeepAwake} from '@sayem314/react-native-keep-awake';

type Props = NativeStackScreenProps<RootStackParamList, 'Yatzy'>;

function SectionLabel({label, hint}: Readonly<{label: string; hint?: string}>) {
  return (
    <View style={styles.sectionLabel}>
      <Text style={styles.sectionLabelText}>{label}</Text>
      {hint ? <Text style={styles.sectionLabelHint}>{hint}</Text> : null}
    </View>
  );
}

export default function YatzyScreen(_: Props) {
  useKeepAwake();
  const {t} = useTranslation();
  const playerHandler = playerStorageHandler();
  const [players] = useState<Array<PlayerDto>>(playerHandler.getPlayers());
  const {game} = useGame();

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
    if (playerScore === undefined) {
      return;
    }
    if (scoreToBeUpdated === undefined) {
      return;
    }
    gamingHelper
      .scoreHandler()
      .updatePlayerScore(scoreToBeUpdated, playerScore);
  };

  const color1 = '#FFF';
  const color2 = '#F1F3F9';

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const sStyle = SharedStyle(isDarkMode);

  const sortedPlayers = useMemo(
    () => (game?.players ? [...game.players].sort(sortPlayersByOrder) : []),

    [game?.players],
  );
  const leaderId = useMemo(
    () =>
      sortedPlayers.reduce<{id: number | null; score: number}>(
        (best, p) =>
          p.currentScore > best.score
            ? {id: p.playerId, score: p.currentScore}
            : best,
        {id: null, score: -1},
      ).id,
    [sortedPlayers],
  );

  return (
    <SafeAreaView style={[styles.container, sStyle.containerBackground]}>
      <View style={styles.headerRow}>
        <View style={styles.title} />
        {sortedPlayers.map(player => {
          const isLeader =
            leaderId === player.playerId && player.currentScore > 0;
          return (
            <View key={player.playerId} style={styles.player}>
              <Avatar imageHeight={40} src={player.imageUrl} />
              <Text style={[styles.playerName, sStyle.fontColor]}>
                {player.name}
              </Text>
              <View
                style={[styles.scoreChip, isLeader && styles.scoreChipLeader]}>
                <Text
                  style={[
                    styles.scoreChipText,
                    isLeader && styles.scoreChipTextLeader,
                  ]}>
                  {player.currentScore}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      <ScrollView style={styles.board}>
        <SectionLabel
          label="Upper section"
          hint={`Bonus at ${game?.bonusLimit ?? 63}`}
        />
        {game?.upper?.map((element, index) => (
          <Row
            onPress={onRowPress}
            GameState={element}
            key={element.score.name}
            backgroundColor={index % 2 === 0 ? color1 : color2}
            doneCellStyle={
              index % 2 === 0 ? styles.doneCell1 : styles.doneCell2
            }
            removedCellStyle={
              index % 2 === 0 ? styles.removedCell1 : styles.removedCell2
            }
          />
        ))}
        <SumRow GameHelper={gamingHelper} backgroundColor="#fff8f1" />
        <BonusRow GameHelper={gamingHelper} backgroundColor="#fff8f1" />

        <SectionLabel label="Combinations" />
        {game?.middle?.map((element, index) => (
          <Row
            onPress={onRowPress}
            GameState={element}
            key={element.score.name}
            backgroundColor={index % 2 === 0 ? color1 : color2}
            doneCellStyle={
              index % 2 === 0 ? styles.doneCell1 : styles.doneCell2
            }
            removedCellStyle={
              index % 2 === 0 ? styles.removedCell1 : styles.removedCell2
            }
          />
        ))}

        <SectionLabel label="Yatzy" />
        {game?.lower?.map((element, index) => (
          <Row
            onPress={onRowPress}
            GameState={element}
            key={element.score.name}
            backgroundColor={index % 2 === 0 ? color2 : color1}
            doneCellStyle={
              index % 2 === 0 ? styles.doneCell1 : styles.doneCell2
            }
            removedCellStyle={
              index % 2 === 0 ? styles.removedCell1 : styles.removedCell2
            }
          />
        ))}
      </ScrollView>

      <NextButton
        text={t('yatzyScreen.showWinner')}
        onPress={() => setTotalVisibility(!totalVisibility)}
      />

      <AddScoreModal
        players={players}
        scoreToBeUpdated={currentGameScore}
        playerScore={currentPlayerScore}
        visible={scoreModalVisible}
        onExit={updateGame}
        hideModal={() => setScoreModalVisible(false)}
      />
      <PlayersScoreModal
        GameHelper={gamingHelper}
        visible={totalVisibility}
        onExit={() => setTotalVisibility(false)}
      />
    </SafeAreaView>
  );
}

import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { gameHelperType } from '@helpers/Game/gameHelperType';
import { sortPlayerScoresByPlayersOrder } from '@helpers/Player/PlayerHelper';
import { SharedStyle } from '@styles/sharedStyle';
type rowProps = {
  backgroundColor: string;
  GameHelper: gameHelperType;
};
export default function SumRow({ backgroundColor, GameHelper }: rowProps) {
  var playersScore = GameHelper.scoreHandler().getPlayersUpperScore();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const sStyle = SharedStyle(isDarkMode);
  var playersTotalScore = GameHelper.getPlayers();
  if (playersTotalScore === undefined) {
    throw new Error('No players found');
  }
  return (
    <View style={[styles.row, { backgroundColor: backgroundColor }]}>
      <Text style={styles.head}>Sum</Text>
      {playersScore.sort(sortPlayerScoresByPlayersOrder).map(element => {
        return (
          <View style={styles.cell} key={element.player.playerId}>
            <Text key={element.player.toLocaleString()} style={[styles.text, { fontWeight: 'bold', color: '#000' },
            ]}>
              {element.score.toLocaleString()}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

var styles = StyleSheet.create({
  row: {
    height: 28,
    flex: 1,
    flexBasis: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  head: { height: 48, flex: 1, color: '#000', padding: 5, fontWeight: 'bold' },
  text: { textAlign: 'center', flex: 1 },
  cell: { textAlign: 'center', flex: 1, borderLeftWidth: 1 },
});

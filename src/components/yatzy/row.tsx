import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import Icon from '@react-native-vector-icons/material-design-icons/static';
import {PlayerScore} from '@helpers/Game/PlayerScore';
import {GameState} from '@helpers/Game/GameState';
import {GameScore} from '@helpers/Game/GameScore';
import {sortPlayerScoresByPlayersOrder} from '@helpers/Player/PlayerHelper';
import {yatzyStyle} from '@styles/yatzyStyle/yatzyStyle';
type RowProps = Readonly<
  ViewProps & {
  GameState: GameState;
  backgroundColor: string;
  doneCellStyle: StyleProp<TextStyle>;
  removedCellStyle: StyleProp<TextStyle>;
  onPress: (playerScore: PlayerScore, scoreToBeUpdated: GameScore) => void;
}>;
function cellStyle(
  element: PlayerScore,
  row: RowProps,
): StyleProp<TextStyle> {
  if (element.isRemoved) {
    return row.removedCellStyle;
  }
  return element.score ? row.doneCellStyle : {};
}

export default function Row(row: RowProps) {
  return (
    <View
      {...row}
      style={[yatzyStyle.row, {backgroundColor: row.backgroundColor}]}>
      <Text style={[yatzyStyle.head, {fontWeight: 'light'}]}>
        {row.GameState.score.name}
      </Text>
      {[...row.GameState.PlayerScore]
        .sort(sortPlayerScoresByPlayersOrder)
        .map(element => {
          const cellClick = () => {
            row.onPress(element, row.GameState.score);
          };
          return (
            <TouchableOpacity
              key={element.player.playerId}
              testID="scoreCell"
              style={[
                {alignItems: 'center', paddingTop: 5},
                yatzyStyle.cell,
                cellStyle(element, row),
              ]}
              onPress={cellClick}>
              {element.isRemoved ? (
                <Icon name="close" style={styles.removedIcon} />
              ) : (
                <Text
                  style={[
                    yatzyStyle.text,
                    {fontWeight: 'bold', color: '#000'},
                  ]}>
                  {element.isRemoved ? '' : element.score?.toLocaleString()}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  removedIcon: {height: 80, fontSize: 18},
});

import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PlayerScore} from '@helpers/Game/PlayerScore';
import {GameState} from '@helpers/Game/GameState';
import {GameScore} from '@helpers/Game/GameScore';
import {sortPlayerScoresByPlayersOrder} from '@helpers/Player/PlayerHelper';
import {sharedStyle} from '@styles/sharedStyle';
import {yatzyStyle} from '@styles/yatzyStyle/yatzyStyle';

interface rowProps extends ViewProps {
  GameState: GameState;
  backgroundColor: string;
  doneCellStyle: StyleProp<TextStyle>;
  removedCellStyle: StyleProp<TextStyle>;
  onPress: (playerScore: PlayerScore, scoreToBeUpdated: GameScore) => void;
}
export default function Row(row: rowProps) {
  return (
    <View
      {...row}
      style={[yatzyStyle.row, {backgroundColor: row.backgroundColor}]}>
      <Text style={[yatzyStyle.head, {fontWeight: 'light'}]}>
        {row.GameState.score.name}
      </Text>
      {row.GameState.PlayerScore.sort(sortPlayerScoresByPlayersOrder).map(
        element => {
          const cellClick = () => {
            row.onPress(element, row.GameState.score);
          };
          return (
            <TouchableOpacity
              key={element.player.playerId}
              style={[
                {alignItems: 'center', paddingTop: 5},
                yatzyStyle.cell,
                element.isRemoved
                  ? row.removedCellStyle
                  : element.score
                    ? row.doneCellStyle
                    : {},
              ]}
              onPress={cellClick}>
              {element.isRemoved ? (
                <Icon name="close" style={styles.removedIcon}></Icon>
              ) : (
                <Text
                  style={[
                    yatzyStyle.text,
                    sharedStyle.darkFontColor,
                    {fontWeight: 'bold'},
                  ]}>
                  {element.isRemoved ? '' : element.score?.toLocaleString()}
                </Text>
              )}
            </TouchableOpacity>
          );
        },
      )}
    </View>
  );
}

var styles = StyleSheet.create({
  removedIcon: {height: 80, fontSize: 18},
});

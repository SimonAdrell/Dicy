import { Text, View } from 'react-native';
import { gameHelperType } from '@helpers/Game/gameHelperType';
import { sortPlayerScoresByPlayersOrder } from '@helpers/Player/PlayerHelper';
import { yatzyStyle } from '@styles/yatzyStyle/yatzyStyle';

type rowProps = Readonly<{
  backgroundColor: string;
  GameHelper: gameHelperType;
}>;

export default function BonusRow({ backgroundColor, GameHelper }: rowProps) {
  const game = GameHelper.getGame();
  const playersScore = GameHelper.scoreHandler().getPlayersUpperScore();
  const sorted = [...playersScore].sort(sortPlayerScoresByPlayersOrder);

  return (
    <View style={[yatzyStyle.row, { backgroundColor, borderBottomWidth: 1 }]}>
      <Text style={yatzyStyle.head}>Bonus</Text>
      {sorted.map(element => {
        const earned = element.score >= game.bonusLimit;
        return (
          <View style={yatzyStyle.cell} key={element.player.playerId}>
            <Text
              style={[
                yatzyStyle.text,
                { fontWeight: 'bold', color: earned ? '#063b35' : '#7a8a86' },
                earned ? { backgroundColor: '#CCD5AE' } : { opacity: 0.55 },
              ]}>
              {`+${game.bonusScore}`}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

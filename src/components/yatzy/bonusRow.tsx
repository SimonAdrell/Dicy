import {Text, View} from 'react-native';
import {gameHelperType} from '@helpers/Game/gameHelperType';
import {sortPlayerScoresByPlayersOrder} from '@helpers/Player/PlayerHelper';
import {yatzyStyle} from '@styles/yatzyStyle/yatzyStyle';
import {useTranslation} from 'react-i18next';

type rowProps = Readonly<{
  backgroundColor: string;
  GameHelper: gameHelperType;
}>;

export default function BonusRow({backgroundColor, GameHelper}: rowProps) {
  const {t} = useTranslation();
  const game = GameHelper.getGame();
  const playersScore = GameHelper.scoreHandler().getPlayersUpperScore();
  const sorted = [...playersScore].sort(sortPlayerScoresByPlayersOrder);

  return (
    <View style={[yatzyStyle.row, {backgroundColor, borderBottomWidth: 1}]}>
      <Text style={yatzyStyle.head}>{t('yatzyScreen.bonus')}</Text>
      {sorted.map(element => {
        const earned = element.score >= game.bonusLimit;
        return (
          <View style={yatzyStyle.cell} key={element.player.playerId}>
            <Text
              style={[
                yatzyStyle.text,
                {fontWeight: 'bold', color: earned ? '#063b35' : '#5b6b67'},
                earned ? {backgroundColor: '#CCD5AE'} : {},
              ]}>
              {`+${game.bonusScore}`}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

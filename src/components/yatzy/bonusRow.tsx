import { Text, View } from "react-native"
import { gameHelperType } from "@helpers/Game/gameHelperType";
import { sortPlayerScoresByPlayersOrder } from "@helpers/Player/PlayerHelper";
import { yatzyStyle } from "@styles/yatzyStyle/yatzyStyle";

type rowProps = {
    readonly backgroundColor: string,
    readonly GameHelper: gameHelperType
}

export default function BonusRow({ backgroundColor, GameHelper }: rowProps) {
    const game = GameHelper.getGame();
    const playersScore = GameHelper.scoreHandler().getPlayersUpperScore().sort(sortPlayerScoresByPlayersOrder);

    return <View style={[yatzyStyle.row, { backgroundColor: backgroundColor, borderBottomWidth: 1 }]}>
        <Text style={yatzyStyle.head}>Bonus</Text>
        {
            playersScore.map((element) => {
                return <View style={yatzyStyle.cell} key={element.player.playerId}>
                    <Text key={element.player.playerId.toLocaleString()}
                        style={[yatzyStyle.text, element.score >= game.bonusScore ? { fontWeight: 'bold', backgroundColor: '#CCD5AE' } : {}, { fontWeight: 'bold', color: '#000' },
                        ]}>
                        {element.score >= game.bonusLimit ? game.bonusScore : ''}
                    </Text>
                </View>
            })
        }
    </View>
}
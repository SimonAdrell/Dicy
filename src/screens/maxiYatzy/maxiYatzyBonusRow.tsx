import { StyleSheet, Text, View } from "react-native"
import { gameHelperType } from "../../Helpers/Game/gameHelperType";
import { sortPlayerScores } from "../../Helpers/Player/PlayerHelper";

type rowProps = {
    backgroundColor: string,
    GameHelper: gameHelperType
}

export default function BonusRow({ backgroundColor, GameHelper }: rowProps) {
    var game = GameHelper.getGame();
    var playersScore = GameHelper.scoreHandler().getPlayersUpperScore();

    return <View style={[styles.row, { backgroundColor: backgroundColor }]}>
        <Text style={styles.head}>Bonus</Text>
        {
            playersScore.sort(sortPlayerScores).map((element) => {
                return <View style={styles.cell} key={element.player.playerId}>
                    <Text key={element.player.playerId.toLocaleString()} style={[styles.text, element.score >= game.bonusScore ? styles.done : {}]}>
                        {element.score >= game.bonusScore ? 100 : ''}
                    </Text>
                </View>
            })
        }
    </View>
}

var styles = StyleSheet.create({
    row: { height: 28, flex: 1, flexBasis: 1, flexDirection: 'row', borderBottomWidth: 1 },
    head: { height: 48, flex: 1, color: '#000', padding: 5, fontWeight: 'bold' },
    text: { textAlign: 'center', flex: 1 },
    cell: { textAlign: 'center', flex: 1, borderLeftWidth: 1 },
    done: { fontWeight: 'bold', backgroundColor: '#CCD5AE' }
})
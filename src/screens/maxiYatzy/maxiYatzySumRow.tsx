import { StyleSheet, Text, View } from "react-native"
import { gameHelperType } from "../../Helpers/Game/gameHelperType";

type rowProps = {
    backgroundColor: string,
    GameHelper: gameHelperType
}
export default function SumRow({ backgroundColor, GameHelper }: rowProps) {
    var game = GameHelper.getGame();
    var playersScore = GameHelper.scoreHandler().getPlayersTotalScore(game.upper, undefined);

    return <View style={[styles.row, { backgroundColor: backgroundColor }]}>
        <Text style={styles.head}>Sum</Text>
        {

            playersScore.sort(e => e.player.playerId).map((element) => {
                return <View style={styles.cell} key={element.player.playerId}><Text key={element.player.toLocaleString()} style={styles.text}>
                    {element.score.toLocaleString()}
                </Text></View>
            })
        }
    </View>
}

var styles = StyleSheet.create({
    row: { height: 28, flex: 1, flexBasis: 1, flexDirection: 'row', borderBottomWidth: 1, borderTopWidth: 1 },
    head: { height: 48, flex: 1, color: '#000', padding: 5, fontWeight: 'bold' },
    text: { textAlign: 'center', flex: 1 },
    cell: { textAlign: 'center', flex: 1, borderLeftWidth: 1 },
    done: { fontWeight: 'bold', backgroundColor: '#CCD5AE' }
})
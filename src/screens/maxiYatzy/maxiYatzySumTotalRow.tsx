import { StyleSheet, Text, View } from "react-native"
import { gameHelperType } from "../../Helpers/Game/gameHelperType";
import { GameState } from "../../Helpers/Game/GameState";

type rowProps = {
    backgroundColor: string,
    GameHelper: gameHelperType
}

export default function SumTotalRow({backgroundColor, GameHelper}: rowProps) {
    var game = GameHelper.getGame();
    if(game.middle === undefined)
        throw new Error("Game not set up correctly");
    if(game.lower === undefined)
        throw new Error("Game not set up correctly");
    if(game.upper === undefined)
        throw new Error("Game not set up correctly");

    var scores: GameState[] = [...game.middle, ...game.lower]
    var playersTotalScore = GameHelper.scoreHandler().getPlayersTotalScore(scores, game.upper);

    return <View style={[styles.row, { backgroundColor: backgroundColor }]} >
        <Text style={styles.head}>Sum</Text>
        {
            playersTotalScore.sort(e => e.player.playerId).map((element, index) => {
                return <Text key={element.player.playerId.toLocaleString()} style={styles.text}>
                    {element.score.toLocaleString()}
                </Text>
            })
        }
    </View>
}

var styles = StyleSheet.create({
    row: { height: 28, flex: 1, flexBasis: 1, flexDirection: 'row' },
    head: { height: 28, flex: 1,  fontWeight: 'bold' },
    text: { textAlign: 'center', flex: 1, fontWeight: '800' }
})
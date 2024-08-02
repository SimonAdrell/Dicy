import { StyleSheet, Text, View } from "react-native"
import { GameState } from "./maxiYatzyGame"
import { PlayerDto } from "../../library/components/players/playerObject";

type rowProps = {
    GameState: GameState[],
    backgroundColor: string,
    players: PlayerDto[];
}

interface playerSum {
    playerId: number;
    Sum: number;
}
export default function SumRow(row: rowProps) {

    var playerSumArray: playerSum[] = [];
    row.players.forEach(player => {
        var sum : number =0;
        row.GameState.forEach(state => {
            sum = sum + state.PlayerScore
            .filter(e => e.playerId == player.playerId)
            .reduce((sum: number, current) => sum + (current.score ?? 0), 0);

        });
        playerSumArray.push({
            playerId: player.playerId,
            Sum: sum
        })
    });


    return <View style={[styles.row, { backgroundColor: row.backgroundColor }]}>
        <Text style={styles.head}>Sum</Text>
        {
            playerSumArray.sort(e => e.playerId).map((element) => {
                return <Text key={element.playerId.toLocaleString()} style={styles.text}>
                    {element.Sum.toLocaleString()}
                </Text>
            })
        }
    </View>
}

var styles = StyleSheet.create({
    row: { height: 28, flex: 1, flexBasis: 1, flexDirection: 'row', borderBottomWidth: 1 },
    head: { height: 28, flex: 1,fontWeight:'bold'},
    text: { textAlign: 'center', flex: 1,fontWeight:'800' }
})
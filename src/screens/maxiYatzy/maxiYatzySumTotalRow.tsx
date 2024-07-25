import { StyleSheet, Text, View } from "react-native"
import { Game } from "./maxiYatzyGame"
import { PlayerDto } from "../../library/components/players/playerObject";

type rowProps = {
    Game: Game,
    backgroundColor: string,
    players: PlayerDto[];
}

interface playerSum {
    playerId: number;
    Sum: number;
}
export default function SumTotalRow(row: rowProps) {
    var playerSumArray: playerSum[] = [];
    row.players.forEach(player => {

        var upperScore: number = 0;

        row.Game.upper.forEach(state => {
            upperScore += state.PlayerScore
                .filter(e => e.playerId == player.playerId)
                .reduce((sum: number, current) => sum + (current.score ?? 0), 0);
        });
        upperScore += (upperScore > 75 ? 100 : 0)
        
        var middleScore: number = 0;
        row.Game.middle.forEach(state => {
            middleScore += state.PlayerScore
                .filter(e => e.playerId == player.playerId)
                .reduce((sum: number, current) => sum + (current.score ?? 0), 0);
        });

        var lowerScore: number = 0;

        row.Game.lower.forEach(state => {
            lowerScore += state.PlayerScore
                .filter(e => e.playerId == player.playerId)
                .reduce((sum: number, current) => sum + (current.score ?? 0), 0);
        });

        var sum: number = upperScore + middleScore + lowerScore;
        playerSumArray.push({
            playerId: player.playerId,
            Sum: sum
        })
    });


    return <View style={[styles.row, { backgroundColor: row.backgroundColor }]} >
        <Text style={styles.head}>Sum</Text>
        {
            playerSumArray.sort(e => e.playerId).map((element, index) => {
                return <Text key={element.playerId.toLocaleString()} style={styles.text}>
                    {element.Sum.toLocaleString()}
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
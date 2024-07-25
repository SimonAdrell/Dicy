import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { GameState, PlayerScore } from "./maxiYatzyGame"

type rowProps = {
    GameState: GameState,
    key: number,
    backgroundColor: string,
    onPress: (playerScore: PlayerScore, name: string) => void
}
export default function Row(row: rowProps) {
    return <View style={[styles.row, { backgroundColor: row.backgroundColor }]} key={row.key}>
        <Text style={styles.head}>{row.GameState.name}</Text>
        {
            row.GameState.PlayerScore.sort((a,b) => a.playerId - b.playerId).map((element, index) => {
                const cellClick = () => {
                    row.onPress(element,row.GameState.name)
                }
                return <TouchableOpacity style={[styles.cell, {backgroundColor: element.isRemoved === true ? '#d3d3d3' : row.backgroundColor}]} onPress={cellClick}><Text key={element.playerId.toLocaleString()} style={styles.text} >
                    {element.score?.toLocaleString()}
                </Text></TouchableOpacity>
            })
        }
    </View>
}

var styles = StyleSheet.create({
    row: { height: 28, flex: 1, flexBasis: 1, flexDirection: 'row', borderBottomWidth: 1 },
    head: { height: 28, flex: 1, borderRightWidth: 1 },
    text: { textAlign: 'center', flex: 1 },
    cell: { textAlign: 'center', flex: 1, borderRightWidth: 1 }
})
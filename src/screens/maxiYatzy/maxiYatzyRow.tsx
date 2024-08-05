import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View } from "react-native"
import { GameState, PlayerScore } from "./maxiYatzyGame"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type rowProps = {
    GameState: GameState,
    key: number,
    backgroundColor: string,
    doneCellStyle: StyleProp<TextStyle>,
    removedCellStyle: StyleProp<TextStyle>,
    onPress: (playerScore: PlayerScore, name: string) => void
}
export default function Row(row: rowProps) {
    return <View style={[styles.row, { backgroundColor: row.backgroundColor }]} key={row.key}>
        <Text style={styles.head}>{row.GameState.name}</Text>
        {
            row.GameState.PlayerScore.sort((a, b) => a.playerId - b.playerId).map((element) => {
                const cellClick = () => {
                    row.onPress(element, row.GameState.name)
                }
                return <TouchableOpacity key={element.playerId} style={[styles.cell, element.isRemoved ? row.removedCellStyle : element.score ? row.doneCellStyle : {}]} onPress={cellClick}>
                    {element.isRemoved ?
                        <Icon name='close' style={styles.removedIcon}></Icon>
                        :
                        <Text style={[styles.text]} >
                            {
                                element.isRemoved ? '' : element.score?.toLocaleString()
                            }
                        </Text>
                    }

                </TouchableOpacity>
            })
        }
    </View>
}

var styles = StyleSheet.create({
    row: { height: 28, flex: 1, flexBasis: 1, flexDirection: 'row' },
    head: { height: 48, flex: 1, color: '#000', padding: 5, fontWeight: 'light' },
    text: { fontWeight: 'bold', textAlign: 'center', flex: 1 },
    cell: { textAlign: 'center', flex: 1, borderLeftWidth: 1, alignItems: 'center', paddingTop: 5 },
    removedIcon: { height: 80, fontSize: 18 },
})
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PlayerScore } from "../../Helpers/Game/PlayerScore";
import { GameState } from "../../Helpers/Game/GameState";
import { GameScore } from "../../Helpers/Game/GameScore";
import { sortPlayerScores } from "../../Helpers/Player/PlayerHelper";
import { sharedStyle } from "../../library/style/sharedStyle";

type rowProps = {
    GameState: GameState,
    key: number,
    backgroundColor: string,
    doneCellStyle: StyleProp<TextStyle>,
    removedCellStyle: StyleProp<TextStyle>,
    onPress: (playerScore: PlayerScore, scoreToBeUpdated: GameScore) => void
}
export default function Row(row: rowProps) {
    return <View style={[styles.row, { backgroundColor: row.backgroundColor }]} key={row.key}>
        <Text style={styles.head}>{row.GameState.score.name}</Text>
        {
            row.GameState.PlayerScore.sort(sortPlayerScores).map((element) => {
                const cellClick = () => {
                    row.onPress(element, row.GameState.score)
                }
                return <TouchableOpacity key={element.player.playerId} style={[styles.cell, element.isRemoved ? row.removedCellStyle : element.score ? row.doneCellStyle : {}]} onPress={cellClick}>
                    {element.isRemoved ?
                        <Icon name='close' style={styles.removedIcon}></Icon>
                        :
                        <Text style={[styles.text, sharedStyle.darkFontColor]} >
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
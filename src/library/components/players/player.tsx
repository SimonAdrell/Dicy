import { SafeAreaView, StyleSheet, View, Text, Pressable, Image } from "react-native";
import { PlayerDto } from "./playerObject";
import { getPlayers, setPlayer } from "./playerHandler";
type playerProps = {
    playerDto: PlayerDto
};

export default function Player(player: playerProps) {
    return <SafeAreaView style={styles.container} key={player.playerDto.playerId} >
        <View>
            <View style={styles.wrapperContainer} >
                <View style={styles.circleView}></View>
                <View>
                    <Text style={styles.sectionTitle}>
                        {player.playerDto.name}
                    </Text>
                </View>
                <Pressable style={styles.remove} onPress={() => {
                    var players = getPlayers();
                    console.log(players);
                    const indexOfObject = players.findIndex((object) => {
                        return object.playerId === player.playerDto.playerId;
                    });
                    if (indexOfObject !== -1) {
                        players.splice(indexOfObject, 1);
                    }
                    console.log(player.playerDto.playerId);
                    setPlayer(players);
                    console.log(players);
                }}>
                    <Text style={styles.removeText}>REMOVE</Text>
                </Pressable>
            </View>
        </View>
    </SafeAreaView>
}

var styles = StyleSheet.create({
    container: {
        height: 161,
        width: 119,
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        borderRadius: 10,
        borderStyle: 'solid',
        borderColor: '#FFC700',
        borderWidth: 1,
    },
    wrapperContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleView: {
        width: 70,
        height: 70,
        borderColor: '#FFC700',
        borderWidth: 1,
        backgroundColor: "#FDFDFD",
        borderRadius: 1000 // High value
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: "#000000",
        opacity: 49,
        marginTop: 10,
    },
    remove: {
        backgroundColor: '#FF4800',
        borderRadius: 10,
        padding: 6,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10
    },
    removeText: {
        fontSize: 10,
        color: '#FFFFFF',
        fontFamily: 'Inter'
    }
});
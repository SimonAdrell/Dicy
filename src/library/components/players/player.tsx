import { SafeAreaView, StyleSheet, View, Text, Pressable, Image } from "react-native";
import { PlayerDto } from "./playerObject";
import { getPlayers, setPlayer } from "./playerHandler";
import { Avatar } from "./PlayerAvatar";
type playerProps = {
    playerDto: PlayerDto
};

export default function Player(player: playerProps) {
    return <SafeAreaView style={styles.wrapper} key={player.playerDto.playerId} >
        <View style={styles.container} >
            <View style={styles.wrapperContainer} >
                <View style={styles.circleView}>
                    <Avatar src={player.playerDto.imageUrl}></Avatar>
                </View>
                <View>
                    <Text style={styles.sectionTitle}>
                        {player.playerDto.name}
                    </Text>
                </View>
                <Pressable style={styles.remove} onPress={() => {
                    var players = getPlayers();
                    const indexOfObject = players.findIndex((object) => {
                        return object.playerId === player.playerDto.playerId;
                    });
                    if (indexOfObject !== -1) {
                        players.splice(indexOfObject, 1);
                    }
                    setPlayer(players);
                }}>
                    <Text style={styles.removeText}>REMOVE</Text>
                </Pressable>
            </View>
        </View>
    </SafeAreaView>
}

var styles = StyleSheet.create({
    wrapper:{
        padding:5
    },
    container: {
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
        width: 80,
        height: 80,
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
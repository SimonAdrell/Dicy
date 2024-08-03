import { SafeAreaView, StyleSheet, View, Text, Pressable } from "react-native";
import { PlayerDto } from "./playerObject";
import { getPlayers, setPlayer } from "./playerHandler";
import { Avatar } from "./PlayerAvatar";
type playerProps = {
    playerDto: PlayerDto
};

export default function Player({ playerDto }: playerProps) {

    return <SafeAreaView style={styles.wrapper} key={playerDto.playerId} >
        <View style={styles.container} >
            <View style={styles.wrapperContainer} >
                <View >
                    <Avatar src={playerDto.imageUrl} imageHeight={80}></Avatar>
                </View>
                <View>
                    <Text style={styles.sectionTitle}>
                        {playerDto.name}
                    </Text>
                </View>
                <Pressable style={styles.remove} onPress={() => {
                    var players = getPlayers();
                    const indexOfObject = players.findIndex((object) => {
                        return object.playerId === playerDto.playerId;
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
    wrapper: {
        padding: 5
    },
    container: {
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        borderRadius: 10,
        borderStyle: 'solid',
        borderColor: '#FFC700',
        borderWidth: 1,
        padding: 15,
        paddingBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    wrapperContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
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
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10
    },
    removeText: {
        fontSize: 10,
        color: '#FFFFFF',
        fontFamily: 'Inter'
    }
});
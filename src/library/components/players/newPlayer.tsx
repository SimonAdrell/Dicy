import { SafeAreaView, StyleSheet, View, Text, Pressable, Alert, TouchableOpacity, Touchable } from "react-native";
import { AddUserModal } from "./addPlayerModal";
import { useState } from "react";
import { PlayerDto } from "./playerObject";
import { getPlayers, setPlayer } from "./playerHandler";
export default function NewPlayer() {
    const [modalVisible, setModalVisible] = useState(false);
    let players: PlayerDto[] = [];
    if (Array.isArray(getPlayers())) {
        players = getPlayers();
    }
    function GetPlayerid(): number {
        return players.length > 0 ? players.reduce(function (prev, current) {
            return (prev && prev.playerId > current.playerId) ? prev : current
        }).playerId + 1
            : 0
    }

    const onPress = () => setModalVisible(true);


    return <Pressable onPress={onPress} style={styles.wrapper}>
        <View style={styles.container}>
            <View style={styles.wrapperContainer}>
                <View style={styles.circleView}></View>
                <Pressable onPress={onPress}>
                    <Text style={styles.sectionTitle}>
                        ADD DICER
                    </Text>
                </Pressable>
            </View>

            <AddUserModal name="Add user" visible={modalVisible} onSubmit={(playerName: string, imageUrl: string) => {
                setModalVisible(false);
                let player = {} as PlayerDto;
                player.name = playerName;
                player.playerId = GetPlayerid();
                player.imageUrl = imageUrl;
                players.push(player);
                setPlayer(players);
            }}></AddUserModal>
        </View>
    </Pressable>
}

var styles = StyleSheet.create({
    wrapper:{
        padding:5
    },
    container: {
        backgroundColor: '#EDE8E8',
        marginTop: 10,
        borderRadius: 10,
        borderStyle: 'dotted',
        borderColor: '#FFF',
        borderWidth: 3,
        paddingBottom:20
    },
    wrapperContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleView: {
        width: 80,
        height: 80,
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
    touchableOpacity: {
        zIndex: 100
    },
});
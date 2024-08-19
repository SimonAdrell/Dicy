import { StyleSheet, View, Text, Pressable } from "react-native";
import { AddUserModal } from "./addPlayerModal";
import { useState } from "react";
import { PlayerDto } from "./playerObject";
import { NewPlayerAvatar } from "./PlayerAvatar";
import playerStorageHandler from "../../../screens/players/playerHandler";
import { useGame } from "../../../Helpers/Game/gameContext";
import gameHelper from "../../../Helpers/Game/gameHelper";
import { gameType } from "../../../Helpers/Game/gameType";
export default function NewPlayer() {
    const [modalVisible, setModalVisible] = useState(false);
    const playerHandler = playerStorageHandler();
    const { setGame, game } = useGame();
    let players: PlayerDto[] = [];
    if (Array.isArray(playerHandler.getPlayers())) {
        players = playerHandler.getPlayers();
    }
    let gamingHelper = gameHelper(game);
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
                <NewPlayerAvatar imageHeight={80} style={{ backgroundColor: '#FFF', opacity: 0.6 }}></NewPlayerAvatar>
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
                playerHandler.savePlayers(players);
                if(game){
                    gamingHelper.setPlayers(players)
                }else{
                    gamingHelper.generateNewgame(gameType.maxiYatzy);
                    gamingHelper.setPlayers(players)
                }
                setGame(gamingHelper.getGame())
            }}></AddUserModal>
        </View>
    </Pressable>
}

var styles = StyleSheet.create({
    wrapper: {
        padding: 5
    },
    container: {
        backgroundColor: '#EDE8E8',
        marginTop: 10,
        borderRadius: 10,
        borderStyle: 'dotted',
        borderColor: '#FFF',
        borderWidth: 3,
        padding: 15,
        paddingBottom: 50
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
        opacity: 0.6,
        marginTop: 10,
    },
    touchableOpacity: {
        zIndex: 100
    },
});
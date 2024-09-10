import { StyleSheet, View, TouchableOpacity } from "react-native";
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
    const onPress = () => {
        setModalVisible(true)
    };
    const onPlayerSubmit = (playerName: string, imageUrl: string) => {
        setModalVisible(false);
        let player = {} as PlayerDto;
        player.name = playerName;
        player.playerId = GetPlayerid();
        player.imageUrl = imageUrl;
        players.push(player);
        playerHandler.savePlayers(players);
        if (game) {
            gamingHelper.setPlayers(players)
        } else {
            gamingHelper.generateNewgame(gameType.maxiYatzy);
            gamingHelper.setPlayers(players)
        }
        setGame(gamingHelper.getGame())
    }
    return <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
            <View style={styles.wrapperContainer}>
                <NewPlayerAvatar imageHeight={60} style={[{borderWidth:0}]} ></NewPlayerAvatar>
            </View>
            <AddUserModal name="Add user" visible={modalVisible} onSubmit={onPlayerSubmit}
                onBackdropPress={() => { setModalVisible(false) }}></AddUserModal>
        </View>
    </TouchableOpacity>
}

var styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        bottom: 10,
        right: 10,
    },
    wrapperContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#005b4f',
        marginTop: 10,
    },
    touchableOpacity: {
        zIndex: 100
    },
});
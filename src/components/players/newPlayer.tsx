import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AddUserModal } from "./addPlayerModal";
import { useState } from "react";
import { PlayerDto } from "./playerObject";
import { NewPlayerAvatar } from "./PlayerAvatar";
import playerStorageHandler from "@helpers/Storage/player/playerHandler";
import { useGame } from "@helpers/Game/gameContext";
import { gameType } from "@helpers/Game/gameType";
import gameHelper from "@helpers/Game/gameHelper";
export default function NewPlayer() {
    const [modalVisible, setModalVisible] = useState(false);
    const playerHandler = playerStorageHandler();
    const { setGame, game } = useGame();
    let players: PlayerDto[] = [];
    if (Array.isArray(playerHandler.getPlayers())) {
        players = playerHandler.getPlayers();
    }
    let gamingHelper = gameHelper(game);
    function GetPlayerId(): number {
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
        player.playerId = GetPlayerId();
        player.imageUrl = imageUrl;
        players.push(player);
        playerHandler.savePlayers(players);
        if (game) {
            gamingHelper.setPlayers(players)
        } else {
            gamingHelper.generateNewGame(gameType.maxiYatzy);
            gamingHelper.setPlayers(players)
        }
        setGame(gamingHelper.getGame())
    }
    return <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
            <View style={styles.wrapperContainer}>
                <NewPlayerAvatar imageHeight={75} style={[styles.avatarStyle]} ></NewPlayerAvatar>
            </View>
            <AddUserModal name="Add user" visible={modalVisible} onSubmit={onPlayerSubmit}
                onBackdropPress={() => { setModalVisible(false) }}></AddUserModal>
        </View>
    </TouchableOpacity>
}

var styles = StyleSheet.create({
    container: {
        bottom: 10,
    },
    wrapperContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
        right: 10
    },
    avatarStyle: {
        borderWidth: 0,
        backgroundColor: '#e8fefa',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});
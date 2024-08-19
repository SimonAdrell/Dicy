import { SafeAreaView, StyleSheet, View, Text, Pressable, TouchableOpacity } from "react-native";
import { PlayerDto } from "./playerObject";
import { Avatar } from "./PlayerAvatar";
import playerStorageHandler from "../../../screens/players/playerHandler";
import { gameHelperType } from "../../../Helpers/Game/gameHelperType";
import { gameType } from "../../../Helpers/Game/gameType";
import { useState } from "react";
type playerProps = {
    playerDto: PlayerDto,
    gamingHelper: gameHelperType
};

export default function Player({ playerDto, gamingHelper }: playerProps) {
    const playerHandler = playerStorageHandler();

    const playerIsGaming = (): boolean => {
        let players = gamingHelper.getPlayers();
        if (players) {
            return players.filter(e => e.playerId === playerDto.playerId).length > 0
        }
        return false;
    }

    const [playerIsActiveGaming, setPlayersIsGaming] = useState<boolean>(playerIsGaming());

    const removePlayerFromGame = () => {
        let players = gamingHelper.getPlayers();
        if (players) {
            const indexOfObject = players.findIndex((object) => {
                return object.playerId === playerDto.playerId;
            });
            if (indexOfObject !== -1) {
                players.splice(indexOfObject, 1);
            }
            updatePlayers(players);
        }
        setPlayersIsGaming(false);
    }

    const addPlayerToGame = () => {
        let players = gamingHelper.getPlayers();
        if (players) {
            players?.push(playerDto);
            updatePlayers(players);
        } else {
            players = new Array<PlayerDto>();
            players.push(playerDto);
            updatePlayers(players);
        }

        setPlayersIsGaming(true);
    }

    const updatePlayers = (players: PlayerDto[]) => {
        if (gamingHelper.getGame()) {
            gamingHelper.setPlayers(players)
            console.log("Player has game", players)
        } else {
            console.log("Player has new game", players)
            gamingHelper.generateNewgame(gameType.maxiYatzy);
            gamingHelper.setPlayers(players)
        }
    }

    const togglePlayerToGame = () => {
        if (playerIsGaming()) {
            removePlayerFromGame();
            return;
        }
        addPlayerToGame();
        return;
    }

    return <SafeAreaView style={styles.wrapper} key={playerDto.playerId} >
        <TouchableOpacity onPress={() => { togglePlayerToGame() }}>
            <View style={[styles.container,, playerIsActiveGaming ? styles.containerActive : {opacity: 0.7} ]} >
                <View style={styles.wrapperContainer} >
                    <View >
                        <Avatar src={playerDto.imageUrl} imageHeight={80}></Avatar>
                    </View>
                    <View>
                        <Text style={styles.sectionTitle}>
                            {playerDto.name}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.remove} onPress={() => {
                        var players = playerHandler.getPlayers();
                        const indexOfObject = players.findIndex((object) => {
                            return object.playerId === playerDto.playerId;
                        });
                        if (indexOfObject !== -1) {
                            players.splice(indexOfObject, 1);
                        }
                        playerHandler.savePlayers(players);
                    }}>
                        <Text style={styles.removeText}>REMOVE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    </SafeAreaView>
}

var styles = StyleSheet.create({
    wrapper: {
        // backgroundColor: '#FFFFFF',
    },
    container: {
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        borderRadius: 10,
        borderStyle: 'solid',
        borderColor: '#FFC700',
        borderWidth: 1,
        padding: 5,
        paddingBottom: 15,
    },
    containerActive: {
        borderRadius:10,
        opacity: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
    ,
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
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 10
    },
    removeText: {
        fontSize: 10,
        color: '#FFFFFF',
        fontFamily: 'Inter'
    }
});
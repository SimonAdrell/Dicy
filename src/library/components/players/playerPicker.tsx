import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import NewPlayer from "./newPlayer";
import { useEffect, useState } from "react";
import { PlayerDto } from "./playerObject";
import { RootStackParamList } from "../../../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import playerStorageHandler from "../../../screens/players/playerHandler";
import { useGame } from "../../../Helpers/Game/gameContext";
import gameHelper from "../../../Helpers/Game/gameHelper";
import PlayerList from "./playerList";
type Props = NativeStackScreenProps<RootStackParamList, 'PlayerPicker'>;

export default function PlayerPicker({ navigation }: Props) {
    const playerHandler = playerStorageHandler();
    const { setGame, game } = useGame();
    let gamingHelper = gameHelper(game);

    const [players, setActivePlayers] = useState<Array<PlayerDto>>(playerHandler.getPlayers());
    useEffect(() => {
        let listener = playerHandler.setListener((changedKey: string) => {
            if (changedKey === 'players') {
                setActivePlayers(playerHandler.getPlayers());
            }
        });
        return () => {
            listener.remove();
        };
    }, []);

    const savePlayersToGame = () => {
        if (gamingHelper.getPlayers()?.length) {
            setGame(gamingHelper.getGame());
            navigation.navigate('MaxiYatzy')
        } else {
            Alert.alert('Välj spelare');
        }
    }

    return <SafeAreaView style={styles.container} >
        <View style={styles.wrapperContainer}>
            <View style={styles.playersWrapper}>
                <PlayerList players={players} gamingHelper={gamingHelper}></PlayerList>
            </View>
            <NewPlayer></NewPlayer>
            <View style={styles.nextWrapper}>
                <Pressable style={styles.nextButton} onPress={() => {
                    savePlayersToGame();
                }}><Text style={styles.nextButtonText}>Next</Text></Pressable>
            </View>
        </View>
    </SafeAreaView>
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6db8ae'
    },
    title: {
        fontSize: 32,
    },
    row: {
        flex: 1,
        justifyContent: "space-evenly"
    },
    wrapperContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 90,
        width: '100%'
    },
    playersWrapper: {
        flex: 6,
    },
    nextWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextButton: {
        backgroundColor: '#FFC700',
        padding: 10,
        paddingLeft: 80,
        paddingRight: 80,
        borderRadius: 100,
        color: '#FFF'
    },
    nextButtonText: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
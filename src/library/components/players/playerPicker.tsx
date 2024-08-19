import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import NewPlayer from "./newPlayer";
import { useEffect, useState } from "react";
import { PlayerDto } from "./playerObject";
import Player from "./player";
import { RootStackParamList } from "../../../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import playerStorageHandler from "../../../screens/players/playerHandler";
import { useGame } from "../../../Helpers/Game/gameContext";
import gameHelper from "../../../Helpers/Game/gameHelper";
import { gameType } from "../../../Helpers/Game/gameType";
type Props = NativeStackScreenProps<RootStackParamList, 'PlayerPicker'>;

export default function PlayerPicker({ navigation }: Props) {
    const playerHandler = playerStorageHandler();
    const { setGame, game } = useGame();
    let gamingHelper = gameHelper(game);

    const [players, setActivePlayers] = useState<Array<PlayerDto>>(playerHandler.getPlayers());
    useEffect(() => {
        let listener = playerHandler.setListener((changedKey: string)=> {
            if (changedKey === 'players') {
                setActivePlayers(playerHandler.getPlayers());
            }
        });
        return () => {
            listener.remove();
        };
    }, []);

    const savePlayersToGame = () => {
        // if(game){
        //     gamingHelper.setPlayers(players)
        // }else{
        //     gamingHelper.generateNewgame(gameType.maxiYatzy);
        //     gamingHelper.setPlayers(players)
        // }
        setGame(gamingHelper.getGame());
        navigation.navigate('MaxiYatzy')
    }

    return <SafeAreaView style={styles.container} >
        <View style={styles.wrapperContainer}>
            <View style={styles.playersWrapper}>
                <FlatList
                    data={[...Array.from(players), { plusImage: true, name: '', imageUrl: '', playerId: -1 }]}
                    contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", justifyContent:'space-evenly' }}
                    renderItem={({ item }) => {
                        if (!item.plusImage) {
                            return <Player gamingHelper={gamingHelper} playerDto={item}></Player>;
                        }
                        return <NewPlayer></NewPlayer>;
                    }}
                    keyExtractor={item => item.playerId.toString()}
                />
            </View>
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
        backgroundColor: '#F1F3F9'
    },
    wrapperContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 90,
        width: '100%'
    },
    sectionView: {
        flex: 1,
        width: '100%',
    },
    sectionTitle: {
        fontSize: 40,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000'
    },
    playersWrapper: {
        // paddingTop:40,
        flex: 6,
        alignItems:'center',
        alignSelf:'center',
    },
    players: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        backgroundColor: 'green'
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
        fontWeight:'bold'
    }
});
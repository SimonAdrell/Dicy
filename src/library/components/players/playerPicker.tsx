import { FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { getPlayers, storage } from "./playerHandler";
import NewPlayer from "./newPlayer";
import { useEffect, useState } from "react";
import { PlayerDto } from "./playerObject";
import Player from "./player";
import MaxiYatzy from "../../../screens/maxiYatzy/maxiYatzyScreen";

export default function PlayerPicker() {
    const [players, setActivePlayers] = useState<Array<PlayerDto>>(getPlayers());

    useEffect(() => {
        const listener = storage.addOnValueChangedListener(changedKey => {
            if (changedKey === 'players') {
                setActivePlayers(getPlayers);
            }
            console.log(changedKey);
        });
        return () => {
            listener.remove();
        };
    }, []);

    return <SafeAreaView style={styles.container} >
        <View style={styles.wrapperContainer}>
            <View style={styles.sectionView}>
                <Text style={styles.sectionTitle}>
                    DICY PEOPLE
                </Text>
            </View>
            <View style={styles.playersWrapper}>
                <FlatList data={[...Array.from(players), { plusImage: true, name: '', imageUrl: '', playerId: -1 }]} style={styles.players}
                    renderItem={({ item }) => {
                        if (!item.plusImage) {
                            return <Player playerDto={item}></Player>;
                        }
                        return <NewPlayer></NewPlayer>;
                    }}
                    keyExtractor={item => item.playerId.toString()} numColumns={3} columnWrapperStyle={{ gap: (10) }}
                />
            </View>
            <View style={styles.nextWrapper}>
                <Pressable style={styles.nextButton} onPress={() => {
                    return <MaxiYatzy></MaxiYatzy>
                }}><Text style={styles.nextButtonText}>NEXT</Text></Pressable>
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
        rowGap: 10,
        columnGap: 10,
        paddingTop: 90
    },
    sectionView: {
        flex: 1,
        width: '100%',
    },
    sectionTitle: {
        fontSize: 40,
        textAlign: 'center',
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', //Centered horizontally
        color: '#000'
    },
    playersWrapper: {
        flex: 6,
    },
    players: {
        padding: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        columnGap: 10,
        flex: 1,
        backgroundColor: 'aliceblue',
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
        borderRadius: 10,
        color: '#FFF'
    },
    nextButtonText: {
        fontSize: 18,
    }
});
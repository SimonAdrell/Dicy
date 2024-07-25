import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { getPlayers, storage } from "./playerHandler";
import NewPlayer from "./newPlayer";
import { useEffect, useState } from "react";
import { PlayerDto } from "./playerObject";
import Player from "./player";
import { RootStackParamList } from "../../../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, 'PlayerPicker'>;

export default function PlayerPicker({ navigation }: Props) {
    const [players, setActivePlayers] = useState<Array<PlayerDto>>(getPlayers());

    useEffect(() => {
        const listener = storage.addOnValueChangedListener(changedKey => {
            if (changedKey === 'players') {
                setActivePlayers(getPlayers);
            }
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
                <FlatList
                    data={[...Array.from(players), { plusImage: true, name: '', imageUrl: '', playerId: -1 }]}
                    contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
                    renderItem={({ item }) => {
                        if (!item.plusImage) {
                            return <Player playerDto={item}></Player>;
                        }
                        return <NewPlayer></NewPlayer>;
                    }}
                    keyExtractor={item => item.playerId.toString()}
                />
            </View>
            <View style={styles.nextWrapper}>
                <Pressable style={styles.nextButton} onPress={() => {
                    navigation.navigate('MaxiYatzy')
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
        flex: 6,
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
        borderRadius: 10,
        color: '#FFF'
    },
    nextButtonText: {
        fontSize: 18,
    }
});
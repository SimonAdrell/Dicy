import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../../App";
import React, { useState } from "react";
import { getPlayers } from "../../library/components/players/playerHandler";
import { PlayerDto } from "../../library/components/players/playerObject";
import { Avatar } from "../../library/components/players/PlayerAvatar";
import { Game, generateNewGame, PlayerScore, updatePlayerGameScore } from "./maxiYatzyGame";
import Row from "./maxiYatzyRow";
import SumRow from "./maxiYatzySumRow";
import { AddScoreModal } from "./maziYatzyScoreModal";
import SumTotalRow from "./maxiYatzySumTotalRow";
import BonusRow from "./maxiYatzyBonusRow";

type Props = NativeStackScreenProps<RootStackParamList, 'MaxiYatzy'>;

export default function MaxiYatzy({ navigation }: Props) {
    const [players, setPlayers] = useState<Array<PlayerDto>>(getPlayers());
    const [activePlayer, setActivePlayer] = useState<PlayerDto>();
    const [game, setGame] = useState<Game>(generateNewGame(players));
    const [scoreModalVisible, setScoreModalVisible] = useState(false);
    const [totalVisibilty, setTotalVisibility] = useState(false);
    const [gameStateName, setGameStateName] = useState<string>('');
    const [currentPlayerScore, setCurrentPlayerSccore] = useState<PlayerScore>();

    const onRowPress = (playerScore: PlayerScore, name: string) => {
        setCurrentPlayerSccore(playerScore);
        setGameStateName(name);
        setScoreModalVisible(!scoreModalVisible);
    };

    const updateGame = (playerScore: PlayerScore | undefined, name: string) => {
        setScoreModalVisible(!scoreModalVisible)
        if (playerScore === undefined)
            return;
        setGame(updatePlayerGameScore(playerScore, name, game));
    }

    const isActivePlayer = (player: PlayerDto) => player.playerId === activePlayer?.playerId

    return <View style={styles.container}>
        <View style={styles.headerRow}>
            <View style={styles.title}></View>
            {
                game.players.sort(e => e.playerId).map((player, index) => {
                    return <View key={player.playerId} style={[styles.player, { backgroundColor: (isActivePlayer(player) ? '#fff8f1' : '') }]}><Avatar imageHeight={40} src={player.imageUrl}></Avatar><Text>{player.name}</Text></View>
                })
            }
        </View>
        <ScrollView>
            {
                game.upper.map((element, index) => {
                    return <Row onPress={onRowPress} GameState={element} key={index} backgroundColor={index % 2 == 0 ? '#f1f8ff' : '#FFF'} />
                })
            }
            <SumRow players={players} GameState={game.upper} backgroundColor={'#f1f8ff'} />
            <BonusRow players={players} GameState={game.upper} backgroundColor={'#f1f8ff'}></BonusRow>
            {
                game.middle.map((element, index) => {
                    return <Row onPress={onRowPress} GameState={element} key={index} backgroundColor={index % 2 == 0 ? '#f1f8ff' : '#FFF'} />
                })
            }
            {
                game.lower.map((element, index) => {
                    return <Row onPress={onRowPress} GameState={element} key={index} backgroundColor={index % 2 == 0 ? '#f1f8ff' : '#FFF'} />
                })
            }
            {totalVisibilty && <SumTotalRow players={players} Game={game} backgroundColor="#fff8f1"></SumTotalRow>
            }
        </ScrollView>
        <Button title="Show or hide total" onPress={() => setTotalVisibility(!totalVisibilty)}></Button>
        <AddScoreModal players={players} name={gameStateName} playerScore={currentPlayerScore} visible={scoreModalVisible} onExit={updateGame} hideModal={() => setScoreModalVisible(false)}></AddScoreModal>
    </View>
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    title: { flex: 1, textAlign: 'center', alignItems: 'center' },
    player: { flex: 1, textAlign: 'center', alignItems: 'center' },
    row: { height: 28, flex: 1 },
    headerRow: { flexDirection: 'row' },
});
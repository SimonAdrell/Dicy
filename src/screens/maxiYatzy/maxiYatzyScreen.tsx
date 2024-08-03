import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../../App";
import { useState } from "react";
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
    const [players] = useState<Array<PlayerDto>>(getPlayers());
    const [activePlayer] = useState<PlayerDto>();
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

    const color1: string = '#FFF';
    const color2: string = '#F1F3F9';

    return <View style={styles.container}>
        <View style={styles.headerRow}>
            <View style={styles.title}></View>
            {
                game.players.sort(e => e.playerId).map((player) => {
                    return <View key={player.playerId} style={[styles.player, { backgroundColor: (isActivePlayer(player) ? '#fff8f1' : '') }]}>
                        <Avatar imageHeight={40} src={player.imageUrl}></Avatar>
                        <Text style={styles.playerName}>{player.name.toLocaleUpperCase()}</Text>
                    </View>
                })
            }
        </View>
        <ScrollView style={styles.board}>
            {
                game.upper.map((element, index) => {
                    return <Row onPress={onRowPress} GameState={element} key={index}
                        backgroundColor={index % 2 == 0 ? color1 : color2}
                        doneCellStyle={index % 2 == 0 ? styles.doneCell1 : styles.doneCell2}
                        removedCellStyle={index % 2 == 0 ? styles.removedCell1 : styles.removedCell2} />
                })
            }
            <SumRow players={players} GameState={game.upper} backgroundColor={'#fff8f1'} />
            <BonusRow players={players} GameState={game.upper} backgroundColor={'#fff8f1'}></BonusRow>
            {
                game.middle.map((element, index) => {
                    return <Row onPress={onRowPress} GameState={element} key={index} backgroundColor={index % 2 == 0 ? color1 : color2}
                        doneCellStyle={index % 2 == 0 ? styles.doneCell1 : styles.doneCell2}
                        removedCellStyle={index % 2 == 0 ? styles.removedCell1 : styles.removedCell2} />
                })
            }
            {
                game.lower.map((element, index) => {
                    return <Row onPress={onRowPress} GameState={element} key={index} backgroundColor={index % 2 == 0 ? color2 : color1}
                        doneCellStyle={index % 2 == 0 ? styles.doneCell1 : styles.doneCell2}
                        removedCellStyle={index % 2 == 0 ? styles.removedCell1 : styles.removedCell2} />
                })
            }
            {totalVisibilty && <SumTotalRow players={players} Game={game} backgroundColor="#fff8f1"></SumTotalRow>
            }

        </ScrollView>
        <TouchableOpacity style={{ backgroundColor: '#E9EDC9' }} onPress={() => { setTotalVisibility(!totalVisibilty) }}><Text style={styles.buttonstyle}>Show or hide total</Text></TouchableOpacity>

        <AddScoreModal players={players} name={gameStateName} playerScore={currentPlayerScore} visible={scoreModalVisible} onExit={updateGame} hideModal={() => setScoreModalVisible(false)}></AddScoreModal>
    </View>
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 20, backgroundColor: '#F1F3F9', padding: 10 },
    title: { flex: 1, textAlign: 'center', alignItems: 'center' },
    player: { flex: 1, textAlign: 'center', alignItems: 'center', paddingBottom: 10 },
    playerName: { fontSize: 18, fontWeight: 'thin' },
    row: { height: 28, flex: 1 },
    headerRow: { flexDirection: 'row' },
    board: { width: '100%' },
    buttonstyle: {
        textAlign: 'center', alignItems: 'center', fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#FFC700',
        fontWeight: 'bold'
    },
    doneCell1: { backgroundColor: '#CCD5AE' },
    doneCell2: { backgroundColor: '#E9EDC9' },
    removedCell1: { backgroundColor: '#ededed' },
    removedCell2: { backgroundColor: '#d3d3d3' }
});
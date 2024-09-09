import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../../App";
import { useState } from "react";
import { PlayerDto } from "../../library/components/players/playerObject";
import { Avatar } from "../../library/components/players/PlayerAvatar";
import Row from "./maxiYatzyRow";
import SumRow from "./maxiYatzySumRow";
import { AddScoreModal } from "./maziYatzyScoreModal";
import BonusRow from "./maxiYatzyBonusRow";
import playerStorageHandler from "../players/playerHandler";
import gameHelper from "../../Helpers/Game/gameHelper";
import { PlayerScore } from "../../Helpers/Game/PlayerScore";
import { useGame } from "../../Helpers/Game/gameContext";
import { GameScore } from "../../Helpers/Game/GameScore";
import { PlayersScoreModal } from "../../library/components/score/scoreModal";
import { sortPlayers } from "../../Helpers/Player/PlayerHelper";

type Props = NativeStackScreenProps<RootStackParamList, 'MaxiYatzy'>;

export default function MaxiYatzy({ navigation }: Props) {
    const playerHandler = playerStorageHandler();
    const [players] = useState<Array<PlayerDto>>(playerHandler.getPlayers());
    const { setGame, game } = useGame();

    const [scoreModalVisible, setScoreModalVisible] = useState(false);
    const [totalVisibilty, setTotalVisibility] = useState(false);
    const [currentPlayerScore, setCurrentPlayerSccore] = useState<PlayerScore>();
    const [currentGameScore, setCurrentGameScore] = useState<GameScore>();

    const onRowPress = (playerScore: PlayerScore, scoreToBeUpdated: GameScore) => {
        setCurrentPlayerSccore(playerScore);
        setCurrentGameScore(scoreToBeUpdated);
        setScoreModalVisible(!scoreModalVisible);
    };
    let gamingHelper = gameHelper(game);

    const updateGame = (playerScore: PlayerScore | undefined, scoreToBeUpdated: GameScore | undefined) => {
        setScoreModalVisible(!scoreModalVisible)
        if (playerScore === undefined)
            return;
        if(scoreToBeUpdated === undefined)
            return;

        gamingHelper.scoreHandler().updatePlayerScore(scoreToBeUpdated, playerScore);
    }
    const color1: string = '#FFF';
    const color2: string = '#F1F3F9';

    return <View style={styles.container}>
        <View style={styles.headerRow}>
            <View style={styles.title}></View>
            {
                game?.players?.sort(sortPlayers).map((player) => {
                    return <View key={player.playerId} style={[styles.player]}>
                        <Avatar imageHeight={40} src={player.imageUrl}></Avatar>
                        <Text style={styles.playerName}>{player.name.toLocaleUpperCase()} </Text>
                    </View>
                })
            }
        </View>
        <ScrollView style={styles.board}>
            {
                game?.upper?.map((element, index) => {
                    return <Row onPress={onRowPress} GameState={element} key={index}
                        backgroundColor={index % 2 == 0 ? color1 : color2}
                        doneCellStyle={index % 2 == 0 ? styles.doneCell1 : styles.doneCell2}
                        removedCellStyle={index % 2 == 0 ? styles.removedCell1 : styles.removedCell2} />
                })
            }
            <SumRow GameHelper={gamingHelper} backgroundColor={'#fff8f1'} />
            <BonusRow GameHelper={gamingHelper} backgroundColor={'#fff8f1'}></BonusRow>
            {
                game?.middle?.map((element, index) => {
                    return <Row onPress={onRowPress} GameState={element} key={index} backgroundColor={index % 2 == 0 ? color1 : color2}
                        doneCellStyle={index % 2 == 0 ? styles.doneCell1 : styles.doneCell2}
                        removedCellStyle={index % 2 == 0 ? styles.removedCell1 : styles.removedCell2} />
                })
            }
            {
                game?.lower?.map((element, index) => {
                    return <Row onPress={onRowPress} GameState={element} key={index} backgroundColor={index % 2 == 0 ? color2 : color1}
                        doneCellStyle={index % 2 == 0 ? styles.doneCell1 : styles.doneCell2}
                        removedCellStyle={index % 2 == 0 ? styles.removedCell1 : styles.removedCell2} />
                })
            }

        </ScrollView>
        <TouchableOpacity style={{ backgroundColor: '#E9EDC9' }} onPress={() => { setTotalVisibility(!totalVisibilty); }}><Text style={styles.buttonstyle}>Show winners</Text></TouchableOpacity>
        <AddScoreModal players={players} scoreToBeUpdated={currentGameScore} playerScore={currentPlayerScore} visible={scoreModalVisible} onExit={updateGame} hideModal={() => setScoreModalVisible(false)}></AddScoreModal>
        <PlayersScoreModal GameHelper={gamingHelper} visible={totalVisibilty} onExit={() => { setTotalVisibility(false) }} />
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
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { PlayerScore } from "./maxiYatzyGame";
import { Component, useEffect, useState } from "react";
import { MiniAvatar } from "../../library/components/players/PlayerAvatar";
import { PlayerDto } from "../../library/components/players/playerObject";
import Modal from "react-native-modal";
import { setPlayer } from "../../library/components/players/playerHandler";



export type scoreModalProps = {
    name: string;
    playerScore: PlayerScore | undefined;
    visible: boolean;
    players: PlayerDto[],
    hideModal: () => void,
    onExit: (playerScore: PlayerScore | undefined, name: string) => void
};

export function AddScoreModal(options: scoreModalProps) {
    const [isRemoved, setIsEnabled] = useState(options.playerScore?.isRemoved);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [scoreString, onChangeScore] = useState<string>('');
    const [player, onchnagePlayer] = useState<PlayerDto | undefined>(getPlayer(options.playerScore?.playerId));

    function getValidNumber(): number{
        var scoreNumber = Number(scoreString);
        if (scoreNumber === undefined){
            options.onExit(undefined, options.name);
            return -1;
        }

        if (scoreNumber === null) {
            options.onExit(undefined, options.name);
            return -1;
        }

        if (scoreNumber === 0) {
            options.onExit(undefined, options.name);
            return -1;
        }

        if(isNaN(scoreNumber)){
            options.onExit(undefined, options.name);
            return -1;
        }
        return scoreNumber;
    }

    const onSave = () => {

        var scoreNumber = getValidNumber();

        if (options.playerScore === undefined) {
            options.onExit(undefined, options.name);
            return;
        }



        var playerScore: PlayerScore = { isRemoved: isRemoved, score: undefined, playerId: options.playerScore?.playerId };
        playerScore.isRemoved = isRemoved;
        if(scoreNumber > -1){
            playerScore.score = scoreNumber;
        }
        var isChanged: boolean = false;
        if(options.playerScore.isRemoved != playerScore.isRemoved){
            isChanged = true;
        }
        if(options.playerScore.score != playerScore.score){
            isChanged = true;
        }

        console.log('isChanged:', isChanged);
        console.log('oldScore:', options.playerScore);
        console.log('newScore:', playerScore);
        console.log('ScoreNumber', (scoreNumber > 0 ?  scoreNumber : undefined))
        if(isChanged)
            options.onExit(playerScore, options.name);

        onChangeScore('');
        setIsEnabled(false);
        onchnagePlayer(undefined);
    }

    function getPlayer(playerId: number | undefined): PlayerDto | undefined {
        if (playerId === undefined) {
            return undefined;
        }

        var player = options.players.filter(p => p.playerId === playerId).find(() => true);
        return player;
    }

    const onModalShow = () => {
        onchnagePlayer(getPlayer(options.playerScore?.playerId));
        if (options.playerScore?.score === undefined) {
        } else {
            onChangeScore(options.playerScore?.score.toLocaleString());
        }
        setIsEnabled(options.playerScore?.isRemoved);
    }

    return <View >
        <Modal
            style={styles.modal}
            isVisible={options.visible}
            onBackdropPress={() => options.hideModal()}
            onModalShow={onModalShow}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.modalText}><MiniAvatar src={player === undefined ? undefined : player.imageUrl} imageHeight={100}></MiniAvatar><Text>{player === undefined ? undefined : player.name}</Text></View>
                    <Text style={styles.modalText}>{options.name}</Text>
                    <View style={styles.formView}>
                        <TextInput autoFocus={true} placeholder="Score" value={scoreString} onChangeText={onChangeScore} keyboardType="number-pad" style={styles.textInput}></TextInput>
                    </View>
                    <View style={styles.formView}>
                        <Switch
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isRemoved}
                        />
                    </View>
                    <View style={styles.saveView}>
                        <Pressable onPress={onSave} ><Text style={styles.saveText}>Save</Text></Pressable>
                    </View>

                </View>

            </View>
        </Modal>
    </View>;
}


const styles = StyleSheet.create({
    modal: {
        fontSize: 28,
        lineHeight: 32,
        marginTop: -6,
        padding: 10
    },
    textInput: {
        fontSize: 14,
        lineHeight: 32,
        width: 300,
        borderColor: '#6750A4',
        marginTop: 40,
        borderRadius: 6,
        borderWidth: 2,
        paddingLeft: 10,
    },
    circleView: {
        width: 80,
        height: 80,
        backgroundColor: "#E8E8E8",
        borderRadius: 1000, // High value
        borderColor: '#FFC700',
        borderStyle: 'solid',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#F7F7F7',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 28
    },
    formView: {
        alignItems: 'center',
    },
    saveView: {
        alignItems: 'center',
    },
    saveText: {
        marginTop: 40,
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#FFC700'
    }
});
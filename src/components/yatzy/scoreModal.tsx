import { Pressable, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { Avatar } from "../players/PlayerAvatar";
import { PlayerDto } from "../players/playerObject";
import Modal from "react-native-modal";
import React from "react";
import { PlayerScore } from "@helpers/Game/PlayerScore";
import { GameScore } from "@helpers/Game/GameScore";
import { sharedStyle } from "@styles/sharedStyle";

export type scoreModalProps = {
    scoreToBeUpdated: GameScore | undefined;
    playerScore: PlayerScore | undefined;
    visible: boolean;
    players: PlayerDto[],
    hideModal: () => void,
    onExit: (playerScore: PlayerScore | undefined, scoreToBeUpdated: GameScore | undefined) => void
};

export function AddScoreModal(options: scoreModalProps) {
    const [isRemoved, onEnabledChange] = useState(options.playerScore?.isRemoved);
    const toggleSwitch = () => onEnabledChange(previousState => !previousState);
    const [scoreString, onChangeScore] = useState<string>('');
    const [player, onChangePlayer] = useState<PlayerDto | undefined>(getPlayer(options.playerScore?.player.playerId));
    const inputRef = React.useRef<TextInput | null>(null);
    const [modalShown, setModalShown] = useState(false);

    function clearModal() {
        onEnabledChange(false);
        onChangePlayer(undefined);
        onChangeScore('');
    }

    function exitModal(playerScore: PlayerScore | undefined, scoreToBeUpdated: GameScore | undefined) {
        options.onExit(playerScore, scoreToBeUpdated);
        clearModal();
        options.hideModal();
        setModalShown(false);
    }

    function getValidNumber(): number {
        var scoreNumber = Number(scoreString);
        if (scoreNumber === undefined)
            return -1;

        if (scoreNumber === null)
            return -1;

        if (scoreNumber === 0)
            return -1;

        if (isNaN(scoreNumber))
            return -1;

        return scoreNumber;
    }

    const onSave = () => {
        var scoreNumber = getValidNumber();
        if (options.playerScore === undefined) {
            exitModal(undefined, options.scoreToBeUpdated);
            return;
        }
        var playerScore: PlayerScore = { isRemoved: isRemoved, score: undefined, player: options.playerScore?.player };
        playerScore.isRemoved = isRemoved;
        if (scoreNumber > -1) {
            playerScore.score = scoreNumber;
        }
        var isChanged: boolean = checkIfPlayerScoreIsChanged(playerScore);
        if (isChanged)
            exitModal(playerScore, options.scoreToBeUpdated);

        exitModal(undefined, options.scoreToBeUpdated);

    }

    function checkIfPlayerScoreIsChanged(playerScore: PlayerScore) {
        var isChanged: boolean = false;
        if (options.playerScore?.isRemoved != playerScore.isRemoved) {
            isChanged = true;
        }
        if (options.playerScore?.score != playerScore.score) {
            isChanged = true;
        }
        return isChanged;
    }

    function getPlayer(playerId: number | undefined): PlayerDto | undefined {
        if (playerId === undefined) {
            return undefined;
        }
        return options.players.filter(p => p.playerId === playerId).find(() => true);
    }

    const onModalShow = () => {
        setModalShown(true);
        onChangePlayer(getPlayer(options.playerScore?.player.playerId));
        if (options.playerScore?.score)
            onChangeScore(options.playerScore?.score.toLocaleString());
        onEnabledChange(options.playerScore?.isRemoved);
        setTimeout(() => inputRef.current?.focus(), 100);
    }

    const onModalWillHide = () => {
        exitModal(undefined, options.scoreToBeUpdated);
    }
    return <View >
        <Modal
            style={styles.modal}
            isVisible={options.visible}
            onBackdropPress={() => {
                exitModal(undefined, options.scoreToBeUpdated);
            }}
            onModalShow={onModalShow} onModalWillHide={onModalWillHide}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.modalText}><Avatar src={player === undefined ? undefined : player.imageUrl} imageHeight={100}></Avatar><Text style={[sharedStyle.darkFontColor, { fontSize: 18 }]}>{player === undefined ? undefined : player.name}</Text></View>
                    <Text style={styles.modalText}>{options.scoreToBeUpdated?.name}</Text>
                    <Text style={styles.tinyModalText}>Max: {options.scoreToBeUpdated?.topScore}</Text>
                    <View style={styles.formView}>
                        {modalShown && (
                            <TextInput autoFocus={true} ref={inputRef} value={scoreString} onChangeText={onChangeScore} keyboardType="number-pad" style={styles.textInput}></TextInput>
                        )}
                        {!modalShown && (
                            <TextInput
                                style={styles.textInput}
                                onChangeText={onChangeScore}
                            />
                        )}
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
        color: sharedStyle.darkFontColor.color
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
        fontSize: 28,
        color: sharedStyle.darkFontColor.color
    },
    tinyModalText: {
        marginBottom: 15,
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 14,
        color: sharedStyle.darkFontColor.color
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
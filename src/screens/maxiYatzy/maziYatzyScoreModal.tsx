import { Keyboard, Pressable, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { PlayerScore } from "./maxiYatzyGame";
import { useState } from "react";
import { MiniAvatar } from "../../library/components/players/PlayerAvatar";
import { PlayerDto } from "../../library/components/players/playerObject";
import Modal from "react-native-modal";
import React from "react";

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
    const inputRef = React.useRef<TextInput | null>(null);
    const [modalShown, setModalShown] = useState(false);

    function getValidNumber(): number {
        var scoreNumber = Number(scoreString);
        if (scoreNumber === undefined) {
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

        if (isNaN(scoreNumber)) {
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
        if (scoreNumber > -1) {
            playerScore.score = scoreNumber;
        }
        var isChanged: boolean = false;
        if (options.playerScore.isRemoved != playerScore.isRemoved) {
            isChanged = true;
        }
        if (options.playerScore.score != playerScore.score) {
            isChanged = true;
        }
        if (isChanged)
            options.onExit(playerScore, options.name);

        onChangeScore('');
        setIsEnabled(false);
        onchnagePlayer(undefined);
        // inputRef.current?.blur();

    }

    function getPlayer(playerId: number | undefined): PlayerDto | undefined {
        if (playerId === undefined) {
            return undefined;
        }
        return options.players.filter(p => p.playerId === playerId).find(() => true);
    }

    const onModalShow = () => {
        setModalShown(true);
        onchnagePlayer(getPlayer(options.playerScore?.playerId));
        if (options.playerScore?.score)
            onChangeScore(options.playerScore?.score.toLocaleString());
        setIsEnabled(options.playerScore?.isRemoved);
        setTimeout(() => inputRef.current?.focus(), 100);
        // Keyboard.isVisible();
    }

    const onModalWillHide = () => {
        setModalShown(false);
    }
    return <View >
        <Modal
            style={styles.modal}
            isVisible={options.visible}
            onBackdropPress={() => {
                options.hideModal();
            }}
            onModalShow={onModalShow} onModalWillHide={onModalWillHide}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.modalText}><MiniAvatar src={player === undefined ? undefined : player.imageUrl} imageHeight={100}></MiniAvatar><Text>{player === undefined ? undefined : player.name}</Text></View>
                    <Text style={styles.modalText}>{options.name}</Text>
                    <View style={styles.formView}>
                        {/* TextInput_A only shows when modal fully mounted. Has autofocus. */}
                        {modalShown && (
                            <TextInput autoFocus={true} ref={inputRef} value={scoreString} onChangeText={onChangeScore} keyboardType="number-pad" style={styles.textInput}></TextInput>
                        )}
                        {/* TextInput_A sits around and looks pretty in the meantime */}
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
import { Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import React, { useRef, useState } from "react";
import { gameHelperType } from "@helpers/Game/gameHelperType";
import { ScoreModalPlayer } from "./playerScoreRow";
import LottieView from "lottie-react-native";
export type playersScoreModalProps = {
    GameHelper: gameHelperType,
    visible: boolean
    onExit: () => void
};

export function PlayersScoreModal(options: playersScoreModalProps) {
    function exitModal() {
        options.onExit();
        setAnimationVisibility(true);
    }
    var [animate, setAnimationVisibility] = useState<boolean>(true);
    var playersTotalScore = options.GameHelper.getPlayers()?.slice();
    const confettiRef = useRef<LottieView>(null);
    function triggerConfetti() {
        confettiRef.current?.play(0);
    }
    return <View>
        <Modal
            style={styles.modal}
            isVisible={options.visible}
            onBackdropPress={exitModal} onModalWillHide={exitModal}
            onShow={triggerConfetti}>
            <View style={styles.centeredView}>
                {
                    animate && (
                        <View style={{
                            pointerEvents: 'none', height: '100%',
                            width: '100%',position:'absolute', zIndex:1
                        }}>
                            <LottieView
                                ref={confettiRef}
                                source={require('../../../assets/confetti.json')}
                                autoPlay={false}
                                loop={false}
                                style={styles.lottie}
                                resizeMode='cover'
                                onAnimationFinish={() => { setAnimationVisibility(false) }}
                            />
                        </View>
                    )
                }

                <View style={styles.modalView}>
                    <View style={styles.modalText}>
                        {
                            playersTotalScore?.sort((a, b) => b.currentScore - a.currentScore).map((element, index) => {
                                return <ScoreModalPlayer key={index + ''} place={index += 1} player={(element)} style={styles.playerRow} columnStyle={styles.playerRowColumn} />
                            })
                        }

                    </View>
                    <View style={styles.saveView}>
                        <Pressable onPress={exitModal}><Text style={styles.saveText}>Close</Text></Pressable>
                    </View>

                </View>

            </View>
        </Modal>
    </View>;
}


const styles = StyleSheet.create({
    modal: {
        fontSize: 28,
        alignItems: 'center',
        flex: 1,
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
        width: 300,
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
        width: 300
    },
    tinyModalText: {
        marginBottom: 15,
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 14
    },
    formView: {
        alignItems: 'center',
    },
    saveView: {
        alignItems: 'center',
        zIndex: 10,
    },
    saveText: {
        marginTop: 40,
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#FFC700'
    },
    playerRow: {
        width: 300,
        flexDirection: 'row'
    },
    playerRowColumn: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        verticalAlign: 'middle'
    },
    lottie: {
        zIndex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        // pointerEvents: 'auto',
        // elevation: 6,
    },
});
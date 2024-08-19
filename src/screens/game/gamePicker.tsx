import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import gameHelper from "../../Helpers/Game/gameHelper";
import { gameType } from "../../Helpers/Game/gameType";
import { useGame } from "../../Helpers/Game/gameContext";
import GameTypeItem from "../../library/components/game/gameTypeItem";

type Props = NativeStackScreenProps<RootStackParamList, 'GamePicker'>;

const GamePicker = ({ navigation }: Props) => {
    const { setGame } = useGame();
    const save = (gameType: gameType) => {
        const helper = gameHelper(undefined);
        helper.generateNewgame(gameType);
        setGame(helper.getGame())
        navigation.navigate('PlayerPicker');
    };
    return <SafeAreaView style={styles.container} >
        <View style={styles.wrapperContainer}>
            <View style={styles.sectionView}>
                <Text style={styles.sectionTitle}>
                </Text>
            </View>
            <View style={styles.playersWrapper}>
                <ScrollView style={styles.gameTypesWrapper}>
                    <GameTypeItem onSelected={() => save(gameType.maxiYatzy)} gameName={"Maxi Yatzy"} gameTag={"Played with 6 six-sided dice"}></GameTypeItem>
                    <GameTypeItem onSelected={() => save(gameType.yatzy)} gameName={"Yatzy"} gameTag={"Played with 5 six-sided dice"} ></GameTypeItem>
                </ScrollView>
            </View>
        </View>
    </SafeAreaView>
}

export default GamePicker;


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F3F9'
    },
    wrapperContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '100%'
    },
    sectionView: {
        paddingTop: 90,
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
        padding: 20,
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
        alignItems: 'center',
        padding: 20
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
        fontWeight: 'bold'
    },
    gameTypesWrapper: {
        flex: 1,
        flexDirection: 'column'
    },
    gameTypeItemWrapper: {
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        borderRadius: 10,
        borderStyle: 'solid',
        borderColor: '#008CFF',
        borderWidth: 1,
        padding: 15,
        paddingBottom: 20,
    },
    gameTypeItemInactive: {
        flex: 1,
        opacity: 0.5
    },
    gameTypeActive: {
        opacity: 1,
        width: '100%',
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    }
});
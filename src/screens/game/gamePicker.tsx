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
                    <GameTypeItem IconName="dice-6" onSelected={() => save(gameType.maxiYatzy)} gameName={"Maxi Yatzy"} gameTagLine={"Played with 6 six-sided dice"}></GameTypeItem>
                    <GameTypeItem IconName="dice-5"  onSelected={() => save(gameType.yatzy)} gameName={"Yatzy"} gameTagLine={"Played with 5 six-sided dice"} ></GameTypeItem>
                </ScrollView>
            </View>
        </View>
    </SafeAreaView>
}

export default GamePicker;


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#6db8ae'
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
    gameTypesWrapper: {
        flex: 1,
        flexDirection: 'column'
    },
});
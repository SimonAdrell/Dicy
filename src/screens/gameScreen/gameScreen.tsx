import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { SafeAreaView, View, Text, ScrollView } from "react-native";
import gameHelper from "@helpers/Game/gameHelper";
import { gameType } from "@helpers/Game/gameType";
import { useGame } from "@helpers/Game/gameContext";
import GameTypeItem from "@components/game/gameTypeItem";
import styles from './gameScreen.styles';
type Props = NativeStackScreenProps<RootStackParamList, 'GamePicker'>;

const GameScreen = ({ navigation }: Props) => {
    const { setGame } = useGame();
    const save = (gameType: gameType) => {
        const helper = gameHelper(undefined);
        helper.generateNewGame(gameType);
        setGame(helper.getGame())
        navigation.navigate('PlayerPicker');
    };
    return <SafeAreaView style={styles.container} >
        <View style={styles.wrapperContainer}>
            <View style={styles.playersWrapper}>
                <ScrollView style={styles.gameTypesWrapper}>
                    <View>
                        <Text style={styles.sectionTitle}>
                            <Text>Use your own dices</Text>
                        </Text>
                        <GameTypeItem IconName="dice-6" onSelected={() => save(gameType.maxiYatzy)} gameName={"Maxi Yatzy"} gameTagLine={"Played with 6 six-sided dice"}></GameTypeItem>
                        <GameTypeItem IconName="dice-5" onSelected={() => save(gameType.yatzy)} gameName={"Yatzy"} gameTagLine={"Played with 5 six-sided dice"} ></GameTypeItem>
                    </View>
                    <View>
                        <Text style={styles.sectionTitle}>
                            <Text>Digital dices</Text>
                        </Text>
                        <GameTypeItem IconName="dice-6" onSelected={() => save(gameType.digitalDicesMaxiYatzy)} gameName={"Digital Maxi Yatzy"} gameTagLine={"Played with 6 six-sided dice"}></GameTypeItem>
                        <GameTypeItem IconName="dice-5" onSelected={() => save(gameType.digitalDicesYatzy)} gameName={"Digital Yatzy"} gameTagLine={"Played with 5 six-sided dice"} ></GameTypeItem>
                    </View>
                </ScrollView>
            </View>
        </View>
    </SafeAreaView>
}

export default GameScreen;

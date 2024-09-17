import { Alert, SafeAreaView, View } from "react-native";
import NewPlayer from "@components/players/newPlayer";
import { useEffect, useState } from "react";
import { PlayerDto } from "@components/players/playerObject";
import { RootStackParamList } from "../../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import playerStorageHandler from "@helpers/Storage/player/playerHandler";
import { useGame } from "@helpers/Game/gameContext";
import gameHelper from "@helpers/Game/gameHelper";
import PlayerList from "@components/players/playerList";
import styles from './PlayerScreen.styles'
import NextButton from "@components/shared/button";
type Props = NativeStackScreenProps<RootStackParamList, 'PlayerPicker'>;

export default function PlayerPicker({ navigation }: Props) {
    const playerHandler = playerStorageHandler();
    const { setGame, game } = useGame();
    let gamingHelper = gameHelper(game);

    const [players, setActivePlayers] = useState<Array<PlayerDto>>(playerHandler.getPlayers());
    useEffect(() => {
        let listener = playerHandler.setListener((changedKey: string) => {
            if (changedKey === 'players')
                setActivePlayers(playerHandler.getPlayers());
        });
        return () => {
            listener.remove();
        };
    }, []);

    const savePlayersToGame = () => {
        if (gamingHelper.getPlayers()?.length) {
            setGame(gamingHelper.getGame());
            navigation.navigate('Yatzy')
        } else {
            Alert.alert('Choose at least one player');
        }
    }

    return <SafeAreaView style={styles.container} >
        <View style={styles.wrapperContainer}>
            <View style={styles.playersWrapper}>
                <PlayerList players={players} gamingHelper={gamingHelper}></PlayerList>
            </View>
            <NewPlayer></NewPlayer>
            <NextButton text="Next" onPress={() => { savePlayersToGame() }}></NextButton>
        </View>
    </SafeAreaView>
}


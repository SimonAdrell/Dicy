import { StyleProp, StyleSheet, Text, View, ViewProps, ViewStyle } from "react-native";
import { PlayerDto } from "../players/playerObject";
import { Avatar } from "../players/PlayerAvatar";


interface scoreModalPlayerPorps extends ViewProps {
    player: PlayerDto,
    place: number,
    columnStyle: StyleProp<ViewStyle>
};

export function ScoreModalPlayer(options: scoreModalPlayerPorps) {
    return <View {...options} >
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', padding: 10 }}>
            <Text style={styles.scoreText}>{options.place}.</Text>
        </View>
        <View style={{ flex: 2, alignItems: 'flex-start', justifyContent: 'center', padding: 10 }}>
            <Avatar src={options.player.imageUrl} imageHeight={65}></Avatar>
        </View>
        <View style={{ flex: 5, padding: 20 }}>
            <Text style={styles.gameNameText}>{options.player.currentScore}</Text>
            <Text style={styles.gameTagLineText}>{options.player.name}</Text>
        </View>
    </View>
};

const styles = StyleSheet.create({
    gameNameText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#005b4f',
    },
    gameTagLineText: {
        color: '#00aa98',
    },
    scoreText:{
        fontSize:32
    }
});

import { StyleSheet } from "react-native";

export default StyleSheet.create({
    languageContainer: {
        padding: 20,
        flex: 1,
        flexDirection: 'column'
    },
    languageRow: {
        flex: 1,
        lineHeight: 32,
        color: '#000',
        borderWidth: 3
    },
    gameNameText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#005b4f',
    }, gameTagLineText: {
        color: '#00aa98',
    },
    scoreText: {
        fontSize: 32
    }
});
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6db8ae',
        paddingTop: 20,
        padding: 10
    },
    title: {
        fontSize: 32,
    },
    row: {
        flex: 1,
        justifyContent: "space-evenly"
    },
    wrapperContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 20,
        width: '100%'
    },
    playersWrapper: {
        flex: 6,
    },
    nextWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    }
});
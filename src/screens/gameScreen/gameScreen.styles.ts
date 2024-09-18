import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
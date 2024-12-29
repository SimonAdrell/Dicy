import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
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
    playersWrapper: {
        padding: 20,
        flex: 6,
    },
    gameTypesWrapper: {
        flex: 1,
        flexDirection: 'column'
    },
    languageContainer: {
        padding: 20,
        flex: 1,
        alignItems: 'flex-end',
    }
});
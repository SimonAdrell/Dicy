import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type gameTypeItems = {
    gameName: string,
    gameTag: string
    onSelected: () => void
};

export default function GameTypeItem({ onSelected, gameName, gameTag }: gameTypeItems) {

    return <View style={styles.container}>
        <TouchableOpacity style={styles.gameTypeActive}
            onPress={onSelected}>
            <View style={[styles.gameTypeItemWrapper]}>
                <View>
                    <Text style={styles.nextButtonText}>{gameName}</Text>
                </View>
                <Text style={styles.gameTag}>{gameTag}</Text>
            </View>
        </TouchableOpacity>
    </View>
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#6db8ae',
        padding: 15,
        paddingBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        margin:20,
        elevation: 5,
        borderRadius:10,
    },
    text: {
        color:'#e3f0ef',
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    gameTypeActive: {
        flex: 1,
    },
    gameTypeItemWrapper: {
        padding: 15,
        paddingBottom: 20,
    },
    gameTypeItemInactive: {
        flex: 1,
        opacity: 0.5
    },
    nextButtonText: {
        fontSize: 20,
        color:'#e3f0ef',
    },
    gameTag:{
        color:'#e3f0ef',
    }
});


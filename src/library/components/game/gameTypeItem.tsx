import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type gameTypeItems = {
    gameName: string,
    gameTagLine: string,
    IconName: string
    onSelected: () => void
};

export default function GameTypeItem({ onSelected, gameName, gameTagLine: gameTag,IconName }: gameTypeItems) {

    return <View style={styles.container}>
        <TouchableOpacity style={styles.gameTypeActive}
            onPress={onSelected}>
            <View style={[styles.gameTypeItemWrapper]}>
                <View style={{flex:2, alignItems:'flex-start', justifyContent:'center'}}>
                    {IconName && <Icon name={IconName} style={[{ fontSize: 32}]} ></Icon> }
                </View>
                <View style={{flex:8}}>
                    <Text style={styles.gameNameText}>{gameName}</Text>
                    <Text style={styles.gameTagLineText}>{gameTag}</Text>
                </View>
            </View>
        </TouchableOpacity>
    </View>
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e8fefa',
        padding: 15,
        paddingBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        margin: 20,
        elevation: 5,
        borderRadius: 10,
    },
    gameTypeActive: {
        flex: 1,
    },
    gameTypeItemWrapper: {
        flexDirection:'row',
        padding: 15,
        paddingBottom: 20,
    },
    gameNameText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#005b4f',
    },
    gameTagLineText: {
        color: '#00aa98',
    }
});

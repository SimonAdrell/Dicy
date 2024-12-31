import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SharedStyle } from "@styles/sharedStyle";

type gameTypeItems = {
    gameName: string,
    gameTagLine: string,
    IconName: string
    onSelected: () => void
};

export default function GameTypeItem({ onSelected, gameName, gameTagLine: gameTag, IconName }: gameTypeItems) {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const sStyle = SharedStyle(isDarkMode);
    return <View style={[styles.container, sStyle.itemBackground]}>
        <TouchableOpacity style={styles.gameTypeActive}
            onPress={onSelected}>
            <View style={[styles.gameTypeItemWrapper]}>
                <View style={{ flex: 2, alignItems: 'flex-start', justifyContent: 'center' }}>
                    {IconName && <Icon name={IconName} style={[{ fontSize: 34 }, sStyle.fontColor]} ></Icon>}
                </View>
                <View style={{ flex: 8 }}>
                    <Text style={[styles.gameNameText, sStyle.fontColor]}>{gameName}</Text>
                    <Text style={[styles.gameTagText, sStyle.secondaryFontColor]}>{gameTag}</Text>
                </View>
            </View>
        </TouchableOpacity>
    </View>
}


const styles = StyleSheet.create({
    container: {
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
        flexDirection: 'row',
        padding: 15,
        paddingBottom: 20,
    },
    gameNameText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    gameTagText: {
        fontSize: 16,
    }
});

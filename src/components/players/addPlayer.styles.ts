import { StyleSheet } from "react-native";
import { SharedStyle } from "@styles/sharedStyle";

export default (isDarkMode: boolean) => {
    return StyleSheet.create({
        container: {
            borderWidth: 1,
            borderRadius: 10,
            flexDirection: 'row',
            padding: 10,
            borderColor: 'rgba(55, 53, 47, 0.7)',
            flex: 1,
            paddingBottom: 20,
            margin: 5,
            height: 100,
            opacity: 0.6,
        },
        containerShadow: {
            shadowColor: '#000000',
            shadowOffset: {
                width: 0,
                height: 15,
            },
            shadowOpacity: 0.24,
            shadowRadius: 16.41,
            elevation: 20,
        },
        iconContainer: {
            flex: 1,
            textAlign: 'center',
            flexDirection: 'column',
            verticalAlign: 'middle',
            color: '#000000',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            textAlignVertical: 'center',
            alignContent: 'center',
        },
        iconStyle: {
            fontSize: 28,
            fontWeight: 'light',
            color: SharedStyle(isDarkMode).itemBackground.backgroundColor,
        },
        textContainer: {
            flex: 5,
            textAlign: 'center',
            flexDirection: 'column',
            verticalAlign: 'middle',
            color: '#000000',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            textAlignVertical: 'center',
            alignContent: 'center',
        },
        textStyle: {
            fontSize: 24,
            fontWeight: 'light',
            color: SharedStyle(isDarkMode).fontColor.color,
        }
    });
} 
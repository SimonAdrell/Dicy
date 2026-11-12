import { StyleSheet } from "react-native";

export default function buttonStyles(isDarkMode: boolean) {
  return StyleSheet.create({
    buttonText: {
        textAlign: 'center',
        alignItems: 'center', fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: isDarkMode ? '#c4a32b' : '#FFC700',
        fontWeight: 'bold'
    },
  });
}

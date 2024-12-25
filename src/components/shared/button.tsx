import { Text, TouchableOpacity, useColorScheme } from "react-native";
import styles from './button.style'
const colorScheme = useColorScheme();
const isDarkMode = colorScheme === 'dark';

interface buttonProp {
    text: string,
    onPress: () => void
}

export default function NextButton(options: buttonProp) {
    const style = styles(isDarkMode);
    return <TouchableOpacity role="button" onPress={options.onPress}>
        <Text style={style.buttonText}>{options.text}</Text>
    </TouchableOpacity >
};
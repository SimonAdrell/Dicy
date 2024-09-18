import { Text, TouchableOpacity } from "react-native";
import styles from './button.style'

interface buttonProp {
    text: string,
    onPress: () => void
}

export default function NextButton(options: buttonProp) {
    return <TouchableOpacity style={styles.button} onPress={options.onPress}>
        <Text style={styles.buttonText}>{options.text}</Text>
    </TouchableOpacity >
};
import { Text, useColorScheme } from "react-native";
import styles from './button.style'

interface ButtonProp {
    readonly text: string,
    readonly onPress: () => void
}

export default function NextButton(options: ButtonProp) {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const style = styles(isDarkMode);
    return <button role="button" onClick={options.onPress}>
        <Text style={style.buttonText}>{options.text}</Text>
    </button >
};
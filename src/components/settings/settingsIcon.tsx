import {TouchableOpacity, useColorScheme, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SettingsModal} from './settingsModal';
import {useState} from 'react';
import {SharedStyle} from '@styles/sharedStyle';

export default function SettingsIcon() {
  const [scoreModalVisible, setScoreModalVisible] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  const sStyle = SharedStyle(isDarkMode);
  return (
    <View>
      <TouchableOpacity onPress={() => setScoreModalVisible(true)}>
        <Icon name="cog" style={[{fontSize: 32}, sStyle.onContainer]} />
      </TouchableOpacity>
      <View>
        <SettingsModal
          visible={scoreModalVisible}
          onExit={() => setScoreModalVisible(false)}
        />
      </View>
    </View>
  );
}

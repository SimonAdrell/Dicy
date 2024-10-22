import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SettingsModal} from './settingsModal';
import {useState} from 'react';

export default function SettingsIcon() {
  const [scoreModalVisible, setScoreModalVisible] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setScoreModalVisible(true)}>
        <Icon name="cog" style={{fontSize: 32}}></Icon>
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

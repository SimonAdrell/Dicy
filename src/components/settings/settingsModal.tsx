import { useColorScheme, View } from 'react-native';
import Modal from 'react-native-modal';
import { modalStyle } from '@styles/sharedStyle';
import { LanguageSettings } from '@components/settings/languageSettings';

type settingsModalOptions = {
  visible: boolean;
  onExit: () => void;
};

export function SettingsModal(options: settingsModalOptions) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const exitModal = () => {
    options.onExit();
  };
  const mStyle = modalStyle(isDarkMode);

  return (
    <View>
      <Modal
        useNativeDriver
        useNativeDriverForBackdrop
        style={mStyle.modal}
        isVisible={options.visible}
        onBackdropPress={exitModal}>
        <View style={mStyle.centeredView}>
          <View style={mStyle.modalView}>
            <LanguageSettings />
          </View>
        </View>
      </Modal>
    </View>
  );
}

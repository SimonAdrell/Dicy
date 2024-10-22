import {View} from 'react-native';
import Modal from 'react-native-modal';
import {modalStyle} from '@styles/sharedStyle';
import {LanguageSettings} from '@components/settings/languageSettings';

type settingsModalOptions = {
  visible: boolean;
  onExit: () => void;
};

export function SettingsModal(options: settingsModalOptions) {
  const exitModal = () => {
    options.onExit();
  };

  return (
    <View>
      <Modal
        useNativeDriver
        useNativeDriverForBackdrop
        style={modalStyle.modal}
        isVisible={options.visible}
        onBackdropPress={exitModal}>
        <View style={modalStyle.centeredView}>
          <View style={modalStyle.modalView}>
            <LanguageSettings />
          </View>
        </View>
      </Modal>
    </View>
  );
}

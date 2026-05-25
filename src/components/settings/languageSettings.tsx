import {
  Image,
  Pressable,
  Text,
  useColorScheme,
  View,
  ViewProps,
} from 'react-native';
import {languageStorage} from '@helpers/Storage/language/languageStorage';
import styles from './languageSettings.styles';
import {useTranslation} from 'react-i18next';
import {modalStyle, SharedStyle} from '@styles/sharedStyle';
interface languageSettingsProps extends ViewProps {}

const selectedCardStyle = {
  borderRadius: 18,
  borderColor: '#FFC700',
  borderWidth: 2,
};
const unselectedCardStyle = {borderRadius: 18, opacity: 0.7};

export function LanguageSettings(options: languageSettingsProps) {
  const {t, i18n} = useTranslation();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    const storage: itemStorage<string> = languageStorage('lang');
    storage.save(lng);
  };
  const mStyle = modalStyle(isDarkMode);
  const sStyle = SharedStyle(isDarkMode);
  return (
    <View {...options}>
      <View style={mStyle.playerRow}>
        <Text style={[styles.sectionHeader, mStyle.modalText]}>
          {t('settings.languageSettings.header')}
        </Text>
      </View>
      <View>
        <Pressable
          onPress={() => changeLanguage('en')}
          style={[
            mStyle.playerRow,
            i18n.resolvedLanguage === 'en'
              ? {...sStyle.itemSelected, ...selectedCardStyle}
              : {...sStyle.itemBackground, ...unselectedCardStyle},
          ]}>
          <View style={{flex: 1, padding: 10}}>
            <Image
              source={require('assets/flags/en.png')}
              style={{height: 65, width: 65}}
            />
          </View>
          <View style={{flex: 3, padding: 20}}>
            <Text
              style={[
                styles.gameNameText,
                i18n.resolvedLanguage === 'en'
                  ? sStyle.secondaryFontColor
                  : sStyle.fontColor,
              ]}>
              {t('settings.languageSettings.en')}
            </Text>
          </View>
        </Pressable>
      </View>
      <View>
        <Pressable
          onPress={() => changeLanguage('se')}
          style={[
            mStyle.playerRow,
            {marginTop: 12},
            i18n.resolvedLanguage === 'se'
              ? {...sStyle.itemSelected, ...selectedCardStyle}
              : {...sStyle.itemBackground, ...unselectedCardStyle},
          ]}>
          <View style={{flex: 1, padding: 10}}>
            <Image
              source={require('assets/flags/se.png')}
              style={{height: 65, width: 65}}
            />
          </View>
          <View style={{flex: 3, padding: 20}}>
            <Text
              style={[
                styles.gameNameText,
                i18n.resolvedLanguage === 'se'
                  ? sStyle.secondaryFontColor
                  : sStyle.fontColor,
              ]}>
              {t('settings.languageSettings.se')}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

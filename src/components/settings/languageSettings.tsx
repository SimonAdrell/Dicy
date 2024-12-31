import { Image, Pressable, Text, useColorScheme, View, ViewProps } from 'react-native';
import { languageStorage } from '@helpers/Storage/language/languageStorage';
import styles from './languageSettings.styles';
import { useTranslation } from 'react-i18next';
import { modalStyle, SharedStyle } from '@styles/sharedStyle';
interface languageSettingsProps extends ViewProps { }

export function LanguageSettings(options: languageSettingsProps) {
  const { t, i18n } = useTranslation();
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
        <Text style={[styles.gameNameText, { fontSize: 32, padding: 20 }, mStyle.modalText]}>
          {t('settings.languageSettings.header')}
        </Text>
      </View>
      <View>
        <Pressable
          onPress={() => changeLanguage('en')}
          style={[
            mStyle.playerRow,
            {
              borderRadius: 10,
              opacity: 0.7,
            },
            i18n.resolvedLanguage === 'en' ? sStyle.itemSelected : sStyle.itemBackground
          ]}>
          <View
            style={{
              flex: 1,
              padding: 10,
            }}>
            <Image
              source={require('assets/flags/en.png')}
              style={{ height: 65, width: 65 }}></Image>
          </View>
          <View style={{ flex: 3, padding: 20 }}>
            <Text style={[styles.gameNameText, i18n.resolvedLanguage === 'en' ? sStyle.secondaryFontColor : sStyle.fontColor]}>
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
            {
              borderRadius: 10,
              marginTop: 20,
              opacity: 0.7,
            },
            i18n.resolvedLanguage === 'se' ? sStyle.itemSelected : sStyle.itemBackground
          ]}>
          <View
            style={{
              flex: 1,
              padding: 10,
            }}>
            <Image
              source={require('assets/flags/se.png')}
              style={{ height: 65, width: 65 }}></Image>
          </View>
          <View style={{ flex: 3, padding: 20 }}>
            <Text style={[styles.gameNameText, i18n.resolvedLanguage === 'se' ? sStyle.secondaryFontColor : sStyle.fontColor]}>
              {t('settings.languageSettings.se')}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

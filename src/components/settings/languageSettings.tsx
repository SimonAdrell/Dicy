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
type LanguageSettingsProps = Readonly<ViewProps>;

const selectedCardStyle = {
  borderRadius: 18,
  borderColor: '#FFC700',
  borderWidth: 2,
};
const unselectedCardStyle = {borderRadius: 18, opacity: 0.7};

const LANGUAGES = [
  {code: 'en', flag: require('../../../assets/flags/en.png')},
  {code: 'se', flag: require('../../../assets/flags/se.png')},
] as const;

export function LanguageSettings(options: LanguageSettingsProps) {
  const {t, i18n} = useTranslation();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    const storage: ItemStorage<string> = languageStorage('lang');
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
      {LANGUAGES.map(({code, flag}, position) => {
        const isSelected = i18n.resolvedLanguage === code;
        return (
          <View key={code}>
            <Pressable
              onPress={() => changeLanguage(code)}
              style={[
                mStyle.playerRow,
                position > 0 && {marginTop: 12},
                isSelected
                  ? {...sStyle.itemSelected, ...selectedCardStyle}
                  : {...sStyle.itemBackground, ...unselectedCardStyle},
              ]}>
              <View style={{flex: 1, padding: 10}}>
                <Image source={flag} style={{height: 65, width: 65}} />
              </View>
              <View style={{flex: 3, padding: 20}}>
                <Text
                  style={[
                    styles.gameNameText,
                    isSelected ? sStyle.secondaryFontColor : sStyle.fontColor,
                  ]}>
                  {t(`settings.languageSettings.${code}`)}
                </Text>
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

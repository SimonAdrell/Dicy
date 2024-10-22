import {SeFlag, UkFlag} from '@components/shared/Flag';
import {Image, Pressable, Text, View, ViewProps} from 'react-native';
import {languageStorage} from '@helpers/Storage/language/languageStorage';
import styles from './languageSettings.styles';
import {useTranslation} from 'react-i18next';
import {modalStyle} from '@styles/sharedStyle';
interface languageSettingsProps extends ViewProps {}

export function LanguageSettings(options: languageSettingsProps) {
  const {t, i18n} = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    const storage: itemStorage<string> = languageStorage('lang');
    storage.save(lng);
  };
  return (
    <View {...options}>
      <View style={modalStyle.playerRow}>
        <Text style={[styles.gameNameText, {fontSize: 32, padding: 20}]}>
          {t('settings.languageSettings.header')}
        </Text>
      </View>
      <View>
        <Pressable
          onPress={() => changeLanguage('en')}
          style={[
            modalStyle.playerRow,
            {
              backgroundColor:
                i18n.resolvedLanguage === 'en' ? '#dedede' : '#F7F7F7',
              borderRadius: 10,
            },
          ]}>
          <View
            style={{
              flex: 1,
              padding: 10,
            }}>
            <Image
              source={require('assets/flags/en.png')}
              style={{height: 65, width: 65}}></Image>
          </View>
          <View style={{flex: 3, padding: 20}}>
            <Text style={styles.gameNameText}>
              {t('settings.languageSettings.en')}
            </Text>
          </View>
        </Pressable>
      </View>
      <View>
        <Pressable
          onPress={() => changeLanguage('se')}
          style={[
            modalStyle.playerRow,
            {
              backgroundColor:
                i18n.resolvedLanguage === 'se' ? '#dedede' : '#F7F7F7',
              borderRadius: 10,
            },
          ]}>
          <View
            style={{
              flex: 1,
              padding: 10,
            }}>
            <Image
              source={require('assets/flags/se.png')}
              style={{height: 65, width: 65}}></Image>
          </View>
          <View style={{flex: 3, padding: 20}}>
            <Text style={styles.gameNameText}>
              {t('settings.languageSettings.se')}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

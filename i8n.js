// import 'intl-pluralrules';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';
// import i18n from './i18n';
import enTranslation from './language/json/en/translation.json';
import seTranslation from './language/json/se/translation.json';
import I18NextHttpBackend from 'i18next-http-backend';

i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    debug: true,
    fallbackLng: 'en',
    supportedLngs: ['en', 'se'],
    resources: {
      en: {
        translation: enTranslation,
      },
      se: {
        translation: seTranslation,
      },
    },
    interpolation: {
      escapeValue: false // not needed for react
    },
  });

  export default i18n;
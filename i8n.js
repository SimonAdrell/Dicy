// import 'intl-pluralrules';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';
// import i18n from './i18n';
import enTranslation from './language/json/en/translation.json';
import svTranslation from './language/json/sv/translation.json';

i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    supportedLngs: ['en', 'sv'],
    resources: {
      en: {
        translation: enTranslation,
      },
      sv: {
        translation: svTranslation,
      },
    },
    interpolation: {
      escapeValue: false // not needed for react
    },
  });

  export default i18n;
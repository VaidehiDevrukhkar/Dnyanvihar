import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation JSON files
import translationEN from './locales/entranslation.json';
import translationHI from './locales/hitranslation.json';
import translationMR from './locales/mrtranslation.json';

const resources = {
  en: {
    translation: translationEN
  },
  hi: {
    translation: translationHI
  },
  mr: {
    translation: translationMR
  }
};

i18n
  .use(LanguageDetector) // Automatically detect user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Default language
    interpolation: {
      escapeValue: false // React already handles escaping
    }
  });

export default i18n;

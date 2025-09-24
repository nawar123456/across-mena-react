import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translateEn from './locales/en/translation';
import translateAr from './locales/ar/translation';



export const resources = {
  en: { translation: translateEn },
  ar: { translation: translateAr },
};

const i18n = i18next.use(initReactI18next).init({
  resources,
  lng: "ar",
  fallbackLng: ['en', 'ar'],
  interpolation: { escapeValue: false },
  supportedLngs: ['en', 'ar'],
});

export default i18n;

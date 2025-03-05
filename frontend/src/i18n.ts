import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationTk from './locales/tk/translation.json'; // Türkmence çevirisi
import translationEn from './locales/en/translation.json'; // İngilizce çevirisi
import translationRu from './locales/ru/translation.json'; // Rusça çevirisi

i18n
  .use(initReactI18next)
  .init({
    resources: {
      tk: {
        translation: translationTk,
      },
      en: {
        translation: translationEn,
      },
      ru: {
        translation: translationRu,
      },
    },
    lng: 'tk', // Başlangıç dilini Türkmence olarak ayarlıyoruz
    fallbackLng: 'en', // Dil bulunmazsa geri dönülecek dil
    interpolation: {
      escapeValue: false, // React için gerekli değil
    },
  });

export default i18n;

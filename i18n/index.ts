import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import ja from "@/locales/ja.json";
import ko from "@/locales/ko.json";
import vi from "@/locales/vi.json";

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  ja: { translation: ja },
  vi: { translation: vi },
  ko: { translation: ko },
};

const deviceLanguage = getLocales()[0]?.languageCode ?? "en";
const supportedLanguages = Object.keys(resources);
const detectedLanguage = supportedLanguages.includes(deviceLanguage)
  ? deviceLanguage
  : "en";

i18n.use(initReactI18next).init({
  resources,
  lng: detectedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React Native handles escaping
  },
  compatibilityJSON: "v4",
});

export default i18n;

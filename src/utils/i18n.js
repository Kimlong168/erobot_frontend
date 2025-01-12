import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

const currendLang = localStorage.getItem("i18nextLng") || "kh";

i18n
  .use(Backend) // Load translations from files
  .use(LanguageDetector) // Detect the user's language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    lng: currendLang, // Default language
    fallbackLng: "kh", // Fallback to English if language detection fails
    debug: true, // Enable for development to see language detection logs
    interpolation: {
      escapeValue: false, // React already escapes values by default
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Path to translation files
    },
  });

export default i18n;

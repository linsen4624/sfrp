import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./langs/en-us";
import zh from "./langs/zh-cn";

i18n.use(initReactI18next).init({
  resources: {
    en: en,
    zh: zh,
  },
  lng: "en",
  fallbacking: "en",
  interpolation: {
    escapeValue: false,
  },
});

export const SUPPORT_LOCALES = [
  { label: "English", value: "en-US" },
  { label: "简体中文", value: "zh-CN" },
];
export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en.json";
import translationVI from "./locales/vi.json";

i18n.use(initReactI18next) // Kết nối với React
    .init({
        resources: {
            en: {
                translation: translationEN,
            },
            vi: {
                translation: translationVI,
            },
        },
        lng: localStorage.getItem("language") || "en", // Lấy ngôn ngữ từ localStorage nếu có
        fallbackLng: "en", // Nếu không có ngôn ngữ, mặc định dùng 'en'
        interpolation: {
            escapeValue: false, // Không escape giá trị
        },
    });

export default i18n;

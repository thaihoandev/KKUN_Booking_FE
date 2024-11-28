import React, { createContext, useContext, useState } from "react";
import i18n from "i18next";

// Tạo context để quản lý ngôn ngữ
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

// Tạo provider để cung cấp ngữ cảnh ngôn ngữ cho toàn bộ ứng dụng
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState("vi"); // Ngôn ngữ mặc định là 'vi'

    const toggleLanguage = () => {
        const newLanguage = language === "vi" ? "en" : "vi";
        setLanguage(newLanguage);
        i18n.changeLanguage(newLanguage); // Thay đổi ngôn ngữ qua i18next
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

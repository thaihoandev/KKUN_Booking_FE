import React from "react";
import { useTranslation } from "react-i18next";
import { removeDiacritics } from "../../../utils/utils";
import { getAmenityIcon } from "../../../utils/icons";

// Danh sách ánh xạ tiện ích tiếng Việt sang tên lớp icon Bootstrap

function AmenityItem({ name }) {
    // Sử dụng trong component
    const iconClass = getAmenityIcon(name);
    const { t } = useTranslation();

    return (
        <li>
            {iconClass}
            {t(
                `amenities.${removeDiacritics(name)
                    .toLowerCase()
                    .replace(/\s+/g, "_")
                    .replace("/", "_")}`
            )}
        </li>
    );
}

export default AmenityItem;

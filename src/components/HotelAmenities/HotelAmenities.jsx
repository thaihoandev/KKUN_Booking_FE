import React from "react";
import { useTranslation } from "react-i18next";
import { removeDiacritics } from "../../utils/utils";

// Định nghĩa `AmenityType` với icon của Bootstrap Icons
const AmenityType = {
    BASIC: { icon: "bi-tv" },
    ENTERTAINMENT: { icon: "bi-controller" },
    COMFORT: { icon: "bi-house" },
    KITCHEN: { icon: "bi-egg-fried" },
    SECURITY: { icon: "bi-shield-lock" },
    SPA: { icon: "bi-droplet" },
    POOL: { icon: "bi-water" },
    GYM: { icon: "bi-barbell" },
    BUSINESS: { icon: "bi-briefcase" },
    PARKING: { icon: "bi-car-front" },
    PET_FRIENDLY: { icon: "bi-paw" },
    TRANSPORT: { icon: "bi-truck" },
    DINING: { icon: "bi-cup-straw" },
    LAUNDRY: { icon: "bi-basket" },
    WIFI: { icon: "bi-wifi" },
};

const HotelAmenities = ({ amenities }) => {
    const { t } = useTranslation();

    // Nhóm các tiện ích theo `type`
    const groupedAmenities = amenities.reduce((groups, item) => {
        const group = groups[item.amenityType] || [];
        group.push(item);
        groups[item.amenityType] = group;
        return groups;
    }, {});

    return (
        <div className="service row mb-20">
            {Object.entries(groupedAmenities).map(([amenityType, items]) => (
                <div key={amenityType} className="service-item col-4 mt-1">
                    <h5
                        className="text-lg font-semibold mb-1 "
                        style={{ color: "#63ab45" }}
                    >
                        {t(`amenityTypes.${amenityType}`)}{" "}
                        {/* Lấy tên từ i18n */}
                    </h5>

                    <ul>
                        {items.map((amenity) => (
                            <li
                                key={amenity.id}
                                className="flex items-center gap-2 mb-2"
                            >
                                <i
                                    className={`bi ${AmenityType[amenityType].icon} text-lg`}
                                ></i>
                                <span className="px-2">
                                    {t(
                                        `amenities.${removeDiacritics(
                                            amenity.name
                                        )
                                            .toLowerCase()
                                            .replace(/\s+/g, "_")
                                            .replace("/", "_")}`
                                    )}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default HotelAmenities;

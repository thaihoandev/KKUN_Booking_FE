import { color } from "framer-motion";
import React from "react";

// Định nghĩa `AmenityType` với icon của Bootstrap Icons
const AmenityType = {
    BASIC: { displayName: "Cơ bản", icon: "bi-tv" },
    ENTERTAINMENT: { displayName: "Giải trí", icon: "bi-controller" },
    COMFORT: { displayName: "Tiện nghi", icon: "bi-house" },
    KITCHEN: { displayName: "Bếp", icon: "bi-egg-fried" },
    SECURITY: { displayName: "An ninh", icon: "bi-shield-lock" },
    SPA: { displayName: "Spa", icon: "bi-droplet" },
    POOL: { displayName: "Hồ bơi", icon: "bi-water" },
    GYM: { displayName: "Phòng tập", icon: "bi-barbell" },
    BUSINESS: { displayName: "Doanh nhân", icon: "bi-briefcase" },
    PARKING: { displayName: "Bãi đỗ xe", icon: "bi-car-front" },
    PET_FRIENDLY: { displayName: "Thân thiện với vật nuôi", icon: "bi-paw" },
    TRANSPORT: { displayName: "Dịch vụ vận chuyển", icon: "bi-truck" },
    DINING: { displayName: "Ăn uống", icon: "bi-cup-straw" },
    LAUNDRY: { displayName: "Dịch vụ giặt là", icon: "bi-basket" },
    WIFI: { displayName: "Wi-Fi", icon: "bi-wifi" },
};

const HotelAmenities = ({ amenities }) => {
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
                        {AmenityType[amenityType].displayName}
                    </h5>

                    <ul className=" ">
                        {items.map((amenity) => (
                            <li
                                key={amenity.id}
                                className="flex items-center gap-2 mb-2"
                            >
                                <i
                                    className={`bi ${AmenityType[amenityType].icon} text-lg`}
                                ></i>
                                <span className="px-2">{amenity.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default HotelAmenities;

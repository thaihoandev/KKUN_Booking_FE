// utils/getAmenityIcon.js

import React from "react";

export const getAmenityIcon = (amenityName) => {
    if (amenityName.includes("Wifi")) return <i className="bi bi-wifi"></i>;
    if (amenityName.includes("Bãi đỗ xe"))
        return <i className="bi bi-car-front-fill"></i>;
    if (amenityName.includes("CCTV"))
        return <i className="bi bi-camera-video-fill"></i>;
    if (amenityName.includes("Dịch vụ phòng"))
        return <i className="bi bi-house-door-fill"></i>;
    if (amenityName.includes("Máy lạnh")) return <i className="bi bi-snow"></i>;
    if (amenityName.includes("Máy sấy")) return <i className="bi bi-wind"></i>;
    if (amenityName.includes("Máy là") || amenityName.includes("ủi"))
        return <i className="bi bi-washer"></i>;
    if (amenityName.includes("Bình chữa cháy"))
        return <i className="bi bi-fire-extinguisher"></i>;
    if (amenityName.includes("Sân vườn")) return <i className="bi bi-tree"></i>;
    if (amenityName.includes("Swimming Pool") || amenityName.includes("Hồ bơi"))
        return <i className="bi bi-water"></i>;

    // Add new amenities here
    if (amenityName.includes("Gym")) return <i className="bi bi-barbell"></i>;
    if (amenityName.includes("Spa")) return <i className="bi bi-spa"></i>;
    if (amenityName.includes("Thang máy"))
        return <i className="bi bi-building"></i>;
    if (amenityName.includes("Nhà hàng"))
        return <i className="bi bi-restaurant"></i>;
    if (amenityName.includes("Quầy bar"))
        return <i className="bi bi-cup-straw"></i>;

    // Default icon for undefined amenities
    return <i className="bi bi-check-circle"></i>;
};

export default getAmenityIcon;

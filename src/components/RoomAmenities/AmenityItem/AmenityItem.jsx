import React from "react";

// Danh sách ánh xạ tiện ích tiếng Việt sang tên lớp icon Bootstrap
const amenityIcons = {
    "Máy lạnh": "bi bi-snow",
    TV: "bi bi-tv",
    "Bồn tắm": "bi bi-bathtub",
    "Dịch vụ phòng": "bi bi-emoji-wink",
    "Máy sấy": "bi bi-fan", // hoặc biểu tượng tùy chỉnh khác cho máy sấy
    "Giường đôi": "bi bi-person-fill", // hoặc "bi bi-person" nếu chỉ có một người
    "Đèn ngủ": "bi bi-lightbulb",
    "Mini bar": "bi bi-cup",
    "Tủ lạnh": "bi bi-refrigerator", // hoặc "bi bi-bag" nếu không có biểu tượng tủ lạnh
    "Bàn làm việc": "bi bi-pencil-square",
    "Tủ quần áo": "bi bi-wardrobe", // hoặc "bi bi-box" nếu không có sẵn biểu tượng tủ
    "Điện thoại": "bi bi-telephone",
    "Két sắt": "bi bi-shield-lock",
    "Bàn là": "bi bi-iron", // nếu không có, dùng bi "bi-star" hoặc tương tự
    // Thêm các tiện ích khác vào đây
};

function AmenityItem({ name }) {
    // Kiểm tra icon của tiện ích từ danh sách ánh xạ
    // Hàm tìm icon dựa trên từ khóa
    const getIconClass = (name) => {
        // Duyệt qua các từ khóa để tìm icon phù hợp
        for (const [keyword, icon] of Object.entries(amenityIcons)) {
            if (name.includes(keyword)) {
                return icon;
            }
        }
        return "bi bi-check"; // Biểu tượng mặc định nếu không tìm thấy
    };

    // Sử dụng trong component
    const iconClass = getIconClass(name);

    return (
        <li>
            <i className={iconClass}></i> {name}
        </li>
    );
}

export default AmenityItem;

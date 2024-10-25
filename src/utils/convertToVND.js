// src/utils/convertToVND.js
const convertToVND = (amount) => {
    if (isNaN(amount)) {
        return "Không hợp lệ";
    }

    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(amount);
};

export default convertToVND;

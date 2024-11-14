import axios from "axios";

// Tạo một instance axios có thể tái sử dụng
export const axiosJWT = axios.create();

// Caapjt nhật trạng thái của ưu đãi
export const updatePromotionStatus = async (promotionId, data, accessToken) => {
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_BASE_API_URL}/promotions/${promotionId}/status`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "Đã xảy ra lỗi khi kết nối tới máy chủ.");
        } else {
            throw new Error("Đã xảy ra lỗi khi kết nối tới máy chủ.");
        }
    }
};

// Lấy tất cả các ưu đãi
export const getAllPromotions = async (accessToken) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/promotions`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error("Đã xảy ra lỗi khi kết nối tới máy chủ.");
        }
    }
};

// Lấy tất cả các loại ưu đãi
export const getAllPromotionTypes = async (accessToken) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/promotions/types`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error("Đã xảy ra lỗi khi kết nối tới máy chủ.");
        }
    }
};

// Lấy thông tin ưu đãi theo ID
export const getPromotionById = async (promotionId, accessToken) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/promotions/${promotionId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error("Đã xảy ra lỗi khi kết nối tới máy chủ.");
        }
    }
};

// Tạo mới ưu đãi
export const createPromotion = async (data, accessToken) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}/promotions`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error("Đã xảy ra lỗi khi kết nối tới máy chủ.");
        }
    }
};

// Cập nhật ưu đãi theo ID
export const updatePromotion = async (promotionId, data, accessToken) => {
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_BASE_API_URL}/promotions/${promotionId}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error("Đã xảy ra lỗi khi kết nối tới máy chủ.");
        }
    }
};

// Xóa ưu đãi theo ID
export const deletePromotion = async (promotionId, accessToken) => {
    try {
        const response = await axios.delete(
            `${process.env.REACT_APP_BASE_API_URL}/promotions/${promotionId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error("Đã xảy ra lỗi khi kết nối tới máy chủ.");
        }
    }
};

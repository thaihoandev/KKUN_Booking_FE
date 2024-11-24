// services/axiosConfig.js
import axios from "axios";
import { toast } from "react-toastify";

// Create axios instances
export const axiosJWT = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
});

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
});

// Request interceptor
axiosJWT.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
axiosJWT.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) {
                    throw new Error("No refresh token");
                }

                const response = await axiosInstance.post(
                    "/auth/refresh-token",
                    {
                        refreshToken,
                    }
                );

                const {
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                } = response.data;

                localStorage.setItem("accessToken", newAccessToken);
                localStorage.setItem("refreshToken", newRefreshToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosJWT(originalRequest);
            } catch (error) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

// services/UserService.js
export const loginUser = async (data) => {
    try {
        const response = await axiosInstance.post("/auth/login", data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const loginGoogleUser = async (data) => {
    try {
        const response = await axiosInstance.post("/auth/google", data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const signupUser = async (data) => {
    try {
        const response = await axiosInstance.post("/auth/register", data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const changePasswordUser = async (request, accessToken) => {
    try {
        const response = await axiosJWT.post(
            `/users/me/change-password`,
            request,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getDetailsUser = async (id, accessToken) => {
    try {
        const response = await axiosJWT.get(`/users/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getAllUser = async () => {
    try {
        const response = await axiosJWT.get("/users");
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// export const getAllUser = async () => {
//     try {
//         const response = await axiosJWT.get("/users");
//         console.log("User data:", response.data); // Thêm log để kiểm tra
//         return response.data;
//     } catch (error) {
//         handleError(error);
//     }
// };

export const logoutUser = async () => {
    try {
        const response = await axiosJWT.post("/auth/logout");
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateUser = async (data, accessToken) => {
    try {
        // Log từng phần tử của FormData
        console.log("FormData Content:");
        for (let pair of data.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
        const response = await axiosJWT.put(`/users/me`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await axiosJWT.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Helper function to handle errors
const handleError = (error) => {
    // Kiểm tra xem lỗi có phải từ response của server không
    const errorMessage =
        error.response?.data?.message || // Lấy thông báo từ phản hồi của server (nếu có)
        error.response?.data || // Nếu không có thông báo chi tiết, lấy dữ liệu phản hồi
        "Đã xảy ra lỗi khi kết nối tới máy chủ."; // Thông báo mặc định

    // Hiển thị thông báo lỗi cho người dùng
    toast.error(errorMessage);

    // Ném lỗi để xử lý tiếp ở nơi gọi hàm, nếu cần
    throw new Error(errorMessage);
};

export default axiosJWT;

export const getBookingHistory = async (accessToken) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/users/booking-hotel/history`,
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

export const addRecentSearch = async (searchString, accessToken) => {
    try {
        const response = await axiosJWT.post(
            `/search/add-recent-searches`, // Đường dẫn API
            {}, // Body rỗng vì searchTerm được truyền qua params
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Header với Bearer token
                },
                params: {
                    searchTerm: searchString, // Truyền searchString vào params
                },
            }
        );

        return response.data;
    } catch (error) {
        handleError(error);
    }
};

//lấy danh sách khách hàng đã đăng ký tại một khách sạn
export const getCustomerBookingCountByHotelId = async (hotelId) => {
    try {
        const response = await axiosJWT.get(`/hotels/${hotelId}/booking-count`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || "Lỗi khi lấy số lượng khách hàng đặt lịch");
    }
};

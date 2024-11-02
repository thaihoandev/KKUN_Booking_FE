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

export const changePasswordUser = async (userId, request) => {
    try {
        const response = await axiosJWT.post(
            `/users/${userId}/change-password`,
            request
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

export const logoutUser = async () => {
    try {
        const response = await axiosJWT.post("/auth/logout");
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateUser = async (id, data) => {
    try {
        const response = await axiosJWT.put(`/users/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
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
    const errorMessage =
        error.response?.data || "Đã xảy ra lỗi khi kết nối tới máy chủ.";
    toast.error(errorMessage);
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

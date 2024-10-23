import axios from "axios";
import { toast } from "react-toastify";
export const axiosJWT = axios.create();

export const loginUser = async (data) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}/auth/login`,
            data
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

export const loginGoogleUser = async (data) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}/auth/google`,
            data
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

export const signupUser = async (data) => {
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}/auth/register`,
            data
        );
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error("Đã xảy ra lỗi khi kết nối tới máy chủ.");
        }
    }
};

export const changePasswordUser = async (userId, request, accessToken) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}/users/${userId}/change-password`,
            request,
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

export const getDetailsUser = async (id, accessToken) => {
    try {
        const res = await axiosJWT.get(
            `${process.env.REACT_APP_BASE_API_URL}/users/${id}`,
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error("Đã xảy ra lỗi khi kết nối tới máy chủ.");
        }
    }
};

export const getAllUser = async (accessToken) => {
    try {
        const res = await axiosJWT.get(
            `${process.env.REACT_APP_BASE_API_URL}/users`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error("Đã xảy ra lỗi khi kết nối tới máy chủ.");
        }
    }
};

export const logoutUser = async () => {
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}/auth/logout`
        );
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error("Đã xảy ra lỗi khi kết nối tới máy chủ.");
        }
    }
};

export const updateUser = async (id, data, accessToken) => {
    try {
        const res = await axiosJWT.put(
            `${process.env.REACT_APP_BASE_API_URL}/users/${id}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error("Đã xảy ra lỗi khi kết nối tới máy chủ.");
        }
    }
};

export const deleteUser = async (id, accessToken) => {
    try {
        const res = await axiosJWT.delete(
            `${process.env.REACT_APP_BASE_API_URL}/users/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error("Đã xảy ra lỗi khi kết nối tới máy chủ.");
        }
    }
};

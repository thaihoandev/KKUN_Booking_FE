import axios from "axios";
import { toast } from "react-toastify";
export const axiosJWT = axios.create();

export const loginUser = async (data) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}/auth/login`,
            data
        );
        return response.data; // Ensure the data is returned properly
    } catch (error) {
        throw error; // Throw the error to be caught by the mutation hook
    }
};
export const loginGoogleUser = async (data) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}/auth/google`,
            data
        );
        return response.data; // Ensure the data is returned properly
    } catch (error) {
        throw error; // Throw the error to be caught by the mutation hook
    }
};
export const signupUser = async (data) => {
    console.log("Sign", data);
    const res = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/auth/register`,
        data
    );
    return res.data;
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

        return response.data; // Trả về dữ liệu thành công nếu request thành công
    } catch (error) {
        // Nếu có lỗi từ BE, throw error ra ngoài với thông tin lỗi từ response
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            // Trường hợp lỗi khác (mạng, server...)
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
        if (error.response) {
            // Log chi tiết nếu API trả về lỗi
            console.error(
                "Server responded with an error:",
                error.response.data
            );
        } else if (error.request) {
            // Nếu không nhận được phản hồi từ server
            console.error("No response received from server:", error.request);
        } else {
            // Lỗi khác
            console.error("Error setting up request:", error.message);
        }
        throw error; // Ném lỗi để mutation có thể xử lý
    }
};

export const getAllUser = async (accessToken) => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_BASE_API_URL}/users`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return res.data;
};

export const logoutUser = async () => {
    const res = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/auth/logout`
    );
    return res.data;
};
export const updateUser = async (id, data, accessToken) => {
    try {
        const res = await axiosJWT.put(
            `${process.env.REACT_APP_BASE_API_URL}/users/${id}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Use 'Authorization' for Bearer tokens
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return res.data;
    } catch (error) {
        console.error("Error updating user:", error.response || error);
        throw error; // Re-throw the error so it can be handled by the caller
    }
};

export const deleteUser = async (id, accessToken, data) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_BASE_API_URL}/users/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        }
    );
    return res.data;
};

import axios from "axios";

export const axiosJWT = axios.create();

export const sendChatMessage = async (message) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}/chat/message`,
            { message }
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

import axios from "axios";

export const sendChatMessage = async (message, sessionId) => {
    try {
        console.log("sendChatMessage", message, sessionId);
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}/chat/message`,
            { message },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Session-ID": sessionId, // Gửi session ID trong header
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

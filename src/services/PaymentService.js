import axios from "axios";

export const axiosJWT = axios.create();

export const checkPaymentStatus = async () => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/payments`
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

import axios from "axios";

export const axiosJWT = axios.create();

export const createReview = async (bookingId, data, accessToken) => {
    console.log("Review", bookingId, data, accessToken);
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}/reviews/booking/${bookingId}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error("Đã xảy ra lỗi khi kết nối tới máy chủ.");
        }
    }
};

import axios from "axios";

export const axiosJWT = axios.create();

export const createBooking = async (data, accessToken) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}/bookings/create`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return initiatePayment(response, accessToken);
    } catch (error) {
        if (error.response && error.response.data) {
            console.error(error.response.data);
            // Kiểm tra message hoặc error khác bên trong error.response.data
            const errorMessage =
                error.response.data.message ||
                JSON.stringify(error.response.data) ||
                "Đã xảy ra lỗi khi xử lý yêu cầu.";
            throw new Error(errorMessage);
        } else {
            throw new Error("Đã xảy ra lỗi khi kết nối tới máy chủ.");
        }
    }
};

export const getBookingById = async (bookingId) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/bookings/${bookingId}`
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            // Kiểm tra message hoặc error khác bên trong error.response.data
            const errorMessage =
                error.response.data.message ||
                JSON.stringify(error.response.data) ||
                "Đã xảy ra lỗi khi xử lý yêu cầu.";
            throw new Error(errorMessage);
        } else {
            throw new Error("Đã xảy ra lỗi khi kết nối tới máy chủ.");
        }
    }
};

export const initiatePayment = async (bookingData, accessToken) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}/bookings/${bookingData.data.id}/payment`,
            bookingData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
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
export const handlePaymentCallback = async (accessToken, queryParams) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/bookings/payment-callback`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: queryParams, // Thêm queryParams vào params
            }
        );

        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            console.error(error.response.data);
            const errorMessage =
                error.response.data.message ||
                JSON.stringify(error.response.data) ||
                "Đã xảy ra lỗi khi xử lý yêu cầu.";
            throw new Error(errorMessage);
        } else {
            throw new Error("Đã xảy ra lỗi khi kết nối tới máy chủ.");
        }
    }
};

import axios from "axios";

// Tạo instance axios với cấu hình mặc định
export const axiosJWT = axios.create();

// Hàm tạo booking
export const createBooking = async (data, accessToken) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}/bookings/create`,
            data,
            {
                headers: {
                    Authorization:
                        accessToken !== "anonymous"
                            ? `Bearer ${accessToken}`
                            : undefined,
                    "Content-Type": "application/json",
                },
            }
        );
        return initiatePayment(response.data, accessToken);
    } catch (error) {
        handleAxiosError(error);
    }
};
export const cancelBooking = async (bookingId, accessToken) => {
    console.log(bookingId, accessToken);

    try {
        const response = await axios.put(
            `${process.env.REACT_APP_BASE_API_URL}/bookings/${bookingId}/cancel`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        console.log(response);

        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};
// Lấy thông tin booking theo ID
export const getBookingById = async (bookingId) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/bookings/${bookingId}`
        );
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};
export const getAllBooking = async (accessToken) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/bookings`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};
// Bắt đầu thanh toán booking
export const initiatePayment = async (bookingData, accessToken) => {
    try {
        const headers = {
            Authorization:
                accessToken !== "anonymous"
                    ? `Bearer ${accessToken}`
                    : undefined,
            "Content-Type": "application/json",
        };

        const response = await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}/bookings/${bookingData.id}/payment`,
            bookingData,
            { headers }
        );

        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

// Xử lý callback thanh toán
export const handlePaymentCallback = async (accessToken, queryParams) => {
    try {
        const headers = {
            Authorization:
                accessToken !== "anonymous"
                    ? `Bearer ${accessToken}`
                    : undefined,
        };

        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/bookings/payment-callback`,
            {
                headers,
                params: queryParams,
            }
        );

        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

// Hàm xác minh voucher
export const verifyVoucher = async (voucherCode) => {
    try {
        console.log(voucherCode);

        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/promotions/code/${voucherCode}`
        );

        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

// Hàm xử lý lỗi chung cho axios
const handleAxiosError = (error) => {
    if (error.response && error.response.data) {
        return error.response.data; // Return the error message instead of throwing
    } else {
        return "Đã xảy ra lỗi khi kết nối tới máy chủ."; // Return a generic error message
    }
};

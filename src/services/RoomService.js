import axios from "axios";

export const axiosJWT = axios.create();

export const getAllRooms = async () => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/rooms`
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

export const getRoomsByHotelId = async (hotelId) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/rooms/hotel/${hotelId}`
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
export const getRoomById = async (roomId) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/rooms/${roomId}`
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
export const createRoom = async (data, access_token) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
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
export const updateroom = async (roomId, data, access_token) => {
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_BASE_API_URL}/${roomId}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
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
export const getRoomReview = async (roomId) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/reviews/rooms/${roomId}`
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
export const getAvailableRooms = async (hotelId, checkInDate, checkOutDate) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/hotels/${hotelId}/available-room`,
            {
                params: {
                    checkinDate: checkInDate,
                    checkoutDate: checkOutDate,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching available rooms:", error);

        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error("Đã xảy ra lỗi khi kết nối tới máy chủ.");
        }
    }
};

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
            `${process.env.REACT_APP_BASE_API_URL}/rooms`,
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
export const updateRoom = async (roomId, data, access_token) => {
    console.log(roomId);

    if (data instanceof FormData) {
        // Lặp qua tất cả các cặp key-value trong FormData
        for (let [key, value] of data.entries()) {
            console.log(key, value);
        }
    } else {
        console.log(data);
    }

    try {
        const response = await axios.put(
            `${process.env.REACT_APP_BASE_API_URL}/rooms/${roomId}`,
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

export const getRoomTypes = async () => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/rooms/room-types`
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
export const getBedTypes = async () => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/rooms/bed-types`
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
export const deleteRoom = async (roomId, access_token) => {
    try {
        const response = await axios.delete(
            `${process.env.REACT_APP_BASE_API_URL}/rooms/${roomId}`,
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

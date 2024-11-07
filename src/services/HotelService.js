import axios from "axios";

export const axiosJWT = axios.create();

export const getAllHotel = async () => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/hotels`
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
export const getHotelById = async (hotelId) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/hotels/${hotelId}`
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
export const getTopRatingHotel = async () => {
    try {
        const res = await axiosJWT.get(
            `${process.env.REACT_APP_BASE_API_URL}/recommendations/top-rating`
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

export const getTrendingHotel = async () => {
    try {
        const res = await axiosJWT.get(
            `${process.env.REACT_APP_BASE_API_URL}/recommendations/trending`
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

export const getPersonalizedHotel = async (userId) => {
    try {
        const res = await axiosJWT.get(
            `${process.env.REACT_APP_BASE_API_URL}/recommendations/personalized/${userId}`
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

export const createHotel = async (data, access_token) => {
    try {
        const res = await axiosJWT.post(
            `${process.env.REACT_APP_BASE_API_URL}/hotels/create`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
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
export const createHotelAndRooms = async (data, access_token) => {
    try {
        const res = await axiosJWT.post(
            `${process.env.REACT_APP_BASE_API_URL}/hotels/create-hotel-rooms`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
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

export const updateHotel = async (id, data, access_token) => {
    try {
        const res = await axiosJWT.put(
            `${process.env.REACT_APP_BASE_API_URL}/hotels/${id}/update`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
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

export const deleteHotel = async (id, access_token) => {
    try {
        const res = await axiosJWT.delete(
            `${process.env.REACT_APP_BASE_API_URL}/hotels/${id}/delete`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
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
export const getNearbyPlaces = async (hotelId, address) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/hotels/${hotelId}/nearby-places`,

            {
                params: { address },
            }
        );
        return response.data; // Trả về danh sách các địa điểm gần gũi
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error("Đã xảy ra lỗi khi kết nối tới máy chủ.");
        }
    }
};

export const getHotelBookingHistory = async (access_token) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/hotels/booking-hotel/history`,
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
export const getHotelCategories = async () => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/hotels/hotel-categories`
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
export const getHotelPolicies = async () => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/hotels/hotel-policies`
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

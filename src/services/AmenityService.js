import axios from "axios";

export const axiosJWT = axios.create();

export const getAllAmenities = async (accessToken) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/amenities`,

            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
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

export const getAmenityById = async (amenityId, accessToken) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/amenities/${amenityId}`,

            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
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
export const getAllAmenityType = async (accessToken) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/amenities/amenity-types`,

            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
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
export const createAmenity = async (data, accessToken) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}/amenities`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
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
export const updateAmenity = async (amenityId, data, accessToken) => {
    try {
        console.log(data, accessToken);
        const response = await axios.put(
            `${process.env.REACT_APP_BASE_API_URL}/amenities/${amenityId}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
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

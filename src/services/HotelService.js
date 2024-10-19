import axios from "axios";

export const axiosJWT = axios.create();

export const getAllHotel = async () => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}/hotels`
        );
        return response.data; // Ensure the data is returned properly
    } catch (error) {
        throw error; // Throw the error to be caught by the mutation hook
    }
};
export const signupUser = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/auth/register`,
        data
    );
    return res.data;
};

export const getTopRatingHotel = async () => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_BASE_API_URL}/recommendations/top-rating`
    );
    return res.data;
};

export const getTrendingHotel = async () => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_BASE_API_URL}/recommendations/trending`
    );
    return res.data;
};

export const getPersonalizedHotel = async (userId) => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_BASE_API_URL}/recommendations/personalized/${userId}`
    );
    return res.data;
};
export const createHotel = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_BASE_API_URL}/hotel/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};
export const updateHotel = async (id, data, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_BASE_API_URL}/hotel/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const deleteHotel = async (id, access_token, data) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_BASE_API_URL}/hotels/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

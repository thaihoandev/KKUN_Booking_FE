import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}/auth/login`,
            data
        );
        return response.data; // Ensure the data is returned properly
    } catch (error) {
        throw error; // Throw the error to be caught by the mutation hook
    }
};
export const loginGoogleUser = async (data) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}/auth/google`,
            data
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

export const getDetailsUser = async (id, access_token) => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_BASE_API_URL}/users/${id}`,
        { headers: { token: `Bearer ${access_token}` } }
    );
    return res.data;
};

export const getAllUser = async (access_token) => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_BASE_API_URL}/users`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const logoutUser = async () => {
    const res = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/auth/logout`
    );
    return res.data;
};
export const updateUser = async (id, data, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_BASE_API_URL}/users/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const deleteUser = async (id, access_token, data) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_BASE_API_URL}/users/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

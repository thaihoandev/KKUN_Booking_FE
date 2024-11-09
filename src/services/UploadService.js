import axios from "axios";

export const axiosJWT = axios.create();

export const createImage = async (file, accessToken) => {
    const formData = new FormData();
    formData.append("fileImage", file); // Đảm bảo tên trường khớp với backend yêu cầu
    formData.append("altImage", file.name); // Đảm bảo tên trường khớp với backend yêu cầu

    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}/upload/create`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data; // Giả sử backend trả về URL trong response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error("Đã xảy ra lỗi khi kết nối tới máy chủ.");
        }
    }
};

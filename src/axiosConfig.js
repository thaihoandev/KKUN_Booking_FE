import axios from "axios";

// Tạo instance của axios
const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_API_URL}`, // URL gốc của API (thay thế bằng URL thực tế của bạn)
    timeout: 5000, // Đặt thời gian chờ tối đa cho mỗi request
    headers: {
        "Content-Type": "application/json", // Định dạng nội dung mặc định
        // Bạn có thể thêm các headers khác ở đây nếu cần (ví dụ: Authorization)
    },
});

// Thêm interceptor để quản lý request và response
axiosInstance.interceptors.request.use(
    (config) => {
        // Thêm logic trước khi gửi request, ví dụ: thêm token vào headers nếu cần
        // config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    (error) => {
        // Xử lý lỗi trước khi request được gửi đi
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        // Xử lý dữ liệu trả về từ server
        return response;
    },
    (error) => {
        // Xử lý lỗi trả về từ server (ví dụ: lỗi 401, 404)
        return Promise.reject(error);
    }
);

export default axiosInstance;

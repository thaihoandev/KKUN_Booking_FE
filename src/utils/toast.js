import { toast } from "react-toastify";

// Cấu hình mặc định cho toast
const defaultConfig = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
};

// Định nghĩa các message thông báo
const TOAST_MESSAGES = {
    // Form validation messages
    REQUIRED_LOCATION: "Vui lòng chọn địa điểm!",
    REQUIRED_DATE: "Vui lòng chọn ngày nhận phòng và trả phòng!",
    REQUIRED_ROOMS: "Vui lòng chọn số lượng phòng!",
    REQUIRED_ADULTS: "Vui lòng chọn số lượng người lớn!",

    // Status messages
    LOADING: "Đang xử lý...",
    SUCCESS: "Thành công!",
    ERROR: "Có lỗi xảy ra!",

    // API messages
    API_ERROR: "Lỗi kết nối server!",
    SEARCH_SUCCESS: "Tìm kiếm thành công!",
    SEARCH_ERROR: "Có lỗi xảy ra khi tìm kiếm!",

    // Auth messages
    LOGIN_SUCCESS: "Đăng nhập thành công!",
    LOGIN_ERROR: "Đăng nhập thất bại!",
    LOGOUT_SUCCESS: "Đăng xuất thành công!",

    // Data messages
    SAVE_SUCCESS: "Lưu dữ liệu thành công!",
    SAVE_ERROR: "Lưu dữ liệu thất bại!",
    DELETE_SUCCESS: "Xóa dữ liệu thành công!",
    DELETE_ERROR: "Xóa dữ liệu thất bại!",
    UPDATE_SUCCESS: "Cập nhật thành công!",
    UPDATE_ERROR: "Cập nhật thất bại!",
};

// Custom hook để quản lý toast
const useToast = () => {
    const showToast = (type, message, config = {}) => {
        const toastConfig = { ...defaultConfig, ...config };

        switch (type) {
            case "success":
                toast.success(message, toastConfig);
                break;
            case "error":
                toast.error(message, toastConfig);
                break;
            case "info":
                toast.info(message, toastConfig);
                break;
            case "warning":
                toast.warning(message, toastConfig);
                break;
            case "loading":
                return toast.loading(message, toastConfig);
            default:
                toast(message, toastConfig);
        }
    };

    // Hiển thị toast loading
    const showLoading = (message = TOAST_MESSAGES.LOADING) => {
        return toast.loading(message, defaultConfig);
    };

    // Đóng toast
    const dismissToast = (toastId) => {
        toast.dismiss(toastId);
    };

    // Cập nhật toast
    const updateToast = (toastId, type, message, config = {}) => {
        const toastConfig = { ...defaultConfig, ...config };
        toast.update(toastId, {
            render: message,
            type: type,
            ...toastConfig,
            isLoading: false,
        });
    };

    return {
        showToast,
        showLoading,
        dismissToast,
        updateToast,
        TOAST_MESSAGES,
    };
};

export default useToast;

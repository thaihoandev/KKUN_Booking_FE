// schemas/validationSchemas.js
import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .required("Email không được để trống")
        .email("Email không hợp lệ"),
    password: yup
        .string()
        .required("Vui lòng nhập mật khẩu")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .max(50, "Mật khẩu không được vượt quá 50 ký tự")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt"
        ),
});

export const registerSchema = yup.object().shape({
    firstName: yup
        .string()
        .required("Vui lòng nhập tên")
        .min(2, "Tên phải có ít nhất 2 ký tự")
        .max(50, "Tên không được vượt quá 50 ký tự")
        .matches(/^[a-zA-ZÀ-ỹ\s]*$/, "Tên chỉ được chứa chữ cái"),

    lastName: yup
        .string()
        .required("Vui lòng nhập họ")
        .min(2, "Họ phải có ít nhất 2 ký tự")
        .max(50, "Họ không được vượt quá 50 ký tự")
        .matches(/^[a-zA-ZÀ-ỹ\s]*$/, "Họ chỉ được chứa chữ cái"),

    email: yup
        .string()
        .required("Vui lòng nhập email")
        .email("Email không hợp lệ")
        .max(255, "Email không được vượt quá 255 ký tự"),

    password: yup
        .string()
        .required("Vui lòng nhập mật khẩu")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .max(50, "Mật khẩu không được vượt quá 50 ký tự")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt"
        ),

    rePassword: yup
        .string()
        .required("Vui lòng xác nhận mật khẩu")
        .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp"),
});
export const registerHotelOwnerSchema = yup.object().shape({
    firstName: yup
        .string()
        .required("Vui lòng nhập tên")
        .min(2, "Tên phải có ít nhất 2 ký tự")
        .max(50, "Tên không được vượt quá 50 ký tự")
        .matches(/^[a-zA-ZÀ-ỹ\s]*$/, "Tên chỉ được chứa chữ cái"),

    lastName: yup
        .string()
        .required("Vui lòng nhập họ")
        .min(2, "Họ phải có ít nhất 2 ký tự")
        .max(50, "Họ không được vượt quá 50 ký tự")
        .matches(/^[a-zA-ZÀ-ỹ\s]*$/, "Họ chỉ được chứa chữ cái"),

    email: yup
        .string()
        .required("Vui lòng nhập email")
        .email("Email không hợp lệ")
        .max(255, "Email không được vượt quá 255 ký tự"),

    password: yup
        .string()
        .required("Vui lòng nhập mật khẩu")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .max(50, "Mật khẩu không được vượt quá 50 ký tự")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt"
        ),

    rePassword: yup
        .string()
        .required("Vui lòng xác nhận mật khẩu")
        .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp"),

    phone: yup
        .string()
        .required("Vui lòng nhập số điện thoại")
        .matches(
            /^[0-9]{10,15}$/,
            "Số điện thoại không hợp lệ (chỉ chứa số và phải có từ 10 đến 15 chữ số)"
        ),
});
export const changePasswordSchema = yup.object().shape({
    oldPassword: yup.string().when(["$authProvider", "$hasPassword"], {
        is: (authProvider, hasPassword) => {
            // Yêu cầu oldPassword nếu:
            // 1. Là tài khoản LOCAL
            // 2. Hoặc là tài khoản GOOGLE nhưng đã có mật khẩu
            return (
                authProvider === "LOCAL" ||
                (authProvider === "GOOGLE" && hasPassword)
            );
        },
        then: () =>
            yup
                .string()
                .required("Vui lòng nhập mật khẩu cũ")
                .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
        otherwise: () => yup.string().optional(),
    }),

    newPassword: yup
        .string()
        .required("Vui lòng nhập mật khẩu mới")
        .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự")
        .test(
            "not-same-as-old",
            "Mật khẩu mới phải khác mật khẩu cũ",
            function (value) {
                const { authProvider, hasPassword } = this.options.context;
                // Kiểm tra khi có oldPassword (LOCAL hoặc GOOGLE có mật khẩu)
                if (
                    this.parent.oldPassword &&
                    (authProvider === "LOCAL" || hasPassword)
                ) {
                    return value !== this.parent.oldPassword;
                }
                return true;
            }
        ),

    confirmNewPassword: yup
        .string()
        .required("Vui lòng xác nhận mật khẩu mới")
        .oneOf([yup.ref("newPassword")], "Mật khẩu xác nhận không khớp"),
});

export const bookingFormSchema = yup.object().shape({
    fullName: yup
        .string()
        .required("Vui lòng nhập tên đầy đủ")
        .min(2, "Tên phải có ít nhất 2 ký tự"),

    email: yup
        .string()
        .required("Vui lòng nhập địa chỉ email")
        .email("Email không hợp lệ"),

    phone: yup
        .string()
        .required("Vui lòng nhập số điện thoại")
        .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
        .min(10, "Số điện thoại phải có ít nhất 10 số")
        .max(11, "Số điện thoại không được quá 11 số"),

    notes: yup.string().nullable(),
});

export const paymentFormSchema = yup.object().shape({
    mainPaymentMethod: yup
        .string()
        .required("Vui lòng chọn phương thức thanh toán"),

    electronicPaymentOption: yup.string().when("mainPaymentMethod", {
        is: "electronic",
        then: (schema) =>
            schema.required("Vui lòng chọn hình thức thanh toán điện tử"),
        otherwise: (schema) => schema.nullable(),
    }),
});

export const amenityEditFormSchema = yup.object().shape({
    name: yup.string().required("Tên tiện ích là bắt buộc"),
    description: yup.string().required("Mô tả là bắt buộc"),
    amenityType: yup.string().required("Loại tiện ích là bắt buộc"),
});

// Schema validation sử dụng yup
export const createRoomSchema = yup.object().shape({
    roomType: yup.string().required("Loại phòng là bắt buộc"),
    bedType: yup.string().required("Loại giường là bắt buộc"),
    originalPrice: yup
        .number()
        .typeError("Giá gốc phải là số")
        .positive("Giá gốc phải là số dương")
        .required("Giá gốc là bắt buộc"),
    discountedPrice: yup
        .number()
        .typeError("Giá giảm phải là số")
        .positive("Giá giảm phải là số dương"),
    maxOccupancy: yup
        .number()
        .typeError("Số người tối đa phải là số")
        .positive("Số người tối đa phải là số dương")
        .required("Số người tối đa là bắt buộc"),
    roomArea: yup
        .number()
        .typeError("Diện tích phải là số")
        .positive("Diện tích phải là số dương")
        .required("Diện tích là bắt buộc"),
});

// Schema validation với Yup
export const hotelDetailsSchema = yup.object().shape({
    name: yup.string().required("Tên khách sạn là bắt buộc"),
    category: yup.string().required("Danh mục khách sạn là bắt buộc"),
    description: yup.string().required("Mô tả là bắt buộc"),
    paymentPolicy: yup.string().required("Chính sách thanh toán là bắt buộc"),
    freeCancellation: yup.boolean(),
    breakfastIncluded: yup.boolean(),
    prePayment: yup.boolean(),
});
export const locationHotelschema = yup.object().shape({
    location: yup.string().required("Địa chỉ khách sạn là bắt buộc"),
    province: yup.object().nullable().required("Tỉnh/Thành phố là bắt buộc"),
    district: yup.object().nullable().required("Quận/Huyện là bắt buộc"),
    ward: yup.object().nullable().required("Phường/Xã là bắt buộc"),
});

// Lược đồ xác thực bằng yup
export const blogCreateSchema = yup.object().shape({
    title: yup.string().required("Tiêu đề là bắt buộc"),
    readTime: yup
        .number()
        .typeError("Thời gian đọc phải là số")
        .positive("Thời gian đọc phải lớn hơn 0")
        .required("Thời gian đọc là bắt buộc"),
    blogPostCategory: yup.string().required("Danh mục là bắt buộc"),
});

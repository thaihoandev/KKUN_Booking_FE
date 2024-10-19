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

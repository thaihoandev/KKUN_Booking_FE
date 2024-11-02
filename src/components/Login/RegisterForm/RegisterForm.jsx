import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../../schemas/validationSchemas";
import PasswordInput from "../PasswordInput/PasswordInput";
import { Link } from "react-router-dom";

function RegisterForm({ onClose, onSubmit, onOpenLogin }) {
    const [submitError, setSubmitError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        resolver: yupResolver(registerSchema),
        mode: "onChange",
    });

    const onSubmitForm = async (data) => {
        try {
            setIsSubmitting(true);
            setSubmitError("");

            const result = await onSubmit(data);

            // Nếu server trả về lỗi
            if (!result.success) {
                // Xử lý các loại lỗi cụ thể từ server
                if (result.error === "EMAIL_EXISTS") {
                    setError("email", {
                        type: "manual",
                        message: "Email này đã được đăng ký",
                    });
                } else {
                    // Lỗi chung
                    setSubmitError(
                        result.message ||
                            "Đăng ký thất bại. Vui lòng thử lại sau."
                    );
                }
            }
        } catch (error) {
            setSubmitError("Có lỗi xảy ra. Vui lòng thử lại sau.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="modal login-modal fade show"
            style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div
                        className="modal-clode-btn"
                        aria-label="Close"
                        onClick={onClose}
                    ></div>
                    <div className="modal-header">
                        <img
                            style={{
                                height: "170px",
                                width: "100%",
                                objectFit: "cover",
                            }}
                            src="assets/img/bg-login-register.jpg"
                            alt="Register Modal Header"
                        />
                    </div>
                    <div className="modal-body">
                        <div className="login-registration-form">
                            <div className="form-title">
                                <h2>Tạo tài khoản mới</h2>
                                <p>Nhập thông tin tài khoản để đăng ký.</p>
                            </div>

                            {/* Hiển thị thông báo lỗi chung */}
                            {submitError && (
                                <div
                                    className="alert alert-danger mb-3"
                                    role="alert"
                                    style={{
                                        fontSize: "14px",
                                        padding: "10px 15px",
                                    }}
                                >
                                    {submitError}
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onSubmitForm)}>
                                <div className="form-inner mb-20">
                                    <div className="form-group d-flex justify-content-between">
                                        <div className="flex-grow-1 me-2">
                                            <input
                                                type="text"
                                                placeholder="Họ*"
                                                className={`form-control ${
                                                    errors.lastName
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                {...register("lastName")}
                                            />
                                            {errors.lastName && (
                                                <div className="invalid-feedback">
                                                    {errors.lastName.message}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-grow-1 ms-2">
                                            <input
                                                type="text"
                                                placeholder="Tên*"
                                                className={`form-control ${
                                                    errors.firstName
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                {...register("firstName")}
                                            />
                                            {errors.firstName && (
                                                <div className="invalid-feedback">
                                                    {errors.firstName.message}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-group mt-4">
                                        <input
                                            type="text"
                                            placeholder="Địa chỉ email*"
                                            className={`form-control ${
                                                errors.email ? "is-invalid" : ""
                                            }`}
                                            {...register("email")}
                                        />
                                        {errors.email && (
                                            <div className="invalid-feedback">
                                                {errors.email.message}
                                            </div>
                                        )}
                                    </div>

                                    <PasswordInput
                                        registration={{
                                            ...register("password"),
                                        }}
                                        placeholder="Mật khẩu*"
                                        error={errors.password}
                                    />

                                    <PasswordInput
                                        registration={{
                                            ...register("rePassword"),
                                        }}
                                        placeholder="Xác nhận mật khẩu*"
                                        error={errors.rePassword}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="login-btn mb-25"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span>
                                            <i className="bi bi-spinner bi-spin me-2"></i>
                                            Đang đăng ký...
                                        </span>
                                    ) : (
                                        "Đăng ký"
                                    )}
                                </button>

                                <div>
                                    <p>
                                        Dữ liệu của bạn sẽ được dùng cho việc hỗ
                                        trợ trải nghiệm khi sử dụng website, để
                                        quản lý tài khoản của bạn, và cho các
                                        mục đích khác được mô tả trong{" "}
                                        <strong>
                                            <Link to="#">
                                                chính sách bảo mật
                                            </Link>
                                        </strong>{" "}
                                        của chúng tôi.
                                    </p>
                                </div>
                                <div>
                                    <span>
                                        Đã có tài khoản?{" "}
                                        <Link
                                            className="text-danger"
                                            onClick={onOpenLogin}
                                        >
                                            <b>Đăng nhập</b>
                                        </Link>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;

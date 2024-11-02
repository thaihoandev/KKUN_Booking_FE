import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../schemas/validationSchemas";
import PasswordInput from "../PasswordInput/PasswordInput";
import { Link } from "react-router-dom";

function LoginForm({ onClose, onSubmit, onOpenRegister, onGoogleLogin }) {
    const [submitError, setSubmitError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        resolver: yupResolver(loginSchema),
        mode: "onChange",
    });

    const onSubmitForm = async (data) => {
        try {
            setIsSubmitting(true);
            setSubmitError("");

            const result = await onSubmit(data);

            if (!result.success) {
                if (result.error === "INVALID_CREDENTIALS") {
                    setError("email", {
                        type: "manual",
                        message: "Email hoặc mật khẩu không chính xác",
                    });
                    setError("password", {
                        type: "manual",
                        message: "Email hoặc mật khẩu không chính xác",
                    });
                } else {
                    setSubmitError(
                        result.message ||
                            "Đăng nhập thất bại. Vui lòng thử lại sau."
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
                            alt="Login Modal Header"
                        />
                    </div>
                    <div className="modal-body">
                        <div className="login-registration-form">
                            <div className="form-title">
                                <h2>Đăng nhập để tiếp tục</h2>
                                <p>Nhập thông tin tài khoản để đăng nhập.</p>
                            </div>

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
                                    <div className="form-group">
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
                                </div>

                                <button
                                    type="submit"
                                    className="login-btn mb-25"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span>
                                            <i className="bi bi-spinner bi-spin me-2"></i>
                                            Đang đăng nhập...
                                        </span>
                                    ) : (
                                        "Đăng nhập"
                                    )}
                                </button>

                                <div>
                                    <span>
                                        Chưa có tài khoản?{" "}
                                        <Link
                                            className="text-danger"
                                            onClick={onOpenRegister}
                                        >
                                            <b>Đăng ký</b>
                                        </Link>
                                    </span>
                                </div>
                                <div className="divider">
                                    <span>hoặc</span>
                                </div>
                                <Link
                                    className="google-login-btn"
                                    onClick={onGoogleLogin}
                                >
                                    <div className="icon">
                                        <img
                                            style={{
                                                height: "25px",
                                                width: "25px",
                                            }}
                                            src="assets/img/google-logo.png"
                                            alt="Google Icon"
                                        />
                                    </div>
                                    Đăng nhập bằng Google
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;

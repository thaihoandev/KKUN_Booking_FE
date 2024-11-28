import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../schemas/validationSchemas";
import PasswordInput from "../PasswordInput/PasswordInput";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function LoginForm({ onClose, onSubmit, onOpenRegister, onGoogleLogin }) {
    const { t } = useTranslation();
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
                        message: t("loginForm.invalidCredentials"),
                    });
                    setError("password", {
                        type: "manual",
                        message: t("loginForm.invalidCredentials"),
                    });
                } else {
                    setSubmitError(
                        result.message || t("loginForm.submitError")
                    );
                }
            }
        } catch (error) {
            setSubmitError(t("loginForm.submitError"));
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
                                <h2>{t("loginForm.title")}</h2>
                                <p>{t("loginForm.description")}</p>
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
                                            placeholder={t("loginForm.email")}
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
                                        placeholder={t("loginForm.password")}
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
                                            {t("loginForm.login")}...
                                        </span>
                                    ) : (
                                        t("loginForm.login")
                                    )}
                                </button>

                                <div>
                                    <span>
                                        {t("loginForm.registerPrompt")}{" "}
                                        <Link
                                            className="text-danger"
                                            onClick={onOpenRegister}
                                        >
                                            <b>{t("loginForm.register")}</b>
                                        </Link>
                                    </span>
                                </div>
                                <div className="divider">
                                    <span>{t("loginForm.or")}</span>
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
                                    {t("loginForm.googleLogin")}
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

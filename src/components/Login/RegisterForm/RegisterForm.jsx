import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../../schemas/validationSchemas";
import PasswordInput from "../PasswordInput/PasswordInput";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

function RegisterForm({ onClose, onSubmit, onOpenLogin }) {
    const { t } = useTranslation(); // Initialize translation function
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

            if (result.success) {
                onClose();
            } else {
                if (result.error === "EMAIL_EXISTS") {
                    setError("email", {
                        type: "manual",
                        message: t("registerForm.emailExists"), // Translate the error message
                    });
                } else {
                    setSubmitError(
                        result.message || t("registerForm.registerFailed")
                    );
                }
            }
        } catch (error) {
            setSubmitError(t("registerForm.registerFailed"));
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
                                <h2>{t("registerForm.createAccount")}</h2>
                                <p>{t("registerForm.enterAccountInfo")}</p>
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
                                    <div className="form-group d-flex justify-content-between">
                                        <div className="flex-grow-1 me-2">
                                            <input
                                                type="text"
                                                placeholder={t(
                                                    "registerForm.lastName"
                                                )}
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
                                                placeholder={t(
                                                    "registerForm.firstName"
                                                )}
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
                                            placeholder={t(
                                                "registerForm.email"
                                            )}
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
                                        placeholder={t("registerForm.password")}
                                        error={errors.password}
                                    />

                                    <PasswordInput
                                        registration={{
                                            ...register("rePassword"),
                                        }}
                                        placeholder={t(
                                            "registerForm.rePassword"
                                        )}
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
                                            {t("registerForm.registering")}...
                                        </span>
                                    ) : (
                                        t("registerForm.register")
                                    )}
                                </button>

                                <div>
                                    <p>
                                        {t("registerForm.dataUsageInfo")}{" "}
                                        {t("registerForm.dataUsageDetails")}
                                        <strong>
                                            <Link to="#">
                                                {t(
                                                    "registerForm.privacyPolicy"
                                                )}
                                            </Link>
                                        </strong>{" "}
                                    </p>
                                </div>
                                <div>
                                    <span>
                                        {t("registerForm.alreadyHaveAccount")}{" "}
                                        <Link
                                            className="text-danger"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                onOpenLogin();
                                            }}
                                        >
                                            <b>{t("registerForm.login")}</b>
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

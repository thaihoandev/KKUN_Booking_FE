import React, { useState } from "react";
import { changePasswordSchema } from "../../schemas/validationSchemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import * as UserService from "../../services/UserService";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/UserSlide";
import { toast, ToastContainer } from "react-toastify";

const ChangePassword = ({ user }) => {
    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmNewPassword: false,
    });

    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(changePasswordSchema),
        mode: "onChange",
        context: {
            authProvider: user.authProvider,
            hasPassword: user.hasPassword,
        },
    });

    const togglePassword = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const getPasswordLabel = () => {
        if (user.authProvider === "LOCAL") {
            return "Mật khẩu cũ*";
        }
        return user.hasPassword
            ? "Mật khẩu hiện tại*"
            : "Tài khoản chưa có mật khẩu";
    };

    const mutationChangePassword = useMutation(
        async ({ userId, requestBody, accessToken }) => {
            return UserService.changePasswordUser(requestBody, accessToken);
        },
        {
            onSuccess: (data) => {
                toast.success("Mật khẩu đã được thay đổi thành công!");
                reset(); // Reset tất cả các input sau khi đổi mật khẩu thành công
            },
            onError: (error) => {
                toast.error(error.message);
            },
        }
    );

    const onSubmitForm = async (data) => {
        const submitData = {
            oldPassword:
                (user.authProvider === "LOCAL" || user.hasPassword) &&
                data.oldPassword
                    ? data.oldPassword
                    : null,
            newPassword: data.newPassword,
            confirmNewPassword: data.confirmNewPassword,
        };

        try {
            await mutationChangePassword.mutateAsync({
                userId: user.id,
                requestBody: submitData,
                accessToken: user.accessToken,
            });
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div
            className="tab-pane fade"
            id="change-pass"
            role="tabpanel"
            aria-labelledby="change-pass-tab"
        >
            <div className="dashboard-profile-tab-content">
                <div className="profile-tab-content-title">
                    <h6>Thay đổi mật khẩu của bạn</h6>
                </div>
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <div className="row">
                        {(user.authProvider === "LOCAL" ||
                            user.hasPassword) && (
                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>{getPasswordLabel()}</label>
                                    <div style={styles.formInput}>
                                        <input
                                            id="oldPassword"
                                            type={
                                                showPassword.oldPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Nhập mật khẩu cũ"
                                            {...register("oldPassword")}
                                            className={`form-control ${
                                                errors.oldPassword
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                        />
                                        <i
                                            className={`bi ${
                                                showPassword.oldPassword
                                                    ? "bi-eye"
                                                    : "bi-eye-slash"
                                            }`}
                                            style={styles.passwordIcon}
                                            onClick={() =>
                                                togglePassword("oldPassword")
                                            }
                                        ></i>
                                    </div>
                                    {errors.oldPassword && (
                                        <p style={styles.errorMessage}>
                                            {errors.oldPassword.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="col-md-6">
                            <div className="form-inner mb-30">
                                <label>Mật khẩu mới*</label>
                                <div style={styles.formInput}>
                                    <input
                                        id="newPassword"
                                        type={
                                            showPassword.newPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Nhập mật khẩu mới"
                                        {...register("newPassword")}
                                        className={`form-control ${
                                            errors.newPassword
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                    />
                                    <i
                                        className={`bi ${
                                            showPassword.newPassword
                                                ? "bi-eye"
                                                : "bi-eye-slash"
                                        }`}
                                        style={styles.passwordIcon}
                                        onClick={() =>
                                            togglePassword("newPassword")
                                        }
                                    ></i>
                                </div>
                                {errors.newPassword && (
                                    <p style={styles.errorMessage}>
                                        {errors.newPassword.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-inner mb-50">
                                <label>Xác nhận mật khẩu*</label>
                                <div style={styles.formInput}>
                                    <input
                                        id="confirmNewPassword"
                                        type={
                                            showPassword.confirmNewPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Xác nhận mật khẩu mới"
                                        {...register("confirmNewPassword")}
                                        className={`form-control ${
                                            errors.confirmNewPassword
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                    />
                                    <i
                                        className={`bi ${
                                            showPassword.confirmNewPassword
                                                ? "bi-eye"
                                                : "bi-eye-slash"
                                        }`}
                                        style={styles.passwordIcon}
                                        onClick={() =>
                                            togglePassword("confirmNewPassword")
                                        }
                                    ></i>
                                </div>
                                {errors.confirmNewPassword && (
                                    <p style={styles.errorMessage}>
                                        {errors.confirmNewPassword.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="change-password-form-btns">
                        <button type="submit" className="primary-btn3">
                            Lưu thay đổi
                        </button>
                        <button type="button" className="primary-btn3 cancel">
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Inline styles
const styles = {
    formInput: {
        position: "relative",
    },
    passwordIcon: {
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        cursor: "pointer",
        fontSize: "1.2rem",
        color: "#6c757d",
    },
    errorMessage: {
        color: "red",
        fontSize: "0.875rem",
        marginTop: "5px",
    },
};

export default ChangePassword;

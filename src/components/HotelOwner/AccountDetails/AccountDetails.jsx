import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerHotelOwnerSchema } from "../../../schemas/validationSchemas"; // Đảm bảo bạn đã import schema ở đây
import { useSelector } from "react-redux";
import PasswordInput from "../../Login/PasswordInput/PasswordInput";
import useAuth from "../../../hooks/useAuth";

function AccountDetails() {
    const user = useSelector((state) => state.user);
    const { handleRegisterHotelOwner } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            lastName: user.lastName || "",
            firstName: user.firstName || "",
            email: user.email || "",
            phone: user.phone || "",
            password: "",
            rePassword: "",
        },
        resolver: yupResolver(registerHotelOwnerSchema),
    });

    // Khi form submit, gọi handleRegister
    const onSubmit = (data) => {
        handleRegisterHotelOwner(data); // Truyền dữ liệu vào handleRegister
    };

    return (
        <div className="dashboard-profile-tab-content">
            <div className="account-details-tab-content">
                <div className="account-tab-content-title">
                    <h3>Đăng ký tài khoản</h3>
                    <p>Cung cấp thông tin cá nhân của bạn để bắt đầu.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="general-information">
                        <h5>Thông tin cá nhân</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>Họ*</label>
                                    <input
                                        type="text"
                                        {...register("lastName")}
                                        placeholder="Nhập họ..."
                                    />
                                    {errors.lastName && (
                                        <p className="text-danger">
                                            {errors.lastName.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>Tên*</label>
                                    <input
                                        type="text"
                                        {...register("firstName")}
                                        placeholder="Nhập tên..."
                                    />
                                    {errors.firstName && (
                                        <p className="text-danger">
                                            {errors.firstName.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>Email*</label>
                                    <input
                                        type="email"
                                        {...register("email")}
                                        placeholder="Nhập email..."
                                    />
                                    {errors.email && (
                                        <p className="text-danger">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>Số điện thoại*</label>
                                    <input
                                        type="text"
                                        {...register("phone")}
                                        placeholder="Nhập số điện thoại..."
                                    />
                                    {errors.phone && (
                                        <p className="text-danger">
                                            {errors.phone.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="security-information">
                        <h5 className="mb-3">Bảo mật tài khoản</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>Mật khẩu*</label>

                                    <PasswordInput
                                        registration={{
                                            ...register("password"),
                                        }}
                                        placeholder="Mật khẩu*"
                                        error={errors.password}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <label>Xác nhận mật khẩu*</label>
                                    <PasswordInput
                                        registration={{
                                            ...register("rePassword"),
                                        }}
                                        placeholder="Nhập lại mật khẩu*"
                                        error={errors.rePassword}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="primary-btn3">
                        Đăng ký
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AccountDetails;

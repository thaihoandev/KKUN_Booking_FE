import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import { jwtDecode } from "jwt-decode";
import * as UserService from "../../services/UserService";
import { updateUser } from "../../store/UserSlide";
import { useGoogleLogin } from "@react-oauth/google";

function Login({ isLoginOpen, setIsLoginOpen }) {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [typeUser, setTypeUser] = useState("customer");
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoginOpen || isRegisterOpen) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
    }, [isLoginOpen, isRegisterOpen]);

    const handleCloseModals = () => {
        setIsLoginOpen(false);
        setIsRegisterOpen(false);
    };

    const clearLoginRegisterData = () => {
        setLastName("");
        setFirstName("");
        setEmail("");
        setPassword("");
        setRePassword("");
        setShowPassword(false);
        setShowRePassword(false);
    };

    const handleOpenLogin = () => {
        setIsLoginOpen(true);
        setIsRegisterOpen(false);
        clearLoginRegisterData();
    };

    const handleOpenRegister = () => {
        setIsRegisterOpen(true);
        setIsLoginOpen(false);
        clearLoginRegisterData();
    };
    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword); // Chuyển trạng thái ẩn/hiện mật khẩu
    };
    const toggleShowRePassword = () => {
        setShowRePassword((prevShowRePassword) => !prevShowRePassword); // Chuyển trạng thái ẩn/hiện mật khẩu
    };
    const mutationLogin = useMutation((loginData) => {
        return UserService.loginUser(loginData);
    });
    const mutationRegister = useMutation((registerData) => {
        return UserService.signupUser(registerData);
    });
    const mutationLoginGoogle = useMutation((loginGoogleData) => {
        return UserService.loginGoogleUser(loginGoogleData);
    });
    const loginGoogle = useGoogleLogin({
        onSuccess: (credentialResponse) => {
            const accessToken = credentialResponse.access_token; // Sử dụng 'credential' thay vì 'access_token'

            const loginGoogleData = {
                accessToken: accessToken, // Sử dụng 'idToken' (Google's credential)
            };

            // Gọi mutation để gửi token đến backend
            mutationLoginGoogle.mutate(loginGoogleData, {
                onSuccess: (response) => {
                    const { accessToken } = response;
                    if (accessToken) {
                        localStorage.setItem("access_token", accessToken);
                        const decoded = jwtDecode(accessToken);
                        dispatch(
                            updateUser({
                                email: decoded.sub,
                                _id: decoded.userId,
                                role: decoded.role,
                                access_token: accessToken,
                                firstName: decoded.firstName,
                                lastName: decoded.lastName,
                            })
                        );
                        clearLoginRegisterData();
                        handleCloseModals();
                        navigate("/");
                    }
                },
                onError: (error) => {
                    console.error("Login failed:", error);
                },
            });
        },
        onError: () => {
            console.error("Login Failed");
        },
    });

    const handleLoginGoogle = (e) => {
        e.preventDefault(); // Ngăn hành vi mặc định của liên kết
        loginGoogle(); // Gọi quá trình đăng nhập Google
    };
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log("info", email, password);
        handleLogin(email, password);
    };
    const handleLogin = (email, password) => {
        mutationLogin.mutate(
            {
                email,
                password,
            },
            {
                onSuccess: (response) => {
                    console.log("login", response);
                    const { accessToken } = response;
                    if (accessToken) {
                        localStorage.setItem("access_token", accessToken);
                        const decoded = jwtDecode(accessToken);
                        dispatch(
                            updateUser({
                                email: decoded.sub,
                                _id: decoded.userId,
                                role: decoded.role,
                                access_token: accessToken,
                                firstName: decoded.firstName,
                                lastName: decoded.lastName,
                            })
                        );
                        clearLoginRegisterData();
                        handleCloseModals();
                        navigate("/");
                    }
                },
                onError: (error) => {
                    console.error("Login failed:", error);
                },
            }
        );
    };

    const handleRegister = (e) => {
        e.preventDefault();
        mutationRegister.mutate(
            {
                type: typeUser,
                firstName,
                lastName,
                email,
                password,
                rePassword,
            },
            {
                onSuccess: (response) => {
                    if (response && response.id) {
                        // Tự động đăng nhập sau khi đăng ký thành công
                        handleLogin(email, password); // Gọi hàm login với email và password vừa đăng ký
                    } else {
                        console.error("Đăng ký thất bại");
                    }
                },
                onError: (error) => {
                    console.error("Đăng ký thất bại", error);
                },
            }
        );
    };

    return (
        <>
            {/* Modal Đăng Nhập */}
            {isLoginOpen && (
                <div
                    className="modal login-modal fade show"
                    style={{
                        display: "block",
                        background: "rgba(0, 0, 0, 0.5)",
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div
                                className="modal-clode-btn"
                                aria-label="Close"
                                onClick={handleCloseModals}
                            ></div>
                            <div className="modal-header">
                                <img
                                    src="assets/img/home1/login-modal-header-img.jpg"
                                    alt="Login Modal Header"
                                />
                            </div>
                            <div className="modal-body">
                                <div className="login-registration-form">
                                    <div className="form-title">
                                        <h2>Đăng nhập để tiếp tục</h2>
                                        <p>Nhập địa chỉ Email để đăng nhập.</p>
                                    </div>
                                    <form onSubmit={handleLoginSubmit}>
                                        <div className="form-inner mb-20">
                                            <input
                                                type="text"
                                                placeholder="Địa chỉ email*"
                                                className="form-control"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                            <div
                                                className="password-input-container mt-4"
                                                style={{ position: "relative" }}
                                            >
                                                <input
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    } // Đổi type giữa text và password
                                                    placeholder="Mật khẩu*"
                                                    className="form-control"
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <span
                                                    className="password-toggle-icon"
                                                    onClick={toggleShowPassword}
                                                    style={{
                                                        position: "absolute",
                                                        top: "50%",
                                                        right: "10px",
                                                        cursor: "pointer",
                                                        transform:
                                                            "translateY(-50%)",
                                                    }}
                                                >
                                                    {showPassword ? (
                                                        <i className="bi bi-eye-slash-fill"></i> // Icon khi mật khẩu đang hiển thị
                                                    ) : (
                                                        <i className="bi bi-eye-fill"></i> // Icon khi mật khẩu bị ẩn
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="login-btn mb-25"
                                        >
                                            Đăng nhập
                                        </button>
                                        <div>
                                            <span>
                                                Chưa có tài khoản?{" "}
                                                <Link
                                                    className="text-danger"
                                                    onClick={handleOpenRegister}
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
                                            onClick={handleLoginGoogle}
                                        >
                                            <div className="icon">
                                                <img
                                                    src="assets/img/home1/icon/google-icon.svg"
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
            )}

            {/* Modal Đăng Ký */}
            {isRegisterOpen && (
                <div
                    className="modal login-modal fade show"
                    style={{
                        display: "block",
                        background: "rgba(0, 0, 0, 0.5)",
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div
                                className="modal-clode-btn"
                                aria-label="Close"
                                onClick={handleCloseModals}
                            ></div>
                            <div className="modal-header">
                                <img
                                    src="assets/img/home1/login-modal-header-img.jpg"
                                    alt="Register Modal Header"
                                />
                            </div>
                            <div className="modal-body">
                                <div className="login-registration-form">
                                    <div className="form-title">
                                        <h2>Tạo tài khoản mới</h2>
                                        <p>
                                            Nhập thông tin tài khoản để đăng ký.
                                        </p>
                                    </div>
                                    <form onSubmit={handleRegister}>
                                        <div className="form-inner mb-20">
                                            <input
                                                type="text"
                                                placeholder="Tên*"
                                                className="form-control"
                                                value={firstName}
                                                onChange={(e) =>
                                                    setFirstName(e.target.value)
                                                }
                                            />
                                            <input
                                                type="text"
                                                placeholder="Họ*"
                                                className="form-control mt-4"
                                                value={lastName}
                                                onChange={(e) =>
                                                    setLastName(e.target.value)
                                                }
                                            />
                                            <input
                                                type="text"
                                                placeholder="Địa chỉ email*"
                                                className="form-control mt-4"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                            <div
                                                className="password-input-container mt-4"
                                                style={{ position: "relative" }}
                                            >
                                                <input
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    } // Đổi type giữa text và password
                                                    placeholder="Mật khẩu*"
                                                    className="form-control"
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <span
                                                    className="password-toggle-icon"
                                                    onClick={toggleShowPassword}
                                                    style={{
                                                        position: "absolute",
                                                        top: "50%",
                                                        right: "10px",
                                                        cursor: "pointer",
                                                        transform:
                                                            "translateY(-50%)",
                                                    }}
                                                >
                                                    {showPassword ? (
                                                        <i className="bi bi-eye-slash-fill"></i> // Icon khi mật khẩu đang hiển thị
                                                    ) : (
                                                        <i className="bi bi-eye-fill"></i> // Icon khi mật khẩu bị ẩn
                                                    )}
                                                </span>
                                            </div>
                                            <div
                                                className="re-password-input-container mt-4"
                                                style={{ position: "relative" }}
                                            >
                                                <input
                                                    type={
                                                        showRePassword
                                                            ? "text"
                                                            : "password"
                                                    } // Đổi type giữa text và password
                                                    placeholder="Mật khẩu*"
                                                    className="form-control"
                                                    value={rePassword}
                                                    onChange={(e) =>
                                                        setRePassword(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <span
                                                    className="re-password-toggle-icon"
                                                    onClick={
                                                        toggleShowRePassword
                                                    }
                                                    style={{
                                                        position: "absolute",
                                                        top: "50%",
                                                        right: "10px",
                                                        cursor: "pointer",
                                                        transform:
                                                            "translateY(-50%)",
                                                    }}
                                                >
                                                    {showRePassword ? (
                                                        <i className="bi bi-eye-slash-fill"></i> // Icon khi mật khẩu đang hiển thị
                                                    ) : (
                                                        <i className="bi bi-eye-fill"></i> // Icon khi mật khẩu bị ẩn
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="login-btn mb-25"
                                        >
                                            Đăng ký
                                        </button>
                                        <div>
                                            <p>
                                                Dữ liệu của bạn sẽ được dùng cho
                                                việc hỗ trợ trải nghiệm khi sử
                                                dụng website, để quản lý tài
                                                khoản của bạn, và cho các mục
                                                đích khác được mô tả trong{" "}
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
                                                    onClick={handleOpenLogin}
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
            )}
        </>
    );
}

export default Login;

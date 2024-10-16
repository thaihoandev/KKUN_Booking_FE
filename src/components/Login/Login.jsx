import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Login() {
    const loginModalRef = useRef(null); // Tham chiếu đến modal đăng nhập
    const registerModalRef = useRef(null); // Tham chiếu đến modal đăng ký

    useEffect(() => {
        // Khởi tạo instance của modals chỉ một lần
        const loginModal = new window.bootstrap.Modal(loginModalRef.current);
        const registerModal = new window.bootstrap.Modal(
            registerModalRef.current
        );

        // Gắn instance của modals vào refs để sử dụng trong các hàm
        loginModalRef.current.instance = loginModal;
        registerModalRef.current.instance = registerModal;
    }, []);

    const handleOpenRegister = () => {
        // Đóng modal đăng nhập và mở modal đăng ký
        loginModalRef.current.instance.hide();
        registerModalRef.current.instance.show();
    };

    const handleOpenLogin = () => {
        // Đóng modal đăng ký và mở modal đăng nhập
        registerModalRef.current.instance.hide();
        loginModalRef.current.instance.show();
    };

    return (
        <>
            <div
                className="modal login-modal"
                id="user-login"
                tabIndex="-1"
                aria-hidden="true"
                data-bs-keyboard="false"
                ref={loginModalRef}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div
                            className="modal-clode-btn"
                            data-bs-dismiss="modal"
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
                                <form>
                                    <div className="form-inner mb-20">
                                        <input
                                            type="text"
                                            placeholder="Địa chỉ email*"
                                            className="form-control"
                                        />
                                        <input
                                            type="password"
                                            placeholder="Mật khẩu*"
                                            className="form-control mt-4"
                                        />
                                    </div>
                                    <a href="#" className="login-btn mb-25">
                                        Đăng nhập
                                    </a>
                                    <div>
                                        <span>
                                            Chưa có tài khoản?{" "}
                                            <a
                                                href="#"
                                                className="text-danger"
                                                onClick={handleOpenRegister}
                                            >
                                                <b>Đăng ký</b>
                                            </a>
                                        </span>
                                    </div>
                                    <div className="divider">
                                        <span>hoặc</span>
                                    </div>
                                    <a href="#" className="google-login-btn">
                                        <div className="icon">
                                            <img
                                                src="assets/img/home1/icon/google-icon.svg"
                                                alt="Google Icon"
                                            />
                                        </div>
                                        Đăng nhập bằng Google
                                    </a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Đăng Ký */}
            <div
                className="modal login-modal"
                id="user-register"
                tabIndex="-1"
                aria-hidden="true"
                data-bs-keyboard="false"
                ref={registerModalRef}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div
                            className="modal-clode-btn"
                            data-bs-dismiss="modal"
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
                                    <h2>Tạo tài khoản mới</h2>
                                    <p>Nhập thông tin tài khoản để đăng ký.</p>
                                </div>
                                <form>
                                    <div className="form-inner mb-20">
                                        <input
                                            type="text"
                                            placeholder="Địa chỉ email*"
                                            className="form-control"
                                        />
                                        <input
                                            type="password"
                                            placeholder="Mật khẩu*"
                                            className="form-control mt-4"
                                        />
                                        <input
                                            type="password"
                                            placeholder="Nhập lại mật khẩu*"
                                            className="form-control mt-4"
                                        />
                                    </div>
                                    <a href="#" className="login-btn mb-25">
                                        Đăng ký
                                    </a>
                                    <div>
                                        <p>
                                            Dữ liệu của bạn sẽ được dùng cho
                                            việc hỗ trợ trải nghiệm khi sử dụng
                                            website, để quản lý tài khoản của
                                            bạn, và cho các mục đích khác được
                                            mô tả trong{" "}
                                            <strong>
                                                <Link to={`#`}>
                                                    chính sách bảo mật
                                                </Link>
                                            </strong>{" "}
                                            của chúng tôi.
                                        </p>
                                    </div>
                                    <div>
                                        <span>
                                            Đã có tài khoản?{" "}
                                            <a
                                                href="#"
                                                className="text-danger"
                                                onClick={handleOpenLogin}
                                            >
                                                <b>Đăng nhập</b>
                                            </a>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;

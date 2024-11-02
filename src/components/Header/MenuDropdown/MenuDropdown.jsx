import { Button } from "bootstrap";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const MenuDropdown = ({
    handleOpenLogin,
    handleOpenRegister,
    user,
    handleLogout,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState("VI");
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const handleToggleMenu = (e) => {
        e.preventDefault();
        setIsOpen((prev) => !prev);
    };

    const handleCloseMenu = () => {
        setIsOpen(false);
    };

    const handleOpenRegisterHotelOwner = () => {
        handleCloseMenu();
        navigate("/sign-up/hotel-owner");
    };

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "VI" ? "EN" : "VI"));
        handleCloseMenu();
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            handleCloseMenu();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div style={{ position: "relative" }} ref={dropdownRef}>
            <Link
                onClick={handleToggleMenu}
                className="btn"
                style={{ textDecoration: "none !important" }}
            >
                <i
                    className="bi bi-list"
                    style={{
                        fontSize: "32px",
                        color: "#100C08",
                    }}
                ></i>
            </Link>

            {isOpen && (
                <div style={dropdownStyle}>
                    {/* Kiểm tra nếu user.email tồn tại */}
                    <button
                        className="language-btn"
                        onClick={toggleLanguage}
                        style={{
                            ...dropdownItemStyle,
                            display: "flex",
                            margin: "0 0 0 0",
                            alignItems: "center",
                            gap: "8px",
                            width: "100%",
                            border: "none",
                            background: "none",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <i
                            className="bi bi-globe2"
                            style={{ fontSize: "18px" }}
                        ></i>
                        <span>
                            {language === "VI" ? "Tiếng Việt" : "English"}
                        </span>
                        <i
                            className="bi bi-chevron-down"
                            style={{ marginLeft: "auto" }}
                        ></i>
                    </button>
                    {user.email ? (
                        <>
                            <Link
                                className="profile-btn btn"
                                to="/customer/profile"
                                onClick={handleCloseMenu}
                                style={{
                                    ...dropdownItemStyle,
                                    transition: "all 0.3s ease",
                                }}
                            >
                                {language === "VI"
                                    ? "Trang cá nhân"
                                    : "Profile"}
                            </Link>
                            <Link
                                className="booked-btn btn"
                                to="/customer/booked"
                                onClick={handleCloseMenu}
                                style={{
                                    ...dropdownItemStyle,
                                    transition: "all 0.3s ease",
                                }}
                            >
                                {language === "VI" ? "Đơn đặt" : "Booked"}
                            </Link>
                            <hr className="m-0" />
                            <Link
                                className="logout-btn btn mt-3"
                                onClick={() => {
                                    handleLogout();
                                    handleCloseMenu();
                                }}
                                style={{
                                    ...dropdownItemStyle,
                                    backgroundColor: "#dc3545",
                                    color: "white",
                                    border: "none",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                {language === "VI" ? "Đăng xuất" : "Logout"}
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                className="login-btn btn"
                                onClick={() => {
                                    handleOpenLogin();
                                    handleCloseMenu();
                                }}
                                style={{
                                    ...dropdownItemStyle,
                                    transition: "all 0.3s ease",
                                }}
                            >
                                {language === "VI" ? "Đăng nhập" : "Login"}
                            </Link>

                            <Link
                                className="register-btn btn"
                                onClick={() => {
                                    handleOpenRegister();
                                    handleCloseMenu();
                                }}
                                style={{
                                    ...dropdownItemStyle,
                                    transition: "all 0.3s ease",
                                    backgroundColor: "red",
                                    color: "white",
                                }}
                            >
                                {language === "VI" ? "Đăng ký" : "Register"}
                            </Link>

                            <span style={dropdownHeaderStyle}>
                                {language === "VI"
                                    ? "ĐĂNG KÝ CƠ SỞ LƯU TRÚ CỦA QUÝ KHÁCH TRÊN KKUNBOOKING"
                                    : "REGISTER YOUR PROPERTY ON KKUNBOOKING"}
                            </span>

                            <Link
                                to={`/sign-up/hotel-owner`}
                                className="hotel-register-btn"
                                onClick={handleOpenRegisterHotelOwner}
                                style={{
                                    ...dropdownItemStyle,
                                    margin: "0px 10px",
                                    display: "flex",
                                    transition: "all 0.3s ease",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <span className="mx-2 w-100 text-center">
                                    {language === "VI"
                                        ? "Đăng ký cho thuê nhà"
                                        : "Register your property"}
                                </span>
                            </Link>
                        </>
                    )}
                </div>
            )}

            <style>
                {`
                    .language-btn:hover {
                        background-color: #f1f1f1 !important;
                        color: #63ab45 !important;
                    }

                    .login-btn {
                        border: 1px solid #63ab45 !important;
                        transition: all 0.3s ease !important;
                        color: #63ab45 !important;
                    }

                    .login-btn:hover {
                        border-radius: 4px;
                        background-color: #63ab45 !important;
                        color: #fff !important;
                    }

                    .register-btn {
                        transition: all 0.3s ease !important;
                    }

                    .register-btn:hover {
                        opacity: 0.8 !important;
                        border-radius: 4px;
                    }

                    .hotel-register-btn:hover {
                        text-decoration: underline !important;
                        color: #63ab45 !important;
                    }
                    .profile-btn {
                        border: 1px solid transparent !important;
                        border-radius: 4px;
                    }
                    .profile-btn:hover {
                        border: 1px solid #63ab45 !important;
                        border-radius: 4px;
                        transition: all 0.3s ease !important;
                        color: #63ab45 !important;
                    }
                    .booked-btn {
                        border: 1px solid transparent !important;
                        border-radius: 4px;
                    }
                    .booked-btn:hover {
                        border: 1px solid #63ab45 !important;
                        border-radius: 4px;
                        transition: all 0.3s ease !important;
                        color: #63ab45 !important;
                    }
                    .logout-btn:hover {
                        opacity: 0.8;
                    }
                `}
            </style>
        </div>
    );
};

const dropdownStyle = {
    position: "absolute",
    top: "100%",
    left: "0",
    width: "260px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #ddd",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    zIndex: 1000,
    borderRadius: "4px",
    padding: "10px 0",
};

const dropdownItemStyle = {
    display: "block",
    padding: "10px 20px",
    margin: "4px 10px",
    textDecoration: "none",
    color: "#343a40",
    lineHeight: 1.5,
    fontWeight: "500",
    cursor: "pointer",
};

const dropdownHeaderStyle = {
    lineHeight: 1.4,
    padding: "14px 12px",
    backgroundColor: "#e9ecef",
    fontWeight: "bold",
    fontSize: "14px",
    textAlign: "center",
    display: "block",
};

export default MenuDropdown;

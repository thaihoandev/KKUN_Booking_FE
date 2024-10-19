import { Button } from "bootstrap";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const MenuDropdown = ({ handleOpenLogin, handleOpenRegister }) => {
    const [isOpen, setIsOpen] = useState(false);
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
        handleCloseMenu(); // Close dropdown first
        navigate("/hotel-owner/sign-up"); // Then navigate
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
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: "0",
                        width: "260px",
                        backgroundColor: "white",
                        border: "1px solid #ddd",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        zIndex: 1000,
                        borderRadius: "4px",
                    }}
                >
                    <Link
                        className="btn"
                        to="/profile"
                        onClick={handleCloseMenu}
                        style={dropdownItemStyle}
                    >
                        Trang cá nhân
                    </Link>
                    <Link
                        className="btn"
                        onClick={() => {
                            handleOpenLogin(); // Ensure this function exists
                            handleCloseMenu(); // Close dropdown first
                        }}
                        style={dropdownItemStyle}
                    >
                        Đăng nhập
                    </Link>
                    <Link
                        className="btn"
                        onClick={() => {
                            handleOpenRegister(); // Ensure this function exists
                            handleCloseMenu(); // Close dropdown first
                        }}
                        style={dropdownItemStyle}
                    >
                        Đăng ký
                    </Link>
                    <hr />
                    <span className="d-flex justify-content-center align-items-center">
                        ĐĂNG KÝ CƠ SỞ LƯU TRÚ CỦA QUÝ KHÁCH TRÊN KKUNBOOKING
                    </span>
                    <hr />
                    <Link
                        onClick={handleOpenRegisterHotelOwner} // Use the simplified handler
                        style={dropdownItemStyle}
                    >
                        Đăng ký cho thuê nhà
                    </Link>
                </div>
            )}
        </div>
    );
};

// Common style for dropdown items
const dropdownItemStyle = {
    display: "block",
    margin: "10px 20px",
    textDecoration: "none",
    color: "black",
};

export default MenuDropdown;

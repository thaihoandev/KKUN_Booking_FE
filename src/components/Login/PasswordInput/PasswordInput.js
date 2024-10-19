import React, { useState } from "react";

function PasswordInput({ placeholder, error, registration }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="form-group mt-4">
            <div
                className="password-input-container"
                style={{ position: "relative" }}
            >
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    className={`form-control ${error ? "is-invalid" : ""}`}
                    {...registration}
                    style={{
                        paddingRight: "58px", // Tăng padding bên phải để chứa cả 2 icon
                    }}
                />
                <span
                    className="password-toggle-icon"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        paddingRight: "25px", // Tăng padding bên phải để chứa cả 2 icon
                        cursor: "pointer",
                        transform: "translateY(-50%)",
                    }}
                >
                    {showPassword ? (
                        <i className="bi bi-eye-slash-fill"></i>
                    ) : (
                        <i className="bi bi-eye-fill"></i>
                    )}
                </span>
            </div>
            {error && (
                <div className="invalid-feedback" style={{ display: "block" }}>
                    {error.message}
                </div>
            )}
        </div>
    );
}

export default PasswordInput;

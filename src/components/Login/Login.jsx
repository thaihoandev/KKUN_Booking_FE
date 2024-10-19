// Login.js
import React, { useState } from "react";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loading/Loading";
function Login({
    isLoginOpen,
    setIsLoginOpen,
    isRegisterOpen,
    setIsRegisterOpen,
}) {
    const { handleLogin, handleRegister, handleLoginGoogle, isLoading, error } =
        useAuth({
            onLoginSuccess: () => {
                handleCloseModals();
            }, // Close modal on success
        });

    const handleCloseModals = () => {
        setIsLoginOpen(false);
        setIsRegisterOpen(false);
    };

    const handleOpenLogin = () => {
        setIsLoginOpen(true);
        setIsRegisterOpen(false);
    };

    const handleOpenRegister = () => {
        setIsRegisterOpen(true);
        setIsLoginOpen(false);
    };

    return (
        <>
            {isLoading && <Loading></Loading>}

            {isLoginOpen && (
                <LoginForm
                    onClose={handleCloseModals}
                    onSubmit={handleLogin}
                    onOpenRegister={handleOpenRegister}
                    onGoogleLogin={handleLoginGoogle}
                />
            )}
            {isRegisterOpen && (
                <RegisterForm
                    onClose={handleCloseModals}
                    onSubmit={handleRegister}
                    onOpenLogin={handleOpenLogin}
                />
            )}
        </>
    );
}

export default Login;

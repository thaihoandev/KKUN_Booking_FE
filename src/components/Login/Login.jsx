import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    closeLoginModal,
    closeRegisterModal,
    openLoginModal,
    openRegisterModal,
} from "../../store/UserSlide";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loading/Loading";

function Login() {
    const dispatch = useDispatch();
    const { isLoginOpen, isRegisterOpen } = useSelector((state) => ({
        isLoginOpen: state.user.isLoginOpen,
        isRegisterOpen: state.user.isRegisterOpen,
    }));

    const { handleLogin, handleRegister, handleLoginGoogle, isLoading, error } =
        useAuth({
            onLoginSuccess: () => {
                handleCloseModals();
            },
        });

    const handleCloseModals = () => {
        dispatch(closeLoginModal());
        dispatch(closeRegisterModal());
    };

    const handleOpenLogin = () => {
        dispatch(openLoginModal());
    };

    const handleOpenRegister = () => {
        dispatch(openRegisterModal());
    };

    return (
        <>
            {isLoading && <Loading />}

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

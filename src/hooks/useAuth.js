import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useMutation } from "react-query";
import { useGoogleLogin } from "@react-oauth/google";
import * as UserService from "../services/UserService";
import { updateUser, resetUser } from "../store/UserSlide";
import { toast } from "react-toastify";
import { resetBookingDate } from "../store/BookingSlide";

function useAuth({ onLoginSuccess } = {}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const mutationUserDetails = useMutation(
        (userId) => UserService.getDetailsUser(userId),
        {
            onSuccess: (data) => {
                dispatch(
                    updateUser({
                        phone: data.phone,
                        address: data.address,
                        avatar: data.avatar,
                        authProvider: data.authProvider,
                        hasPassword: data.hasPassword,
                    })
                );
            },
            onError: (error) => {
                toast.error("Lỗi khi lấy thông tin người dùng");
            },
        }
    );

    const handleLoginSuccess = (response) => {
        const { accessToken, refreshToken } = response;
        console.log("login", response);
        // Lưu tokens
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // Decode và lưu thông tin user
        const decoded = jwtDecode(accessToken);
        dispatch(
            updateUser({
                email: decoded.sub,
                _id: decoded.userId,
                role: decoded.role,
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                accessToken,
                refreshToken,
            })
        );

        // Lấy thêm thông tin user
        mutationUserDetails.mutate(decoded.userId);

        // Điều hướng dựa trên role
        if (decoded.role === "ADMIN") {
            navigate("/admin");
        } else if (decoded.role === "HOTELOWNER") {
            navigate("/hotelowner");
        } else {
            navigate("/");
        }

        if (onLoginSuccess) {
            onLoginSuccess();
        }
    };

    const mutationLogin = useMutation(UserService.loginUser, {
        onSuccess: handleLoginSuccess,
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const mutationRegister = useMutation(UserService.signupUser, {
        onSuccess: (response, variables) => {
            toast.success("Đăng ký thành công!");
            handleLogin({
                email: variables.email,
                password: variables.password,
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const mutationLoginGoogle = useMutation(UserService.loginGoogleUser, {
        onSuccess: handleLoginSuccess,
        onError: (error) => {
            toast.error("Đăng nhập Google thất bại");
        },
    });

    const handleLogout = async () => {
        try {
            await UserService.logoutUser();
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch(resetBookingDate());

            dispatch(resetUser());
            navigate("/");
            toast.success("Đăng xuất thành công!");
        } catch (error) {
            toast.error("Đăng xuất thất bại");
        }
    };

    const handleLogin = (data) => {
        mutationLogin.mutate(data);
    };

    const handleRegister = (data) => {
        const registerData = {
            ...data,
            type: "customer",
        };
        mutationRegister.mutate(registerData);
    };

    const loginGoogle = useGoogleLogin({
        onSuccess: (credentialResponse) => {
            const accessToken = credentialResponse.access_token;
            mutationLoginGoogle.mutate({ accessToken });
        },
        onError: () => {
            toast.error("Đăng nhập Google thất bại");
        },
    });

    const handleLoginGoogle = (e) => {
        e.preventDefault();
        loginGoogle();
    };

    return {
        handleLogin,
        handleRegister,
        handleLoginGoogle,
        handleLogout,
        isLoading:
            mutationLogin.isLoading ||
            mutationRegister.isLoading ||
            mutationLoginGoogle.isLoading,
        error:
            mutationLogin.error ||
            mutationRegister.error ||
            mutationLoginGoogle.error,
    };
}

export default useAuth;

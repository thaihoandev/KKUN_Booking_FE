import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Fix import as 'jwtDecode' is the default export.
import { useMutation } from "react-query";
import { useGoogleLogin } from "@react-oauth/google";
import * as UserService from "../services/UserService";
import { updateUser } from "../store/UserSlide";

function useAuth({ onLoginSuccess } = {}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Helper function to store accessToken and dispatch user data
    const handleLoginSuccess = (accessToken) => {
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
        if (decoded.role == "ADMIN") {
            navigate("/admin"); // Navigate after successful login
        } else if (decoded.role == "HOTELOWNER") {
            navigate("/hotelowner"); // Navigate after successful login
        } else {
            navigate("/"); // Navigate after successful login
        }
        // Close modal after successful login
        if (onLoginSuccess) {
            onLoginSuccess();
        }
    };

    // Login mutation
    const mutationLogin = useMutation(UserService.loginUser, {
        onSuccess: (response) => {
            const { accessToken } = response;
            if (accessToken) {
                handleLoginSuccess(accessToken); // Reuse login success handler
            }
        },
        onError: (error) => {
            console.error("Login failed:", error);
        },
    });

    // Register mutation, automatically log in the user on successful registration
    const mutationRegister = useMutation(UserService.signupUser, {
        onSuccess: (response, variables) => {
            if (response && response.id) {
                // Auto login after successful registration
                handleLogin({
                    email: variables.email,
                    password: variables.password,
                });
            }
        },
        onError: (error) => {
            console.error("Registration failed:", error);
        },
    });

    // Google login mutation
    const mutationLoginGoogle = useMutation(UserService.loginGoogleUser, {
        onSuccess: (response) => {
            const { accessToken } = response;
            if (accessToken) {
                handleLoginSuccess(accessToken); // Reuse login success handler
            }
        },
        onError: (error) => {
            console.error("Google login failed:", error);
        },
    });

    // Handle regular login
    const handleLogin = (data) => {
        mutationLogin.mutate(data);
    };

    // Handle registration
    const handleRegister = (data) => {
        console.log("Register data before mutation:", data); // Thêm log này
        const registerData = {
            ...data,
            type: "customer",
        };
        console.log("Register data after format:", registerData); // Thêm log này
        mutationRegister.mutate(registerData);
    };

    // Google login
    const loginGoogle = useGoogleLogin({
        onSuccess: (credentialResponse) => {
            const accessToken = credentialResponse.access_token;
            const loginGoogleData = { accessToken };
            mutationLoginGoogle.mutate(loginGoogleData);
        },
        onError: () => {
            console.error("Google Login Failed");
        },
    });

    // Trigger Google login on button click
    const handleLoginGoogle = (e) => {
        e.preventDefault();
        loginGoogle();
    };

    return {
        handleLogin,
        handleRegister,
        handleLoginGoogle,
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

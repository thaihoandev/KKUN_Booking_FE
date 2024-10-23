import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Header from "../components/Header/Header";

const ProtectedRoute = ({ children, requiredRole }) => {
    const user = useSelector((state) => state.user);

    // Kiểm tra nếu user không tồn tại hoặc không có quyền phù hợp
    if (!user || !user.role || user.role !== requiredRole) {
        // Điều hướng người dùng đến trang đăng nhập hoặc trang lỗi
        return (
            <>
                <Header></Header>
                <ErrorPage
                    error={"404"}
                    message={"Không tìm thấy trang này!"}
                />
            </>
        );
    }

    // Nếu user có quyền phù hợp, render component con
    return children;
};

export default ProtectedRoute;

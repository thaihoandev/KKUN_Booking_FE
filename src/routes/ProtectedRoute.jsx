import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Header from "../components/Header/Header";

const ProtectedRoute = ({ children, requiredRole }) => {
    const user = useSelector((state) => state.user);

    // Nếu có yêu cầu về vai trò cụ thể nhưng người dùng không có quyền phù hợp
    if (requiredRole && (!user || user.role !== requiredRole)) {
        return (
            <>
                <Header />
                <ErrorPage
                    error="403"
                    message="Bạn không có quyền truy cập trang này!"
                />
            </>
        );
    }

    // Cho phép truy cập nếu không có yêu cầu về vai trò hoặc người dùng có quyền phù hợp
    return children;
};

export default ProtectedRoute;

import React from "react";
import ErrorPage from "../ErrorPage/ErrorPage";


function NotFoundPage() {
    return (
        <>
            <ErrorPage error="404" message="Không tìm thấy trang này!" />
        </>
    );
}

export default NotFoundPage;



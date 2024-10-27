import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import * as BookingService from "../../services/BookingService";

function PaymentCallback() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const mutationPaymentCallback = useMutation(
        (queryParams) =>
            BookingService.handlePaymentCallback(user.accessToken, queryParams),
        {
            onSuccess: (data) => {
                // Điều hướng dựa trên trạng thái thanh toán trả về từ backend
                if (data.status === "COMPLETED") {
                    navigate("/bookings/booking-success");
                } else {
                    navigate("/bookings/booking-failure");
                }
            },
            onError: (error) => {
                console.error("Lỗi khi kiểm tra thanh toán:", error);
                navigate("/bookings/booking-failure");
            },
        }
    );

    useEffect(() => {
        // Lấy các tham số từ URL
        const queryParams = Object.fromEntries(
            new URLSearchParams(location.search).entries()
        );

        // Gọi mutation với queryParams
        mutationPaymentCallback.mutate(queryParams);
    }, []); // Chỉ chạy một lần khi component được mount

    return <p>Đang xử lý thanh toán, vui lòng đợi...</p>;
}

export default PaymentCallback;

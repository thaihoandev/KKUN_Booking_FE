import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import * as BookingService from "../../services/BookingService";
import { useTranslation } from "react-i18next";
import { Spinner } from "react-bootstrap";

function PaymentCallback() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(true); // State to manage loading

    const mutationPaymentCallback = useMutation(
        (queryParams) =>
            BookingService.handlePaymentCallback(user.accessToken, queryParams),
        {
            onSuccess: (data) => {
                // Tạo độ trễ 2 giây (2000ms) trước khi điều hướng
                setTimeout(() => {
                    // Điều hướng dựa trên trạng thái thanh toán trả về từ backend
                    if (data.status === "COMPLETED" || data.code === 200) {
                        navigate("/bookings/booking-success");
                    } else {
                        navigate("/bookings/booking-failure");
                    }
                    setIsLoading(false); // Dừng loading sau khi điều hướng
                }, 2000); // Độ trễ 2 giây
            },
            onError: (error) => {
                // Tạo độ trễ 2 giây (2000ms) trước khi điều hướng
                setTimeout(() => {
                    console.error("Lỗi khi kiểm tra thanh toán:", error);
                    navigate("/bookings/booking-failure");
                    setIsLoading(false); // Dừng loading sau khi điều hướng
                }, 2000); // Độ trễ 2 giây
            },
        }
    );

    useEffect(() => {
        // Lấy các tham số từ URL
        const queryParams = Object.fromEntries(
            new URLSearchParams(location.search).entries()
        );
        console.log("queryParams", queryParams);

        // Gọi mutation với queryParams
        mutationPaymentCallback.mutate(queryParams);
    }, []); // Chỉ chạy một lần khi component mount

    return (
        <div
            className="payment-callback text-center d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
        >
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center">
                    <Spinner animation="border" variant="primary" />
                    <p className="px-3">{t("paymentProcess")}</p>
                </div>
            ) : null}
        </div>
    );
}

export default PaymentCallback;

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import * as HotelService from "../../../services/HotelService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ConfirmationRegisterHotelOwner({
    hotelDetails,
    location,
    roomDetails,
}) {
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const mutationCreateHotelAndRooms = useMutation(
        ({ formData, accessToken }) =>
            HotelService.createHotelAndRooms(formData, accessToken),
        {
            onMutate: () => {
                setLoading(true);
                toast.info("Đang xử lý đăng ký khách sạn...");
            },
            onSuccess: () => {
                setLoading(false);
                toast.success("Tạo khách sạn thành công!");
                navigate("/hotelowner/my-hotel");
            },
            onError: (error) => {
                setLoading(false);
                toast.error(error.message || "Có lỗi xảy ra");
            },
        }
    );

    const handleRegisterHotel = () => {
        const formData = new FormData();

        const hotelDto = {
            name: hotelDetails.name,
            category: hotelDetails.category,
            description: hotelDetails.description,
            location: location,
            paymentPolicy: hotelDetails.paymentPolicy,
            freeCancellation: hotelDetails.freeCancellation,
            breakfastIncluded: hotelDetails.breakfastIncluded,
            prePayment: hotelDetails.prePayment,
            rooms: [
                {
                    area: roomDetails.roomArea,
                    capacity: roomDetails.maxOccupancy,
                    discountedPrice: roomDetails.discountedPrice,
                    basePrice: roomDetails.originalPrice,
                    type: roomDetails.roomType,
                    bedType: roomDetails.bedType,
                    roomType: roomDetails.roomType,
                    amenities: roomDetails.facilities.map((id) => ({ id })),
                },
            ],
            amenities: hotelDetails.facilities.map((id) => ({ id })),
        };

        formData.append(
            "hotel",
            new Blob([JSON.stringify(hotelDto)], { type: "application/json" })
        );

        hotelDetails.images.forEach((image) => {
            formData.append("exteriorImages", image);
        });

        roomDetails.images.forEach((image) => {
            formData.append("roomImages", image);
        });

        mutationCreateHotelAndRooms.mutate({
            formData,
            accessToken: user.accessToken,
        });
    };

    return (
        <div>
            <h3>Xác nhận thông tin</h3>
            <p>Vui lòng kiểm tra thông tin trước khi hoàn tất.</p>
            <button
                onClick={handleRegisterHotel}
                className="primary-btn3"
                disabled={loading}
            >
                {loading ? "Đang xử lý..." : "Xác nhận"}
            </button>
        </div>
    );
}

export default ConfirmationRegisterHotelOwner;

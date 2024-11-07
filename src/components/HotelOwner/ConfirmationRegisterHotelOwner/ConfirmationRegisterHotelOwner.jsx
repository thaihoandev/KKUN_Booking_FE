import React from "react";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import * as HotelService from "../../../services/HotelService";
import { useSelector } from "react-redux";

function ConfirmationRegisterHotelOwner({
    hotelDetails,
    location,
    roomDetails,
}) {
    const user = useSelector((state) => state.user);

    const mutationCreateHotelAndRooms = useMutation(
        ({ formData, accessToken }) =>
            HotelService.createHotelAndRooms(formData, accessToken),
        {
            onSuccess: () => {
                toast.success("Tạo khách sạn thành công!");
            },
            onError: (error) => {
                toast.error(error.message || "Có lỗi xảy ra");
            },
        }
    );
    const handleRegisterHotel = () => {
        const formData = new FormData();

        // Chuẩn bị đối tượng `hotelDto` với các thông tin cần thiết
        const hotelDto = {
            name: hotelDetails.name,
            category: hotelDetails.category,
            description: hotelDetails.description,
            location: location,
            paymentPolicy: hotelDetails.paymentPolicy,
            rooms: [
                {
                    area: roomDetails.roomArea,
                    capacity: roomDetails.maxOccupancy,
                    discountedPrice: roomDetails.discountedPrice,
                    basePrice: roomDetails.originalPrice,
                    type: roomDetails.roomType,
                    bedType: roomDetails.bedType,
                    roomType: roomDetails.roomType,
                    amenities: roomDetails.facilities.map((id) => ({ id })), // Đảm bảo đúng cấu trúc DTO
                },
            ],
            amenities: hotelDetails.facilities.map((id) => ({ id })), // amenities cho hotel
        };

        // Thêm hotelDto dưới dạng chuỗi JSON vào formData
        formData.append(
            "hotel",
            new Blob([JSON.stringify(hotelDto)], { type: "application/json" })
        );

        // Thêm ảnh ngoại thất vào formData
        hotelDetails.images.forEach((image, index) => {
            formData.append(`exteriorImages`, image);
        });

        // Thêm ảnh phòng vào formData cho từng phòng
        roomDetails.images.forEach((image) => {
            formData.append("roomImages", image); // Sử dụng key "roomImages" cho tất cả ảnh phòng
        });

        // Gửi request bằng useMutation
        mutationCreateHotelAndRooms.mutate({
            formData,
            accessToken: user.accessToken,
        });
    };

    return (
        <div>
            <h3>Xác nhận Đăng ký</h3>
            <p>Vui lòng kiểm tra thông tin trước khi hoàn tất đăng ký.</p>
            <button onClick={handleRegisterHotel} className="primary-btn3">
                Đăng ký
            </button>
        </div>
    );
}

export default ConfirmationRegisterHotelOwner;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import * as RoomService from "../../../../services/RoomService";
import { toast } from "react-toastify";
import convertToVND from "../../../../utils/convertToVND";
import { useTranslation } from "react-i18next";

function RoomDetails() {

    const { t } = useTranslation();
    const { roomId } = useParams();
    const [roomDetail, setRoomDetail] = useState(null);
    const navigate = useNavigate();

    const mutationRoomDetail = useMutation(
        () => RoomService.getRoomById(roomId),
        {
            onSuccess: (data) => setRoomDetail(data),
            onError: (error) =>
                toast.error(error.message || t("common.error")),
        }
    );

    useEffect(() => {
        mutationRoomDetail.mutate();
    }, [roomId]);

    if (!roomDetail) {
        return <p>{t("RoomDetails.loading")}</p>;
    }

    //const displayImages = roomDetail.roomImages.slice(0, 5);
    const displayImages = roomDetail.roomImages || []; // Chỉ lấy ảnh hiện có

    while (displayImages.length < 5) {
        displayImages.push("assets/img/placeholder.jpg"); // Thêm ảnh placeholder nếu thiếu ảnh
    }

    return (
        <div className="package-details-area position-relative">
            {/* <div className="booking-form-wrap"> */}
            <button className="primary-btn3 mb-30" onClick={() => navigate(-1)}>
            {t("RoomDetails.backButton")}
            </button>

            <div className="row">
                <div className="col-xl-6">
                    <div class="package-img-group mb-50">
                        <div className="row align-items-center g-3">
                            {/* Kiểm tra nếu có ít nhất 1 ảnh */}
                            {displayImages.length > 0 && (
                                <>
                                    {/* Ảnh chính */}
                                    <div className="col-lg-12">
                                        <div className="gallery-img-wrap">
                                            <img
                                                src={displayImages[0]} // Ảnh đầu tiên
                                                alt="Room main view"
                                                className="img-fluid rounded"
                                            />
                                            <a
                                                data-fancybox="gallery-01"
                                                href={displayImages[0]}
                                            >
                                                <i className="bi bi-eye"></i>{" "}
                                                {t("RoomDetails.images.viewImage")}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Ảnh phụ */}
                                    {displayImages.length > 1 && (
                                        <div className="col-lg-12">
                                            <div className="row g-3">
                                                {/* Lọc và giới hạn hiển thị tối đa 4 ảnh phụ */}
                                                {displayImages
                                                    .slice(1, 3) // Lấy từ ảnh thứ 2 đến tối đa ảnh thứ 5
                                                    .filter((img) => img) // Loại bỏ ảnh rỗng/undefined
                                                    .map((img, index) => (
                                                        <div
                                                            className="col-6"
                                                            key={index}
                                                        >
                                                            <div className="gallery-img-wrap">
                                                                <img
                                                                    src={img}
                                                                    alt={`Room view ${
                                                                        index +
                                                                        2
                                                                    }`}
                                                                    className="img-fluid rounded"
                                                                />
                                                                <a
                                                                    data-fancybox="gallery-01"
                                                                    href={img}
                                                                >
                                                                    <i className="bi bi-eye"></i>{" "}
                                                                    {t("RoomDetails.images.viewImage")}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Thông tin phòng */}
                <div className="col-xl-6">
                    <div
                        className="booking-form-wrap p-4"
                        style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "8px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                    >
                        <h4 style={{ marginBottom: "20px" }}>
                        {t("RoomDetails.roomInfo.title")}
                        </h4>
                        <div
                            className="row room-details p-3"
                            style={{
                                backgroundColor: "#f8f9fa",
                                borderRadius: "8px",
                                marginTop: "10px",
                            }}
                        >
                            <div className="col-6">
                                <ul className="list-unstyled">
                                    <li>
                                    <strong>{t("RoomDetails.roomInfo.roomType")}:</strong>{" "}
                                        {roomDetail.typeDisplayName}
                                    </li>
                                    <li>
                                    <strong>{t("RoomDetails.roomInfo.originalPrice")}:</strong>{" "}
                                    {convertToVND(roomDetail.basePrice)}
                                    </li>
                                    <li>
                                    <strong>{t("RoomDetails.roomInfo.area")}:</strong>{" "}
                                    {roomDetail.area} m²
                                    </li>
                                    <li>
                                    <strong>{t("RoomDetails.roomInfo.status")}:</strong>
                                        <i
                                            className=""
                                            style={{
                                                marginLeft: "10px",
                                                color: roomDetail.available
                                                    ? "#28a745"
                                                    : "#dc3545", // Màu xanh nếu còn phòng, màu đỏ nếu hết phòng
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {roomDetail.available
                                               ? t("RoomDetails.roomInfo.available")
                                               : t("RoomDetails.roomInfo.unavailable")}
                                        </i>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-6">
                                <ul className="list-unstyled">
                                    <li>
                                    <strong>{t("RoomDetails.roomInfo.bedType")}:</strong>{" "}
                                    {roomDetail.bedType}
                                    </li>
                                    <li>
                                    <strong>{t("RoomDetails.roomInfo.discountedPrice")}:</strong>{" "}
                                    {convertToVND(
                                            roomDetail.discountedPrice
                                        )}
                                    </li>
                                    <li>
                                    <strong>{t("RoomDetails.roomInfo.maxOccupancy")}:</strong>{" "}
                                        {roomDetail.capacity}{" "}
                                        {t("RoomDetails.roomInfo.capacityUnit")}
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="room-amenities mt-4">
                        <h5>{t("RoomDetails.amenities.title")}</h5>
                        <div
                                className="p-3"
                                style={{
                                    backgroundColor: "#f8f9fa",
                                    borderRadius: "8px",
                                    marginTop: "10px",
                                }}
                            >
                                <ul className="list-unstyled">
                                    {roomDetail.amenities.map(
                                        (amenity, index) => (
                                            <li
                                                key={index}
                                                style={{ marginBottom: "8px" }}
                                            >
                                                <i
                                                    className="bi bi-check-circle"
                                                    style={{
                                                        marginRight: "10px",
                                                        color: "#28a745",
                                                    }}
                                                ></i>
                                                {amenity.name}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomDetails;

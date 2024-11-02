import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import * as RoomService from "../../services/RoomService";
import Loading from "../Loading/Loading";
import convertToVND from "../../utils/convertToVND";

const RoomList = ({ hotel }) => {
    const [availableRooms, setAvailableRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const bookingDate = useSelector((state) => state.bookingDate);
    const navigate = useNavigate();

    const filters = [
        { id: 1, icon: "🏠", text: "Đặt không cần thẻ tín dụng", count: 2 },
        { id: 2, icon: "💳", text: "Thanh toán tại nơi ở", count: 2 },
    ];

    const mutationAvailableRoom = useMutation(
        ({ hotelId, checkInDate, checkOutDate }) =>
            RoomService.getAvailableRooms(hotelId, checkInDate, checkOutDate),
        {
            onSuccess: (data) => {
                setAvailableRooms(data);
                setLoading(false);
            },
            onError: (error) => {
                toast.error(error.message);
                setLoading(false);
            },
        }
    );

    useEffect(() => {
        if (hotel.id && bookingDate.checkInDate && bookingDate.checkOutDate) {
            mutationAvailableRoom.mutate({
                hotelId: hotel.id,
                checkInDate: bookingDate.checkInDate,
                checkOutDate: bookingDate.checkOutDate,
            });
        }
    }, [hotel.id, bookingDate.checkInDate, bookingDate.checkOutDate]);

    const handleCheckout = (roomId) => {
        navigate(`/booking/${roomId}/checkout`);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="py-4">
            {/* Header */}
            <div className="row mb-4">
                <div className="col d-flex justify-content-between align-items-center">
                    <h1 className="h4 mb-0">Chọn phòng</h1>
                    <a href="#" className="btn btn-link text-decoration-none">
                        Chúng tôi khớp giá!
                    </a>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-4 border rounded p-3">
                <div className="d-flex align-items-center mb-2">
                    <span className="me-2">Chọn lọc:</span>
                    <button className="btn btn-link text-decoration-none p-0">
                        Xóa hết
                    </button>
                </div>
                <div className="d-flex flex-wrap gap-2">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            className="badge bg-opacity-10 text-dark border"
                        >
                            {filter.icon} {filter.text} ({filter.count})
                        </button>
                    ))}
                </div>
            </div>

            {/* Room Count Info */}
            <div className="text-danger small mb-4">
                {availableRooms.length} loại phòng có sẵn
            </div>

            {/* Room Cards */}
            {availableRooms.map((room) => (
                <div key={room.id} className="card shadow-sm mb-4">
                    <div className="card-body">
                        <div className="row g-4">
                            {/* Left Column - Images */}
                            <div className="col-12 col-md-3 border-end">
                                <div className="d-flex flex-column">
                                    {room.roomImages &&
                                        room.roomImages.length > 0 && (
                                            <>
                                                <img
                                                    src={room.roomImages[0]}
                                                    alt="Room preview"
                                                    className="img-fluid pb-1"
                                                />
                                                <div className="d-flex justify-content-between align-items-center">
                                                    {room.roomImages[1] && (
                                                        <img
                                                            src={
                                                                room
                                                                    .roomImages[1]
                                                            }
                                                            alt="Room preview"
                                                            className="p-0 pe-1 col-xl-6"
                                                        />
                                                    )}
                                                    {room.roomImages[2] && (
                                                        <img
                                                            src={
                                                                room
                                                                    .roomImages[2]
                                                            }
                                                            alt="Room preview"
                                                            className="p-0 ps-1 col-xl-6"
                                                        />
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    <a
                                        href="#"
                                        className="text-primary text-decoration-none small"
                                    >
                                        Xem ảnh và chi tiết
                                    </a>
                                </div>
                            </div>

                            {/* Middle Column - Details */}
                            <div className="col-12 col-md-6 border-end">
                                <h3 className="h5 mb-2">
                                    {room.typeDisplayName}
                                </h3>
                                <div className="d-flex">
                                    <div className="small col-xl-6 border-end">
                                        <h6 className="px-2">Thông tin</h6>
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <span>🏠</span>
                                            <span>
                                                Diện tích phòng: {room.area} m²
                                            </span>
                                        </div>
                                        {room.direction && (
                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                <span>🌅</span>
                                                <span>{room.direction}</span>
                                            </div>
                                        )}
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <span>🚪</span>
                                            <span>
                                                Tối đa: {room.capacity} nguời
                                            </span>
                                        </div>
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <span>🚪</span>
                                            <span>
                                                Giường:{" "}
                                                {room.bedTypeDisplayName}
                                            </span>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <span>🛁</span>
                                            <span>Vòi sen</span>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column gap-1 col-xl-6 px-3">
                                        <h6 className="px-2">Ưu đãi</h6>
                                        {room.amenities &&
                                            room.amenities.map(
                                                (amenity, index) => (
                                                    <div
                                                        key={amenity.id}
                                                        className="d-flex align-items-center gap-2"
                                                    >
                                                        <span className="text-success">
                                                            ✓
                                                        </span>
                                                        <span className="small">
                                                            {amenity.name}
                                                        </span>
                                                        {index === 0 && (
                                                            <span className="text-muted">
                                                                ⓘ
                                                            </span>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Pricing */}
                            <div className="col-12 col-md-3">
                                {room.discount != null && (
                                    <div className="text-end mb-2">
                                        <span className="badge bg-danger">
                                            -{room.discount}% CHỈ HÔM NAY!
                                        </span>
                                    </div>
                                )}
                                <div className="text-end mb-4">
                                    <div className="text-danger fw-bold fs-4">
                                        {convertToVND(room.basePrice)}
                                    </div>
                                    <div className="text-muted small">
                                        Giá chưa bao gồm thuế và phí
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end align-items-center gap-3">
                                    <Link
                                        onClick={() => handleCheckout(room.id)}
                                        className="primary-btn1 two w-50"
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        Đặt ngay
                                    </Link>
                                </div>
                                {room.available && (
                                    <div className="text-end mt-2 text-warning small">
                                        Đang còn phòng trống!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RoomList;

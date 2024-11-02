import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { toast, ToastContainer } from "react-toastify";

import * as BookingService from "../../services/BookingService";
import * as RoomService from "../../services/RoomService";
import * as HotelService from "../../services/HotelService";
import * as ReviewService from "../../services/ReviewService";

import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import {
    convertRating5To10Scale,
    getRatingDescription,
} from "../../utils/ratingReview";

const ReviewPage = () => {
    const { bookingId, roomId } = useParams();
    const [room, setRoom] = useState({});
    const [booking, setBooking] = useState({});
    const [hotel, setHotel] = useState({});
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        type: "roomReview", // Loại đánh giá
        cleanliness: 0,
        space: 0,
        amenities: 0,
        comfort: 0,
        valueForMoney: 0,
        comment: "", // Nội dung đánh giá
        roomId: roomId,
    });
    const navigate = useNavigate();

    const mutationBooking = useMutation(
        (bookingId) => BookingService.getBookingById(bookingId),
        {
            onSuccess: (data) => {
                setBooking(data);
                setLoading(false);
            },
            onError: (error) => {
                toast.error(error.message);
                setLoading(false);
            },
        }
    );

    const mutationRoom = useMutation(
        (roomId) => RoomService.getRoomById(roomId),
        {
            onSuccess: (data) => {
                setRoom(data);
                mutationHotel.mutate(data.hotelId);
            },
            onError: (error) => {
                toast.error(error.message);
                setLoading(false);
            },
        }
    );

    const mutationHotel = useMutation(
        (hotelId) => HotelService.getHotelById(hotelId),
        {
            onSuccess: (data) => {
                setHotel(data);
                setLoading(false);
            },
            onError: (error) => {
                toast.error(error.message);
                setLoading(false);
            },
        }
    );

    const mutationSubmitReview = useMutation(
        ({ bookingId, formData, accessToken }) =>
            ReviewService.createReview(bookingId, formData, accessToken),
        {
            onSuccess: (data) => {
                setLoading(false);
                navigate("/");
                toast.success("Bạn đã đánh giá thành công!");
            },
            onError: (error) => {
                toast.error(error.message);
                setLoading(false);
            },
        }
    );

    useEffect(() => {
        mutationRoom.mutate(roomId);
    }, [roomId]);

    useEffect(() => {
        mutationBooking.mutate(bookingId);
    }, [bookingId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleRatingChange = (category, rating) => {
        setFormData((prevState) => ({
            ...prevState,
            [category]: rating,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutationSubmitReview.mutate({
            bookingId,
            formData,
            accessToken: user.accessToken,
        });
    };

    const renderStarRating = (category) => {
        return [1, 2, 3, 4, 5].map((star) => (
            <i
                key={star}
                className={`bi bi-star-fill star-icon ${
                    star <= formData[category] ? "text-warning" : "text-muted"
                }`}
                onClick={() => handleRatingChange(category, star)}
                style={{ cursor: "pointer" }}
            ></i>
        ));
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <ToastContainer />
            <div
                className="container py-5 rounded mb-5 mt-2"
                style={{
                    background:
                        "linear-gradient(125deg, rgba(99, 171, 69, 0.1) 0%, rgba(251, 176, 59, 0.1) 100%)",
                }}
            >
                <div className="row g-4">
                    <div className="col-lg-8">
                        <div className="review-form-wrapper">
                            <h2 className="mb-4">Viết đánh giá của bạn</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-inner mb-30">
                                            <label>Họ và tên*</label>
                                            <input
                                                type="text"
                                                name="address"
                                                placeholder="Nhập họ tên..."
                                                value={booking.bookingName}
                                                onChange={handleInputChange}
                                                readOnly={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-inner mb-30">
                                            <label>Email*</label>
                                            <input
                                                type="text"
                                                name="email"
                                                placeholder="Nhập địa chỉ email..."
                                                value={booking.bookingEmail}
                                                onChange={handleInputChange}
                                                readOnly={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <div className="form-inner mb-30">
                                            <label>Đánh giá*</label>
                                            <textarea
                                                className="form-control"
                                                name="comment"
                                                placeholder="Nhập đánh giá của bạn..."
                                                value={formData.comment}
                                                onChange={handleInputChange}
                                                rows="4"
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <div className="star-rating-wrapper">
                                            <h4>Đánh giá trải nghiệm</h4>
                                            <div className="row">
                                                {[
                                                    {
                                                        category: "cleanliness",
                                                        label: "Sạch sẽ",
                                                    },
                                                    {
                                                        category: "comfort",
                                                        label: "Thoải mái",
                                                    },
                                                    {
                                                        category: "amenities",
                                                        label: "Tiện nghi",
                                                    },
                                                    {
                                                        category: "space",
                                                        label: "Không gian",
                                                    },
                                                    {
                                                        category:
                                                            "valueForMoney",
                                                        label: "Giá cả phù hợp",
                                                    },
                                                ].map(({ category, label }) => (
                                                    <div
                                                        key={category}
                                                        className="col-md-4 mb-2 d-flex align-items-center"
                                                    >
                                                        <span className="me-3">
                                                            {label}:
                                                        </span>
                                                        <div className="rating-container">
                                                            {renderStarRating(
                                                                category
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button
                                            type="submit"
                                            className="primary-btn1"
                                        >
                                            Gửi đánh giá
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-4 d-none d-lg-block">
                        <div className="card p-4 mb-4 booking-form-wrap mb-30">
                            {/* Hotel and Room Info */}
                            <div className="row ">
                                <div className="position-relative col-4">
                                    <img
                                        src={hotel.exteriorImages?.[0]}
                                        alt="Hotel room"
                                        className="rounded w-100 h-100 object-fit-cover"
                                    />
                                    <span className="position-absolute top-0 start-0 badge bg-success">
                                        Wi-Fi miễn phí
                                    </span>
                                </div>
                                <div className="col-8">
                                    <h3 className="fw-semibold fs-6">
                                        {hotel.name}
                                    </h3>
                                    <div className="d-flex align-items-center text-secondary gap-1">
                                        <span className="small">
                                            {hotel.categoryDisplayName}
                                        </span>
                                    </div>
                                    <div className="d-flex align-items-center mt-1">
                                        <div className="d-flex align-items-center gap-1">
                                            <span className="fw-semibold">
                                                {convertRating5To10Scale(
                                                    hotel.rating
                                                )}
                                            </span>
                                            <span className="text-primary small">
                                                {getRatingDescription(
                                                    hotel.rating
                                                )}
                                            </span>
                                        </div>
                                        <span className="text-secondary small ms-1">
                                            {hotel.numOfReviews} đánh giá
                                        </span>
                                    </div>
                                    <div className="text-danger small mt-1">
                                        <i className="bi bi-geo-alt"></i>{" "}
                                        {hotel.location}
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="row py-2 border rounded mt-2">
                                <div className="col-3">
                                    <img
                                        src={room.roomImages?.[0]}
                                        alt="Room"
                                        className="rounded w-100 h-100 object-fit-cover"
                                    />
                                </div>
                                <div className="col-8">
                                    <h3 className="fw-semibold fs-6">
                                        1 x {room.typeDisplayName}
                                    </h3>
                                    <div className="d-flex gap-2 text-secondary small mt-1">
                                        <span>{room.area} m²</span>
                                        <span>•</span>
                                        <span>
                                            Tối đa: {room.capacity} người lớn
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReviewPage;

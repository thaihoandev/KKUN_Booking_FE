import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import * as RoomService from "../../../../services/RoomService";
import * as HotelService from "../../../../services/HotelService";
import * as UserService from "../../../../services/UserService";
import Loading from "../../../../components/Loading/Loading";
import { useSelector } from "react-redux";
import {
    convertRating5To10Scale,
    getRatingDescription,
} from "../../../../utils/ratingReview";
import HotelAmenities from "../../../../components/HotelAmenities/HotelAmenities";

function HotelInfoes() {
    const { roomId } = useParams();
    const [room, setRoom] = useState({});
    const [hotel, setHotel] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
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

    const mutationGetUserDetails = useMutation(
        ({ userId, accessToken }) => {
            return UserService.getDetailsUser(userId, accessToken);
        },
        {
            onSuccess: (data) => {
                mutationHotel.mutate(data.hotelId);
            },
            onError: (error) => {
                toast.error(error.message || "Đã xảy ra lỗi.");
            },
        }
    );
    useEffect(() => {
        mutationGetUserDetails.mutate({
            userId: user.id,
            accessToken: user.accessToken,
        });
    }, []);

    if (loading) {
        return <Loading />;
    }

    // Lấy tối đa 5 ảnh đầu tiên từ room.roomImages
    const displayImages = hotel.exteriorImages?.slice(0, 5) || [];
    // Nếu có ít hơn 5 ảnh, thêm ảnh placeholder
    while (displayImages.length < 5) {
        displayImages.push("assets/img/placeholder.jpg");
    }

    const handleEditHotel = () => {
        navigate("/hotelowner/my-hotel/edit");
    };
    return (
        <>
            <div className="room-details-area  ">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8">
                            <div className="row">
                                <div
                                    className="card p-3 "
                                    style={{
                                        background:
                                            "linear-gradient(125deg, rgba(99, 171, 69, 0.1) 0%, rgba(251, 176, 59, 0.1) 100%)",
                                    }}
                                >
                                    <div class="hotel-header">
                                        <div className="row mb-2">
                                            <h2 className="col-8 fw-semibold mb-0">
                                                {hotel.name}
                                            </h2>
                                            <div className="col-4 d-flex justify-content-end align-items-start">
                                                <button
                                                    className="primary-btn1"
                                                    onClick={handleEditHotel}
                                                >
                                                    Sửa thông tin
                                                </button>
                                            </div>
                                        </div>

                                        <div class="d-flex align-items-center text-secondary gap-1">
                                            <span class="small">
                                                <i class="bi bi-yelp"></i>{" "}
                                                {hotel.categoryDisplayName}
                                            </span>
                                            <div class="d-flex align-items-center  ms-5">
                                                <div class="d-flex align-items-center gap-1">
                                                    <span class="fw-semibold fs-5">
                                                        {convertRating5To10Scale(
                                                            hotel.rating
                                                        )}
                                                    </span>
                                                    <strong class=" text-dark">
                                                        {getRatingDescription(
                                                            hotel.rating
                                                        )}
                                                    </strong>
                                                </div>
                                                <span className="mx-2">
                                                    {" - "}
                                                </span>
                                                <span class="text-secondary small ">
                                                    {hotel.numOfReviews} đánh
                                                    giá
                                                </span>
                                            </div>
                                        </div>

                                        <div class="text-danger small mt-1">
                                            <i class="bi bi-geo-alt"></i>{" "}
                                            {hotel.location}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="d-flex flex-column p-3 border rounded shadow-sm">
                                        <div className="mb-2 d-flex align-items-center">
                                            <i className="bi bi-info-circle-fill me-2 text-primary"></i>
                                            <strong className="me-2">
                                                Mô tả:
                                            </strong>
                                            {hotel.description}
                                        </div>
                                        <div className="mb-2 d-flex align-items-center">
                                            <i className="bi bi-credit-card-fill me-2 text-success"></i>
                                            <strong className="me-2">
                                                Phương thức thanh toán:
                                            </strong>
                                            {hotel.paymentPolicy}
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <i className="bi bi-door-open-fill me-2 text-warning"></i>
                                            <strong className="me-2">
                                                Số lượng phòng:
                                            </strong>
                                            {hotel.rooms.length}
                                        </div>
                                    </div>
                                </div>
                                {/* Rest of your component */}

                                <div
                                    className="col-xl-12 card mt-3"
                                    style={{
                                        background:
                                            "linear-gradient(125deg, rgba(99, 171, 69, 0.1) 0%, rgba(251, 176, 59, 0.1) 100%)",
                                    }}
                                >
                                    <div className="w-100 px-4 py-2">
                                        <h4 className="">
                                            <strong>Tiện ích</strong>
                                        </h4>
                                        <HotelAmenities
                                            amenities={hotel.amenities}
                                        ></HotelAmenities>{" "}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="room-img-group mb-50">
                                <div className="row g-3 flex-column">
                                    <div className="col-lg-12">
                                        <div className="gallery-img-wrap">
                                            <img
                                                src={displayImages[0]}
                                                alt={`Room view 1`}
                                            />
                                            <a
                                                data-fancybox="gallery-01"
                                                href={displayImages[0]}
                                            >
                                                <i className="bi bi-eye"></i>{" "}
                                                Xem phòng
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="row g-3">
                                            <div className="col-6">
                                                <div className="gallery-img-wrap">
                                                    <img
                                                        src={displayImages[1]}
                                                        alt={`Room view 2`}
                                                    />
                                                    <a
                                                        data-fancybox="gallery-01"
                                                        href={displayImages[1]}
                                                    >
                                                        <i className="bi bi-eye"></i>{" "}
                                                        Xem ảnh
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="gallery-img-wrap">
                                                    <img
                                                        src={displayImages[2]}
                                                        alt={`Room view 3`}
                                                    />
                                                    <a
                                                        data-fancybox="gallery-01"
                                                        href={displayImages[2]}
                                                    >
                                                        <i className="bi bi-eye"></i>{" "}
                                                        Xem ảnh
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="gallery-img-wrap active">
                                                    <img
                                                        src={displayImages[3]}
                                                        alt={`Room view 4`}
                                                    />
                                                    <button className="StartSlideShowFirstImage">
                                                        <i className="bi bi-plus-lg"></i>{" "}
                                                        Xem ảnh khác
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="gallery-img-wrap active">
                                                    <img
                                                        src={displayImages[4]}
                                                        alt={`Room view 5`}
                                                    />
                                                    <a
                                                        data-fancybox="gallery-01"
                                                        href="https://www.youtube.com/watch?v=u31qwQUeGuM"
                                                    >
                                                        <i className="bi bi-play-circle"></i>{" "}
                                                        Xem video
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="others-image-wrap d-none">
                        {room.roomImages?.map((image, index) => (
                            <a key={index} href={image} data-fancybox="images">
                                <img
                                    src={image}
                                    alt={`Room view ${index + 1}`}
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default HotelInfoes;

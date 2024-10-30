import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import * as RoomService from "../../services/RoomService";
import * as HotelService from "../../services/HotelService";
import Loading from "../../components/Loading/Loading";
import BookingForm from "../../components/BookingForm/BookingForm";
import BannerCardBooking from "../../components/BannerContainer/Banner/BannerCardBooking/BannerCardBooking";
import ReviewWrapper from "../../components/ReviewWrapper/ReviewWrapper";
import RoomInfoes from "../../components/RoomInfoes/RoomInfoes";
import NearbyPlaces from "../../components/NearbyPlaces/NearbyPlaces";

function RoomDetails() {
    const { roomId } = useParams();
    const [room, setRoom] = useState({});
    const [hotel, setHotel] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
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

    const handleCheckout = (roomId) => {
        navigate(`/booking/${roomId}/checkout`);
    };

    useEffect(() => {
        mutationRoom.mutate(roomId);
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

    return (
        <>
            <div className="room-details-area pt-120 mb-120">
                <div className="container">
                    <div className="row">
                        <div className="co-lg-12">
                            <div className="room-img-group mb-50">
                                <div className="row g-3">
                                    <div className="col-lg-6">
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
                                    <div className="col-lg-6">
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
                                                        Xem phòng
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
                                                        Xem phòng
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
                    {/* Rest of your component */}
                    <div className="row g-xl-4 gy-5">
                        <div className="col-xl-8">
                            <RoomInfoes hotel={hotel} room={room} />
                            <div className="tour-location">
                                <h4>Vị trí trên bản đồ</h4>
                                <div className="map-area mb-30">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193325.0481540361!2d-74.06757856146028!3d40.79052383652264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1660366711448!5m2!1sen!2sbd"
                                        width="600"
                                        height="450"
                                        style={{ border: "0" }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </div>
                            <ReviewWrapper hotel={hotel} room={room} />
                        </div>
                        <div className="col-xl-4">
                            <div className="w-100 px-4 py-2">
                                <Link
                                    onClick={() => handleCheckout(room.id)}
                                    className="primary-btn1 two w-100 "
                                    style={{
                                        display: "flex", // Sử dụng flexbox
                                        justifyContent: "center", // Căn giữa theo chiều ngang
                                        alignItems: "center", // Căn giữa theo chiều dọc
                                    }}
                                >
                                    Đặt ngay
                                </Link>
                            </div>
                            <NearbyPlaces hotel={hotel} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RoomDetails;

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
import RoomList from "../../components/RoomList/RoomList";
import { useTranslation } from "react-i18next";

function RoomDetails() {
    const { roomId } = useParams();
    const [room, setRoom] = useState({});
    const [hotel, setHotel] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { t } = useTranslation();

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
        window.scrollTo(0, 0);
        mutationRoom.mutate(roomId);
    }, [roomId]);

    if (loading) {
        return <Loading />;
    }

    // Lấy tối đa 5 ảnh đầu tiên từ room.roomImages
    const displayImages = hotel.exteriorImages?.slice(0, 5) || [];
    // Nếu có ít hơn 5 ảnh, thêm ảnh placeholder
    while (displayImages.length < 5) {
        displayImages.push("/assets/img/places/Ha_Noi/temple.jpg");
    }
    const encodedAddress = encodeURIComponent(hotel.location);

    // Construct the iframe URL dynamically using the encoded address
    const mapUrl = `https://www.google.com/maps/embed/v1/place?q=${encodedAddress}&key=AIzaSyAYf61ROkKLsEnpq6ZcbCs-B2qb7cJVzgo	`;
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
                                                {t("roomDetails.seeRoom")}
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
                                                        {t(
                                                            "roomDetails.seeRoom"
                                                        )}
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
                                                        {t(
                                                            "roomDetails.seeRoom"
                                                        )}
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
                                                        {t(
                                                            "roomDetails.seeOtherPic"
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="gallery-img-wrap active">
                                                    <img
                                                        src="https://hotel84.com/hotel84-images/product/img1/khach-san-muong-thanh-quang.jpg"
                                                        alt={`Room view 5`}
                                                    />
                                                    <a
                                                        data-fancybox="gallery-01"
                                                        href="https://www.youtube.com/watch?v=NSnkb1IAjbE"
                                                    >
                                                        <i className="bi bi-play-circle"></i>{" "}
                                                        {t(
                                                            "roomDetails.seeVideo"
                                                        )}
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
                                <h4>{t("hotel.viewLocation")}</h4>
                                <div className="map-area mb-30">
                                    <iframe
                                        src={mapUrl}
                                        width="600"
                                        height="450"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                    />
                                </div>
                            </div>
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
                                    {t("booking.bookingNow")}
                                </Link>
                            </div>
                            <NearbyPlaces hotel={hotel} />
                        </div>
                        <div className="col-xl-12">
                            <RoomList hotel={hotel} room={room} />
                            <ReviewWrapper hotel={hotel} room={room} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RoomDetails;

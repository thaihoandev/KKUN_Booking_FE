import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import convertToVND from "../../../utils/convertToVND";
import ReviewRating from "../../ReviewRating/ReviewRating";
import getAmenityIcon from "../../../utils/icons";
import { useTranslation } from "react-i18next";
import unidecode from "unidecode";

function HotelItemHorizontal({ hotel }) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleCheckRoom = () => {
        navigate(
            "/hotels/" + hotel.hotelDto.id + "/rooms/" + hotel.bestRoom.id
        );
    };
    function removeDiacritics(str) {
        return unidecode(str); // Sử dụng unidecode để bỏ dấu
    }
    return (
        <>
            <div className="room-suits-card mb-30">
                <div className="row g-0">
                    <div className="col-md-4">
                        <div className="swiper hotel-img-slider">
                            {hotel.hotelDto.breakfastIncluded && (
                                <span className="batch">
                                    {t("hotel.breakfastIncluded")}
                                </span>
                            )}
                            <Swiper
                                style={{ height: "100%" }}
                                pagination={{
                                    clickable: true,
                                    el: ".swiper-pagination5",
                                }}
                                modules={[Pagination]}
                                className="mySwiper"
                            >
                                {hotel.hotelDto?.exteriorImages &&
                                    hotel.hotelDto.exteriorImages.map(
                                        (image, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="room-img">
                                                    <img
                                                        style={{
                                                            height: "300px",
                                                            width: "100%",
                                                            objectFit: "cover",
                                                        }}
                                                        src={
                                                            image ||
                                                            "assets/img/placeholder.jpg"
                                                        }
                                                        alt={`${
                                                            hotel.hotelDto?.name
                                                        } Exterior ${
                                                            index + 1
                                                        }`}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        )
                                    )}
                                {(!hotel.hotelDto?.exteriorImages ||
                                    hotel.hotelDto.exteriorImages.length ===
                                        0) && (
                                    <SwiperSlide>
                                        <div className="room-img">
                                            <img
                                                src="assets/img/placeholder.jpg"
                                                alt="Hotel placeholder"
                                            />
                                        </div>
                                    </SwiperSlide>
                                )}
                                <div className="swiper-pagination5"></div>
                            </Swiper>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="room-content">
                            <div className="content-top">
                                <ReviewRating
                                    rating={hotel.hotelDto.rating}
                                    numOfReviews={hotel.hotelDto.numOfReviews}
                                />
                                <h5>
                                    <a href="hotel-details.html">
                                        {hotel.hotelDto?.name || "Hotel Name"}
                                    </a>
                                </h5>
                                <ul className="loaction-area">
                                    <li>
                                        <i className="bi bi-geo-alt"></i>
                                        {hotel.hotelDto?.location ||
                                            "Địa điểm không có sẵn"}
                                    </li>
                                    <li>
                                        <a href="#">
                                            {" "}
                                            {t("hotel.viewLocation")}
                                        </a>
                                    </li>
                                    <li>
                                        <span>
                                            {" "}
                                            {t("hotel.distanceFromCenter", {
                                                distance: "5",
                                            })}
                                        </span>
                                    </li>
                                </ul>
                                <ul className="facilisis">
                                    {hotel.hotelDto.amenities &&
                                        hotel.hotelDto.amenities
                                            .slice(0, 4)
                                            .map((amenity) => (
                                                <li key={amenity.id}>
                                                    {getAmenityIcon(
                                                        amenity.name
                                                    )}
                                                    {t(
                                                        `amenities.${removeDiacritics(
                                                            amenity.name
                                                        )
                                                            .toLowerCase()
                                                            .replace(
                                                                /\s+/g,
                                                                "_"
                                                            )
                                                            .replace("/", "_")}`
                                                    )}
                                                </li>
                                            ))}
                                </ul>
                            </div>
                            <div className="content-bottom">
                                <div className="room-type ">
                                    <h6>
                                        {t(
                                            `roomTypes.${hotel.bestRoom.type}`
                                        ) || t("hotel.roomTypeUnavailable")}
                                    </h6>
                                    <strong className="text-warning ">
                                        {t(
                                            `hotel.categories.${hotel.hotelDto.category}`
                                        )}
                                    </strong>
                                    <span className="ms-2">
                                        {hotel.bestRoom?.available
                                            ? t("hotel.roomAvailable")
                                            : t("hotel.roomUnavailable")}
                                    </span>
                                    <br />

                                    {hotel.hotelDto.freeCancellation && (
                                        <div className="mt-2">
                                            <strong className="d-block">
                                                {t("hotel.freeCancellation")}
                                            </strong>
                                            <p>
                                                {t(
                                                    "hotel.cancellationDeadline",
                                                    { hours: 48 }
                                                )}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="price-and-book">
                                    <div className="price-area">
                                        <p>
                                            {t("hotel.nightFor", {
                                                nightCount: 1,
                                                capacity:
                                                    hotel.bestRoom?.capacity ||
                                                    t("hotel.unknownCapacity"),
                                            })}
                                        </p>
                                        <span>
                                            {convertToVND(
                                                hotel.bestRoom?.basePrice
                                            ) || t("hotel.priceNotAvailable")}
                                            <span className="p-1"></span>
                                            <del>
                                                {convertToVND(
                                                    hotel.bestRoom?.basePrice
                                                )}
                                            </del>
                                        </span>
                                    </div>
                                    <div className="book-btn">
                                        <Link
                                            onClick={handleCheckRoom}
                                            href="hotel-details.html"
                                            className="primary-btn2"
                                        >
                                            {t("hotel.checkRoom")}
                                            <i className="bi bi-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HotelItemHorizontal;

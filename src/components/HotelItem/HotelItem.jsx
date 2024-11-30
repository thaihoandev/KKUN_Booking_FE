import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import convertToVND from "../../utils/convertToVND";
import ReviewRating from "../ReviewRating/ReviewRating";
import getAmenityIcon from "../../utils/icons";
import unidecode from "unidecode";

const HotelItem = ({ hotel }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleCheckRoom = (hotelId, roomId) => {
        navigate(`/hotels/${hotelId}/rooms/${roomId}`);
    };
    function removeDiacritics(str) {
        return unidecode(str); // Sử dụng unidecode để bỏ dấu
    }
    return (
        <div className="room-suits-card two">
            <div className="row g-0">
                <div className="col-md-12">
                    <div className="hotel-img-slider">
                        {hotel.breakfastIncluded && (
                            <span className="batch">
                                {t("hotel.breakfastIncluded")}
                            </span>
                        )}
                        <Swiper
                            style={{ height: "100%" }}
                            pagination={{
                                el: ".swiper-pagination5",
                                clickable: true,
                            }}
                            modules={[Pagination]}
                            className="mySwiper"
                        >
                            {hotel.exteriorImages &&
                                hotel.exteriorImages.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="room-img">
                                            <img
                                                style={{
                                                    height: "100%",
                                                    width: "100%",
                                                    objectFit: "cover",
                                                }}
                                                src={
                                                    image ||
                                                    "assets/img/placeholder.jpg"
                                                }
                                                alt={`${hotel.name} Exterior ${
                                                    index + 1
                                                }`}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            {(!hotel.exteriorImages ||
                                hotel.exteriorImages.length === 0) && (
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
                <div className="col-md-12">
                    <div className="room-content">
                        <div className="content-top">
                            <ReviewRating
                                rating={hotel.rating || 0}
                                numOfReviews={hotel.numOfReviews || 0}
                            />
                            <h5>
                                <a href="hotel-details.html">{hotel.name}</a>
                            </h5>
                            <ul className="loaction-area">
                                <li>
                                    <i className="bi bi-geo-alt"></i>{" "}
                                    {hotel.location}
                                </li>
                                <li>
                                    <a href="#">{t("hotel.viewLocation")}</a>
                                </li>
                                <li>
                                    <span>
                                        {t("hotel.distanceFromCenter", {
                                            distance: "5",
                                        })}
                                    </span>
                                </li>
                            </ul>
                            <ul className="facilisis">
                                {hotel.amenities.slice(0, 4).map((amenity) => (
                                    <li key={amenity.id}>
                                        {getAmenityIcon(amenity.name)}{" "}
                                        {t(
                                            `amenities.${removeDiacritics(
                                                amenity.name
                                            )
                                                .toLowerCase()
                                                .replace(/\s+/g, "_")
                                                .replace("/", "_")}`
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="content-bottom">
                            <div className="room-type">
                                <h6>
                                    {t(`roomTypes.${hotel.rooms?.[0]?.type}`) ||
                                        t("hotel.roomTypeUnavailable")}
                                </h6>
                                <span>
                                    {hotel.rooms?.[0]?.available
                                        ? t("hotel.roomAvailable")
                                        : t("hotel.roomUnavailable")}
                                </span>
                                <div className="deals">
                                    <span>
                                        <strong className="text-warning">
                                            {t(
                                                `hotel.categories.${hotel.category}`
                                            )}
                                        </strong>
                                        {hotel.freeCancellation && (
                                            <>
                                                <strong className="d-block">
                                                    {t(
                                                        "hotel.freeCancellation"
                                                    )}
                                                </strong>
                                                <p>
                                                    {t(
                                                        "hotel.cancellationDeadline",
                                                        { hours: 48 }
                                                    )}
                                                </p>
                                            </>
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className="price-and-book">
                                <div className="price-area">
                                    <p>
                                        {t("hotel.nightFor", {
                                            nightCount: 1,
                                            capacity:
                                                hotel.rooms?.[0]?.capacity ||
                                                t("hotel.unknownCapacity"),
                                        })}
                                    </p>
                                    <span>
                                        {convertToVND(
                                            hotel.rooms?.[0]?.basePrice
                                        ) || t("hotel.priceNotAvailable")}
                                        <span className="p-1"></span>
                                        <del>
                                            {convertToVND(
                                                hotel.rooms?.[0]?.basePrice
                                            )}
                                        </del>
                                    </span>
                                </div>
                                <div className="book-btn">
                                    <Link
                                        onClick={() =>
                                            handleCheckRoom(
                                                hotel.id,
                                                hotel.rooms?.[0]?.id
                                            )
                                        }
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
    );
};

export default HotelItem;

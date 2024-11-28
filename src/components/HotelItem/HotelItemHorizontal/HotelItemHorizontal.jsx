import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import convertToVND from "../../../utils/convertToVND";
import ReviewRating from "../../ReviewRating/ReviewRating";
import getAmenityIcon from "../../../utils/icons";

function HotelItemHorizontal({ hotel }) {
    const navigate = useNavigate();

    const handleCheckRoom = () => {
        navigate(
            "/hotels/" + hotel.hotelDto.id + "/rooms/" + hotel.bestRoom.id
        );
    };

    return (
        <>
            <div className="room-suits-card mb-30">
                <div className="row g-0">
                    <div className="col-md-4">
                        <div className="swiper hotel-img-slider">
                            {hotel.hotelDto.breakfastIncluded && (
                                <span className="batch">Bữa sáng miễn phí</span>
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
                                        <a href="#">Xem trên bản đồ</a>
                                    </li>
                                    <li>
                                        <span>cách trung tâm ...km</span>
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
                                                    {amenity.name}
                                                </li>
                                            ))}
                                </ul>
                            </div>
                            <div className="content-bottom">
                                <div className="room-type">
                                    <h6>
                                        {hotel.bestRoom?.typeDisplayName ||
                                            "Không có sẵn"}
                                    </h6>
                                    <span>
                                        {hotel.bestRoom?.available
                                            ? "Còn phòng"
                                            : "Hết phòng"}
                                    </span>
                                    {hotel.hotelDto.freeCancellation && (
                                        <div className="deals">
                                            <span>
                                                <strong>Miễn phí hủy</strong>{" "}
                                                <br /> trước 48 giờ
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="price-and-book">
                                    <div className="price-area">
                                        <p>
                                            1 đêm,{" "}
                                            {hotel.bestRoom?.capacity ||
                                                "Không có sẵn"}{" "}
                                            người
                                        </p>
                                        <span>
                                            {convertToVND(
                                                hotel.bestRoom?.basePrice
                                            ) || "NaN"}
                                            <del>$3000</del>
                                        </span>
                                    </div>
                                    <div className="book-btn">
                                        <Link
                                            onClick={handleCheckRoom}
                                            href="hotel-details.html"
                                            className="primary-btn2"
                                        >
                                            Xem phòng{" "}
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

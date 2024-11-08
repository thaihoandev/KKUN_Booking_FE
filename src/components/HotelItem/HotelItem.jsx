import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// Import required modules
import { Pagination, Autoplay } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";
import convertToVND from "../../utils/convertToVND";
import ReviewRating from "../ReviewRating/ReviewRating";

const HotelItem = ({ hotel }) => {
    const navigate = useNavigate();
    const handleCheckRoom = (hotelId, roomId) => {
        navigate(`/hotels/${hotelId}/rooms/${roomId}`);
    };
    console.log(hotel);
    return (
        <div className="room-suits-card two">
            <div className="row g-0">
                <div className="col-md-12">
                    <div className="hotel-img-slider">
                        <span className="batch">Bữa sáng miễn phí</span>
                        <Swiper
                            style={{ height: "100%" }}
                            pagination={{
                                el: ".swiper-pagination5", // Thay đổi selector
                                clickable: true,
                            }}
                            modules={[Pagination]}
                            className="mySwiper"
                        >
                            {/* Nếu có hình ảnh từ API */}
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

                            {/* Fallback nếu không có hình ảnh */}
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
                            {/* Di chuyển pagination vào trong Swiper */}
                            <div className="swiper-pagination5"></div>
                        </Swiper>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="room-content">
                        <div className="content-top">
                            <ReviewRating
                                rating={hotel.rating}
                                numOfReviews={hotel.numOfReviews}
                            ></ReviewRating>
                            <h5>
                                <a href="hotel-details.html">{hotel.name}</a>
                            </h5>
                            <ul className="loaction-area">
                                <li>
                                    <i className="bi bi-geo-alt"></i>{" "}
                                    {hotel.location}
                                </li>
                                <li>
                                    <a href="#">Xem vị trí</a>
                                </li>
                                <li>
                                    <span>cách trung tâm {}km</span>
                                </li>
                            </ul>
                            <ul className="facilisis">
                                <li>Locker</li>
                                {/* Add more facilities similarly */}
                            </ul>
                        </div>
                        <div className="content-bottom">
                            <div className="room-type">
                                <h6>{hotel.rooms?.[0].typeDisplayName}</h6>
                                <span>{hotel.rooms?.[0].available}</span>
                                <div className="deals">
                                    <span>
                                        <strong className="text-warning">
                                            {" "}
                                            {hotel.categoryDisplayName}
                                        </strong>
                                        <strong className="">
                                            <br></br>Miễn phí hủy
                                        </strong>
                                        <p>trước 48h</p>
                                    </span>
                                </div>
                            </div>
                            <div className="price-and-book">
                                <div className="price-area">
                                    <p>
                                        1 đêm, {hotel.rooms?.[0].capacity} người
                                    </p>
                                    <span>
                                        {convertToVND(
                                            hotel.rooms?.[0].basePrice
                                        )}
                                        <span className="p-1"></span>
                                        <del>
                                            {convertToVND(
                                                hotel.rooms?.[0].basePrice
                                            )}
                                        </del>
                                    </span>
                                </div>
                                <div className="book-btn">
                                    <Link
                                        onClick={() =>
                                            handleCheckRoom(
                                                hotel.id,
                                                hotel.rooms?.[0].id
                                            )
                                        }
                                        className="primary-btn2"
                                    >
                                        Kiểm tra phòng
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

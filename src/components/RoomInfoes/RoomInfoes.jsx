import React from "react";
import convertToVND from "../../utils/convertToVND";
import HotelAmenities from "../HotelAmenities/HotelAmenities";
import RoomAmenities from "../RoomAmenities/RoomAmenities";
import {
    convertRating5To10Scale,
    getRatingDescription,
} from "../../utils/ratingReview";

function RoomInfoes({ hotel, room }) {
    return (
        <>
            <div className="location-and-review">
                <div className="location">
                    <p>
                        <i className="bi bi-geo-alt"></i> {hotel.location} -{" "}
                        <a href="#">Xem bản đồ</a>
                    </p>
                </div>
                <div className="review-area">
                    <ul>
                        {Array.from({ length: 5 }, (_, index) => {
                            // Determine if the star should be full, half, or empty
                            const fullStar = index < Math.floor(hotel.rating);
                            const halfStar =
                                index === Math.floor(hotel.rating) &&
                                hotel.rating % 1 !== 0;

                            return (
                                <li key={index}>
                                    <i
                                        className={`bi ${
                                            fullStar
                                                ? "bi-star-fill" // Filled star
                                                : halfStar
                                                ? "bi-star-half" // Half star
                                                : "bi-star" // Empty star
                                        }`}
                                    ></i>
                                </li>
                            );
                        })}
                    </ul>
                    <span>
                        <strong>
                            {hotel.numOfReviews > 0 ? (
                                <>
                                    {convertRating5To10Scale(hotel.rating)} -{" "}
                                    {getRatingDescription(hotel.rating)}
                                </>
                            ) : (
                                "Chưa có đánh giá"
                            )}
                        </strong>{" "}
                        {hotel.numOfReviews > 0 &&
                            `${hotel.numOfReviews} đánh giá`}
                    </span>
                </div>
            </div>
            <h2>{hotel.name}</h2>
            <div className="price-area">
                <h6>
                    {convertToVND(room.basePrice)}/<span>1 đêm</span>
                </h6>
            </div>
            <p>{hotel.description}</p>
            {room.amenities.length > 0 && (
                <>
                    <h4>Tiện ích nổi bật trong phòng</h4>
                    <RoomAmenities amenities={room.amenities} />
                </>
            )}
            <h4>Thú cưng.</h4>
            <p>Pets not allowed</p>
            <h4>Trẻ em và giường phụ.</h4>
            <p>
                Children are welcome Kids stay free! Children stay free when
                using existing bedding; children may not be eligible for
                complimentary breakfast Rollaway/extra beds are available for $
                10 per day.
            </p>
            <h4>Tiện nghi</h4>
            <HotelAmenities amenities={hotel.amenities}></HotelAmenities>{" "}
        </>
    );
}

export default RoomInfoes;

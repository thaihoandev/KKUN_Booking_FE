import React from "react";
import convertToVND from "../../utils/convertToVND";
import HotelAmenities from "../HotelAmenities/HotelAmenities";
import RoomAmenities from "../RoomAmenities/RoomAmenities";
import {
    convertRating5To10Scale,
    getRatingDescription,
} from "../../utils/ratingReview";
import { useTranslation } from "react-i18next";

function RoomInfoes({ hotel, room }) {
    const { t } = useTranslation();

    return (
        <>
            <div className="location-and-review">
                <div className="location">
                    <p>
                        <i className="bi bi-geo-alt"></i> {hotel.location} -{" "}
                        <a href="#">{t("hotel.viewLocation")}</a>
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
                                `${t("noReviewsYet")}`
                            )}
                        </strong>
                        {" | "}
                        {hotel.numOfReviews > 0 &&
                            `${hotel.numOfReviews} ${t("reviewTitle")}`}
                    </span>
                </div>
            </div>
            <h2>{hotel.name}</h2>
            <div className="price-area">
                <h6>
                    {convertToVND(room.basePrice)}/<span>1 {t("night")}</span>
                </h6>
            </div>
            <p>{hotel.description}</p>
            {room.amenities.length > 0 && (
                <>
                    <h4>{t("roomDetails.amenitySpecial")}</h4>
                    <RoomAmenities amenities={room.amenities} />
                </>
            )}
            <h4>{t("roomDetailsPage.pet")}.</h4>
            <p>{t("roomDetailsPage.petnotAllowed")}</p>
            <h4>{t("roomDetailsPage.childAndBed")}.</h4>
            <p>{t("roomDetailsPage.childAndBedDesc")}</p>
            <h4>{t("roomDetailsPage.amenityTitle")}</h4>
            <HotelAmenities amenities={hotel.amenities}></HotelAmenities>{" "}
        </>
    );
}

export default RoomInfoes;

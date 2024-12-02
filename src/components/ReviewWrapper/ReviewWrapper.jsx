import React, { useEffect, useState } from "react";
import ReviewList from "./ReviewList/ReviewList";
import { useMutation } from "react-query";
import * as RoomService from "../../services/RoomService";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { convertRating5To10Scale } from "../../utils/ratingReview";
import { useTranslation } from "react-i18next";
function ReviewWrapper({ hotel, room }) {
    const { t } = useTranslation();

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const mutationReviewRoom = useMutation(
        (roomId) => {
            return RoomService.getRoomReview(roomId);
        },
        {
            onSuccess: (data) => {
                setReviews(data);
                setLoading(false);
            },
            onError: (error) => {
                toast.error(error.message);
                setLoading(false);
            },
        }
    );

    useEffect(() => {
        mutationReviewRoom.mutate(room.id);
    }, [room.id]);
    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <div className="review-wrapper mt-70">
                <div className="review-box">
                    <h4>{t("hotelReviews")}</h4>
                    <div className="total-review">
                        <h2>{convertRating5To10Scale(hotel.rating)}</h2>
                        <div className="review-wrap">
                            <ul className="star-list">
                                {Array.from({ length: 5 }, (_, index) => {
                                    const fullStar =
                                        index < Math.floor(hotel.rating);
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
                            <span className="">
                                {hotel.numOfReviews > 0
                                    ? `${hotel.numOfReviews} ${t(
                                          "reviewTitle"
                                      )}`
                                    : `${t("noReviewsYet")}`}
                            </span>
                        </div>
                    </div>
                </div>
                <ReviewList reviews={reviews} />
            </div>
        </>
    );
}

export default ReviewWrapper;

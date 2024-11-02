import React from "react";
import StarRating from "./StarRating/StarRating";
import { convertRating5To10Scale } from "../../utils/ratingReview";

function ReviewRating({ rating, numOfReviews }) {
    return (
        <>
            <div className="reviews">
                <StarRating rating={rating} />

                <span>
                    {rating > 0
                        ? `${convertRating5To10Scale(
                              rating
                          )} - ${numOfReviews} đánh giá`
                        : "Chưa có đánh giá"}
                </span>
            </div>
        </>
    );
}

export default ReviewRating;

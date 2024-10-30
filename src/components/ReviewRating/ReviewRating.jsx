import React from "react";
import StarRating from "./StarRating/StarRating";

function ReviewRating({ rating, numOfReviews }) {
    return (
        <>
            <div className="reviews">
                <StarRating rating={rating} />

                <span>
                    {rating > 0
                        ? `${rating} - ${numOfReviews} đánh giá`
                        : "Chưa có đánh giá"}
                </span>
            </div>
        </>
    );
}

export default ReviewRating;

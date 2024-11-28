import React from "react";
import StarRating from "./StarRating/StarRating";
import { convertRating5To10Scale } from "../../utils/ratingReview";
import { useTranslation } from "react-i18next";

function ReviewRating({ rating, numOfReviews }) {
    const { t } = useTranslation();

    return (
        <div className="reviews">
            <StarRating rating={rating} />
            <span>
                {rating > 0
                    ? `${convertRating5To10Scale(rating)} - ${numOfReviews} ${t(
                          "review"
                      )}`
                    : t("noReviewsYet")}
            </span>
        </div>
    );
}

export default ReviewRating;

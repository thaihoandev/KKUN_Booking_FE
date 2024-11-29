import React from "react";
import StarRating from "../../ReviewRating/StarRating/StarRating";
import { formatDateDDMMYYYY } from "../../../utils/utils";
import { useTranslation } from "react-i18next"; // Import useTranslation

function ReviewList({ reviews }) {
    const { t } = useTranslation(); // Khởi tạo useTranslation để lấy các bản dịch

    return (
        <div className="review-area">
            <ul className="comment">
                {reviews && reviews.length > 0 ? (
                    <>
                        {reviews.map((review, index) => (
                            <li key={index}>
                                <div className="single-comment-area">
                                    <div className="author-img">
                                        <img
                                            src={
                                                review.user?.avatar ||
                                                "/assets/img/default/avatar_default.jpg"
                                            }
                                            alt={`${
                                                review.user?.firstName ||
                                                review.reviewerName ||
                                                t("review.anonymous") // Dịch chuỗi "Anonymous"
                                            }`}
                                        />
                                    </div>
                                    <div className="comment-content w-100">
                                        <div className="author-name-deg">
                                            <h6>
                                                {review.user?.firstName &&
                                                review.user?.lastName
                                                    ? `${review.user.firstName} ${review.user.lastName}`
                                                    : review.reviewerName ||
                                                      t(
                                                          "review.anonymous"
                                                      )}{" "}
                                                {/* Dịch chuỗi "Anonymous" */}
                                            </h6>
                                            <span>
                                                {formatDateDDMMYYYY(
                                                    review.date
                                                )}
                                            </span>
                                        </div>
                                        <ul className="review-item-list col-xl-8">
                                            <li>
                                                <span>
                                                    {t("review.cleanliness")}
                                                </span>{" "}
                                                {/* Dịch "Sạch sẽ" */}
                                                <StarRating
                                                    rating={review.cleanliness}
                                                />
                                            </li>
                                            <li>
                                                <span>
                                                    {t("review.comfort")}
                                                </span>{" "}
                                                {/* Dịch "Thoải mái" */}
                                                <StarRating
                                                    rating={review.comfort}
                                                />
                                            </li>
                                            <li>
                                                <span>
                                                    {t("review.amenities")}
                                                </span>{" "}
                                                {/* Dịch "Tiện nghi" */}
                                                <StarRating
                                                    rating={review.amenities}
                                                />
                                            </li>
                                            <li>
                                                <span>{t("review.space")}</span>{" "}
                                                {/* Dịch "Không gian" */}
                                                <StarRating
                                                    rating={review.space}
                                                />
                                            </li>
                                            <li>
                                                <span>
                                                    {t("review.valueForMoney")}
                                                </span>{" "}
                                                {/* Dịch "Giá cả phù hợp" */}
                                                <StarRating
                                                    rating={
                                                        review.valueForMoney
                                                    }
                                                />
                                            </li>
                                        </ul>
                                        <p>{review.comment}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </>
                ) : (
                    <p className="text-center">{t("review.noReviews")}</p>
                )}
            </ul>
        </div>
    );
}

export default ReviewList;

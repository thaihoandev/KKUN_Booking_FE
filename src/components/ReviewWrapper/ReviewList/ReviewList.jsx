import React from "react";
import StarRating from "../../ReviewRating/StarRating/StarRating";
import { formatDateDDMMYYYY } from "../../../utils/utils";

function ReviewList({ reviews }) {
    return (
        <>
            <div className="review-area ">
                <ul className="comment">
                    {reviews && reviews.length > 0 ? (
                        <>
                            {reviews.map((review, index) => (
                                <>
                                    <li key={index}>
                                        <div className="single-comment-area">
                                            <div className="author-img">
                                                <img
                                                    src={
                                                        review.user?.avatar ||
                                                        "/assets/img/default/avatar_default.jpg"
                                                    }
                                                    alt={`${
                                                        review.user
                                                            ?.firstName ||
                                                        review.reviewerName ||
                                                        "Anonymous"
                                                    }`}
                                                />
                                            </div>
                                            <div className="comment-content w-100">
                                                <div className="author-name-deg">
                                                    <h6>
                                                        {review.user
                                                            ?.firstName &&
                                                        review.user?.lastName
                                                            ? `${review.user.firstName} ${review.user.lastName}`
                                                            : review.reviewerName ||
                                                              "Anonymous"}
                                                    </h6>
                                                    <span>
                                                        {formatDateDDMMYYYY(
                                                            review.date
                                                        )}
                                                    </span>
                                                </div>
                                                <ul className="review-item-list col-xl-8">
                                                    <li>
                                                        <span>Sạch sẽ</span>
                                                        <StarRating
                                                            rating={
                                                                review.cleanliness
                                                            }
                                                        />
                                                    </li>
                                                    <li>
                                                        <span>Thoải mái</span>
                                                        <StarRating
                                                            rating={
                                                                review.comfort
                                                            }
                                                        />
                                                    </li>
                                                    <li>
                                                        <span>Tiện nghi</span>
                                                        <StarRating
                                                            rating={
                                                                review.amenities
                                                            }
                                                        />
                                                    </li>
                                                    <li>
                                                        <span>Không gian</span>
                                                        <StarRating
                                                            rating={
                                                                review.space
                                                            }
                                                        />
                                                    </li>
                                                    <li>
                                                        <span>
                                                            Giá cả phù hợp
                                                        </span>
                                                        <StarRating
                                                            rating={
                                                                review.valueForMoney
                                                            }
                                                        />
                                                    </li>
                                                </ul>
                                                <p>{review.comment} </p>
                                            </div>
                                        </div>
                                    </li>
                                </>
                            ))}
                        </>
                    ) : (
                        <p className="text-center">
                            Chưa có đánh giá nào cho phòng này.
                        </p>
                    )}
                </ul>
            </div>
        </>
    );
}

export default ReviewList;

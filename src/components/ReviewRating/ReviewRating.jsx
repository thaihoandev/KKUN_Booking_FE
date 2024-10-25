import React from "react";

function ReviewRating({ rating, numOfReviews }) {
    return (
        <>
            <div className="reviews">
                <ul>
                    {Array.from({ length: 5 }, (_, index) => {
                        const fullStar = index < Math.floor(rating);
                        const halfStar =
                            index === Math.floor(rating) && rating % 1 !== 0;

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
                    {rating > 0
                        ? `${rating} - ${numOfReviews} đánh giá`
                        : "Chưa có đánh giá"}
                </span>
            </div>
        </>
    );
}

export default ReviewRating;

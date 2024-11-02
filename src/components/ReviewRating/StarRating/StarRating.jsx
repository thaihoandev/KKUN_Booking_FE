import React from "react";

function StarRating({ rating }) {
    return (
        <ul className="star-list">
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
    );
}

export default StarRating;

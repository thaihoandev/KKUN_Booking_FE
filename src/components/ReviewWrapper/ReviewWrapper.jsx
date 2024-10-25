import React from "react";
import ReviewList from "./ReviewList/ReviewList";

function ReviewWrapper() {
    return (
        <>
            <div className="review-wrapper mt-70">
                <h4>Đánh giá</h4>
                <div className="review-box">
                    <div className="total-review">
                        <h2>9.5</h2>
                        <div className="review-wrap">
                            <ul className="star-list">
                                <li>
                                    <i className="bi bi-star-fill"></i>
                                </li>
                                <li>
                                    <i className="bi bi-star-fill"></i>
                                </li>
                                <li>
                                    <i className="bi bi-star-fill"></i>
                                </li>
                                <li>
                                    <i className="bi bi-star-fill"></i>
                                </li>
                                <li>
                                    <i className="bi bi-star-half"></i>
                                </li>
                            </ul>
                            <span>2590 Reviews</span>
                        </div>
                    </div>

                    <div
                        className="modal fade"
                        id="exampleModalToggle"
                        aria-hidden="true"
                        tabindex="-1"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                    <div className="row g-2">
                                        <div className="col-lg-8">
                                            <div className="review-from-wrapper">
                                                <h4>Write Your Review</h4>
                                                <form>
                                                    <div className="row">
                                                        <div className="col-md-6 mb-20">
                                                            <div className="form-inner">
                                                                <label>
                                                                    Name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Enter Your Name:"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mb-20">
                                                            <div className="form-inner">
                                                                <label>
                                                                    Email
                                                                </label>
                                                                <input
                                                                    type="email"
                                                                    placeholder="Enter Your Email:"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 mb-20">
                                                            <div className="form-inner">
                                                                <label>
                                                                    Review*
                                                                </label>
                                                                <textarea
                                                                    name="message"
                                                                    placeholder="Enter Your Review..."
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 mb-40">
                                                            <div className="star-rating-wrapper">
                                                                <ul className="star-rating-list">
                                                                    <li>
                                                                        <div
                                                                            className="rating-container"
                                                                            data-rating="0"
                                                                        >
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                        </div>
                                                                        <span>
                                                                            Cleanliness
                                                                        </span>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            className="rating-container"
                                                                            data-rating="0"
                                                                        >
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                        </div>
                                                                        <span>
                                                                            Location
                                                                        </span>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            className="rating-container"
                                                                            data-rating="0"
                                                                        >
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                        </div>
                                                                        <span>
                                                                            Service
                                                                        </span>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            className="rating-container"
                                                                            data-rating="0"
                                                                        >
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                        </div>
                                                                        <span>
                                                                            Facilities
                                                                        </span>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            className="rating-container"
                                                                            data-rating="0"
                                                                        >
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                            <i className="bi bi-star-fill star-icon"></i>
                                                                        </div>
                                                                        <span>
                                                                            Value
                                                                            for
                                                                            money
                                                                        </span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <button
                                                                type="submit"
                                                                className="primary-btn1"
                                                            >
                                                                Submit Now
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 d-lg-flex d-none">
                                            <div className="modal-form-image">
                                                <img
                                                    src="assets/img/innerpage/form-image.jpg"
                                                    alt="image"
                                                    className="img-fluid"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a
                        className="primary-btn1"
                        data-bs-toggle="modal"
                        href="#exampleModalToggle"
                        role="button"
                    >
                        GIVE A RATING
                    </a>
                </div>
                <ReviewList />
            </div>
        </>
    );
}

export default ReviewWrapper;

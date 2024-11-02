import React from "react";

function RoomCreate() {
    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="main-content-title-profile mb-50">
                        <div className="main-content-title">
                            <h3>Thêm phòng</h3>
                        </div>
                    </div>
                    <div className="dashboard-profile-wrapper two">
                        <div className="dashboard-profile-tab-content">
                            <form>
                                <div className="row">
                                    <div className="col-md-6 mb-30">
                                        <div className="form-inner">
                                            <label>Room Type</label>
                                            <select style={{ display: "none" }}>
                                                <option>
                                                    Deluxe King Room
                                                </option>
                                                <option>Single Room</option>
                                                <option>Executive Suite</option>
                                                <option>
                                                    classNameic Room
                                                </option>
                                            </select>
                                            <div
                                                className="nice-select"
                                                tabindex="0"
                                            >
                                                <span className="current">
                                                    Deluxe King Room
                                                </span>
                                                <ul className="list">
                                                    <li
                                                        data-value="Deluxe King Room"
                                                        className="option selected"
                                                    >
                                                        Deluxe King Room
                                                    </li>
                                                    <li
                                                        data-value="Single Room"
                                                        className="option"
                                                    >
                                                        Single Room
                                                    </li>
                                                    <li
                                                        data-value="Executive Suite"
                                                        className="option"
                                                    >
                                                        Executive Suite
                                                    </li>
                                                    <li
                                                        data-value="classNameic Room"
                                                        className="option"
                                                    >
                                                        classNameic Room
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-inner mb-30">
                                            <label>Price</label>
                                            <input
                                                type="text"
                                                placeholder="Price here..."
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-inner mb-30">
                                            <label>Discount Price</label>
                                            <input
                                                type="text"
                                                placeholder="Discount price here"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-inner mb-30">
                                            <label>Facilities</label>
                                            <input
                                                type="text"
                                                placeholder="Facilities here..."
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-inner mb-30">
                                            <label>
                                                Number Of People (max)
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Number of people here...."
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-inner mb-30">
                                            <label>Location</label>
                                            <input
                                                type="text"
                                                placeholder="Location here..."
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="location-map mb-30">
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.5647631857846!2d90.36311167605992!3d23.83407118555764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c14c8682a473%3A0xa6c74743d52adb88!2sEgens%20Lab!5e0!3m2!1sen!2sbd!4v1694943917248!5m2!1sen!2sbd"
                                                allowfullscreen=""
                                                loading="lazy"
                                                referrerpolicy="no-referrer-when-downgrade"
                                            ></iframe>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-30">
                                        <div className="form-inner">
                                            <label>Description</label>
                                            <textarea placeholder="Description here"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="upload-img-area">
                                    <div className="upload-img-wrapper">
                                        <div className="drag-area">
                                            <button
                                                type="button"
                                                className="upload-btn"
                                            >
                                                <i className="bi bi-plus-lg"></i>
                                            </button>
                                            <input type="file" hidden="" />
                                        </div>
                                    </div>
                                    <div className="upload-img-area-content">
                                        <h6>Upload Your Image</h6>
                                        <p>
                                            Image required size 300*300, JPGE or
                                            PNG format.
                                        </p>
                                    </div>
                                </div>
                                <div className="form-inner mb-50">
                                    <label className="containerss">
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                        <span className="text">
                                            Update details in all properties
                                            included in this site.
                                        </span>
                                    </label>
                                </div>
                                <div className="form-inner">
                                    <button
                                        type="submit"
                                        className="primary-btn3"
                                    >
                                        Publish Now
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RoomCreate;

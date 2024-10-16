import React from "react";

const Banner = ({ backgroundImage, country, heading, description }) => {
    return (
        <div
            className="home1-banner-wrapper"
            style={{
                backgroundImage: `linear-gradient(
          180deg,
          rgba(16, 12, 8, 0.4) 0%,
          rgba(16, 12, 8, 0.4) 100%
        ), url(${backgroundImage})`,
            }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="home1-banner-content">
                            <div className="eg-tag">
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                    >
                                        <path d="..." />
                                    </svg>
                                    {country}
                                </span>
                            </div>
                            <h2>{heading}</h2>
                            <p>{description}</p>
                            <div className="banner-content-bottom">
                                <a
                                    href="package-grid.html"
                                    className="primary-btn1"
                                >
                                    Book A Trip
                                </a>
                                <div className="rating-area">
                                    <div className="icon">
                                        <img
                                            src="assets/img/home1/icon/tripadvisor-logo.svg"
                                            alt="tripadvisor logo"
                                        />
                                    </div>
                                    <div className="content">
                                        <div className="text-logo">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="110"
                                                height="19"
                                                viewBox="0 0 110 19"
                                            >
                                                <path d="..." />
                                            </svg>
                                        </div>
                                        <div className="rating">
                                            <ul>
                                                <li>
                                                    <i className="bi bi-circle-fill"></i>
                                                </li>
                                                <li>
                                                    <i className="bi bi-circle-fill"></i>
                                                </li>
                                                <li>
                                                    <i className="bi bi-circle-fill"></i>
                                                </li>
                                                <li>
                                                    <i className="bi bi-circle-fill"></i>
                                                </li>
                                                <li>
                                                    <i className="bi bi-circle-half"></i>
                                                </li>
                                            </ul>
                                            <span>4.5/5.0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;

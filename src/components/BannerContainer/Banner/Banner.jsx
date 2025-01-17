import React from "react";
import { useTranslation } from "react-i18next";

const Banner = ({ backgroundImage, country, heading, description }) => {
    const { t } = useTranslation();
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
                                    {t(country)} {/* Dịch tên quốc gia */}
                                </span>
                            </div>
                            <h2>{t(heading)}</h2> {/* Dịch tiêu đề */}
                            <p>{t(description)}</p> {/* Dịch mô tả */}
                            <div className="banner-content-bottom">
                                <a href="/" className="primary-btn1">
                                    {t("booking.booking")}{" "}
                                    {/* Dịch nút đặt phòng */}
                                </a>
                                <div className="rating-area">
                                    <div className="icon">
                                        <img
                                            src="assets/img/logo_kkun/Trans_logoKKUNFull.png"
                                            alt="kkunbooking logo"
                                            style={{
                                                height: "40px",
                                                width: "40px",
                                            }}
                                        />
                                    </div>
                                    <div className="content">
                                        <div className="text-logo">
                                            <img
                                                src="assets/img/logo_kkun/Trans_logo_kkunbooking.png"
                                                alt="kkunbooking logo"
                                                style={{
                                                    height: "20px",
                                                    width: "100px",
                                                }}
                                            />
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

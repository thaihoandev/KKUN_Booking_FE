import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, EffectFade, Autoplay } from "swiper/modules";

import "daterangepicker";

import "swiper/css"; // Import CSS cho Swiper
import "swiper/css/navigation"; // Import CSS cho Navigation
import "bootstrap-icons/font/bootstrap-icons.css";
import "daterangepicker/daterangepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Banner from "../../components/BannerContainer/Banner/Banner";

import SearchContainer from "../SearchContainer/SearchContainer";
import { useTranslation } from "react-i18next";

function BannerContainer() {
    const { t } = useTranslation();

    return (
        <>
            <ToastContainer />
            <div>
                <div className="home1-banner-area">
                    <div className="container-fluid">
                        {/* Swiper component */}
                        <Swiper
                            modules={[Navigation, EffectFade, Autoplay]}
                            fadeEffect={{
                                crossFade: true,
                            }}
                            effect="fade"
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            speed={800}
                            navigation={{
                                nextEl: ".home1-banner-next",
                                prevEl: ".home1-banner-prev",
                            }}
                            className="swiper home1-banner-slider"
                        >
                            <SwiperSlide>
                                <Banner
                                    backgroundImage="https://media-cdn-v2.laodong.vn/storage/newsportal/2023/9/8/1239023/Vinh-Nha-Trang.jpg"
                                    country={t("banner.nhaTrang.heading")}
                                    heading={t("banner.nhaTrang.heading")}
                                    description={t(
                                        "banner.nhaTrang.description"
                                    )}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Banner
                                    backgroundImage="https://wallpapershome.com/images/pages/pic_h/332.jpg"
                                    country={t("banner.haLong.heading")}
                                    heading={t("banner.haLong.heading")}
                                    description={t("banner.haLong.description")}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Banner
                                    backgroundImage="https://rootytrip.com/wp-content/uploads/2024/07/phu-quoc.jpg"
                                    country={t("banner.phuQuoc.heading")}
                                    heading={t("banner.phuQuoc.heading")}
                                    description={t(
                                        "banner.phuQuoc.description"
                                    )}
                                />
                            </SwiperSlide>
                        </Swiper>

                        {/* Nút prev và next */}
                        <div className="slider-btn-grp">
                            <div className="slider-btn home1-banner-prev">
                                <i className="bi bi-arrow-left"></i>
                            </div>
                            <div className="slider-btn home1-banner-next">
                                <i className="bi bi-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="home1-banner-bottom mb-120">
                    <SearchContainer shouldNavigate={true} />
                </div>
            </div>
        </>
    );
}

export default BannerContainer;

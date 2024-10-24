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

function BannerContainer() {
    return (
        <>
            <ToastContainer />
            <div>
                <div className="home1-banner-area">
                    <div className="container-fluid">
                        {/* Swiper component */}
                        <Swiper
                            modules={[Navigation, EffectFade, Autoplay]} // Kích hoạt module Navigation
                            fadeEffect={{
                                crossFade: true, // Hiệu ứng chuyển tiếp mượt
                            }}
                            effect="fade"
                            autoplay={{
                                delay: 5000, // Tự động chuyển slide sau 2 giây
                                disableOnInteraction: false, // Không dừng autoplay khi người dùng tương tác
                            }}
                            speed={800}
                            navigation={{
                                nextEl: ".home1-banner-next", // Liên kết với nút next
                                prevEl: ".home1-banner-prev", // Liên kết với nút prev
                            }}
                            className="swiper home1-banner-slider"
                        >
                            <SwiperSlide>
                                <Banner
                                    backgroundImage="assets/img/home1/home1-banner-img1.png"
                                    country="United States"
                                    heading="Let's Travel And Explore Destination."
                                    description="Life is unpredictable, and we understand that plans might change. Enjoy flexible booking options, so you can reschedule or modify your trip with ease."
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Banner
                                    backgroundImage="assets/img/home1/home1-banner-img2.png"
                                    country="France"
                                    heading="Let’s Explore Your Holiday Trip."
                                    description="Life is unpredictable, and we understand that plans might change. Enjoy flexible booking options, so you can reschedule or modify your trip with ease."
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Banner
                                    backgroundImage="assets/img/home1/home1-banner-img3.png"
                                    country="Spain"
                                    heading="Let's journey and discover a place."
                                    description="Life is unpredictable, and we understand that plans might change. Enjoy flexible booking options, so you can reschedule or modify your trip with ease."
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

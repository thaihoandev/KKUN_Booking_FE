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
                                    backgroundImage="https://media-cdn-v2.laodong.vn/storage/newsportal/2023/9/8/1239023/Vinh-Nha-Trang.jpg"
                                    country="Thành phố Nha Trang"
                                    heading="Hãy xách vali lên và khám phá thôi."
                                    description="Cuộc sống là không thể đoán trước, và chúng tôi hiểu rằng kế hoạch có thể thay đổi. Tận hưởng các tùy chọn đặt chỗ linh hoạt để bạn có thể dễ dàng thay đổi lịch trình hoặc điều chỉnh chuyến đi của mình."
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Banner
                                    backgroundImage="https://wallpapershome.com/images/pages/pic_h/332.jpg"
                                    country="Vịnh Hạ Long"
                                    heading="Khám phá những kỳ quan hùng vĩ."
                                    description="Cuộc sống luôn mang đến những điều bất ngờ, và chúng tôi thấu hiểu rằng kế hoạch có thể thay đổi. Hãy tận hưởng các lựa chọn đặt chỗ linh hoạt để bạn có thể dễ dàng thay đổi hoặc điều chỉnh chuyến đi của mình."
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Banner
                                    backgroundImage="https://rootytrip.com/wp-content/uploads/2024/07/phu-quoc-1536x864.jpg"
                                    country="Đảo Phú Quốc"
                                    heading="Hãy cùng nhau khám phá những vùng đất mới."
                                    description="Cuộc sống đầy những khám phá mới lạ, và chúng tôi hiểu rằng kế hoạch có thể thay đổi. Với các lựa chọn đặt phòng linh hoạt, bạn hoàn toàn có thể tự do điều chỉnh chuyến đi của mình để tận hưởng mọi trải nghiệm theo cách riêng."
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

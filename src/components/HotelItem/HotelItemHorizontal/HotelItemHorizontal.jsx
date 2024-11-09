import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// Import required modules
import { Pagination, Autoplay } from "swiper/modules";
import convertToVND from "../../../utils/convertToVND";
import ReviewRating from "../../ReviewRating/ReviewRating";
function HotelItemHorizontal({ hotel }) {
    const navigate = useNavigate();
    const handleCheckRoom = () => {
        navigate(
            "/hotels/" + hotel.hotelDto.id + "/rooms/" + hotel.bestRoom.id
        );
    };
    return (
        <>
            <div class="room-suits-card mb-30">
                <div class="row g-0">
                    <div class="col-md-4">
                        <div class="swiper hotel-img-slider">
                            <span class="batch">Bữa sáng miễn phí</span>
                            <Swiper
                                style={{ height: "100%" }}
                                pagination={{
                                    clickable: true,
                                    el: ".swiper-pagination5",
                                }}
                                modules={[Pagination]}
                                className="mySwiper"
                            >
                                {/* Nếu có hình ảnh từ API */}
                                {hotel.hotelDto?.exteriorImages &&
                                    hotel.hotelDto.exteriorImages.map(
                                        (image, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="room-img">
                                                    <img
                                                        style={{
                                                            height: "300px",
                                                            width: "100%",
                                                            objectFit: "cover",
                                                        }}
                                                        src={
                                                            image ||
                                                            "assets/img/placeholder.jpg"
                                                        }
                                                        alt={`${
                                                            hotel.hotelDto?.name
                                                        } Exterior ${
                                                            index + 1
                                                        }`}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        )
                                    )}

                                {/* Fallback nếu không có hình ảnh */}
                                {(!hotel.hotelDto?.exteriorImages ||
                                    hotel.hotelDto.exteriorImages.length ===
                                        0) && (
                                    <SwiperSlide>
                                        <div className="room-img">
                                            <img
                                                src="assets/img/placeholder.jpg"
                                                alt="Hotel placeholder"
                                            />
                                        </div>
                                    </SwiperSlide>
                                )}
                                <div class="swiper-pagination5"></div>
                            </Swiper>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="room-content">
                            <div class="content-top">
                                <ReviewRating
                                    rating={hotel.hotelDto.rating}
                                    numOfReviews={hotel.hotelDto.numOfReviews}
                                ></ReviewRating>
                                <h5>
                                    <a href="hotel-details.html">
                                        {hotel.hotelDto?.name || "Hotel Name"}
                                    </a>
                                </h5>
                                <ul class="loaction-area">
                                    <li>
                                        <i class="bi bi-geo-alt"></i>
                                        {hotel.hotelDto?.location ||
                                            "Địa điểm không có sẵn"}
                                    </li>
                                    <li>
                                        <a href="#">Xem trên bản đồ</a>
                                    </li>
                                    <li>
                                        <span>cách trung tâm ...km</span>
                                    </li>
                                </ul>
                                <ul class="facilisis">
                                    <li>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 18 18"
                                        >
                                            <g>
                                                <path d="M0.180398 0.0492477C0.00110123 0.147686 0.00461685 0.0984669 0.00461685 2.54885C0.00110123 5.11526 0.00110123 5.11877 0.247195 5.61799C0.41946 5.96252 0.753444 6.3176 1.08391 6.50392L1.30188 6.62697L1.30891 11.918L1.31946 17.209L1.39329 17.3707C1.50227 17.6027 1.66751 17.7715 1.8925 17.884C2.05774 17.9648 2.1386 17.9824 2.35657 17.9824C2.79602 17.9824 3.13703 17.7645 3.31985 17.3707L3.39367 17.209L3.40422 11.918L3.41477 6.62697L3.63274 6.50392C3.95969 6.3176 4.29367 5.96252 4.46594 5.61799C4.71203 5.11877 4.71203 5.11174 4.71203 2.55588C4.71203 0.084404 4.71555 0.130108 4.51867 0.0422173C4.40266 -0.0105171 4.31828 -0.0105171 4.20227 0.0422173C4.00891 0.130108 4.00891 0.11253 4.00891 2.21487V4.14846H3.6925H3.3761V2.21487C3.3761 0.794559 3.36555 0.260185 3.33391 0.193388C3.28821 0.0914345 3.14055 2.86102e-05 3.02453 2.86102e-05C2.90852 2.86102e-05 2.76086 0.0914345 2.71516 0.193388C2.68352 0.260185 2.67297 0.794559 2.67297 2.21487V4.14846H2.35657H2.04016V2.21487C2.04016 0.794559 2.02961 0.260185 1.99797 0.193388C1.92415 0.0281544 1.70969 -0.0421581 1.5304 0.0422173C1.33704 0.130108 1.33704 0.11253 1.33704 2.21487V4.14846H1.02063H0.704225V2.21487C0.704225 0.794559 0.693678 0.260185 0.662038 0.193388C0.584694 0.0246391 0.352663 -0.0456734 0.180398 0.0492477ZM3.9632 4.97112C3.90344 5.34729 3.49914 5.82189 3.10891 5.97307C2.99641 6.01877 2.8593 6.09963 2.80657 6.15588L2.70813 6.25783V11.6402C2.70813 17.4902 2.71868 17.1633 2.51477 17.2547C2.39875 17.3074 2.31438 17.3074 2.19836 17.2547C1.99446 17.1633 2.005 17.4902 2.005 11.6402V6.26486L1.9136 6.15588C1.86438 6.09611 1.80461 6.04689 1.78 6.04689C1.67102 6.04689 1.30188 5.82189 1.13665 5.65666C0.950318 5.47033 0.781569 5.1715 0.749928 4.97112L0.728835 4.85158H2.35657H3.9843L3.9632 4.97112Z" />
                                                <path d="M17.3467 0.137138C17.0268 0.351591 16.5733 0.759403 16.2709 1.10393C15.5291 1.94065 15.0194 2.98831 14.7944 4.12033C14.717 4.50705 14.717 4.59494 14.703 7.24572C14.6924 10.2586 14.6889 10.2199 14.9104 10.6594C14.9913 10.8176 15.1424 11.0039 15.4553 11.3203L15.8913 11.7633L15.8983 14.4879C15.9088 17.1703 15.9088 17.2125 15.9827 17.3707C16.0916 17.6027 16.2569 17.7715 16.4819 17.884C16.6471 17.9648 16.728 17.9824 16.9459 17.9824C17.3854 17.9824 17.7264 17.7645 17.9092 17.3707L17.983 17.209L17.9936 8.75392C18.0006 2.42932 17.9901 0.274248 17.962 0.200418C17.9162 0.0914345 17.7686 2.86102e-05 17.6385 2.86102e-05C17.5893 2.86102e-05 17.4592 0.0633106 17.3467 0.137138ZM17.2588 17.0965C17.2131 17.202 17.0655 17.2969 16.9459 17.2969C16.844 17.2969 16.6788 17.2055 16.6436 17.1316C16.626 17.0965 16.6049 15.8063 16.5944 14.2664L16.5768 11.4645L16.0811 10.9617C15.7577 10.6313 15.5573 10.3992 15.501 10.2832L15.4166 10.1074L15.4061 7.52697C15.3991 5.38947 15.4061 4.87268 15.4518 4.53869C15.6065 3.33284 16.1444 2.22542 16.9811 1.37464L17.2799 1.07229L17.2905 9.03517C17.2975 14.9766 17.287 17.0227 17.2588 17.0965Z" />
                                                <path d="M8.22656 2.32383C7.57968 2.39766 6.78164 2.62266 6.20508 2.89688C5.85352 3.06211 5.76562 3.15 5.76562 3.33282C5.76562 3.49453 5.92734 3.65625 6.08555 3.65625C6.14883 3.65625 6.40547 3.57188 6.65859 3.46641C7.67812 3.04102 8.71875 2.90039 9.78398 3.04102C11.0601 3.20977 12.1535 3.72656 13.1098 4.62305C13.4402 4.92891 13.4789 4.95703 13.609 4.95703C13.8129 4.95703 13.957 4.80938 13.957 4.60195C13.957 4.46484 13.9394 4.43672 13.6933 4.19766C12.6 3.13594 11.2184 2.48907 9.69609 2.32383C9.30234 2.27813 8.61328 2.28164 8.22656 2.32383Z" />
                                                <path d="M8.49175 4.02902C7.72183 4.11339 6.86753 4.4298 6.19253 4.8798C5.79878 5.13996 5.14136 5.79738 4.88121 6.18761C4.50152 6.76066 4.25191 7.34776 4.10777 8.01222C3.99878 8.49386 4.0023 9.49932 4.10777 9.98799C4.54371 11.9814 6.03081 13.4649 8.02768 13.8938C8.54097 14.0028 9.46206 14.0028 9.97182 13.8938C10.4851 13.7849 10.8296 13.6618 11.2902 13.4228C12.6296 12.7372 13.5683 11.4927 13.8953 9.97393C13.9972 9.49581 14.0042 8.57472 13.9093 8.10362C13.5964 6.52159 12.6156 5.22785 11.1988 4.52472C10.5308 4.19425 9.91909 4.0466 9.14214 4.0255C8.86089 4.01847 8.56909 4.02199 8.49175 4.02902ZM9.63784 4.76378C11.0124 4.97121 12.2078 5.83956 12.8441 7.10167C13.0199 7.45323 13.1781 7.95245 13.2378 8.36378C13.5894 10.6946 11.9722 12.8849 9.63432 13.2399C7.78159 13.5177 5.94644 12.5403 5.13433 10.8458C4.17457 8.83839 4.90933 6.4548 6.83941 5.30167C7.65503 4.813 8.67456 4.61613 9.63784 4.76378Z" />
                                                <path d="M8.83828 5.80063C8.72227 5.84633 8.64844 5.97641 8.64844 6.12758C8.64844 6.47914 9.14062 6.59867 9.30234 6.2893C9.46055 5.97993 9.16172 5.66703 8.83828 5.80063Z" />
                                                <path d="M7.54427 6.12056C6.60912 6.59166 5.94818 7.51978 5.80404 8.5604C5.74076 9.01743 5.74779 9.09478 5.8849 9.23189C6.01849 9.36548 6.13099 9.38306 6.28919 9.29868C6.41224 9.2354 6.45091 9.13345 6.49662 8.73267C6.5388 8.36353 6.65833 7.99087 6.82708 7.70611C7.00286 7.40376 7.45638 6.97134 7.78685 6.78853C7.94153 6.70064 8.09622 6.60923 8.12786 6.58111C8.21927 6.50377 8.24388 6.32095 8.17708 6.19439C8.06458 5.97994 7.86419 5.95533 7.54427 6.12056Z" />
                                                <path d="M13.881 12.6143C13.8494 12.6283 13.635 12.8358 13.41 13.0748C12.4994 14.0276 11.5853 14.5619 10.3619 14.8537C8.89941 15.2018 7.28223 14.9592 5.99551 14.2033C5.79864 14.0873 5.63692 14.017 5.56661 14.017C5.32403 14.01 5.14825 14.2631 5.23965 14.4881C5.2959 14.6182 5.48926 14.7483 5.99551 15.0014C8.8291 16.4217 12.2709 15.6658 14.2502 13.1908C14.31 13.1135 14.3451 13.0256 14.3451 12.9518C14.3451 12.7338 14.0674 12.5334 13.881 12.6143Z" />
                                                <path d="M4.32967 13.1978C4.28397 13.2225 4.2242 13.2822 4.19959 13.3279C4.00272 13.683 4.46678 14.0346 4.75155 13.7498C5.03631 13.465 4.68475 13.001 4.32967 13.1978Z" />
                                            </g>
                                        </svg>{" "}
                                        Restaurant
                                    </li>
                                </ul>
                            </div>
                            <div class="content-bottom">
                                <div class="room-type">
                                    <h6>
                                        {hotel.bestRoom?.typeDisplayName ||
                                            "Không có sẵn"}
                                    </h6>
                                    <span>
                                        {hotel.bestRoom?.available
                                            ? "Còn phòng"
                                            : "Hết phòng"}
                                    </span>

                                    <div class="deals">
                                        <span>
                                            <strong>Miễn phí hủy</strong> <br />{" "}
                                            trước 48 giờ
                                        </span>
                                    </div>
                                </div>
                                <div class="price-and-book">
                                    <div class="price-area">
                                        <p>
                                            1 đêm,{" "}
                                            {hotel.bestRoom?.capacity ||
                                                "Không có sẵn"}{" "}
                                            người
                                        </p>
                                        <span>
                                            {convertToVND(
                                                hotel.bestRoom?.basePrice
                                            ) || "NaN"}
                                            <del>$3000</del>
                                        </span>
                                    </div>
                                    <div class="book-btn">
                                        <Link
                                            onClick={handleCheckRoom}
                                            href="hotel-details.html"
                                            class="primary-btn2"
                                        >
                                            Xem phòng{" "}
                                            <i class="bi bi-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HotelItemHorizontal;

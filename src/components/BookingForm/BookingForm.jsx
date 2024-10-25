import React from "react";

function BookingForm() {
    return (
        <>
            <div className="booking-form-wrap mb-30">
                <h4>Đặt phòng ngay</h4>
                <p>
                    Đặt phòng ngay để được tận hưởng những ưu đãi, tiện ích sớm
                    để không gặp phải những rắc rối!
                </p>
                <div className="nav nav-pills mb-40" role="tablist">
                    <button
                        className="nav-link show active"
                        id="v-pills-booking-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-booking"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-booking"
                        aria-selected="true"
                    >
                        Đặt Online
                    </button>
                    <button
                        className="nav-link"
                        id="v-pills-contact-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-contact"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-contact"
                        aria-selected="false"
                    >
                        Biểu mẫu thông tin
                    </button>
                </div>
                <div className="tab-content" id="v-pills-tabContent2">
                    <div
                        className="tab-pane fade active show"
                        id="v-pills-booking"
                        role="tabpanel"
                        aria-labelledby="v-pills-booking-tab"
                    >
                        <div className="sidebar-booking-form">
                            <form>
                                <div className="tour-date-wrap mb-50">
                                    <h6>Xác nhận ngày đặt:</h6>
                                    <div className="form-check mb-25">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="tourDate"
                                            id="checkIn"
                                            value="option1"
                                            checked
                                        />
                                        <label
                                            className="form-check-label"
                                            for="checkIn"
                                        >
                                            <span className="tour-date">
                                                <span className="start-date">
                                                    <span>Ngày nhận</span>
                                                    <span> Jan 1, 2024 </span>
                                                </span>
                                                <i className="bi bi-arrow-right"></i>
                                                <span className="end-date text-end">
                                                    <span>Ngày trả</span>
                                                    <span>Jan 5, 2024</span>
                                                </span>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div className="booking-form-item-type mb-45">
                                    <div className="number-input-item adults">
                                        <label className="number-input-lable">
                                            Người lớn:<span></span>
                                            <span>
                                                {" "}
                                                $60 <del>$80</del>
                                            </span>
                                        </label>
                                        <div className="quantity-counter">
                                            <a
                                                href="#"
                                                className="quantity__minus"
                                            >
                                                <i className="bi bi-dash"></i>
                                            </a>
                                            <input
                                                name="quantity"
                                                type="text"
                                                className="quantity__input"
                                                value="04"
                                            />
                                            <a
                                                href="#"
                                                className="quantity__plus"
                                            >
                                                <i className="bi bi-plus"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="number-input-item children">
                                        <label className="number-input-lable">
                                            Trẻ em:
                                            <span></span>
                                            <span>$15</span>
                                        </label>
                                        <div className="quantity-counter">
                                            <a
                                                href="#"
                                                className="quantity__minus"
                                            >
                                                <i className="bi bi-dash"></i>
                                            </a>
                                            <input
                                                name="quantity"
                                                type="text"
                                                className="quantity__input"
                                                value="04"
                                            />
                                            <a
                                                href="#"
                                                className="quantity__plus"
                                            >
                                                <i className="bi bi-plus"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="booking-form-item-type">
                                    <h5>Những dịch vụ khác</h5>
                                    <div className="checkbox-container">
                                        <label className="check-container">
                                            Home Pickup
                                            <input
                                                type="checkbox"
                                                className="services_check"
                                                name="services_list[]"
                                                value="0"
                                            />
                                            <span className="checkmark"></span>
                                            <span className="price">$10 </span>
                                        </label>
                                    </div>
                                </div>
                                <div className="booking-form-item-type">
                                    <div className="single-total mb-30">
                                        <span>Người lớn</span>
                                        <ul>
                                            <li>
                                                <strong>$195</strong> PRICE
                                            </li>
                                            <li>
                                                <i className="bi bi-x-lg"></i>
                                            </li>
                                            <li>
                                                <strong>02</strong> QTY
                                            </li>
                                            <li>
                                                <i className="bi bi-x-lg"></i>
                                            </li>
                                            <li>
                                                <strong>04</strong> DAYS
                                            </li>
                                        </ul>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="27"
                                            height="15"
                                            viewBox="0 0 27 15"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M23.999 5.44668L25.6991 7.4978L23.9991 9.54878H0V10.5743H23.1491L20.0135 14.3575L20.7834 14.9956L26.7334 7.81687L26.9979 7.4978L26.7334 7.17873L20.7834 0L20.0135 0.638141L23.149 4.42114H0V5.44668H23.999Z"
                                            />
                                        </svg>
                                        <div className="total">$390</div>
                                    </div>
                                    <div className="single-total mb-30">
                                        <span>Trẻ em</span>
                                        <ul>
                                            <li>
                                                <strong>$195</strong> PRICE
                                            </li>
                                            <li>
                                                <i className="bi bi-x-lg"></i>
                                            </li>
                                            <li>
                                                <strong>02</strong> QTY
                                            </li>
                                            <li>
                                                <i className="bi bi-x-lg"></i>
                                            </li>
                                            <li>
                                                <strong>04</strong> DAYS
                                            </li>
                                        </ul>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="27"
                                            height="15"
                                            viewBox="0 0 27 15"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M23.999 5.44668L25.6991 7.4978L23.9991 9.54878H0V10.5743H23.1491L20.0135 14.3575L20.7834 14.9956L26.7334 7.81687L26.9979 7.4978L26.7334 7.17873L20.7834 0L20.0135 0.638141L23.149 4.42114H0V5.44668H23.999Z"
                                            />
                                        </svg>
                                        <div className="total">$390</div>
                                    </div>
                                </div>
                                <div className="total-price">
                                    <span>Tổng tiền:</span> $470
                                </div>
                                <button
                                    type="submit"
                                    className="primary-btn1 two"
                                >
                                    Đặt ngay
                                </button>
                            </form>
                        </div>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="v-pills-contact"
                        role="tabpanel"
                        aria-labelledby="v-pills-contact-tab"
                    >
                        <div className="sidebar-booking-form">
                            <form>
                                <div className="form-inner mb-20">
                                    <label>
                                        Tên đầy đủ <span>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div className="form-inner mb-20">
                                    <label>
                                        Địa chỉ Email <span>*</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                    />
                                </div>
                                <div className="form-inner mb-20">
                                    <label>
                                        Số điện thoại <span>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                                <div className="form-inner mb-30">
                                    <label>
                                        Ghi chú <span>*</span>
                                    </label>
                                    <textarea placeholder="Write your quiry"></textarea>
                                </div>
                                <div className="form-inner">
                                    <button
                                        type="submit"
                                        className="primary-btn1 two"
                                    >
                                        Hoàn tất ngay
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

export default BookingForm;

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
                    <button
                        className="nav-link "
                        id="v-pills-booking-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-booking"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-booking"
                        aria-selected="true"
                    >
                        Thanh toán
                    </button>
                </div>
                <div className="tab-content" id="v-pills-tabContent2">
                    <div
                        className="tab-pane fade  active show"
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
                                        placeholder="Nhập tên đầy đủ"
                                    />
                                </div>
                                <div className="form-inner mb-20">
                                    <label>
                                        Địa chỉ Email <span>*</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Nhập địa chỉ Email"
                                    />
                                </div>
                                <div className="form-inner mb-20">
                                    <label>
                                        Số điện thoại <span>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nhập số điện thoại"
                                    />
                                </div>
                                <div className="form-inner mb-30">
                                    <label>
                                        Ghi chú <span>*</span>
                                    </label>
                                    <textarea placeholder="Thêm ghi chú"></textarea>
                                </div>
                                <div className="form-inner">
                                    <button
                                        type="submit"
                                        className="primary-btn1 two"
                                    >
                                        Kế tiếp
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="v-pills-booking"
                        role="tabpanel"
                        aria-labelledby="v-pills-booking-tab"
                    >
                        <div className="sidebar-booking-form">
                            <form>
                                <div className="booking-form-item-type">
                                    <h5>Chọn phương thức thanh toán</h5>
                                    <div className="checkbox-container">
                                        <label className="check-container">
                                            THANH TOÁN ĐIỆN TỬ
                                            <input
                                                type="checkbox"
                                                className="services_check"
                                                name="services_list[]"
                                                value="0"
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label className="check-container">
                                            THẺ TÍN DỤNG/GHI NỢ
                                            <input
                                                type="checkbox"
                                                className="services_check"
                                                name="services_list[]"
                                                value="0"
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="checkbox-container">
                                        <label className="check-container">
                                            THANH TOÁN TẠI CHỖ NGHỈ
                                            <input
                                                type="checkbox"
                                                className="services_check"
                                                name="services_list[]"
                                                value="0"
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="primary-btn1 two"
                                >
                                    Hoàn tất ngay
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookingForm;

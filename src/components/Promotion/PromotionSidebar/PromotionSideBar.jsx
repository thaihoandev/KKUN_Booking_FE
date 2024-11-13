import React from "react";

function PromotionSideBar() {
    return (
        <>
            <>
                <div className="sidebar-area">
                    {/* === lọc voucher theo loại sản phẩm được áp dụng === */}
                    <div className="single-widget mb-30">
                        <h5 className="widget-title">Sản phẩm áp dụng được</h5>
                        <div className="checkbox-container">
                            <ul>
                                <li>
                                    <label className="containerss">
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                        <span className="text">
                                            Khách sạn và Nhà
                                        </span>
                                        <span className="qty">3</span>
                                    </label>
                                </li>
                                <li>
                                    <label className="containerss">
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                        <span className="text">Chuyến bay</span>
                                        <span className="qty">0</span>
                                    </label>
                                </li>
                                <li>
                                    <label className="containerss">
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                        <span className="text">
                                            Chuyến bay + Khách sạn
                                        </span>
                                        <span className="qty">0</span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* === lọc voucher theo loại ưu đãi === */}
                    <div class="single-widget mb-30">
                        <h5 class="widget-title">Ưu đãi</h5>
                        <div class="checkbox-container">
                            <ul>
                                <li>
                                    <label class="containerss">
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                        <span class="text">
                                            Phiếu giảm giá{" "}
                                        </span>
                                        <span class="qty">30</span>
                                    </label>
                                </li>
                                <li>
                                    <label class="containerss">
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                        <span class="text">Thẻ tín dụng</span>
                                        <span class="qty">0</span>
                                    </label>
                                </li>
                                <li>
                                    <label class="containerss">
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                        <span class="text">
                                            Chiến dịch đặc biệt
                                        </span>
                                        <span class="qty">4</span>
                                    </label>
                                </li>
                                <li>
                                    <label class="containerss">
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                        <span class="text">
                                            Khuyến mại có thời hạn
                                        </span>
                                        <span class="qty">28</span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* === Điều khoản === */}
                    <div className="single-widget mb-30">
                        <h5 className="shop-widget-title">
                            Điều khoản sử dụng
                        </h5>
                        <div
                            className="range-wrap"
                            style={{ textAlign: "justify" }}
                        >
                            <div className="row mb-30">
                                <div className="col-sm-12">
                                    <p>
                                        <strong>*Sản phẩm áp dụng được:</strong>
                                    </p>
                                    <ul>
                                        <li>
                                            <strong>- Khách sạn và Nhà</strong>:
                                            Voucher chỉ áp dụng cho các khách
                                            sạn và nhà nghỉ đã đăng ký chính
                                            thức trên nền tảng KKUN Booking.
                                        </li>
                                        <li>
                                            <strong>- Chuyến bay</strong>: Các
                                            ưu đãi liên quan đến chuyến bay chỉ
                                            dành riêng cho đối tác cung cấp dịch
                                            vụ hàng không có hợp đồng với KKUN
                                            Booking.
                                        </li>
                                        <li>
                                            <strong>
                                                - Chuyến bay + Khách sạn
                                            </strong>
                                            : Ưu đãi cho các gói kết hợp chuyến
                                            bay và khách sạn, áp dụng cho khách
                                            sạn liên kết với KKUN Booking và
                                            hãng bay đối tác.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12">
                                    <p>
                                        <strong>
                                            *Các ưu đãi có thể bao gồm:
                                        </strong>
                                    </p>
                                    <ul>
                                        <li>
                                            <strong>- Phiếu giảm giá</strong>:
                                            Chỉ áp dụng một lần cho mỗi khách
                                            hàng và không được hoàn trả, quy đổi
                                            thành tiền mặt, hoặc chuyển nhượng
                                            cho người khác.
                                        </li>
                                        <li>
                                            <strong>- Thẻ tín dụng</strong>: Chỉ
                                            hợp lệ khi thanh toán qua thẻ tín
                                            dụng của các ngân hàng đối tác KKUN
                                            Booking.
                                        </li>
                                        <li>
                                            <strong>
                                                - Chiến dịch đặc biệt
                                            </strong>
                                            : Các ưu đãi được áp dụng trong một
                                            thời gian giới hạn hoặc cho các sự
                                            kiện đặc biệt.
                                        </li>
                                        <li>
                                            <strong>
                                                - Khuyến mại có thời hạn
                                            </strong>
                                            : Voucher sẽ hết hạn vào thời điểm
                                            được ghi trên voucher và không thể
                                            sử dụng sau thời gian này.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="slider-labels">
                                <div
                                    id="slider-range"
                                    className="caption"
                                    style={{ textAlign: "justify" }}
                                >
                                    <p>
                                        <em>
                                            Lưu ý: Các điều khoản có thể thay
                                            đổi dựa trên từng chương trình
                                            khuyến mãi cụ thể và điều kiện hợp
                                            đồng của hotel owner đã đăng ký trên
                                            nền tảng KKUN Booking.
                                        </em>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Other sidebar widgets here... */}
                </div>
            </>
        </>
    );
}

export default PromotionSideBar;

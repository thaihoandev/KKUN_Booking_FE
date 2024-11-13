import React, { useState, useEffect } from "react";

function PromotionList() {
    const [vouchers, setVouchers] = useState([
        // giả định dữ liệu,
        {
            id: 1,
            imageUrl:
                "https://cdn0.agoda.net/images/emailmarketing/contentcard/upto5_mspa.png",
            title: "Giảm tới 800,000₫ tiền khách sạn",
            conditions: [
                "Chỉ áp dụng cho các khách sạn trên 4 sao",
                "Không áp dụng vào ngày lễ",
            ],
            expiryDate: "2024-11-31T23:59:59",
            promoCode: "AGODADEAL5",
        },
        {
            id: 2,
            imageUrl:
                "https://cdn0.agoda.net/images/emailmarketing/contentcard/upto8_mspa.png",
            title: "Giảm tới 1,000,000₫",
            conditions: [
                "Chỉ áp dụng cho các khách sạn trên 4 sao",
                "Không áp dụng vào ngày lễ",
            ],
            expiryDate: "2024-11-25T23:59:59",
            promoCode: "AGODADEAL8",
        },
        {
            id: 3,
            imageUrl:
                "https://cdn0.agoda.net/images/emailmarketing/contentcard/Web_Deals_Page_More_Deals.png",
            title: "Giảm giá trong thời gian giới hạn",
            conditions: [
                "Chỉ áp dụng cho các khách sạn trên 4 sao",
                "Không áp dụng vào ngày lễ",
            ],
            expiryDate: "2024-11-20T23:59:59",
            promoCode: "AGODADEAL3",
        },

        {
            id: 4,
            imageUrl:
                "https://cdn0.agoda.net/images/emailmarketing/contentcard/upto5_mspa.png",
            title: "Giảm tới 800,000₫ tiền khách sạn",
            conditions: [
                "Chỉ áp dụng cho các khách sạn trên 4 sao",
                "Không áp dụng vào ngày lễ",
            ],
            expiryDate: "2024-11-31T23:59:59",
            promoCode: "AGODADEAL5",
        },
        {
            id: 5,
            imageUrl:
                "https://cdn0.agoda.net/images/emailmarketing/contentcard/upto8_mspa.png",
            title: "Giảm tới 1,000,000₫",
            conditions: [
                "Chỉ áp dụng cho các khách sạn trên 4 sao",
                "Không áp dụng vào ngày lễ",
            ],
            expiryDate: "2024-11-25T23:59:59",
            promoCode: "AGODADEAL8",
        },
        {
            id: 6,
            imageUrl:
                "https://cdn0.agoda.net/images/emailmarketing/contentcard/Web_Deals_Page_More_Deals.png",
            title: "Giảm giá trong thời gian giới hạn",
            conditions: [
                "Chỉ áp dụng cho các khách sạn trên 4 sao",
                "Không áp dụng vào ngày lễ",
            ],
            expiryDate: "2024-11-20T23:59:59",
            promoCode: "AGODADEAL3",
        },
    ]);

    const calculateTimeLeft = (expiryDate) => {
        const now = new Date();
        const timeDifference = new Date(expiryDate) - now;
        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            return `Hết hạn trong ${days} ngày`;
        }
        return "Voucher đã hết hạn";
    };
    return (
        <>
            {/* === List voucher === */}
            <div className="row g-4 mb-50">
                {vouchers.map((voucher) => (
                    <div className="col-md-4" key={voucher.id}>
                        <div className="transport-card">
                            {/* Hình ảnh của voucher */}
                            <img
                                src={voucher.imageUrl}
                                alt="voucher"
                                className="transport-img"
                            />

                            {/* Nội dung chính của voucher */}
                            <div className="transport-content">
                                <h4>
                                    <a href="promotion-details.html">
                                        {voucher.title}
                                    </a>
                                </h4>

                                {/* Thông tin chi tiết về loại voucher */}
                                <div className="transport-type">
                                    <div className="row">
                                        {/* Điều kiện sử dụng voucher */}
                                        {voucher.conditions.map(
                                            (condition, index) => (
                                                <h6 key={index}>
                                                    - {condition}
                                                </h6>
                                            )
                                        )}
                                        {/* Thời hạn còn lại của voucher */}
                                        <h6>
                                            {calculateTimeLeft(
                                                voucher.expiryDate
                                            )}
                                        </h6>
                                        {/* Mã khuyến mại */}
                                        <h6>
                                            Mã khuyến mại: {voucher.promoCode}
                                        </h6>
                                    </div>
                                </div>

                                {/* Phần cuối của thẻ voucher */}
                                <div className="card-bottom">
                                    <div className="details-btn d-flex justify-content-center">
                                        {/* Nút nhận voucher */}
                                        <a
                                            href="promotion-details.html"
                                            className="primary-btn1"
                                        >
                                            Nhận voucher
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* === Hướng dẫn sử dụng === */}
            <div class="row g-4 mb-70">
                <div className="col-md-12">
                    <div className="transport-card px-2 text-center">
                        <div className="row pt-3">
                            <h2 className=" mb-20">
                                Cách Áp Dụng Phiếu Giảm Giá
                            </h2>
                        </div>

                        <div className="row ">
                            <img
                                src="https://cdn0.agoda.net/images/emailmarketing/js_elements/full-img-2x.png"
                                alt="voucher"
                                className="transport-img"
                            />
                        </div>

                        <div className="row my-2 ">
                            <div className="col-md-4">
                                <h6>
                                    Tìm và thu thập phiếu giảm giá. Nếu có mã
                                    khuyến mại thì đừng quên sao chép nó!
                                </h6>
                            </div>
                            <div className="col-md-4">
                                <h6>
                                    Tìm chỗ nghỉ có nhãn "Được áp dụng phiếu
                                    giảm giá" để sử dụng phiếu giảm giá
                                </h6>
                            </div>
                            <div className="col-md-4">
                                <h6>
                                    Đảm bảo áp dụng phiếu giảm giá / mã khuyến
                                    mại của quý khách trước khi hoàn tất thanh
                                    toán.
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default PromotionList;

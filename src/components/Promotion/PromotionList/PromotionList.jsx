import React from "react";

function PromotionList({ promotions }) {
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
        <div className="row g-4 mb-50">
            {promotions.length > 0 ? (
                promotions.map((promotion) => (
                    <div className="col-md-4" key={promotion.id}>
                        <div
                            className="transport-card"
                            style={{ height: "100%" }}
                        >
                            <div className="transport-content">
                                <h4>{promotion.name} </h4>
                                <p>
                                    <strong>Mã:</strong> {promotion.code}
                                </p>
                                <p>
                                    <strong>Thời gian:</strong>{" "}
                                    {new Date(
                                        promotion.startDate
                                    ).toLocaleDateString()}{" "}
                                    -{" "}
                                    {new Date(
                                        promotion.endDate
                                    ).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Loại giảm giá:</strong>{" "}
                                    {promotion.discountType === "percent"
                                        ? `${promotion.value}%`
                                        : `${promotion.value} VND`}
                                </p>
                                <p>
                                    <strong>Áp dụng:</strong>{" "}
                                    {promotion.applyTo === "all"
                                        ? "Tất cả"
                                        : promotion.applyTo}
                                </p>
                                <p>{calculateTimeLeft(promotion.endDate)}</p>
                                <div className="details-btn d-flex justify-content-center">
                                    <button className="primary-btn1">
                                        Xem Chi Tiết
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-12 text-center">
                    <p>Không có khuyến mãi nào khả dụng!</p>
                </div>
            )}
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
        </div>
    );
}

export default PromotionList;

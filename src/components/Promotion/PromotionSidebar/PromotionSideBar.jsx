import React from "react";
import { useTranslation } from "react-i18next";

function PromotionSideBar() {
    const { t } = useTranslation(); // Hook để lấy hàm t() từ i18next

    return (
        <div className="sidebar-area">
            {/* === Lọc voucher theo loại sản phẩm === */}
            <div className="single-widget mb-30">
                <h5 className="widget-title">{t("productApplicable")}</h5>
                <div className="checkbox-container">
                    <ul>
                        <li>
                            <label className="containerss">
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                                <span className="text">
                                    {t("products.hotelAndHome")}
                                </span>
                                <span className="qty">3</span>
                            </label>
                        </li>
                        <li>
                            <label className="containerss">
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                                <span className="text">
                                    {t("products.flights")}
                                </span>
                                <span className="qty">0</span>
                            </label>
                        </li>
                        <li>
                            <label className="containerss">
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                                <span className="text">
                                    {t("products.flightAndHotel")}
                                </span>
                                <span className="qty">0</span>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>

            {/* === Lọc voucher theo loại ưu đãi === */}
            <div className="single-widget mb-30">
                <h5 className="widget-title">
                    {t("offerTypes.discountVoucher")}
                </h5>
                <div className="checkbox-container">
                    <ul>
                        <li>
                            <label className="containerss">
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                                <span className="text">
                                    {t("offerTypes.discountVoucher")}
                                </span>
                            </label>
                        </li>
                        <li>
                            <label className="containerss">
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                                <span className="text">
                                    {t("offerTypes.creditCard")}
                                </span>
                            </label>
                        </li>
                        <li>
                            <label className="containerss">
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                                <span className="text">
                                    {t("offerTypes.specialCampaign")}
                                </span>
                            </label>
                        </li>
                        <li>
                            <label className="containerss">
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                                <span className="text">
                                    {t("offerTypes.timedPromotion")}
                                </span>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>

            {/* === Điều khoản === */}
            <div className="single-widget mb-30">
                <h5 className="shop-widget-title">{t("termsOfUse")}</h5>
                <div className="range-wrap" style={{ textAlign: "justify" }}>
                    <div className="row mb-30">
                        <div className="col-sm-12">
                            <p>
                                <strong>{t("productApplicable")}</strong>
                            </p>
                            <ul>
                                <li>
                                    <strong>
                                        - {t("products.hotelAndHome")}:
                                    </strong>{" "}
                                    {t("productDetails.hotelAndHome")}
                                </li>
                                <li>
                                    <strong>- {t("products.flights")}:</strong>{" "}
                                    {t("productDetails.flights")}
                                </li>
                                <li>
                                    <strong>
                                        - {t("products.flightAndHotel")}:
                                    </strong>{" "}
                                    {t("productDetails.flightAndHotel")}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <p>
                                <strong>
                                    {t("offerTypes.discountVoucher")}:
                                </strong>
                            </p>
                            <ul>
                                <li>{t("offerDetails.discountVoucher")}</li>
                            </ul>
                            <p>
                                <strong>{t("offerTypes.creditCard")}:</strong>
                            </p>
                            <ul>
                                <li>{t("offerDetails.creditCard")}</li>
                            </ul>
                            <p>
                                <strong>
                                    {t("offerTypes.specialCampaign")}:
                                </strong>
                            </p>
                            <ul>
                                <li>{t("offerDetails.specialCampaign")}</li>
                            </ul>
                            <p>
                                <strong>
                                    {t("offerTypes.timedPromotion")}:
                                </strong>
                            </p>
                            <ul>
                                <li>{t("offerDetails.timedPromotion")}</li>
                            </ul>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <p>
                                <strong>{t("offerDetails.note")}</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PromotionSideBar;

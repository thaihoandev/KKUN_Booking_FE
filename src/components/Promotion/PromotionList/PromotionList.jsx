import React from "react";
import { useTranslation } from "react-i18next";
import convertToVND from "../../../utils/convertToVND"; // Assuming this function exists for conversion

function PromotionList({ promotions }) {
    const { t } = useTranslation(); // Using the useTranslation hook to get the translation function

    const calculateTimeLeft = (expiryDate) => {
        const now = new Date();
        const timeDifference = new Date(expiryDate) - now;
        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            return t("promotion.daysLeft", { days });
        }
        return t("promotion.expired");
    };
    const copyToClipboard = (code) => {
        navigator.clipboard
            .writeText(code)
            .then(() => {
                alert(t("promotion.copied")); // Show alert when the code is copied
            })
            .catch((error) => {
                console.error("Error copying text: ", error);
            });
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
                                <h4>{promotion.name}</h4>
                                <p>
                                    <strong>{t("promotion.code")}:</strong>{" "}
                                    {promotion.code}
                                </p>
                                <p>
                                    <strong>{t("promotion.time")}:</strong>
                                    <p>
                                        {new Date(
                                            promotion.startDate
                                        ).toLocaleDateString()}{" "}
                                        -{" "}
                                        {new Date(
                                            promotion.endDate
                                        ).toLocaleDateString()}
                                    </p>
                                </p>
                                <p>
                                    <strong>{t("promotion.discount")}:</strong>
                                    {promotion.discountType === "PERCENT"
                                        ? `${promotion.value}%`
                                        : `${convertToVND(promotion.value)}`}
                                </p>
                                <p>
                                    <strong>{t("promotion.apply")}:</strong>{" "}
                                    {promotion.applyTo}
                                </p>
                                <p>{calculateTimeLeft(promotion.endDate)}</p>
                                <button
                                    onClick={() =>
                                        copyToClipboard(promotion.code)
                                    }
                                    className="primary-btn2 btn-sm ms-2"
                                >
                                    {t("promotion.copy")} {t("code")}
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>{t("promotion.noPromotions")}</p>
            )}
            {/* === Hướng dẫn sử dụng === */}
            <div className="row g-4 mb-70">
                <div className="col-md-12">
                    <div className="transport-card px-2 text-center">
                        <div className="row pt-3">
                            <h2 className="mb-20">
                                {t("discountInstructions.title")}
                            </h2>
                        </div>

                        <div className="row">
                            <img
                                src="https://cdn0.agoda.net/images/emailmarketing/js_elements/full-img-2x.png"
                                alt="voucher"
                                className="transport-img"
                            />
                        </div>

                        <div className="row my-2">
                            <div className="col-md-4">
                                <h6>{t("discountInstructions.step1")}</h6>
                            </div>
                            <div className="col-md-4">
                                <h6>{t("discountInstructions.step2")}</h6>
                            </div>
                            <div className="col-md-4">
                                <h6>{t("discountInstructions.step3")}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PromotionList;

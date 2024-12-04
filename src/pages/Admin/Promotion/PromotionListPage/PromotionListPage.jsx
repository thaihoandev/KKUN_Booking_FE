import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import * as PromotionService from "../../../../services/PromotionService";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDateDDMMYYYY } from "../../../../utils/utils";
import { useTranslation } from "react-i18next";

function PromotionListPage() {
    const { t } = useTranslation();
    const [promotions, setPromotions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const pageSize = 10; // Số lượng ưu đãi trên mỗi trang
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    // Fetch all promotions using useQuery
    const { data, isLoading, error } = useQuery(
        "getAllPromotions",
        () => PromotionService.getAllPromotions(user.accessToken),
        {
            onSuccess: (data) => {
                setPromotions(data);
            },
            onError: (error) => {
                toast.error(error.message);
            },
        }
    );

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleEditPromotion = (promotionId) => {
        navigate(`/admin/vouchers/${promotionId}/edit`);
    };

    const handleDeletePromotion = async (promotionId) => {
        if (window.confirm(t("promotionList.confirmDelete"))) {
            try {
                await PromotionService.deletePromotion(
                    promotionId,
                    user.accessToken
                );
                toast.success(t("promotionList.deleteSuccess"));
                setPromotions((prevPromotions) =>
                    prevPromotions.filter((promo) => promo.id !== promotionId)
                );
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    const handleToggleStatus = async (promotion) => {
        const updatedPromotion = {
            ...promotion,
            isActive: !promotion.isActive,
        };
        try {
            await PromotionService.updatePromotionStatus(
                promotion.id,
                updatedPromotion,
                user.accessToken
            );
            setPromotions((prevPromotions) =>
                prevPromotions.map((promo) =>
                    promo.id === promotion.id ? updatedPromotion : promo
                )
            );
            toast.success(t("promotionList.updateStatusSuccess"));
        } catch (error) {
            toast.error(error.message);
        }
    };

    const totalPages = Math.ceil(promotions.length / pageSize);
    const currentPromotions = promotions
        .filter(
            (promo) =>
                promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                promo.code?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <>
            <ToastContainer />

            {/* Search Area */}
            <div className="sidebar-area mb-4 col-xl-4">
                <div className="single-widget mb-30">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder={t(
                                    "promotionList.searchPlaceholder"
                                )}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="submit">
                                <i className="bx bx-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Promotion Listing Area */}
            <div className="recent-listing-area">
                <h6>{t("promotionList.listTitle")}</h6>
                <div className="recent-listing-table">
                    <table className="table table-hover">
                        <thead className="text-center">
                            <tr className="">
                                <th style={{ width: "7%" }}>
                                    {t("promotionList.status")}
                                </th>
                                <th style={{ width: "14%" }}>
                                    {t("promotionList.name")}
                                </th>
                                <th style={{ width: "10%" }}>
                                    {t("promotionList.code")}
                                </th>
                                <th style={{ width: "8%" }}>
                                    {t("promotionList.quantity")}
                                </th>
                                <th style={{ width: "8%" }}>
                                    {t("promotionList.used")}
                                </th>
                                <th style={{ width: "8%" }}>
                                    {t("promotionList.value")}
                                </th>
                                <th style={{ width: "8%" }}>
                                    {t("promotionList.type")}
                                </th>
                                <th style={{ width: "10%" }}>
                                    {t("promotionList.startDate")}
                                </th>
                                <th style={{ width: "10%" }}>
                                    {t("promotionList.endDate")}
                                </th>
                                <th style={{ width: "10%" }}>
                                    {t("promotionList.applyTo")}
                                </th>
                                <th style={{ width: "15%" }}>
                                    {t("promotionList.actions")}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPromotions.map((promotion) => (
                                <tr key={promotion.id}>
                                    <td data-label={t("promotionList.status")}>
                                        <div className="form-check form-switch d-flex justify-content-center align-items-center">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={promotion.isActive}
                                                onChange={() =>
                                                    handleToggleStatus(
                                                        promotion
                                                    )
                                                }
                                                style={{
                                                    backgroundColor:
                                                        promotion.isActive
                                                            ? "var(--primary-color1)"
                                                            : "#ffffff",
                                                    borderColor:
                                                        promotion.isActive
                                                            ? "var(--primary-color1)"
                                                            : "#ced4da",
                                                    boxShadow: "none",
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td data-label={t("promotionList.name")}>
                                        {promotion.name}
                                    </td>
                                    <td data-label={t("promotionList.code")}>
                                        <strong>{promotion.code}</strong>
                                    </td>
                                    <td
                                        data-label={t("promotionList.quantity")}
                                    >
                                        {promotion.quantity}
                                    </td>
                                    <td data-label={t("promotionList.used")}>
                                        {promotion.usedCount || 0}
                                    </td>
                                    <td data-label={t("promotionList.value")}>
                                        {promotion.value}{" "}
                                        {promotion.discountType === "PERCENT"
                                            ? "%"
                                            : "₫"}
                                    </td>
                                    <td data-label={t("promotionList.type")}>
                                        {promotion.discountType}
                                    </td>
                                    <td
                                        data-label={t(
                                            "promotionList.startDate"
                                        )}
                                    >
                                        {formatDateDDMMYYYY(
                                            promotion.startDate
                                        ) || "Không giới hạn"}
                                    </td>
                                    <td data-label={t("promotionList.endDate")}>
                                        {formatDateDDMMYYYY(
                                            promotion.endDate
                                        ) || "Không giới hạn"}
                                    </td>
                                    <td data-label={t("promotionList.applyTo")}>
                                        {promotion.applyTo}
                                    </td>
                                    <td data-label={t("promotionList.actions")}>
                                        <button
                                            onClick={() =>
                                                handleEditPromotion(
                                                    promotion.id
                                                )
                                            }
                                            className="primary-btn1 p-2 me-2"
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeletePromotion(
                                                    promotion.id
                                                )
                                            }
                                            className="primary-btn1 p-2"
                                            style={{ backgroundColor: "red" }}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination-area">
                        <ul className="paginations">
                            {[...Array(totalPages)].map((_, i) => (
                                <li
                                    key={i + 1}
                                    className={`page-item ${
                                        currentPage === i + 1 ? "active" : ""
                                    }`}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    <a href="#">{i + 1}</a>
                                </li>
                            ))}
                        </ul>
                        <ul className="paginations-buttons">
                            <li>
                                <a
                                    href="#"
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="7"
                                        height="14"
                                        viewBox="0 0 7 14"
                                    >
                                        <path d="M0 7.00008L7 0L2.54545 7.00008L7 14L0 7.00008Z" />
                                    </svg>
                                    {t("promotionList.prev")}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                >
                                    {t("promotionList.next")}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="7"
                                        height="14"
                                        viewBox="0 0 7 14"
                                        fill="none"
                                    >
                                        <path d="M7 7.00008L0 0L4.45455 7.00008L0 14L7 7.00008Z" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PromotionListPage;

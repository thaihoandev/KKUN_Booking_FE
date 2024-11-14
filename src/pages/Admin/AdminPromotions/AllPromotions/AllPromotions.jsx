import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import * as PromotionService from "../../../../services/PromotionService";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AllPromotions() {
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
        navigate(`/admin/promotions/${promotionId}/edit`);
    };

    const handleDeletePromotion = async (promotionId) => {
        if (window.confirm("Bạn có chắc muốn xóa ưu đãi này?")) {
            try {
                await PromotionService.deletePromotion(promotionId, user.accessToken);
                toast.success("Đã xóa ưu đãi thành công!");
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
            await PromotionService.updatePromotionStatus(promotion.id, updatedPromotion, user.accessToken);
            setPromotions((prevPromotions) =>
                prevPromotions.map((promo) =>
                    promo.id === promotion.id ? updatedPromotion : promo
                )
            );
            toast.success("Trạng thái ưu đãi đã được cập nhật!");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const totalPages = Math.ceil(promotions.length / pageSize);
    const currentPromotions = promotions
        .filter((promo) =>
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
                                placeholder="Tìm kiếm theo tên hoặc mã ưu đãi..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="submit"><i className="bx bx-search"></i></button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Promotion Listing Area */}
            <div className="recent-listing-area">
                <h6>Danh sách ưu đãi</h6>
                <div className="recent-listing-table">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th style={{ width: "7%" }}>Trạng thái</th>
                                <th style={{ width: "14%" }}>Tên ưu đãi</th>
                                <th style={{ width: "10%" }}>Mã ưu đãi</th>
                                <th style={{ width: "8%" }}>Số lượng</th>
                                <th style={{ width: "8%" }}>Đã dùng</th>
                                <th style={{ width: "8%" }}>Giá trị</th>
                                <th style={{ width: "8%" }}>Loại ưu đãi</th>
                                <th style={{ width: "10%" }}>Từ ngày</th>
                                <th style={{ width: "10%" }}>Đến ngày</th>
                                <th style={{ width: "10%" }}>Áp dụng</th>
                                <th style={{ width: "15%" }}>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPromotions.map((promotion) => (
                                <tr key={promotion.id}>
                                    <td data-label="Trạng thái">
                                        <div className="form-check form-switch d-flex justify-content-center align-items-center">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={promotion.isActive}
                                                onChange={() => handleToggleStatus(promotion)}
                                                style={{
                                                    backgroundColor: promotion.isActive ? "var(--primary-color1)" : "#ffffff",
                                                    borderColor: promotion.isActive ? "var(--primary-color1)" : "#ced4da",
                                                    boxShadow: "none"
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td data-label="Tên ưu đãi">{promotion.name}</td>
                                    <td data-label="Mã ưu đãi">{promotion.code}</td>
                                    <td data-label="Số lượng">{promotion.quantity}</td>
                                    <td data-label="Đã dùng">{promotion.usedCount || 0}</td>
                                    <td data-label="Giá trị">
                                        {promotion.value}{" "}
                                        {promotion.discountType === "percent" ? "%" : "₫"}
                                    </td>
                                    <td data-label="Loại ưu đãi">{promotion.type}</td>
                                    <td data-label="Từ ngày">
                                        {promotion.startDate || "Không giới hạn"}
                                    </td>
                                    <td data-label="Đến ngày">
                                        {promotion.endDate || "Không giới hạn"}
                                    </td>
                                    <td data-label="Áp dụng">{promotion.applyTo}</td>
                                    <td data-label="Hành động">
                                        <button
                                            onClick={() => handleEditPromotion(promotion.id)}
                                            className="primary-btn1 p-2 me-2"
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button
                                            onClick={() => handleDeletePromotion(promotion.id)}
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
                                    className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    <a href="#">{i + 1}</a>
                                </li>
                            ))}
                        </ul>
                        <ul className="paginations-buttons">
                            <li>
                                <a href="#" onClick={() => handlePageChange(currentPage - 1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="14" viewBox="0 0 7 14">
                                        <path d="M0 7.00008L7 0L2.54545 7.00008L7 14L0 7.00008Z" />
                                    </svg>
                                    Prev
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={() => handlePageChange(currentPage + 1)}>
                                    Next
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="14" viewBox="0 0 7 14" fill="none">
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

export default AllPromotions;

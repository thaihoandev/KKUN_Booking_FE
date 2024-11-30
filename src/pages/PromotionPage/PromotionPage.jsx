import React, { useEffect, useState } from "react";
import PromotionSideBar from "../../components/Promotion/PromotionSidebar/PromotionSideBar";
import PromotionList from "../../components/Promotion/PromotionList/PromotionList";
import * as PromotionService from "../../services/PromotionService";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function PromotionPage() {
    const [promotions, setPromotions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // State cho phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6); // Số item trên mỗi trang

    // Mutation để fetch dữ liệu
    const mutationAllPromotion = useMutation(
        () => PromotionService.getAllPromotions(),
        {
            onSuccess: (data) => {
                setPromotions(data);
                setIsLoading(false);
            },
            onError: (error) => {
                toast.error(
                    "Không thể tải dữ liệu khuyến mãi: " + error.message
                );
                setIsLoading(false);
            },
        }
    );

    // Gọi API khi component được mount
    useEffect(() => {
        mutationAllPromotion.mutate();
    }, []);

    // Tính toán dữ liệu cho trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = promotions.slice(indexOfFirstItem, indexOfLastItem);

    // Tổng số trang
    const totalPages = Math.ceil(promotions.length / itemsPerPage);

    // Chuyển trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="transport-page pt-100 mb-100">
                    <div className="container">
                        <div className="row g-lg-4 gy-5">
                            {/* ===== Sidebar Promotions ===== */}
                            <div className="col-xl-4 order-lg-1 order-2">
                                <PromotionSideBar />
                            </div>
                            {/* ===== End Sidebar Promotions ===== */}

                            {/* ===== Main Promotions ===== */}
                            <div className="col-xl-8 order-lg-2 order-1">
                                {isLoading ? (
                                    <p>Đang tải dữ liệu khuyến mãi...</p>
                                ) : currentItems.length > 0 ? (
                                    <div className="">
                                        {/* Hiển thị danh sách khuyến mãi */}
                                        <PromotionList
                                            promotions={currentItems}
                                        />

                                        {/* === Pagination === */}
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <nav className="inner-pagination-area">
                                                    <ul className="pagination-list">
                                                        {/* Nút quay lại */}
                                                        <li>
                                                            <button
                                                                className="shop-pagi-btn"
                                                                onClick={() =>
                                                                    handlePageChange(
                                                                        Math.max(
                                                                            1,
                                                                            currentPage -
                                                                                1
                                                                        )
                                                                    )
                                                                }
                                                                disabled={
                                                                    currentPage ===
                                                                    1
                                                                }
                                                            >
                                                                <i className="bi bi-chevron-left"></i>
                                                            </button>
                                                        </li>

                                                        {/* Số trang */}
                                                        {Array.from(
                                                            {
                                                                length: totalPages,
                                                            },
                                                            (_, index) => (
                                                                <li key={index}>
                                                                    <Link
                                                                        onClick={() =>
                                                                            handlePageChange(
                                                                                index +
                                                                                    1
                                                                            )
                                                                        }
                                                                        className={
                                                                            currentPage ===
                                                                            index +
                                                                                1
                                                                                ? "active"
                                                                                : ""
                                                                        }
                                                                    >
                                                                        {index +
                                                                            1}
                                                                    </Link>
                                                                </li>
                                                            )
                                                        )}

                                                        {/* Nút tiếp theo */}
                                                        <li>
                                                            <button
                                                                className="shop-pagi-btn"
                                                                onClick={() =>
                                                                    handlePageChange(
                                                                        Math.min(
                                                                            totalPages,
                                                                            currentPage +
                                                                                1
                                                                        )
                                                                    )
                                                                }
                                                                disabled={
                                                                    currentPage ===
                                                                    totalPages
                                                                }
                                                            >
                                                                <i className="bi bi-chevron-right"></i>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <p>Không có dữ liệu khuyến mãi nào!</p>
                                )}
                            </div>
                            {/* ===== End Main Promotions ===== */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PromotionPage;

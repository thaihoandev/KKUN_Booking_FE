import React from "react";
import PromotionSideBar from "../../components/Promotion/PromotionSidebar/PromotionSideBar";
import PromotionList from "../../components/Promotion/PromotionList/PromotionList";

function PromotionPage() {
    return (
        <>
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
                                    {/* === List voucher === */}
                                    <PromotionList />
                                    {/* == inner-pagination-area == */}
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <nav className="inner-pagination-area">
                                                <ul className="pagination-list">
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="shop-page-btn"
                                                        >
                                                            <i className="bi bi-chevron-left"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">1</a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="active"
                                                        >
                                                            2
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">3</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i className="bi bi-three-dots"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">6</a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="shop-page-btn"
                                                        >
                                                            <i className="bi bi-chevron-right"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                {/* ===== End Main Promotions ===== */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PromotionPage;

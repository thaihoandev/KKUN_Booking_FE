import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PromotionSibar from "./PromotionSibar/PromotionSibar";
import PromotionList from "./PromotionList/PromotionList";

function Promotions() {


    return (
        <>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    {/* Thanh local */}
                    {/*  <div class="breadcrumb-section"
                          style={{background-image: linear-gradient(270deg, rgba(0, 0, 0, .3), rgba(0, 0, 0, 0.3) 101.02%), url(assets/img/innerpage/inner-banner-bg.png)}} 
                    > 
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12 d-flex justify-content-center">
                                    <div class="banner-content">
                                        <h1>Khuyến mãi</h1>
                                        <ul class="breadcrumb-list">
                                            <li><a href="index.html">Home</a></li>
                                            <li>Khuyến mãi</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className="transport-page pt-100 mb-100">
                        <div className="container">
                            <div className="row g-lg-4 gy-5">
                                {/* ===== Sidebar Promotions ===== */}
                                <div className="col-xl-4 order-lg-1 order-2">
                                    <PromotionSibar />
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
                                                        <a href="#" className="shop-pagi-btn"><i className="bi bi-chevron-left"></i></a>
                                                    </li>
                                                    <li>
                                                        <a href="#">1</a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="active">2</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">3</a>
                                                    </li>
                                                    <li>
                                                        <a href="#"><i className="bi bi-three-dots"></i></a>
                                                    </li>
                                                    <li>
                                                        <a href="#">6</a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="shop-pagi-btn"><i className="bi bi-chevron-right"></i></a>
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

export default Promotions;











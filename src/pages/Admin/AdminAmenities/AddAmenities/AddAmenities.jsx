import React from "react";
import "swiper/css"; // Import CSS cho Swiper
import "swiper/css/navigation"; // Import CSS cho Navigation
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";



function AddNewAmenities() {
    return (
        <>
            {/* ============== Admin Thêm tiện ích cho hotel Owner chọn ========================== */}

            <div class="row">
                <div class="col-xl-12">
                    <div class="main-content-title-profile mb-50">
                        <div class="main-content-title">
                            <h3>Thêm Tiện ích</h3>
                        </div>
                    </div>
                    <div class="dashboard-profile-wrapper two">
                        <div class="dashboard-profile-tab-content">
                            <form>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-inner mb-30">
                                            <label>Tên tiện ích</label>
                                            <input type="text" placeholder="Tên khách sạn..." />
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-30">
                                        <div class="form-inner">
                                            <label>Loại tiện ích</label>
                                            <select>
                                                <option>Tiện nghi</option>
                                                <option>Giải trí</option>
                                                <option>Dịch vụ</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-inner mb-30">
                                            <label>Giá</label>
                                            <input type="text" placeholder="Giá tiện ích..." />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-inner mb-30">
                                            <label>Chiết khấu</label>
                                            <input type="text" placeholder="Giá giảm giá/chiết khấu..." />
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-12 mb-30">
                                        <div class="form-inner">
                                            <label>Mô tả</label>
                                            <textarea placeholder="Mô tả thêm về khách sạn"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="upload-img-area">
                                    <div class="upload-img-wrapper">
                                        <div class="drag-area">
                                            <button type="button" class="upload-btn"><i class="bi bi-plus-lg"></i></button>
                                            <input type="file" hidden="" />
                                        </div>
                                    </div>
                                    <div class="upload-img-area-content">
                                        <h6>Tải ảnh lên</h6>
                                        <p>Kích thước ảnh yêu cầu là 300*300, định dạng JPGE hoặc PNG.</p>
                                    </div>
                                </div>
                                <div class="form-inner mb-50">
                                    <label class="containerss">
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                        <span class="text">Cập nhật thông tin chi tiết trong tất cả các thuộc tính có trong trang web này.</span>
                                    </label>
                                </div>
                                <div class="form-inner">
                                    <button type="submit" class="primary-btn3">Thêm ngay</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* ======================================== */}
        </>
    );
}

export default AddNewAmenities;
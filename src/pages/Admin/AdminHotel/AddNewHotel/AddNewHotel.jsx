import React from "react";
import "swiper/css"; // Import CSS cho Swiper
import "swiper/css/navigation"; // Import CSS cho Navigation
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";



function AddNewHotell() {
    return (
        <>
            {/* ============== Admin Thêm khách sạn cho hotel Owner========================== */}

            <div class="row">
                <div class="col-xl-12">
                    <div class="main-content-title-profile mb-50">
                        <div class="main-content-title">
                            <h3>Thêm Khách sạn mới</h3>
                        </div>
                    </div>
                    <div class="dashboard-profile-wrapper two">
                        <div class="dashboard-profile-tab-content">
                            <form>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-inner mb-30">
                                            <label>Tên khách sạn</label>
                                            <input type="text" placeholder="Tên khách sạn..." />
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-30">
                                        <div class="form-inner">
                                            <label>Loại Khách sạn</label>
                                            <select>
                                                <option>5 sao</option>
                                                <option>4 sao</option>
                                                <option>3 sao</option>
                                                <option>Nhà nghỉ</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* <div class="col-md-6">
                                        <div class="form-inner mb-30">
                                            <label>Giá</label>
                                            <input type="text" placeholder="Giá phòng..." />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-inner mb-30">
                                            <label>Chiết khấu</label>
                                            <input type="text" placeholder="Giá giảm giá/chiết khấu..." />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-inner mb-30">
                                            <label>Tiện nghi</label>
                                            <input type="text" placeholder="Tiện nghi phòng..." />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-inner mb-30">
                                            <label>Số người (max)</label>
                                            <input type="text" placeholder="Số người ở tối đa..." />
                                        </div>
                                    </div> */}
                                    <div class="col-md-12">
                                        <div class="form-inner mb-30">
                                            <label>Địa chỉ</label>
                                            <input type="text" placeholder="Địa chỉ cụ thể..." />
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="location-map mb-30">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4821.502677857254!2d106.78279807583895!3d10.85504795773702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527c3debb5aad%3A0x5fb58956eb4194d0!2zxJDhuqFpIEjhu41jIEh1dGVjaCBLaHUgRQ!5e1!3m2!1svi!2sus!4v1730630441258!5m2!1svi!2sus" 
                                            allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                                        </iframe>
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

export default AddNewHotell;
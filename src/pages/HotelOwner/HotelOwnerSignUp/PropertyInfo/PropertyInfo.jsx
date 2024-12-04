import React, { useState } from "react";
import NiceSelect from "../../../../components/NiceSelect/NiceSelect";

function PropertyInfo({ onNext }) {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        rating: "",
        payment_policy: "",
        num_of_reviews: 0,
    });

    // Xử lý thay đổi dữ liệu nhập vào
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Xử lý khi chọn hạng mục từ dropdown
    const handleCategoryChange = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            category: value,
        }));
    };

    // Xử lý khi submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        // Tiến hành lưu dữ liệu nếu cần, sau đó chuyển sang form tiếp theo
        onNext();
    };

    return (
        <div className="dashboard-profile-tab-content">
          <div className="account-details-tab-content">
            <div className="account-tab-content-title">
                <h6>Thông tin cơ bản về khách sạn</h6>
                <p>Cung cấp các thông tin cơ bản về khách sạn của bạn.</p>
            </div>
            <form onSubmit={handleSubmit}>
                {/* Thông tin chung */}
                <div className="general-information">
                    <h6>Thông tin chung</h6>
                    <div className="row">
                        {/* Tên khách sạn */}
                        <div className="col-md-6">
                            <div className="form-inner mb-30">
                                <label>Tên khách sạn*</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nhập tên khách sạn..."
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        {/* Loại khách sạn */}
                        <div className="col-md-6">
                            <div className="form-inner mb-30">
                                <NiceSelect
                                    options={[
                                        "Khách sạn tiêu chuẩn",
                                        "Sang trọng",
                                        "Resort",
                                        "1 sao",
                                        "2 sao",
                                        "3 sao",
                                        "4 sao",
                                        "5 sao",
                                    ]}
                                    value={formData.category}
                                    onChange={handleCategoryChange}
                                    label="Loại khách sạn*"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Đánh giá và Chính sách thanh toán */}
                <div className="additional-information">
                    <h6>Đánh giá và Chính sách</h6>
                    <div className="row">
                        {/* Đánh giá trung bình */}
                        <div className="col-md-6">
                            <div className="form-inner mb-30">
                                <label>Đánh giá trung bình</label>
                                <input
                                    type="number"
                                    name="rating"
                                    placeholder="Nhập đánh giá trung bình..."
                                    value={formData.rating}
                                    onChange={handleInputChange}
                                    min="0"
                                    max="5"
                                    step="0.1"
                                />
                            </div>
                        </div>
                        {/* Chính sách thanh toán */}
                        <div className="col-md-6">
                            <div className="form-inner mb-30">
                                <NiceSelect
                                    options={[
                                        "Thanh toán trước",
                                        "Thanh toán khi nhận phòng",
                                        "Yêu cầu đặt cọc",
                                    ]}
                                    value={formData.payment_policy}
                                    onChange={(value) =>
                                        setFormData({ ...formData, payment_policy: value })
                                    }
                                    label="Chính sách thanh toán*"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Số lượng đánh giá */}
                <div className="form-inner mb-30">
                    <label>Số lượng đánh giá</label>
                    <input
                        type="number"
                        name="num_of_reviews"
                        value={formData.num_of_reviews}
                        readOnly
                        placeholder="Tự động cập nhật"
                    />
                </div>

                {/* Nút Tiếp theo */}
                <button type="submit" className="primary-btn3">
                    Tiếp theo
                </button>
            </form>
            </div>
        </div>
    );
}

export default PropertyInfo;

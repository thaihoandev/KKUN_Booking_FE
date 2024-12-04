import React, { useState } from "react";
import NiceSelect from "../../../../components/NiceSelect/NiceSelect";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LocationDetails({ onNext }) {
    const [formData, setFormData] = useState({
        location: "",
        address: "",
        additionalInfo: "",
        province: "",
        district: "",
    });

    // Vị trí mặc định của bản đồ
    const defaultPosition = [10.8231, 106.6297]; // Ví dụ: Thành phố Hồ Chí Minh

    // Xử lý thay đổi dữ liệu nhập vào
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Xử lý khi chọn tỉnh/thành phố và quận/huyện từ dropdown
    const handleProvinceChange = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            province: value,
        }));
    };

    const handleDistrictChange = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            district: value,
        }));
    };

    // Xử lý khi submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();
    };

    return (
        <div className="dashboard-profile-tab-content">
            <div className="account-details-tab-content">
                <div className="account-tab-content-title">
                    <h6>Vị trí chi tiết</h6>
                    <p>Nhập thông tin vị trí và mô tả chi tiết về khách sạn của bạn.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    {/* Thông tin Vị trí */}
                    {/* Thông tin Tỉnh/Thành phố và Quận/Huyện */}
                    <div className="province-district">
                        <h6>Vị trí của cơ sở lưu trú</h6>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-inner mb-30">
                                    <NiceSelect
                                        options={["Hà Nội", "TP.Hồ Chí Minh", "Đà Nẵng", "Khác"]}
                                        value={formData.province}
                                        onChange={handleProvinceChange}
                                        label="Tỉnh/Thành phố*"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 mb-30">
                                <div className="form-inner mb-30">
                                    <NiceSelect
                                        options={[
                                            "Quận 1",
                                            "Quận 2",
                                            "Quận 3",
                                            "Quận 4",
                                            "Quận 5",
                                            "Quận 6",
                                            "Quận 7",
                                            "Quận 8",
                                            "Quận 9",
                                            "Quận 10",
                                            "Quận 11",
                                            "Quận 12",
                                            "Quận Bình Thạnh",
                                            "Quận Bình Tân",
                                            "Quận Gò Vấp",
                                            "Quận Phú Nhuận",
                                            "Quận Tân Bình",
                                            "Quận Tân Phú",
                                            "Quận Thủ Đức",
                                            "Thành phố Thủ Đức",
                                            "Huyện Bình Chánh",
                                            "Huyện Cần Giờ",
                                            "Huyện Củ Chi",
                                            "Huyện Hóc Môn",
                                            "Huyện Nhà Bè",
                                        ]}
                                        value={formData.district}
                                        onChange={handleDistrictChange}
                                        label="Quận/Huyện*"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            {/* Địa chỉ cụ thể của khách sạn */}
                            <div className="col-md-12">
                                <div className="form-inner mb-30">
                                    <label>Địa chỉ chi tiết*</label>
                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="Nhập địa chỉ cụ thể của khách sạn..."
                                        value={formData.location}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bản đồ vị trí */}
                    <div className="location-map mb-30">
                        <h6>Bản đồ Vị trí</h6>
                        <MapContainer center={defaultPosition} zoom={13} style={{ height: "300px", width: "100%" }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={defaultPosition}>
                                <Popup>Vị trí dự kiến của khách sạn</Popup>
                            </Marker>
                        </MapContainer>
                    </div>

                    {/* Thông tin bổ sung */}
                    <div className="additional-information">
                        <h6>Mô tả</h6>
                        <div className="form-inner mb-30">
                            <textarea
                                name="additionalInfo"
                                placeholder="Mô tả các điểm nổi bật gần khách sạn như nhà hàng, điểm du lịch... (nếu cần)"
                                rows="4"
                                value={formData.additionalInfo}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
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

export default LocationDetails;

import React, { useState } from "react";
import NiceSelect from "../../../../components/NiceSelect/NiceSelect";
import { useDropzone } from "react-dropzone";



function RoomDetails({ onNext }) {
  const [formData, setFormData] = useState({
    roomType: "",
    basePrice: "",
    discountPrice: "",
    capacity: "",
    area: "",
    bedType: "",
    available: false,
    amenities: [],
    roomImages: [],
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);


  // Danh sách các tiện ích phòng
  const amenitiesList = [
    "Wi-Fi miễn phí",
    "Bãi đỗ xe",
    "Máy lạnh",
    "TV",
    "Hồ bơi",
    "Bồn tắm",
    "Dịch vụ phòng",
    "Nhà hàng",
    "Minibar",
  ];

  // Xử lý thay đổi dữ liệu nhập vào
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Xử lý chọn tiện ích phòng
  const handleAmenityChange = (amenity) => {
    setFormData((prevData) => {
      const newAmenities = prevData.amenities.includes(amenity)
        ? prevData.amenities.filter((item) => item !== amenity)
        : [...prevData.amenities, amenity];
      return { ...prevData, amenities: newAmenities };
    });
  };

  // Xử lý khi tải lên hình ảnh
  const onDrop = (acceptedFiles) => {
    setFormData((prevData) => ({
      ...prevData,
      roomImages: [...prevData.roomImages, ...acceptedFiles],
    }));
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [".jpeg", ".jpg"], "image/png": [".png"] },
    maxFiles: 1,
  });


  // Xử lý khi submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };


  return (
    <div className="dashboard-profile-tab-content">
      <div className="account-details-tab-content">
        <div className="account-tab-content-title">
          <h6>Thông tin phòng + Giá phòng</h6>
          <p>Nhập thông tin chi tiết về từng loại phòng và các tiện ích đi kèm.</p>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Loại Phòng và Giá Cơ Bản */}
          <div className="room-details">
            <h6>Thông tin về phòng</h6>
            <div className="row mb-30">
              {/* Loại phòng */}
              <div className="col-md-6">
                <div className="form-inner mb-30">
                  <NiceSelect
                    options={["Tổng thống", "cổ điển", "Thường"]}
                    value={formData.bedType}
                    onChange={(value) => setFormData({ ...formData, bedType: value })}
                    label="Loại phòng*"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Sức chứa, Diện tích và Loại giường */}
          <div className="row">
            {/* Sức chứa */}
            <div className="col-md-4">
              <div className="form-inner mb-30">
                <label>Sức chứa (số khách)*</label>
                <input
                  type="number"
                  name="capacity"
                  placeholder="Nhập sức chứa tối đa"
                  value={formData.capacity}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* Diện tích */}
            <div className="col-md-4">
              <div className="form-inner mb-30">
                <label>Diện tích (m²)*</label>
                <input
                  type="number"
                  name="area"
                  placeholder="Nhập diện tích phòng"
                  value={formData.area}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* Loại giường */}
            <div className="col-md-4">
              <div className="form-inner mb-30">
                <NiceSelect
                  options={["Single", "Double", "Queen", "King"]}
                  value={formData.bedType}
                  onChange={(value) => setFormData({ ...formData, bedType: value })}
                  label="Loại giường*"
                />
              </div>
            </div>
          </div>
          <div className="price-details">
            <h6>Giá phòng</h6>
            <div className="row">
              {/* Giá cơ bản */}
              <div className="col-md-6">
                <div className="form-inner mb-30">
                  <label>Giá cơ bản mỗi đêm*</label>
                  <input
                    type="number"
                    name="basePrice"
                    placeholder="Nhập giá cơ bản"
                    value={formData.basePrice}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              {/* Giá giảm */}
              <div className="col-md-6">
                <div className="form-inner mb-30">
                  <label>Giá giảm (nếu có)</label>
                  <input
                    type="number"
                    name="discountPrice"
                    placeholder="Nhập giá giảm"
                    value={formData.discountPrice}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Trạng thái phòng */}
          {/* <div className="form-inner mb-30">
            <label>
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleInputChange}
              />
              Phòng có sẵn để đặt
            </label>
          </div> */}

          {/* Tiện ích phòng */}
          <div className="room-amenities mb-30">
            <h6>Tiện ích phòng</h6>
            <div className="row" style={{ backgroundColor: "white", padding: "10px", borderRadius: "8px" }}>
              {amenitiesList.map((amenity, index) => (
                <div className="col-md-4" key={index}>

                  <label>
                    <input
                      type="checkbox"
                      value={amenity}
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                    />
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Hình ảnh phòng */}

          <div className="row">
            <div className="upload-img-area">
              {preview && (
                <div className="uploaded-image-preview">
                  <img
                    src={preview}
                    alt="Uploaded Room"
                    style={{
                      width: "240px",
                      height: "240px",
                      marginTop: "10px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
              <div className="upload-img-wrapper" {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="drag-area">
                  {isDragActive ? (
                    <p>Thả ảnh tại đây...</p>
                  ) : (
                    <button
                      type="button"
                      className="upload-btn"
                    >
                      <i className="bi bi-plus-lg"></i>
                    </button>
                  )}
                </div>
              </div>
              <div className="upload-img-area-content">
                <h6>Hình ảnh bên ngoài khách sạn</h6>
                <p>Chọn tối đa 5 ảnh. Yêu cầu định dạng JPEG hoặc PNG.</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="upload-img-area">
              {preview && (
                <div className="uploaded-image-preview">
                  <img
                    src={preview}
                    alt="Uploaded Room"
                    style={{
                      width: "240px",
                      height: "240px",
                      marginTop: "10px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
              <div className="upload-img-wrapper" {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="drag-area">
                  {isDragActive ? (
                    <p>Thả ảnh tại đây...</p>
                  ) : (
                    <button
                      type="button"
                      className="upload-btn"
                    >
                      <i className="bi bi-plus-lg"></i>
                    </button>
                  )}
                </div>
              </div>
              <div className="upload-img-area-content">
                <h6>Hình ảnh phòng</h6>
                <p>Chọn ít nhất 1 ảnh, tối đa 10 ảnh. Yêu cầu định dạng JPEG hoặc PNG.</p>
              </div>
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

export default RoomDetails;

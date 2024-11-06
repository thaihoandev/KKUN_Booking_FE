import React from "react";

function Confirmation({ onSubmit, onEdit }) {
  // Dữ liệu giả định
  const hotelData = {
    name: "Khách sạn Hòa Bình",
    type: "Khách sạn 5 sao",
    stars: 5,
    address: "123 Đường ABC, Quận X, TP.HCM",
    paymentPolicy: "Thanh toán khi nhận phòng",
  };

  const roomData = {
    roomType: "Phòng Tổng thống",
    basePrice: "2,000,000 VND",
    capacity: 4,
    amenities: ["Wi-Fi miễn phí", "TV", "Máy lạnh", "Minibar"],
  };

  const hotelImages = [
    "image1.jpg", // Thay bằng URL 
    "image2.jpg",
  ];

  const roomImages = [
    "room_image1.jpg",
    "room_image2.jpg",
  ];

  return (
    <div className="dashboard-profile-tab-content">
      <div className="account-details-tab-content">
        <div className="account-tab-content-title">
          <h6>Xem lại & Đăng ký</h6>
          <p>Vui lòng kiểm tra kỹ các thông tin dưới đây trước khi đăng ký.</p>
        </div>

        {/* Tóm tắt thông tin khách sạn */}
        <div className="hotel-summary mb-30">
          <h6>Tóm tắt Khách sạn</h6>
          <p><strong>Tên khách sạn:</strong> {hotelData.name}</p>
          <p><strong>Loại khách sạn:</strong> {hotelData.type}</p>
          <p><strong>Số sao:</strong> {hotelData.stars}</p>
          <p><strong>Địa chỉ:</strong> {hotelData.address}</p>
          <p><strong>Chính sách thanh toán:</strong> {hotelData.paymentPolicy}</p>
          <button type="button" className="edit-btn" onClick={() => onEdit("Hotel")}>Chỉnh sửa</button>
        </div>

        {/* Tóm tắt thông tin phòng */}
        <div className="room-summary mb-30">
          <h6>Tóm tắt Phòng</h6>
          <p><strong>Loại phòng:</strong> {roomData.roomType}</p>
          <p><strong>Giá cơ bản:</strong> {roomData.basePrice}</p>
          <p><strong>Sức chứa:</strong> {roomData.capacity} khách</p>
          <p><strong>Tiện ích trong phòng:</strong> {roomData.amenities.join(", ")}</p>
          <button type="button" className="edit-btn" onClick={() => onEdit("Room")}>Chỉnh sửa</button>
        </div>

        {/* Hình ảnh khách sạn và phòng */}
        <div className="photos-section mb-30">
          <h6>Hình ảnh</h6>
          <div className="hotel-images">
            <h6>Hình ảnh khách sạn</h6>
            <div className="image-preview">
              {hotelImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Hotel Image ${index + 1}`}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="room-images mt-20">
            <h6>Hình ảnh phòng</h6>
            <div className="image-preview">
              {roomImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Room Image ${index + 1}`}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
              ))}
            </div>
          </div>
          <button type="button" className="edit-btn" onClick={() => onEdit("Photos")}>Chỉnh sửa</button>
        </div>

        {/* Nút chuyển sang bước đăng ký */}
        <button type="submit" className="primary-btn3" onClick={onSubmit}>
          Đăng ký
        </button>
      </div>
    </div>
  );
}

export default Confirmation;

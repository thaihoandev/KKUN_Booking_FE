import React from 'react';

const PropertyDetailsForm = () => {
  return (
    <div className="container py-4">
      {/* Property Details Header */}
      <div className="row mb-4 align-items-start">
        <div className="col">
          <h2 className="h4">Chi tiết bất động sản</h2>
          <p className="text-muted small">
            Đất ra các chính sách chính và lịch kê các điểm nghỉ để khách biết những gì họ có thể
            mong đợi và trải nghiệm trong thời gian lưu trú.
          </p>
        </div>
        <div className="col-auto">
          <img 
            src="/api/placeholder/96/96" 
            alt="Armchair icon" 
            className="img-fluid"
            style={{ width: '96px', height: '96px' }}
          />
        </div>
      </div>

      {/* Cancellation Policy */}
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="h5 mb-3">Chính sách hủy bỏ</h3>
          
          <div className="form-check mb-3">
            <input
              type="radio"
              className="form-check-input"
              id="cancel-1day"
              name="cancellation"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="cancel-1day">
              <div className="fw-medium">Có thể hoàn lại tiền trước ngày nhận phòng 1 ngày</div>
              <small className="text-muted">
                Khách có thể hủy trước 1 ngày (24 giờ) so với ngày nhận phòng.
                Hủy phòng trong vòng 24 giờ trước ngày nhận phòng sẽ phải chi phạt 100% giá đặt phòng.
              </small>
            </label>
          </div>

          <div className="form-check mb-3">
            <input
              type="radio"
              className="form-check-input"
              id="cancel-3days"
              name="cancellation"
            />
            <label className="form-check-label" htmlFor="cancel-3days">
              <div className="fw-medium">Có thể hoàn tiền trước ngày nhận phòng 3 ngày</div>
              <small className="text-muted">
                Khách có thể hủy trước 3 ngày (72 giờ) so với ngày nhận phòng.
                Hủy phòng trong vòng 72 giờ trước ngày nhận phòng sẽ phải chi phạt 100% giá đặt phòng.
              </small>
            </label>
          </div>

          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="no-refund"
              name="cancellation"
            />
            <label className="form-check-label" htmlFor="no-refund">
              <div className="fw-medium">Không hoàn lại</div>
              <small className="text-muted">
                Không được hủy miễn phí. Áp dụng mức phạt 100% cho mọi trường hợp hủy.
              </small>
            </label>
          </div>
        </div>
      </div>

      {/* Check-in/Check-out Times */}
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="h5 mb-3">Thời gian nhận phòng/trả phòng</h3>
          
          <div className="mb-3">
            <label className="form-label">Khi nào khách có thể nhận phòng?</label>
            <div className="row align-items-center g-2">
              <div className="col">
                <select className="form-select">
                  <option>3 giờ chiều</option>
                </select>
              </div>
              <div className="col-auto">Và</div>
              <div className="col">
                <select className="form-select">
                  <option>6 giờ chiều</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="form-label">Khách phải trả phòng vào thời gian nào?</label>
            <select className="form-select">
              <option>11 giờ sáng</option>
            </select>
          </div>
        </div>
      </div>

      {/* Access Methods */}
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="h5">Truy cập</h3>
          <p className="text-muted small mb-3">Đây là cách khách vào nơi lưu trú của bạn.</p>
          
          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="auto-checkin"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="auto-checkin">
                  Check-in/out tự động
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="24h-checkin"
                />
                <label className="form-check-label" htmlFor="24h-checkin">
                  Check-in (24 giờ)
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="keyless"
                />
                <label className="form-check-label" htmlFor="keyless">
                  Truy cập không cần chìa khóa
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="parking"
                />
                <label className="form-check-label" htmlFor="parking">
                  Bãi đỗ xe
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Features */}
      <div className="card">
        <div className="card-body">
          <h3 className="h5">Thông tin quan trọng</h3>
          <p className="text-muted small mb-3">
            Những dịch vụ này được tìm thấy trong hầu hết các bất động sản thành công của chúng tôi
          </p>

          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="air-condition"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="air-condition">
                  Điều hòa
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="wifi"
                />
                <label className="form-check-label" htmlFor="wifi">
                  WiFi miễn phí trong tất cả các phòng
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="pets"
                />
                <label className="form-check-label" htmlFor="pets">
                  Cho phép mang theo vật nuôi
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="breakfast"
                />
                <label className="form-check-label" htmlFor="breakfast">
                  Bữa sáng [miễn phí]
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="cleaning"
                />
                <label className="form-check-label" htmlFor="cleaning">
                  Vệ sinh hàng ngày
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="airport"
                />
                <label className="form-check-label" htmlFor="airport">
                  Vận chuyển đến sân bay
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsForm;
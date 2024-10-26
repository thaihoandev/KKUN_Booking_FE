import React from "react";
import moment from "moment";
import convertToVND from "../../../utils/convertToVND";

function SidebarBookingForm({ bookingDate, hotel, room }) {
    return (
        <div className="card p-4 mb-4 booking-form-wrap mb-30">
            {/* Header Section */}
            <div className="row ">
                <div className="position-relative col-4">
                    <img
                        src={hotel.exteriorImages?.[0]}
                        alt="Hotel room"
                        className="rounded w-100 h-100 object-fit-cover"
                    />
                    <span className="position-absolute top-0 start-0 badge bg-success">
                        Wi-Fi miễn phí
                    </span>
                </div>

                <div className="col-8">
                    <h3 className="fw-semibold fs-6">{hotel.name}</h3>
                    <div className="d-flex align-items-center text-secondary gap-1">
                        <span className="small">
                            {hotel.categoryDisplayName}
                        </span>
                    </div>
                    <div className="d-flex align-items-center mt-1">
                        <div className="d-flex align-items-center gap-1">
                            <span className="fw-semibold">{hotel.rating}</span>
                            <span className="text-primary small">
                                Trên cả tuyệt vời
                            </span>
                        </div>
                        <span className="text-secondary small ms-1">
                            {hotel.numOfReviews}
                        </span>
                    </div>
                    <div className="text-danger small mt-1">
                        <i className="bi bi-geo-alt"></i> {hotel.location}
                    </div>
                </div>
            </div>
            <hr />
            <div className="sidebar-booking-form">
                <form>
                    <div className="tour-date-wrap mb-10">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="tourDate"
                                id="checkIn"
                                value="option1"
                                checked
                            />
                            <label className="form-check-label" for="checkIn">
                                <span className="tour-date">
                                    <span className="start-date">
                                        <span>Ngày nhận phòng</span>
                                        <span>
                                            {bookingDate.checkInDate
                                                ? moment(
                                                      bookingDate.checkInDate
                                                  ).format("DD/MM/YYYY")
                                                : "Chưa chọn"}
                                        </span>
                                    </span>
                                    <i className="bi bi-arrow-right"></i>
                                    <span className="end-date text-end">
                                        <span>Ngày trả phòng</span>
                                        <span>
                                            {bookingDate.checkOutDate
                                                ? moment(
                                                      bookingDate.checkOutDate
                                                  ).format("DD/MM/YYYY")
                                                : "Chưa chọn"}
                                        </span>
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                </form>
            </div>
            <hr />
            {/* Room Details */}
            <div className="row py-2 border rounded mt-2">
                <div className="col-3">
                    <img
                        src={room.roomImages?.[0]}
                        alt="Room"
                        className="rounded w-100 h-100 object-fit-cover"
                    />
                </div>

                <div className="col-8">
                    <h3 className="fw-semibold fs-6">
                        1 x {room.typeDisplayName}
                    </h3>
                    <div className="d-flex gap-2 text-secondary small mt-1">
                        <span>12 m²</span>
                        <span>•</span>
                        <span>Tối đa: {room.capacity} người lớn</span>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="mt-2">
                <div className="d-flex align-items-center gap-2 ">
                    <i className="bi bi-check-lg text-success"></i>
                    <span className="small">
                        Giá cực tốt! (không hoàn tiền)
                    </span>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-check-lg text-success"></i>
                    <span className="small">Đặt không cần thẻ tín dụng</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-check-lg text-success"></i>
                    <span className="small">Thanh toán tại nơi ở</span>
                </div>
                <div className="d-flex align-items-center gap-2 text-danger">
                    <span className="fw-bold">🔥</span>
                    <span className="small">
                        Nhanh lên! Phòng cuối cùng của chúng tôi ở mức giá này
                    </span>
                </div>
            </div>
            <hr />
            <div class="booking-form-item-type">
                <div class="single-total mb-30">
                    <span>Giá phòng</span>
                    <ul>
                        <li>
                            <strong>{convertToVND(room.basePrice)}</strong>
                        </li>
                        <li>
                            <i class="bi bi-x-lg"></i>
                        </li>
                        <li>
                            <strong>1</strong> Đêm
                        </li>
                        <li>
                            <i class="bi bi-x-lg"></i>
                        </li>
                        <li>
                            <strong>1</strong> Đêm
                        </li>
                    </ul>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="27"
                        height="15"
                        viewBox="0 0 27 15"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M23.999 5.44668L25.6991 7.4978L23.9991 9.54878H0V10.5743H23.1491L20.0135 14.3575L20.7834 14.9956L26.7334 7.81687L26.9979 7.4978L26.7334 7.17873L20.7834 0L20.0135 0.638141L23.149 4.42114H0V5.44668H23.999Z"
                        ></path>
                    </svg>
                    <div class="total">{convertToVND(room.basePrice)}</div>
                </div>
            </div>
            <div class="total-price mb-1 d-flex justify-content-between">
                <span>Giá cuối cùng:</span> {convertToVND(room.basePrice)}
            </div>
            <span className="small">
                Giá đã bao gồm: VAT <span>{convertToVND(room.basePrice)}</span>
            </span>
        </div>
    );
}

export default SidebarBookingForm;

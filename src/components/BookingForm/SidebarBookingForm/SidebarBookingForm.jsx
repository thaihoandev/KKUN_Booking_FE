import React from "react";
import moment from "moment";
import convertToVND from "../../../utils/convertToVND";
import { calculateNumberOfNights } from "../../../utils/utils";
import {
    convertRating5To10Scale,
    getRatingDescription,
} from "../../../utils/ratingReview";
import { useTranslation } from "react-i18next";

function SidebarBookingForm({ booking, hotel, room, discount }) {
    const { t } = useTranslation();
    const numberOfNights = calculateNumberOfNights(
        booking.checkInDate,
        booking.checkOutDate
    );
    const totalDatesPrice = numberOfNights * room.basePrice;
    const discountedPrice = totalDatesPrice - discount; // Áp dụng giảm giá
    const VATPrice = (discountedPrice * 10) / 100;
    const totalPrice = discountedPrice + VATPrice;
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
                        {t("amenities.mien_phi_wifi")}
                    </span>
                </div>

                <div className="col-8">
                    <h3 className="fw-semibold fs-6">{hotel.name}</h3>
                    <div className="d-flex align-items-center text-secondary gap-1">
                        <span className="small">
                            {t(`hotel.categories.${hotel.category}`)}
                        </span>
                    </div>
                    <div className="d-flex align-items-center mt-1">
                        <div className="d-flex align-items-center gap-1">
                            <span className="fw-semibold">
                                {convertRating5To10Scale(hotel.rating)}
                            </span>
                            <span className="text-primary small">
                                {getRatingDescription(hotel.rating)}
                            </span>
                        </div>
                        <span className="text-secondary small ms-1">
                            {hotel.numOfReviews} {t("reviewTitle")}
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
                                        <span>{t("checkInDate")}</span>
                                        <span>
                                            {booking.checkInDate
                                                ? moment(
                                                      booking.checkInDate
                                                  ).format("DD/MM/YYYY")
                                                : `${t("notChooses")}`}
                                        </span>
                                    </span>
                                    <i className="bi bi-arrow-right"></i>
                                    <span className="end-date text-end">
                                        <span>{t("checkOutDate")}</span>
                                        <span>
                                            {booking.checkOutDate
                                                ? moment(
                                                      booking.checkOutDate
                                                  ).format("DD/MM/YYYY")
                                                : `${t("notChooses")}`}
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
                        1 x{" "}
                        {t(`roomTypes.${room.type}`) ||
                            t("hotel.roomTypeUnavailable")}
                    </h3>
                    <div className="d-flex gap-2 text-secondary small mt-1">
                        <span>{room.area} m²</span>
                        <span>•</span>
                        <span>
                            {t("max")}: {room.capacity} {t("adults")}
                        </span>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="mt-2">
                <div className="d-flex align-items-center gap-2 ">
                    <i className="bi bi-check-lg text-success"></i>
                    <span className="small">{t("greatPrice")}</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-check-lg text-success"></i>
                    <span className="small">
                        {t("checkoutBooking.noCreditCardLabel")}
                    </span>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-check-lg text-success"></i>
                    <span className="small">
                        {t("checkoutBooking.payAtLocationLabel")}
                    </span>
                </div>
                <div className="d-flex align-items-center gap-2 text-danger">
                    <span className="fw-bold">🔥</span>
                    <span className="small">
                        {t("checkoutBooking.quickToBookRoom")}
                    </span>
                </div>
            </div>
            <hr />
            <div class="booking-form-item-type">
                <div class="single-total mb-30">
                    <span> {t("roomPrice")}</span>
                    <ul>
                        <li>
                            <strong>{convertToVND(room.basePrice)}</strong>
                        </li>
                        <li>
                            <i class="bi bi-x-lg"></i>
                        </li>
                        <li>
                            <strong>{numberOfNights}</strong> {t("nights")}
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
                    <div class="total">{convertToVND(totalDatesPrice)}</div>
                </div>
            </div>
            <span className="small d-flex flex-column">
                {discount > 0 && (
                    <div className="d-flex justify-content-between">
                        <span>{t("discountedPrice")}:</span>
                        <span>- {convertToVND(discount)}</span>
                    </div>
                )}
                <div className="d-flex justify-content-between">
                    <span>{t("priceIncluded")}: </span>
                    <span>VAT {convertToVND(VATPrice)}</span>
                </div>
            </span>

            <div class="total-price mb-1 d-flex justify-content-between">
                <span>{t("lastPrice")}:</span> {convertToVND(totalPrice)}
            </div>
        </div>
    );
}

export default SidebarBookingForm;

import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as HotelService from "../../services/HotelService";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import moment from "moment";

function NearbyPlaces({ hotel, room }) {
    const [nearbyPlaces, setNearbyPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const bookingDate = useSelector((state) => state.bookingDate);

    const checkInDate = bookingDate.checkInDate
        ? moment(bookingDate.checkInDate)
        : null;
    const checkOutDate = bookingDate.checkOutDate
        ? moment(bookingDate.checkOutDate)
        : null;

    const numberOfNights =
        checkInDate && checkOutDate
            ? checkOutDate.diff(checkInDate, "days")
            : 0;

    const mutationNearbyPlaces = useMutation(
        (hotel) => HotelService.getNearbyPlaces(hotel.id, hotel.location), // Truyền cả hotelId và location
        {
            onSuccess: (data) => {
                setNearbyPlaces(data);
                setLoading(false);
            },
            onError: (error) => {
                toast.error(error.message);
                setLoading(false);
            },
        }
    );

    useEffect(() => {
        if (hotel.location) {
            // Kiểm tra xem location có giá trị không
            setLoading(true); // Đặt loading là true trước khi gọi API
            mutationNearbyPlaces.mutate(hotel); // Truyền cả hotelId và location
        }
    }, [hotel]); // Thêm hotelId và location vào dependencies

    if (loading) {
        return <Loading />;
    }
    return (
        <>
            <div className="booking-form-wrap mb-30">
                <p className="mt-2">
                    Đặt phòng ngay để được tận hưởng những ưu đãi, tiện ích sớm
                    để không gặp phải những rắc rối!
                </p>

                <div className="tab-content" id="v-pills-tabContent2">
                    <div
                        className="tab-pane fade active show"
                        id="v-pills-booking"
                        role="tabpanel"
                        aria-labelledby="v-pills-booking-tab"
                    >
                        <div className="sidebar-booking-form">
                            <form>
                                <div className="tour-date-wrap mb-50">
                                    <h6>
                                        Xác nhận ngày đặt: ({numberOfNights}{" "}
                                        đêm)
                                    </h6>
                                    <div className="form-check mb-25">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="tourDate"
                                            id="checkIn"
                                            value="option1"
                                            checked
                                        />
                                        <label
                                            className="form-check-label"
                                            for="checkIn"
                                        >
                                            <span className="tour-date">
                                                <span className="start-date">
                                                    <span>Ngày nhận phòng</span>
                                                    <span>
                                                        {bookingDate.checkInDate
                                                            ? moment(
                                                                  bookingDate.checkInDate
                                                              ).format(
                                                                  "DD/MM/YYYY"
                                                              )
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
                                                              ).format(
                                                                  "DD/MM/YYYY"
                                                              )
                                                            : "Chưa chọn"}
                                                    </span>
                                                </span>
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <div className="booking-form-item-type">
                                    <h5>Những địa điểm gần đây</h5>
                                    <div className="checkbox-container nearby-place-list">
                                        {nearbyPlaces &&
                                        nearbyPlaces.length > 0 ? (
                                            nearbyPlaces.map((place) => (
                                                <label
                                                    key={place.id}
                                                    className="check-container"
                                                    style={{ fontSize: "14px" }}
                                                >
                                                    {place.name}{" "}
                                                    {/* Tên địa điểm */}
                                                    <span className="distance">
                                                        {place.distanceInKm}
                                                        {" km"}
                                                        {/* Khoảng cách hoặc giá */}
                                                    </span>
                                                    {/* Nếu bạn có CSS cho checkbox tùy chỉnh */}
                                                </label>
                                            ))
                                        ) : (
                                            <p>
                                                Không có địa điểm nào gần đây.
                                            </p> // Thông báo nếu không có địa điểm nào
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NearbyPlaces;

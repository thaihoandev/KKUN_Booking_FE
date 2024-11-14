import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as HotelService from "../../services/HotelService";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import moment from "moment";
import { calculateNumberOfNights } from "../../utils/utils";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons

function NearbyPlaces({ hotel, room }) {
    const [nearbyPlaces, setNearbyPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const booking = useSelector((state) => state.booking);

    const numberOfNights = calculateNumberOfNights(
        booking.checkInDate,
        booking.checkOutDate
    );

    const mutationNearbyPlaces = useMutation(
        (hotel) => HotelService.getNearbyPlaces(hotel.id, hotel.location),
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
            setLoading(true);
            mutationNearbyPlaces.mutate(hotel);
        }
    }, [hotel]);

    const getPlaceIcon = (category) => {
        switch (category) {
            case "Restaurant":
                return "bi bi-shop";
            case "Cafe":
                return "bi bi-cup-straw";
            case "Bar":
                return "bi bi-cup";
            case "Parking Lot":
                return "bi bi-signpost";
            case "Cinema":
                return "bi bi-film";
            case "Fast Food":
                return "bi bi-shop";
            case "Museum":
                return "bi bi-bank";
            case "Zoo":
                return "bi bi-bug";
            case "Aquarium":
                return "bi bi-droplet";
            case "Theatre":
                return "bi bi-theater-masks";
            case "Attraction":
                return "bi bi-binoculars";
            case "Viewpoint":
                return "bi bi-eye";
            case "Gallery":
                return "bi bi-easel";
            case "Theme Park":
                return "bi bi-balloon";
            case "Hospital":
                return "bi bi-hospital";
            case "Clinic":
                return "bi bi-clipboard-pulse";
            case "Pharmacy":
                return "bi bi-prescription";
            case "Park":
                return "bi bi-tree";
            case "Garden":
                return "bi bi-flower3";
            case "Beach":
                return "bi bi-beach";
            case "Sports Centre":
                return "bi bi-building ";
            default:
                return "bi bi-geo-alt"; // Default icon
        }
    };

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
                                            htmlFor="checkIn"
                                        >
                                            <span className="tour-date">
                                                <span className="start-date">
                                                    <span>Ngày nhận phòng</span>
                                                    <span>
                                                        {booking.checkInDate
                                                            ? moment(
                                                                  booking.checkInDate
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
                                                        {booking.checkOutDate
                                                            ? moment(
                                                                  booking.checkOutDate
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
                                            nearbyPlaces.map((place, index) => (
                                                <label
                                                    key={index}
                                                    className="check-container"
                                                    style={{ fontSize: "14px" }}
                                                >
                                                    <span>
                                                        <i
                                                            className={`${getPlaceIcon(
                                                                place.category
                                                            )} me-2`}
                                                        ></i>
                                                        {place.name}{" "}
                                                    </span>
                                                    <span className="distance">
                                                        {place.distanceInKm} km
                                                    </span>
                                                </label>
                                            ))
                                        ) : (
                                            <p>
                                                Không có địa điểm nào gần đây.
                                            </p>
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

import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as HotelService from "../../services/HotelService";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import moment from "moment";
import { calculateNumberOfNights } from "../../utils/utils";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import { getPlaceIcon } from "../../utils/icons";
import { useTranslation } from "react-i18next";

function NearbyPlaces({ hotel, room }) {
    const [nearbyPlaces, setNearbyPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const booking = useSelector((state) => state.booking);
    const { t } = useTranslation();

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

    if (loading) {
        return <Loading />;
    }
    return (
        <>
            <div className="booking-form-wrap mb-30">
                <p className="mt-2">{t("roomDetailsPage.bookInviteDesc")}</p>

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
                                        {t(
                                            "roomDetailsPage.confirmBookingCheck"
                                        )}
                                        : ({numberOfNights} {t("nights")})
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
                                                    <span>
                                                        {t("checkInDate")}
                                                    </span>
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
                                                    <span>
                                                        {t("checkOutDate")}
                                                    </span>
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
                                    <h5>
                                        {t("roomDetailsPage.nearbyPlacesTitle")}
                                    </h5>
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
                                            <p></p>
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

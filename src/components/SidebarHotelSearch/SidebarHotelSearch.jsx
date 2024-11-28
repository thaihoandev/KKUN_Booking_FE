import React, { useEffect, useState } from "react";
import RangeSlider from "../RangeSlider/RangeSlider";
import convertToVND from "../../utils/convertToVND";
import { useMutation } from "react-query";
import * as AmenityService from "../../services/AmenityService";
import * as SearchService from "../../services/SearchService";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { removeDiacritics } from "../../utils/utils";
function SidebarHotelSearch({ onFilterChange, onSearchByName }) {
    const [priceValues, setPriceValues] = useState([100000, 5000000]);
    const [popularFilters, setPopularFilters] = useState({
        prePayment: false,
        freeCancellation: false,
        breakfastIncluded: false,
    });
    const [facilityFilters, setFacilityFilters] = useState([]);
    const [ratingFilters, setRatingFilters] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const booking = useSelector((state) => state.booking);
    const { t } = useTranslation();

    const mutateGetFacilities = useMutation(
        () => {
            return AmenityService.getAllAmenities();
        },
        {
            onSuccess: (data) => {
                setFacilities(data);
            },
            onError: (err) => {
                toast.error(err.message);
            },
        }
    );

    const handlePopularChange = (filterName) => {
        const updatedFilters = {
            ...popularFilters,
            [filterName]: !popularFilters[filterName], // Toggle boolean value
        };
        setPopularFilters(updatedFilters);
        triggerFilterUpdate({ popularFilters: updatedFilters });
    };

    const handleFacilityChange = (facility) => {
        const updatedFacilities = facilityFilters.includes(facility)
            ? facilityFilters.filter((item) => item !== facility)
            : [...facilityFilters, facility];
        setFacilityFilters(updatedFacilities);
        triggerFilterUpdate({ facilityFilters: updatedFacilities });
    };
    const groupedFacilities = facilities.reduce((acc, facility) => {
        if (!acc[facility.amenityType]) {
            acc[facility.amenityType] = facility; // Take only the first facility of each type
        }
        return acc;
    }, {});
    const handleRatingChange = (rating) => {
        const updatedRatings = ratingFilters.includes(rating)
            ? ratingFilters.filter((item) => item !== rating)
            : [...ratingFilters, rating];
        setRatingFilters(updatedRatings);
        triggerFilterUpdate({ ratingFilters: updatedRatings });
    };

    const handleApplyFilters = (event) => {
        event.preventDefault();
        triggerFilterUpdate({ priceRange: priceValues });
    };

    const triggerFilterUpdate = (updatedFilters = {}) => {
        onFilterChange({
            priceRange: priceValues,
            popularFilters,
            facilityFilters,
            ratingFilters,
            ...updatedFilters,
        });
    };

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmitSearchHotels = (event) => {
        event.preventDefault();
        if (searchTerm.trim()) {
            onSearchByName(searchTerm); // Pass search term to HotelSearchList
        }
    };
    useEffect(() => {
        mutateGetFacilities.mutate();
    }, []);
    return (
        <div className="sidebar-area">
            <div className="single-widget mb-30">
                <h5 className="widget-title">{t("search.searchButton")}</h5>
                <form>
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder={t("search.searchPlaceholder")}
                            value={searchTerm}
                            onChange={handleSearchInputChange}
                        />
                        <button type="submit">
                            <i className="bx bx-search"></i>
                        </button>
                    </div>
                </form>
            </div>

            <div className="single-widget mb-30">
                <h5 className="widget-title">{t("search.filterPopular")}</h5>
                <div className="checkbox-container">
                    <ul>
                        {[
                            {
                                label: t("search.prePayment"),
                                name: "prePayment",
                            },
                            {
                                label: t("search.freeCancellation"),
                                name: "freeCancellation",
                            },
                            {
                                label: t("search.breakfastIncluded"),
                                name: "breakfastIncluded",
                            },
                        ].map((filter, index) => (
                            <li key={index}>
                                <label className="containerss">
                                    <input
                                        type="checkbox"
                                        onChange={() =>
                                            handlePopularChange(filter.name)
                                        }
                                        checked={popularFilters[filter.name]}
                                    />
                                    <span className="checkmark"></span>
                                    <span className="text">{filter.label}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="single-widget mb-30">
                <h5 className="shop-widget-title">{t("search.filterPrice")}</h5>
                <div className="range-wrap">
                    <div className="row">
                        <div className="col-sm-12">
                            <form>
                                <input
                                    type="hidden"
                                    name="min-value"
                                    value={priceValues[0]}
                                />
                                <input
                                    type="hidden"
                                    name="max-value"
                                    value={priceValues[1]}
                                />
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <RangeSlider
                                minValue={100000}
                                maxValue={5000000}
                                values={priceValues}
                                setValues={setPriceValues}
                            />
                        </div>
                    </div>
                    <div className="slider-labels">
                        <div className="caption">
                            <span id="slider-range-value1">
                                {convertToVND(priceValues[0])}
                            </span>
                        </div>
                        <a href="#" onClick={handleApplyFilters}>
                            {t("search.applyFilter")}
                        </a>
                        <div className="caption">
                            <span id="slider-range-value2">
                                {convertToVND(priceValues[1])}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="single-widget mb-30">
                <h5 className="widget-title">{t("search.facilities")}</h5>
                <div className="checkbox-container">
                    <ul>
                        {Object.values(groupedFacilities).map(
                            (facility, index) => (
                                <li key={index}>
                                    <label className="containerss">
                                        <input
                                            type="checkbox"
                                            onChange={() =>
                                                handleFacilityChange(
                                                    facility.name
                                                )
                                            }
                                            checked={facilityFilters.includes(
                                                facility.name
                                            )}
                                        />
                                        <span className="checkmark"></span>
                                        <span className="text">
                                            {t(
                                                `amenities.${removeDiacritics(
                                                    facility.name
                                                )
                                                    .toLowerCase()
                                                    .replace(/\s+/g, "_")
                                                    .replace("/", "_")}`
                                            )}
                                        </span>
                                    </label>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </div>

            <div className="single-widget mb-30">
                <h5 className="widget-title">{t("search.ratings")}</h5>
                <div className="checkbox-container">
                    <ul>
                        {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1].map((rating, index) => (
                            <li key={index}>
                                <label className="containerss">
                                    <input
                                        type="checkbox"
                                        onChange={() =>
                                            handleRatingChange(rating)
                                        }
                                        checked={ratingFilters.includes(rating)}
                                    />
                                    <span className="checkmark"></span>
                                    <span className="stars">
                                        {Array.from(
                                            { length: Math.floor(rating) },
                                            (_, i) => (
                                                <i
                                                    key={i}
                                                    className="bi bi-star-fill"
                                                ></i>
                                            )
                                        )}
                                        {rating % 1 !== 0 && (
                                            <i className="bi bi-star-half"></i>
                                        )}
                                        <a href="#" className="review-no">
                                            ({rating})
                                        </a>
                                    </span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SidebarHotelSearch;

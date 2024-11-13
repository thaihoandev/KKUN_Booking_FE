import React, { useState } from "react";
import RangeSlider from "../RangeSlider/RangeSlider";
import convertToVND from "../../utils/convertToVND";

function SidebarHotelSearch({ onFilterChange }) {
    const [priceValues, setPriceValues] = useState([100000, 5000000]);
    const [popularFilters, setPopularFilters] = useState({
        prePayment: false,
        freeCancellation: false,
        breakfastIncluded: false,
    });
    const [facilityFilters, setFacilityFilters] = useState([]);
    const [ratingFilters, setRatingFilters] = useState([]);

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

    return (
        <div className="sidebar-area">
            <div className="single-widget mb-30">
                <h5 className="widget-title">Tìm kiếm</h5>
                <form>
                    <div className="search-box">
                        <input type="text" placeholder="Tìm tại đây" />
                        <button type="submit">
                            <i className="bx bx-search"></i>
                        </button>
                    </div>
                </form>
            </div>

            <div className="single-widget mb-30">
                <h5 className="widget-title">Lọc theo độ phổ biến</h5>
                <div className="checkbox-container">
                    <ul>
                        {[
                            {
                                label: "Đặt không cần thanh toán trước",
                                name: "prePayment",
                            },
                            { label: "Miễn phí hủy", name: "freeCancellation" },
                            {
                                label: "Bao gồm bữa sáng",
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
                <h5 className="shop-widget-title">Lọc theo giá</h5>
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
                            Lọc
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
                <h5 className="widget-title">Cơ sở vật chất</h5>
                <div className="checkbox-container">
                    <ul>
                        {[
                            "Airport shuttle",
                            "Locker",
                            "Gym",
                            "Spa",
                            "Parking",
                            "Restaurant",
                            "Swimming pool",
                            "Pet friendly",
                        ].map((facility, index) => (
                            <li key={index}>
                                <label className="containerss">
                                    <input
                                        type="checkbox"
                                        onChange={() =>
                                            handleFacilityChange(facility)
                                        }
                                        checked={facilityFilters.includes(
                                            facility
                                        )}
                                    />
                                    <span className="checkmark"></span>
                                    <span className="text">{facility}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="single-widget mb-30">
                <h5 className="widget-title">Đánh giá</h5>
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

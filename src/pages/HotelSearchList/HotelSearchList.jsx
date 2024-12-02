// HotelSearchList.js

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HotelItemHorizontal from "../../components/HotelItem/HotelItemHorizontal/HotelItemHorizontal";
import SidebarHotelSearch from "../../components/SidebarHotelSearch/SidebarHotelSearch";
import SearchContainer from "../../components/SearchContainer/SearchContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as SearchService from "../../services/SearchService";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function HotelSearchList() {
    const location = useLocation();
    const initialResults = location.state?.results || [];
    const booking = useSelector((state) => state.booking); // Get booking state from Redux
    const { t } = useTranslation();
    // Initialize filterCriteria from Redux booking state
    const [filterCriteria, setFilterCriteria] = useState({
        location: booking.location || "",
        checkInDate: booking.checkInDate || null,
        checkOutDate: booking.checkOutDate || null,
        guests: (booking.adultQty || 0) + (booking.childQty || 0) || 1,
        minPrice: 100000,
        maxPrice: 5000000,
        amenities: [],
        rating: null,
        freeCancellation: false,
        breakfastIncluded: false,
        prePayment: false,
    });

    const [filteredResults, setFilteredResults] = useState(initialResults);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 6;

    const handleSearchResults = (results) => {
        setFilteredResults(results);
        setCurrentPage(1);
    };

    // Effect to update results when initial search results change
    useEffect(() => {
        setFilteredResults(initialResults);
        window.scrollTo(0, 0);
    }, [initialResults]);

    // Effect to apply filters whenever `filterCriteria` changes
    useEffect(() => {
        applyFilters();
    }, [filterCriteria]);

    // Function to apply filters using `filterCriteria`
    const applyFilters = () => {
        mutationSearchHotelFilters.mutate(filterCriteria);
    };

    // Mutation to fetch filtered hotel data from API
    const mutationSearchHotelFilters = useMutation(
        (data) => SearchService.searchHotels(data),
        {
            onSuccess: (data) => {
                setFilteredResults(data);
                setCurrentPage(1); // Reset to first page on filter change
            },
            onError: (err) => {
                toast.error(err.message);
            },
        }
    );
    const mutateSearchHotelsByName = useMutation(
        (data) => {
            return SearchService.searchHotelsByName(data);
        },
        {
            onSuccess: (data) => {
                setFilteredResults(data); // Update displayed results
                setCurrentPage(1); // Reset to the first page
                toast.success("Tìm thành công!");
            },
            onError: (err) => {
                toast.error(err.message);
            },
        }
    );
    const handleSearchByName = (hotelName) => {
        mutateSearchHotelsByName.mutate({
            hotelName,
            checkInDate: booking.checkInDate,
            checkOutDate: booking.checkOutDate,
            guests: booking.childQty + booking.adultQty,
        });
    };
    // Handle changes from SidebarHotelSearch and update filter criteria
    const handleFilterChange = (newFilters) => {
        setFilterCriteria((prevCriteria) => ({
            // Preserve values for location, dates, and guests from the previous state
            location: prevCriteria.location,
            checkInDate: prevCriteria.checkInDate,
            checkOutDate: prevCriteria.checkOutDate,
            guests: prevCriteria.guests,

            // Update filter values provided in newFilters with defaults
            minPrice: newFilters.priceRange
                ? newFilters.priceRange[0]
                : prevCriteria.minPrice,
            maxPrice: newFilters.priceRange
                ? newFilters.priceRange[1]
                : prevCriteria.maxPrice,
            freeCancellation:
                newFilters.popularFilters?.freeCancellation ??
                prevCriteria.freeCancellation,
            breakfastIncluded:
                newFilters.popularFilters?.breakfastIncluded ??
                prevCriteria.breakfastIncluded,
            prePayment:
                newFilters.popularFilters?.prePayment ??
                prevCriteria.prePayment,
            amenities: newFilters.facilityFilters || prevCriteria.amenities,
            rating: newFilters.ratingFilters?.length
                ? Math.max(...newFilters.ratingFilters)
                : null, // Set to null if no rating is selected
        }));
    };

    // Pagination calculations
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = filteredResults.slice(
        indexOfFirstResult,
        indexOfLastResult
    );

    const totalPages = Math.ceil(filteredResults.length / resultsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="home1-banner-bottom" style={{ marginTop: "10px" }}>
                <SearchContainer
                    shouldNavigate={false}
                    onSearch={handleSearchResults}
                />
            </div>
            <div className="room-suits-page pt-40 mb-120">
                <div className="container">
                    <div className="row g-lg-4 gy-5">
                        <div className="col-xl-4 order-lg-1 order-2">
                            <SidebarHotelSearch
                                onFilterChange={handleFilterChange} // Pass the handler to Sidebar
                                onSearchByName={handleSearchByName}
                            />
                        </div>
                        <div className="col-xl-8 order-lg-2 order-1">
                            {currentResults.length > 0 ? (
                                currentResults.map((hotel, index) => (
                                    <HotelItemHorizontal
                                        key={hotel.id || index}
                                        hotel={hotel}
                                    />
                                ))
                            ) : (
                                <div className="text-center">
                                    <h3>{t("hotelSearch.hotelNotFound")}</h3>
                                    <p>{t("hotelSearch.tryOtherCriteria")}</p>
                                </div>
                            )}

                            {filteredResults.length >= resultsPerPage && (
                                <div className="row mt-70">
                                    <div className="col-lg-12">
                                        <nav className="inner-pagination-area">
                                            <ul className="pagination-list">
                                                <li>
                                                    <button
                                                        onClick={() =>
                                                            handlePageChange(
                                                                currentPage - 1
                                                            )
                                                        }
                                                        className="shop-pagi-btn"
                                                        disabled={
                                                            currentPage === 1
                                                        }
                                                        style={{
                                                            cursor:
                                                                currentPage ===
                                                                1
                                                                    ? "not-allowed"
                                                                    : "pointer",
                                                        }}
                                                    >
                                                        <i className="bi bi-chevron-left"></i>
                                                    </button>
                                                </li>

                                                {Array.from(
                                                    { length: totalPages },
                                                    (_, i) => (
                                                        <li key={i + 1}>
                                                            <a
                                                                onClick={() =>
                                                                    handlePageChange(
                                                                        i + 1
                                                                    )
                                                                }
                                                                className={`pagination-button ${
                                                                    i + 1 ===
                                                                    currentPage
                                                                        ? "active"
                                                                        : ""
                                                                }`}
                                                                style={{
                                                                    border: "none",
                                                                    background:
                                                                        "none",
                                                                    padding:
                                                                        "8px 16px",
                                                                    cursor: "pointer",
                                                                }}
                                                            >
                                                                {i + 1}
                                                            </a>
                                                        </li>
                                                    )
                                                )}

                                                <li>
                                                    <button
                                                        onClick={() =>
                                                            handlePageChange(
                                                                currentPage + 1
                                                            )
                                                        }
                                                        className="shop-pagi-btn"
                                                        disabled={
                                                            currentPage ===
                                                            totalPages
                                                        }
                                                        style={{
                                                            cursor:
                                                                currentPage ===
                                                                totalPages
                                                                    ? "not-allowed"
                                                                    : "pointer",
                                                        }}
                                                    >
                                                        <i className="bi bi-chevron-right"></i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HotelSearchList;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HotelItemHorizontal from "../../components/HotelItem/HotelItemHorizontal/HotelItemHorizontal";
import SidebarHotelSearch from "../../components/SidebarHotelSearch/SidebarHotelSearch";
import SearchContainer from "../../components/SearchContainer/SearchContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure this is imported

function HotelSearchList() {
    const location = useLocation();
    const initialResults = location.state?.results || [];
    const [searchResults, setSearchResults] = useState(initialResults);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 1;

    const handleSearchResults = (results) => {
        setSearchResults(results);
        setCurrentPage(1);
    };

    useEffect(() => {
        if (initialResults.length > 0) {
            setSearchResults(initialResults);
        }
    }, [initialResults]);

    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = searchResults.slice(
        indexOfFirstResult,
        indexOfLastResult
    );
    const totalPages = Math.ceil(searchResults.length / resultsPerPage);

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
                            <SidebarHotelSearch />
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
                                    <h3>Không tìm thấy khách sạn phù hợp</h3>
                                    <p>
                                        Vui lòng thử lại với các tiêu chí khác
                                        hoặc kiểm tra lại thông tin tìm kiếm của
                                        bạn.
                                    </p>
                                </div>
                            )}

                            {searchResults.length >= resultsPerPage && (
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
                                                            <button
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
                                                            </button>
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

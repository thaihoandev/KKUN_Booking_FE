import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const LocationSearchInput = ({ onLocationSelect }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Hàm xử lý bỏ các từ không mong muốn
    const cleanLocationName = (name) => {
        return name.replace(/(Thành phố|Tỉnh|Quốc gia)\s*/gi, "").trim();
    };

    const suggestedLocations = [
        {
            name: "Hà Nội",
            district: "Hoàn Kiếm",
            city: "Hà Nội",
            state: "Hà Nội",
            country: "Việt Nam",
            code: "HAN",
            full_name: "Hà Nội, Hà Nội, Việt Nam",
            lat: "21.028511",
            lon: "105.804817",
        },
        {
            name: "Hồ Chí Minh",
            district: "Quận 1",
            city: "Hồ Chí Minh",
            state: "Hồ Chí Minh",
            country: "Việt Nam",
            code: "HAN",
            full_name: "Hồ Chí Minh, Việt Nam",
            lat: "21.028511",
            lon: "105.804817",
        },
        // ... other locations
    ];

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
        if (!searchQuery) {
            setFilteredLocations(suggestedLocations);
        }
    };

    const formatAddress = (location) => {
        const parts = [];
        if (location.district && location.district !== "-")
            parts.push(cleanLocationName(location.district));
        if (location.state && location.state !== "-")
            parts.push(cleanLocationName(location.state));
        if (location.country) parts.push(cleanLocationName(location.country));
        return parts.join(", ");
    };

    const handleSelectLocation = (location) => {
        setSelectedLocation(cleanLocationName(location.name));
        onLocationSelect({
            display_name: location.name,
            lat: location.lat,
            lon: location.lon,
        });
        setDropdownOpen(false);
        setSearchQuery("");
    };

    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    const searchLocations = async (value) => {
        if (value.length <= 2) {
            setFilteredLocations(value.length === 0 ? suggestedLocations : []);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                "https://nominatim.openstreetmap.org/search",
                {
                    params: {
                        q: value,
                        format: "json",
                        addressdetails: 1,
                        limit: 5,
                        countrycodes: "vn",
                    },
                    headers: {
                        "User-Agent": "YourAppName/1.0",
                    },
                }
            );

            const formattedLocations = response.data.map((location) => {
                const city =
                    location.address?.city ||
                    location.address?.town ||
                    location.address?.municipality ||
                    location.address?.village ||
                    location.display_name.split(",")[0];

                const state =
                    location.address?.state ||
                    location.address?.county ||
                    location.address?.province ||
                    "-";

                const country = location.address?.country || "Unknown";
                const fullName = [
                    cleanLocationName(city),
                    cleanLocationName(state),
                    cleanLocationName(country),
                ]
                    .filter((part) => part && part !== "-")
                    .join(", ");

                return {
                    name: cleanLocationName(city),
                    city: cleanLocationName(city),
                    district: cleanLocationName(
                        location.address?.city_district ||
                            location.address?.suburb ||
                            location.address?.district ||
                            "-"
                    ),
                    state: cleanLocationName(state),
                    country: cleanLocationName(country),
                    code: location.place_id?.toString().slice(0, 4) || "-",
                    full_name: fullName,
                    lat: location.lat,
                    lon: location.lon,
                };
            });

            setFilteredLocations(formattedLocations);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại sau.");
            setFilteredLocations([]);
        } finally {
            setIsLoading(false);
        }
    };

    const debouncedSearch = useCallback(
        debounce((value) => searchLocations(value), 300),
        []
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        setDropdownOpen(true);
        debouncedSearch(value);
    };

    const handleClickOutside = (e) => {
        if (!e.target.closest(".custom-select-dropdown")) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="searchbox-input">
            <label>Vị trí</label>
            <div className="custom-select-dropdown">
                <div className="select-input" onClick={toggleDropdown}>
                    <input
                        type="text"
                        readOnly
                        value={selectedLocation}
                        placeholder="Địa điểm tìm kiếm"
                    />
                    <i className="bi bi-chevron-down"></i>
                </div>

                {dropdownOpen && (
                    <div className="custom-select-wrap active">
                        <div className="custom-select-search-area">
                            <i className="bx bx-search"></i>
                            <input
                                type="text"
                                placeholder="Nhập vị trí"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                autoFocus
                            />
                        </div>
                        <ul className="option-list">
                            {isLoading ? (
                                <li className="loading">
                                    <div className="destination">
                                        <h6>Đang tìm kiếm...</h6>
                                    </div>
                                </li>
                            ) : error ? (
                                <li className="error">
                                    <div className="destination">
                                        <h6>{error}</h6>
                                    </div>
                                </li>
                            ) : filteredLocations.length > 0 ? (
                                <>
                                    {!searchQuery && (
                                        <li className="suggestion-header">
                                            <div className="destination">
                                                <h6>Địa điểm phổ biến</h6>
                                            </div>
                                        </li>
                                    )}
                                    {filteredLocations.map(
                                        (location, index) => (
                                            <li
                                                key={index}
                                                onClick={() =>
                                                    handleSelectLocation(
                                                        location
                                                    )
                                                }
                                            >
                                                <div className="destination">
                                                    <h6>{location.name}</h6>
                                                    <p>
                                                        {formatAddress(
                                                            location
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="tour">
                                                    <span>{location.code}</span>
                                                </div>
                                            </li>
                                        )
                                    )}
                                </>
                            ) : (
                                <li className="no-results">
                                    {searchQuery.length > 0 ? (
                                        searchQuery.length <= 2 ? (
                                            <div className="destination">
                                                <h6>
                                                    Vui lòng nhập ít nhất 3 ký
                                                    tự
                                                </h6>
                                            </div>
                                        ) : (
                                            <div className="destination">
                                                <h6>Không tìm thấy kết quả</h6>
                                            </div>
                                        )
                                    ) : (
                                        <div className="destination">
                                            <h6>Bắt đầu nhập để tìm kiếm</h6>
                                        </div>
                                    )}
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LocationSearchInput;

import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import * as AmenityService from "../../../../services/AmenityService";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function AmenityList() {

    const { t } = useTranslation();
    const [amenities, setAmenities] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; // Số lượng tiện nghi trên mỗi trang
    const user = useSelector((state) => state.user);

    const navigate = useNavigate();
    const mutationAmenity = useMutation(
        ({ accessToken }) => {
            return AmenityService.getAllAmenities(accessToken);
        },
        {
            onSuccess: (data) => {
                setAmenities(data); // Lưu toàn bộ dữ liệu amenities
            },
            onError: (error) => {
                toast.error(error.message);
            },
        }
    );

    useEffect(() => {
        mutationAmenity.mutate({ accessToken: user.accessToken }); // Lấy toàn bộ dữ liệu
    }, []);

    // Xác định tổng số trang dựa trên số lượng tiện nghi và pageSize
    const totalPages = Math.ceil(amenities.length / pageSize);

    // Dữ liệu tiện nghi của trang hiện tại
    const currentAmenities = amenities.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    // Xử lý thay đổi trang
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleEditAmenity = (amenityId) => {
        navigate(`/admin/amenities/${amenityId}/edit`);
    };

    const handleDeleteAmenity = (amenityId) => {
        navigate(`/admin/amenities/${amenityId}/delete`);
    };

    return (
        <>
            <ToastContainer />
            <div className="row">
                <div className="col-xl-12">
                    <div className="main-content-title-profile">
                        <div className="main-content-title mb-30">
                            <h3>{t("amenityList.title")}</h3>
                        </div>
                        {/* <div class="profile">
                            <a href="#">
                                {t("amenityList.viewMore")}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="8"
                                    height="8"
                                    viewBox="0 0 8 8"
                                >
                                    <path d="M6.669 2.27202L0.94102 8L0 7.05898L5.72731 1.331H0.679478V0H8V7.32052H6.669V2.27202Z"></path>
                                </svg>
                            </a>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="recent-listing-area">
                <div class="title-and-tab">
                    <h6>{t("amenityList.info")}</h6>
                    <div class="search-area">
                        <form>
                            <div class="search-box">
                                <input
                                    type="text"
                                    placeholder={t("amenityList.searchPlaceholder")}
                                />
                                <button type="submit">
                                    <i class="bx bx-search"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="recent-listing-table">
                    <table className="eg-table2">
                        <thead>
                            <tr>
                                <th>{t("amenityList.name")}</th>
                                <th>{t("amenityList.type")}</th>
                                <th>{t("amenityList.description")}</th>
                                <th>{t("amenityList.actions")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAmenities.map((amenity) => (
                                <tr key={amenity.id}>
                                    <td data-label={t("amenityList.name")} className="p-1">
                                        {amenity.name}
                                    </td>
                                    <td data-label={t("amenityList.type")} className="p-1">
                                        {amenity.amenityTypeDisplayName}
                                    </td>
                                    <td data-label={t("amenityList.description")} className="p-1">
                                        {amenity.description}
                                    </td>
                                    <td data-label={t("amenityList.actions")} className="p-1">
                                        <button
                                            onClick={() => {
                                                handleEditAmenity(amenity.id);
                                            }}
                                            className="primary-btn1 p-2 me-2"
                                            alt={t("amenityList.edit")}
                                        >
                                            <i class="bi bi-pencil-square"></i>
                                        </button>

                                        <button
                                            onClick={() => {
                                                handleDeleteAmenity(amenity.id);
                                            }}
                                            className="primary-btn1 p-2"
                                            style={{ backgroundColor: "red" }}
                                            alt={t("amenityList.delete")}
                                        >
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination-area">
                        <ul className="paginations">
                            {[...Array(totalPages)].map((_, i) => (
                                <li
                                    key={i + 1}
                                    className={`page-item ${currentPage === i + 1 ? "active" : ""
                                        }`}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    <a href="#">{i + 1}</a>
                                </li>
                            ))}
                        </ul>
                        <ul className="paginations-buttons">
                            <li>
                                <a
                                    href="#"
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="7"
                                        height="14"
                                        viewBox="0 0 7 14"
                                    >
                                        <path d="M0 7.00008L7 0L2.54545 7.00008L7 14L0 7.00008Z" />
                                    </svg>
                                    {t("amenityList.prev")}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                >
                                    {t("amenityList.next")}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="7"
                                        height="14"
                                        viewBox="0 0 7 14"
                                        fill="none"
                                    >
                                        <path d="M7 7.00008L0 0L4.45455 7.00008L0 14L7 7.00008Z" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AmenityList;

import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import * as AmenityService from "../../../../services/AmenityService";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AllPromotions() {
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
    return (
        <>
            <ToastContainer />
            <div className="recent-listing-area">
                <h6>Danh sách Khuyến mãi</h6>
                <div className="recent-listing-table">
                    <table className="eg-table2">
                        <thead>
                            <tr>
                                <th>Tên tiện nghi</th>
                                <th>Loại</th>
                                <th>Mô tả</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAmenities.map((amenity) => (
                                <tr key={amenity.id}>
                                    <td
                                        data-label="Tên tiện nghi"
                                        className="p-1"
                                    >
                                        {amenity.name}
                                    </td>
                                    <td data-label="Loại" className="p-1">
                                        {amenity.amenityTypeDisplayName}
                                    </td>
                                    <td data-label="Mô tả" className="p-1">
                                        {amenity.description}
                                    </td>
                                    <td data-label="Chức năng" className="p-1">
                                        <button
                                            onClick={() => {
                                                handleEditAmenity(amenity.id);
                                            }}
                                            className="primary-btn1 p-2 me-2"
                                        >
                                            <i class="bi bi-pencil-square"></i>
                                        </button>
                                        <button
                                            className="primary-btn1 p-2"
                                            style={{ backgroundColor: "#aaa" }}
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
                                    className={`page-item ${
                                        currentPage === i + 1 ? "active" : ""
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
                                    Prev
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                >
                                    Next
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

export default AllPromotions;

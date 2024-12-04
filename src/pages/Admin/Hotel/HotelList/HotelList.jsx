import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import * as HotelService from "../../../../services/HotelService";
import * as UserService from "../../../../services/UserService";
import { useTranslation } from "react-i18next";

function HotelList() {
    const { t } = useTranslation();
    const [hotels, setHotels] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // Số lượng khách sạn trên mỗi trang

    const mutationHotels = useMutation(() => HotelService.getAllHotel(), {
        onSuccess: async (data) => {
            setHotels(data);
        },
        onError: (error) => {
            toast.error(error.message || "Đã xảy ra lỗi.");
        },
    });

    useEffect(() => {
        mutationHotels.mutate();
    }, []);

    // Tính toán tổng số trang
    const totalPages = Math.ceil(hotels.length / pageSize);

    // Lấy dữ liệu khách sạn cho trang hiện tại
    const currentHotels = hotels.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    // Xử lý thay đổi trang
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    return (
        <>
            <div class="row">
                <div class="col-xl-12">
                    <div class="main-content-title-profile mb-50">
                        <div class="main-content-title">
                            <h3>{t("hotelList.allHotels")}</h3>
                        </div>
                        {/* <div class="profile">
                            <a href="#">
                                {t("hotelList.viewProfile")}
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

                    <div class="recent-listing-area">
                        <div class="title-and-tab">
                            <h6>{t("hotelList.hotelInfo")}</h6>
                            <div class="search-area">
                                <form>
                                    <div class="search-box">
                                        <input
                                            type="text"
                                            placeholder={t(
                                                "hotelList.searchPlaceholder"
                                            )}
                                        />
                                        <button type="submit">
                                            <i class="bx bx-search"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="recent-listing-table">
                            <table class="eg-table2">
                                <thead>
                                    <tr>
                                        <th>{t("hotelList.name")}</th>
                                        <th>{t("hotelList.category")}</th>
                                        <th>{t("hotelList.owner")}</th>
                                        <th>{t("hotelList.policy")}</th>
                                        <th>{t("hotelList.status")}</th>
                                        <th>{t("hotelList.action")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentHotels.map((hotel, index) => (
                                        <tr>
                                            <td
                                                data-label={t("hotelList.name")}
                                            >
                                                <div class="product-name">
                                                    <div class="img">
                                                        <img
                                                            style={{
                                                                objectFit:
                                                                    "cover",
                                                            }}
                                                            src={
                                                                hotel
                                                                    .exteriorImages[0]
                                                            }
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div class="product-content">
                                                        <h6>
                                                            <a href="#">
                                                                {/* <a href="hotel-details.html"> // Dẫn đên trang chi tiết giới thiệu của khách sạn đó*/}
                                                                {hotel.name}
                                                            </a>
                                                        </h6>
                                                        <span className="">
                                                            <strong>
                                                                {" "}
                                                                {t(
                                                                    "hotelList.code"
                                                                )}
                                                            </strong>{" "}
                                                            {hotel.id}
                                                        </span>
                                                        <p className="mt-2">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="18"
                                                                height="18"
                                                                viewBox="0 0 18 18"
                                                            >
                                                                <path d="M8.99939 0C5.40484 0 2.48047 2.92437 2.48047 6.51888C2.48047 10.9798 8.31426 17.5287 8.56264 17.8053C8.79594 18.0651 9.20326 18.0646 9.43613 17.8053C9.68451 17.5287 15.5183 10.9798 15.5183 6.51888C15.5182 2.92437 12.5939 0 8.99939 0ZM8.99939 9.79871C7.19088 9.79871 5.71959 8.32739 5.71959 6.51888C5.71959 4.71037 7.19091 3.23909 8.99939 3.23909C10.8079 3.23909 12.2791 4.71041 12.2791 6.51892C12.2791 8.32743 10.8079 9.79871 8.99939 9.79871Z"></path>
                                                            </svg>{" "}
                                                            <span>
                                                                {hotel.location}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td
                                                data-label={t(
                                                    "hotelList.category"
                                                )}
                                            >
                                                {hotel.categoryDisplayName}
                                            </td>
                                            <td
                                                data-label={t(
                                                    "hotelList.owner"
                                                )}
                                            >
                                                {hotel.ownerName}
                                            </td>
                                            <td
                                                data-label={t(
                                                    "hotelList.policy"
                                                )}
                                            >
                                                {hotel.paymentPolicy}
                                            </td>
                                            <td
                                                data-label={t(
                                                    "hotelList.status"
                                                )}
                                            >
                                                <span
                                                    className="confirmed"
                                                    style={{
                                                        color: hotel.status
                                                            ? "green"
                                                            : "red",
                                                        //fontWeight: "bold",
                                                    }}
                                                >
                                                    {hotel.status
                                                        ? t("hotelList.active")
                                                        : t(
                                                              "hotelList.inactive"
                                                          )}
                                                </span>
                                            </td>
                                            <td
                                                data-label={t(
                                                    "hotelList.action"
                                                )}
                                            >
                                                {/* <button
                                                    // onClick={() => {
                                                    //     handleEditAmenity(amenity.id);
                                                    // }}
                                                    className="primary-btn1 p-2 me-2"
                                                    alt="Chỉnh sửa"
                                                >
                                                    <i class="bi bi-pencil-square"></i>
                                                </button>

                                                <button
                                                    // onClick={() => {
                                                    //     handleDeleteAmenity(amenity.id);
                                                    // }}
                                                    className="primary-btn1 p-2"
                                                    style={{ backgroundColor: "red" }}
                                                    aLt="Xóa"
                                                >
                                                    <i class="bi bi-trash"></i>
                                                </button> */}
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
                                                currentPage === i + 1
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handlePageChange(i + 1)
                                            }
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
                                                handlePageChange(
                                                    currentPage - 1
                                                )
                                            }
                                        >
                                            {t("hotelList.prev")}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            onClick={() =>
                                                handlePageChange(
                                                    currentPage + 1
                                                )
                                            }
                                        >
                                            {t("hotelList.next")}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HotelList;

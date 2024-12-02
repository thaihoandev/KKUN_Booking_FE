import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as RoomService from "../../../../services/RoomService";
import * as UserService from "../../../../services/UserService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import convertToVND from "../../../../utils/convertToVND";
import { useTranslation } from "react-i18next";

function RoomList() {

    const { t } = useTranslation();
    const [hotelId, setHotelId] = useState();
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // Số lượng phòng hiển thị mỗi trang

    const user = useSelector((state) => state.user);

    const mutationRoomsByHotel = useMutation(
        (hotelId) => {
            return RoomService.getRoomsByHotelId(hotelId);
        },
        {
            onSuccess: (data) => {
                setRooms(data);
            },
            onError: (error) => {
                toast.error(error.message || t("common.error"));
            },
        }
    );

    const mutationGetUserDetails = useMutation(
        ({ userId, accessToken }) => {
            return UserService.getDetailsUser(userId, accessToken);
        },
        {
            onSuccess: (data) => {
                setHotelId(data.hotelId);
            },
            onError: (error) => {
                toast.error(error.message || t("common.error"));

            },
        }
    );

    useEffect(() => {
        mutationGetUserDetails.mutate({
            userId: user.id,
            accessToken: user.accessToken,
        });
    }, [user]);

    useEffect(() => {
        if (hotelId) {
            mutationRoomsByHotel.mutate(hotelId);
        }
    }, [hotelId]);

    const paginatedRooms = rooms.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const totalPages = Math.ceil(rooms.length / pageSize);

    return (
        <>
            <div className="recent-listing-area">
                <div className="title-and-tab">
                    <h6>{t("RoomList.title")}</h6>
                    <div className="search-area">
                        <form>
                            <div className="search-box">
                                <input
                                    type="text"
                                    placeholder={t("RoomList.searchPlaceholder")}
                                />
                                <button type="submit">
                                    <i className="bx bx-search"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="recent-listing-table">
                    <table className="eg-table2">
                        <thead>
                            <tr>
                                <th>{t("RoomList.tableHeaders.roomType")}</th>
                                <th>{t("RoomList.tableHeaders.pricePerNight")}</th>
                                <th>{t("RoomList.tableHeaders.capacity")}</th>
                                <th>{t("RoomList.tableHeaders.status")}</th>
                                <th>{t("RoomList.tableHeaders.reviews")}</th>
                                <th>{t("RoomList.tableHeaders.actions")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedRooms && paginatedRooms.length > 0 ? (
                                paginatedRooms.map((room, index) => (
                                    <tr key={index}>
                                        <td data-label={t("RoomList.tableHeaders.roomType")}>
                                            <div className="product-name">
                                                <div className="img">
                                                    <img
                                                        style={{
                                                            objectFit: "cover",
                                                        }}
                                                        src={room.roomImages[0]}
                                                        alt={
                                                            room.typeDisplayName
                                                        }
                                                    />
                                                </div>
                                                <div className="product-content">
                                                    <h6>
                                                        <a
                                                            href={`/hotelowner/my-rooms/${room.id}/room-details`}
                                                        >
                                                            {room.typeDisplayName ||
                                                                "NaN"}
                                                        </a>
                                                    </h6>
                                                    <p className="mb-3">
                                                        <span>
                                                            {t("RoomList.code")}:{" "}
                                                            {room.id || "NaN"}{" "}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        <span>
                                                            {t("RoomList.area")}:{" "}
                                                            {room.area || "NaN"}{" "}
                                                            m²
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td data-label={t("RoomList.tableHeaders.pricePerNight")}>
                                            {convertToVND(room.basePrice) ||
                                                "NaN"}
                                        </td>
                                        <td data-label={t("RoomList.tableHeaders.capacity")}>
                                            {room.capacity || "NaN"}
                                            {t("RoomDetails.roomInfo.capacityUnit")}
                                        </td>
                                        <td data-label={t("RoomList.tableHeaders.status")}>
                                            <span className="confirmed">
                                                {room.available
                                                    ? t("RoomList.status.available")
                                                    : t("RoomList.status.unavailable")}
                                            </span>
                                        </td>
                                        <td data-label={t("RoomList.tableHeaders.reviews")}>
                                            {room.numOfReviews || "NaN"}
                                        </td>
                                        <td data-label={t("RoomList.tableHeaders.actions")}>
                                            <a
                                                href={`/hotelowner/my-rooms/${room.id}/room-edit`}
                                                className="view-btn"
                                            >
                                                {t("RoomList.actions.viewDetails")}
                                                
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        style={{ textAlign: "center" }}
                                    >
                                        {t("RoomList.emptyRooms")}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="pagination-area">
                        <ul className="paginations">
                            {[...Array(totalPages)].map((_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${currentPage === index + 1
                                        ? "active"
                                        : ""
                                        }`}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    <a href="#">{index + 1}</a>
                                </li>
                            ))}
                        </ul>
                        <ul className="paginations-buttons">
                            <li>
                                <a
                                    href="#"
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.max(prev - 1, 1)
                                        )
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="7"
                                        height="14"
                                        viewBox="0 0 7 14"
                                    >
                                        <path d="M0 7.00008L7 0L2.54545 7.00008L7 14L0 7.00008Z"></path>
                                    </svg>
                                    {t("RoomList.pagination.prev")}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.min(prev + 1, totalPages)
                                        )
                                    }
                                >
                                    {t("RoomList.pagination.next")}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="7"
                                        height="14"
                                        viewBox="0 0 7 14"
                                        fill="none"
                                    >
                                        <path d="M7 7.00008L0 0L4.45455 7.00008L0 14L7 7.00008Z"></path>
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

export default RoomList;

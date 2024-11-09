import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as RoomService from "../../../../services/RoomService";
import * as UserService from "../../../../services/UserService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import convertToVND from "../../../../utils/convertToVND";

function RoomList() {
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
                toast.error(error.message || "Đã xảy ra lỗi.");
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
                toast.error(error.message || "Đã xảy ra lỗi.");
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
                    <h6>Danh sách phòng</h6>
                    <div className="search-area">
                        <form>
                            <div className="search-box">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm ở đây"
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
                                <th>Loại phòng</th>
                                <th>Giá/đêm</th>
                                <th>Số người</th>
                                <th>Trạng thái</th>
                                <th>Lượt đánh giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedRooms && paginatedRooms.length > 0 ? (
                                paginatedRooms.map((room, index) => (
                                    <tr key={index}>
                                        <td data-label="Tour Package">
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
                                                        <a href="hotel-details.html">
                                                            {room.typeDisplayName ||
                                                                "NaN"}
                                                        </a>
                                                    </h6>
                                                    <p className="mb-3">
                                                        <span>
                                                            Mã:{" "}
                                                            {room.id || "NaN"}{" "}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        <span>
                                                            Diện tích:{" "}
                                                            {room.area || "NaN"}{" "}
                                                            m²
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td data-label="Price">
                                            {convertToVND(room.basePrice) ||
                                                "NaN"}
                                        </td>
                                        <td data-label="Person">
                                            {room.capacity || "NaN"} người
                                        </td>
                                        <td data-label="Status">
                                            <span className="confirmed">
                                                {room.available
                                                    ? "Còn phòng"
                                                    : "Hết phòng"}
                                            </span>
                                        </td>
                                        <td data-label="NumOfReviews">
                                            {room.numOfReviews || "NaN"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        style={{ textAlign: "center" }}
                                    >
                                        Chưa có phòng nào!
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
                                    className={`page-item ${
                                        currentPage === index + 1
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
                                    Prev
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
                                    Next
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

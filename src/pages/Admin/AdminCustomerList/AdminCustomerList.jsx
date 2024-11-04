import React from "react";
import "swiper/css"; // Import CSS cho Swiper
import "swiper/css/navigation"; // Import CSS cho Navigation
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";

import * as UserService from "../../../services/UserService";
import Loading from "../../../components/Loading/Loading";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

function AdminCustomerList() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // Số lượng khách sạn trên mỗi trang

    const mutationUsers = useMutation(() => UserService.getAllUser(), {
        onSuccess: (data) => {
            setUsers(data);
        },
        onError: (error) => {
            toast.error(error.message || "Đã xảy ra lỗi.");
        },
    });
    useEffect(() => {
        mutationUsers.mutate();
    }, []);
    return (
        <>
            <div class="row">
                <div class="col-xl-12">
                    <div class="main-content-title-profile mb-50">
                        <div class="main-content-title">
                            <h3>Danh sách người dùng</h3>
                        </div>
                        <div class="search-area">
                            <form>
                                <div class="search-box">
                                    <input
                                        type="text"
                                        placeholder="Tìm ở đây"
                                    />
                                    <button type="submit">
                                        <i class="bx bx-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="row">
                        {users && users.length > 0 ? (
                            users.map((user) => (
                                <div
                                    className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                                    key={user.id}
                                >
                                    <div className="eg-profile-card text-center">
                                        <div className="profile-img">
                                            <img
                                                style={{ objectFit: "cover" }}
                                                className="rounded-circle"
                                                src={
                                                    user.avatar ||
                                                    "assets/img/innerpage/profile-img.png"
                                                } // Nếu có ảnh đại diện người dùng
                                                alt="Profile"
                                            />
                                            <button className="eg-btn green-light--btn">
                                                {user.status}
                                            </button>
                                        </div>
                                        <div className="profile-bio">
                                            <h5>
                                                {user.firstName || user.lastName
                                                    ? `${(
                                                          user.firstName || ""
                                                      ).toUpperCase()} ${(
                                                          user.lastName || ""
                                                      ).toUpperCase()}`.trim()
                                                    : "Tên không có sẵn"}
                                            </h5>
                                            {/* Hiển thị tên người dùng */}
                                            <h6>Mã ID: {user.id}</h6>{" "}
                                            {/* Hiển thị ID người dùng */}
                                        </div>
                                        <div className="card-action d-flex justify-content-between">
                                            <div className="d-flex flex-row justify-content-md-center justify-content-end align-items-center gap-2">
                                                <button className="eg-btn add--btn">
                                                    <i className="bi bi-pencil-square"></i>
                                                </button>
                                                <button className="eg-btn delete--btn">
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                                <button className="eg-btn account--btn">
                                                    <i className="far fa-user"></i>
                                                </button>
                                            </div>

                                            <div className="text-center">
                                                <button
                                                    className={`btn px-3 rounded ${
                                                        user.type === "admin"
                                                            ? "btn-danger"
                                                            : user.type ===
                                                              "hotelowner"
                                                            ? "btn-warning"
                                                            : "btn-primary"
                                                    }`}
                                                    style={{
                                                        fontSize: "12px",
                                                        fontWeight: "600",
                                                        textTransform:
                                                            "uppercase",
                                                    }}
                                                >
                                                    {user.type}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>Chưa có người dùng nào</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminCustomerList;

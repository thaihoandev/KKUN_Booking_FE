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
    const [userStats, setUserStats] = useState({ totalUsers: 0, admins: 0, owners: 0 });

    const pageSize = 5; // Số lượng khách sạn trên mỗi trang

    const mutationUsers = useMutation(() => UserService.getAllUser(), {
        onSuccess: (data) => {
            setUsers(data);

            //Tính toán thống kê người dùng
            const totalUsers = data.length;
            const admins = data.filter(user => user.type === "admin").length;
            const owners = data.filter(user => user.type === "hotelowner").length;
            setUserStats({ totalUsers, admins, owners });
        },
        onError: (error) => {
            toast.error(error.message || "Đã xảy ra lỗi.");
        },
    });

    useEffect(() => {
        mutationUsers.mutate();
        console.log("Loading users..."); // Thêm để kiểm tra
    }, []);

    if (mutationUsers.isLoading) {
        return <Loading />;
    }
    // useEffect(() => {
    //     mutationUsers.mutate();
    // }, []);

    return (
        <>
            <div class="row">
                <div class="main-content-title">
                    <h3>Danh sách người dùng</h3>
                </div>
                <div class="col-xl-12">
                    {/* Tổng quan */}
                    <div class="counter-area">
                        <div class="row g-3">
                            <div class="col">
                                <div class="counter-single">
                                    <div class="counter-icon">
                                        <div class="counter-icon">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="55"
                                                height="55"
                                                viewBox="0 0 24 24"
                                            >
                                                <g>
                                                    <path d="m7,13c.812,0,1.583.236,2.241.638-1.38.672-2.507,1.899-3.062,3.362h-2.179c-.329,0-.636-.161-.823-.432-.187-.271-.229-.615-.112-.923.6-1.582,2.181-2.646,3.935-2.646Zm5,0c1.657,0,3-1.343,3-3s-1.343-3-3-3-3,1.343-3,3,1.343,3,3,3Zm-7.942-5.038c0,1.657,1.343,3,3,3,.013,0,.025-.004.038-.004-.061-.311-.097-.63-.097-.958,0-1.719.873-3.237,2.198-4.138-.544-.555-1.301-.901-2.139-.901-1.657,0-3,1.343-3,3Zm10.701,5.677c1.38.672,2.507,1.899,3.062,3.362h2.179c.329,0,.636-.161.823-.432.187-.271.229-.615.112-.923-.6-1.582-2.181-2.646-3.935-2.646-.812,0-1.583.236-2.241.638Zm2.241-8.638c-.841,0-1.599.349-2.144.906,1.293.905,2.144,2.399,2.144,4.094,0,.339-.035.67-.1.99.034.001.066.01.1.01,1.657,0,3-1.343,3-3s-1.343-3-3-3Zm6,11c-.552,0-1,.447-1,1v2c0,1.654-1.346,3-3,3h-2c-.552,0-1,.447-1,1s.448,1,1,1h2c2.757,0,5-2.243,5-5v-2c0-.553-.448-1-1-1ZM19,0h-2c-.552,0-1,.447-1,1s.448,1,1,1h2c1.654,0,3,1.346,3,3v2c0,.553.448,1,1,1s1-.447,1-1v-2c0-2.757-2.243-5-5-5ZM7,22h-2c-1.654,0-3-1.346-3-3v-2c0-.553-.448-1-1-1s-1,.447-1,1v2c0,2.757,2.243,5,5,5h2c.552,0,1-.447,1-1s-.448-1-1-1Zm5-7c-1.754,0-3.335,1.063-3.935,2.646-.117.308-.075.652.112.923.187.271.494.432.823.432h6c.329,0,.636-.161.823-.432.187-.271.229-.615.112-.923-.6-1.582-2.181-2.646-3.935-2.646ZM1,8c.552,0,1-.447,1-1v-2c0-1.654,1.346-3,3-3h2c.552,0,1-.447,1-1s-.448-1-1-1h-2C2.243,0,0,2.243,0,5v2c0,.553.448,1,1,1Z" />
                                                </g>
                                            </svg>

                                        </div>
                                    </div>
                                    <div class="counter-content">
                                        <p>Khách hàng</p>
                                        <div class="number">
                                            <h3 class="counter">{userStats.totalUsers}</h3>
                                            <span>+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="counter-single three">
                                    <div class="counter-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="55"
                                            height="55"
                                            viewBox="0 0 24 24"
                                        >
                                            <g>
                                                <path d="M4.781,10.282l-1.309-.912-1.305,.912c-.498,.374-1.231-.167-1.022-.753l.465-1.456-1.219-.849c-.537-.349-.254-1.261,.388-1.24h1.595l.371-1.421c.168-.738,1.294-.737,1.462,0l.371,1.421h1.585c.64-.021,.922,.885,.387,1.234l-1.221,.853,.476,1.447c.216,.589-.524,1.138-1.025,.763Zm19.199-3.775c-.069-.305-.341-.522-.654-.522h-1.585l-.371-1.421c-.168-.738-1.294-.738-1.462,0l-.371,1.421h-1.595c-.642-.021-.924,.891-.388,1.24l1.219,.849-.465,1.456c-.21,.587,.524,1.127,1.022,.753l1.305-.912,1.309,.912c.502,.374,1.241-.175,1.025-.763l-.476-1.447,1.221-.853c.228-.159,.334-.442,.266-.712ZM8.92,3.225l1.219,.849-.465,1.456c-.209,.587,.524,1.127,1.022,.753l1.305-.912,1.309,.912c.502,.374,1.241-.175,1.025-.763l-.476-1.447,1.221-.853c.535-.349,.253-1.255-.387-1.234h-1.585l-.371-1.421c-.168-.738-1.294-.738-1.462,0l-.371,1.421h-1.595c-.642-.021-.924,.891-.388,1.24Zm3.08,13.775c-3.207,0-6.06,2.088-6.939,5.077-.234,.795,.221,1.628,1.016,1.862,.794,.232,1.628-.221,1.862-1.017,.506-1.721,2.176-2.923,4.061-2.923s3.555,1.202,4.061,2.923c.192,.654,.79,1.077,1.438,1.077,.14,0,.282-.02,.423-.061,.795-.234,1.25-1.067,1.016-1.862-.879-2.989-3.732-5.077-6.939-5.077Zm0-1c2.209,0,4-1.791,4-4s-1.791-4-4-4-4,1.791-4,4,1.791,4,4,4Z" />
                                            </g>
                                        </svg>
                                    </div>
                                    <div class="counter-content">
                                        <p>Chủ cho thuê</p>
                                        <div class="number">
                                            <h3 class="counter">{userStats.admins}</h3>
                                            <span>+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col">
                                <div class="counter-single two">
                                    <div class="counter-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="55"
                                            height="55"
                                            viewBox="0 0 24 24"
                                        >
                                            <g>
                                                <path d="m8.5,9.5c0,.551.128,1.073.356,1.537-.49.628-.795,1.407-.836,2.256-.941-.988-1.52-2.324-1.52-3.792,0-3.411,3.122-6.107,6.659-5.381,2.082.428,3.769,2.105,4.213,4.184.134.628.159,1.243.091,1.831-.058.498-.495.866-.997.866h-.045c-.592,0-1.008-.527-.943-1.115.044-.395.021-.81-.08-1.233-.298-1.253-1.32-2.268-2.575-2.557-2.286-.525-4.324,1.207-4.324,3.405Zm-3.89-1.295c.274-1.593,1.053-3.045,2.261-4.178,1.529-1.433,3.531-2.141,5.63-2.011,3.953.256,7.044,3.719,6.998,7.865-.019,1.736-1.473,3.118-3.208,3.118h-2.406c-.244-.829-1.002-1.439-1.91-1.439-1.105,0-2,.895-2,2s.895,2,2,2c.538,0,1.025-.215,1.384-.561h2.932c2.819,0,5.168-2.245,5.208-5.063C21.573,4.715,17.651.345,12.63.021c-2.664-.173-5.191.732-7.126,2.548-1.499,1.405-2.496,3.265-2.855,5.266-.109.608.372,1.166.989,1.166.472,0,.893-.329.972-.795Zm7.39,8.795c-3.695,0-6.892,2.292-7.955,5.702-.165.527.13,1.088.657,1.253.526.159,1.087-.131,1.252-.657.789-2.53,3.274-4.298,6.045-4.298s5.257,1.768,6.045,4.298c.134.428.528.702.955.702.099,0,.198-.015.298-.045.527-.165.821-.726.657-1.253-1.063-3.41-4.26-5.702-7.955-5.702Z" />                                            </g>
                                        </svg>
                                    </div>
                                    <div class="counter-content">
                                        <p>Quản trị viên</p>
                                        <div class="number">
                                            <h3 class="counter">{userStats.owners}</h3>
                                            <span>+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="main-content-title-profile mb-50">
                        <div class="main-content-title">
                            <h3>Thông tin người dùng</h3>
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
                                                    className={`btn px-3 rounded ${user.type === "admin"
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

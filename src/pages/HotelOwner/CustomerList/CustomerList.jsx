import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as UserService from "../../../services/UserService";
import Loading from "../../../components/Loading/Loading";
import { toast } from "react-toastify";
import { useMutation } from 'react-query';


function CustomerList() {
    const [users, setUsers] = useState([]);
    const [userStats, setUserStats] = useState({ totalUsers: 0, admins: 0, owners: 0 });
    const [bookingCount, setBookingCount] = useState(0);

    const mutationUsers = useMutation(() => UserService.getAllUser(), {
        onSuccess: (data) => {
            setUsers(data);
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
        fetchBookingCount();  // Fetch booking count
    }, []);

    const fetchBookingCount = async () => {
        try {
            const count = await UserService.getCustomerBookingCountByHotelId();
            setBookingCount(count);
        } catch (error) {
            toast.error("Lỗi khi lấy số lượng khách hàng đã đặt lịch");
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(users.length / itemsPerPage);

    const paginatedUsers = users.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => setCurrentPage(page);


    if (mutationUsers.isLoading) return <Loading />;

    return (
        <div className="container">
            <div class="counter-area">
                <div class="row g-3">
                    {/* Existing customer counter */}
                    <div class="col">
                        <div class="counter-single">
                            <div class="counter-icon">
                                <svg width="55" height="55" viewBox="0 0 24 24">
                                    <g>
                                        <path d="m7,13c.812,0,1.583.236,2.241.638-1.38.672-2.507,1.899-3.062,3.362h-2.179c-.329,0-.636-.161-.823-.432-.187-.271-.229-.615-.112-.923.6-1.582,2.181-2.646,3.935-2.646Zm5,0c1.657,0,3-1.343,3-3s-1.343-3-3-3-3,1.343-3,3,1.343,3,3,3Zm-7.942-5.038c0,1.657,1.343,3,3,3,.013,0,.025-.004.038-.004-.061-.311-.097-.63-.097-.958,0-1.719.873-3.237,2.198-4.138-.544-.555-1.301-.901-2.139-.901-1.657,0-3,1.343-3,3Zm10.701,5.677c1.38.672,2.507,1.899,3.062,3.362h2.179c.329,0,.636-.161.823-.432.187-.271.229-.615.112-.923-.6-1.582-2.181-2.646-3.935-2.646-.812,0-1.583.236-2.241.638Zm2.241-8.638c-.841,0-1.599.349-2.144.906,1.293.905,2.144,2.399,2.144,4.094,0,.339-.035.67-.1.99.034.001.066.01.1.01,1.657,0,3-1.343,3-3s-1.343-3-3-3Zm6,11c-.552,0-1,.447-1,1v2c0,1.654-1.346,3-3,3h-2c-.552,0-1,.447-1,1s.448,1,1,1h2c2.757,0,5-2.243,5-5v-2c0-.553-.448-1-1-1ZM19,0h-2c-.552,0-1,.447-1,1s.448,1,1,1h2c1.654,0,3,1.346,3,3v2c0,.553.448,1,1,1s1-.447,1-1v-2c0-2.757-2.243-5-5-5ZM7,22h-2c-1.654,0-3-1.346-3-3v-2c0-.553-.448-1-1-1s-1,.447-1,1v2c0,2.757,2.243,5,5,5h2c.552,0,1-.447,1-1s-.448-1-1-1Zm5-7c-1.754,0-3.335,1.063-3.935,2.646-.117.308-.075.652.112.923.187.271.494.432.823.432h6c.329,0,.636-.161.823-.432.187-.271.229-.615.112-.923-.6-1.582-2.181-2.646-3.935-2.646ZM1,8c.552,0,1-.447,1-1v-2c0-1.654,1.346-3,3-3h2c.552,0,1-.447,1-1s-.448-1-1-1h-2C2.243,0,0,2.243,0,5v2c0,.553.448,1,1,1Z" />
                                    </g>
                                </svg>
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

                    {/* New booking count box */}
                    <div class="col">
                        <div class="counter-single two">
                            <div class="counter-icon">
                                <svg width="55" height="55" viewBox="0 0 24 24">
                                    <g>
                                    <path d="M17,10.039c-3.859,0-7,3.14-7,7,0,3.838,3.141,6.961,7,6.961s7-3.14,7-7c0-3.838-3.141-6.961-7-6.961Zm0,11.961c-2.757,0-5-2.226-5-4.961,0-2.757,2.243-5,5-5s5,2.226,5,4.961c0,2.757-2.243,5-5,5Zm1.707-4.707c.391,.391,.391,1.023,0,1.414-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293l-1-1c-.188-.188-.293-.442-.293-.707v-2c0-.552,.447-1,1-1s1,.448,1,1v1.586l.707,.707Zm5.293-10.293v2c0,.552-.447,1-1,1s-1-.448-1-1v-2c0-1.654-1.346-3-3-3H5c-1.654,0-3,1.346-3,3v1H11c.552,0,1,.448,1,1s-.448,1-1,1H2v9c0,1.654,1.346,3,3,3h4c.552,0,1,.448,1,1s-.448,1-1,1H5c-2.757,0-5-2.243-5-5V7C0,4.243,2.243,2,5,2h1V1c0-.552,.448-1,1-1s1,.448,1,1v1h8V1c0-.552,.447-1,1-1s1,.448,1,1v1h1c2.757,0,5,2.243,5,5Z"/>                                    </g>
                                </svg>
                            </div>
                            <div class="counter-content">
                                <p>Đặt lịch</p>
                                <div class="number">
                                    <h3 class="counter">{bookingCount}</h3>
                                    <span>+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-content-title-profile mb-50">


                <div class="main-content-title">
                    <h3>Danh sách khách hàng</h3>
                </div>
                <div className="search-area mb-4">
                    <form>
                        <div class="search-box">
                            <input type="text" placeholder="Tìm khách hàng..." />
                            <button type="submit">
                                <i className="bx bx-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>


            <div className="row">
                {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user) => (
                        <div className="col-xl-4 col-lg-6 col-md-6 mb-4" key={user.id}>
                            <div className="customer-card p-3 shadow-sm rounded text-center bg-white">
                                <img
                                    className="rounded-circle mb-3"
                                    style={{ objectFit: 'cover', width: '100px', height: '100px' }}
                                    src={user.avatar || 'assets/img/innerpage/profile-img.png'}
                                    alt="Profile"
                                />
                                <h5 className="mb-1">{`${user.firstName || ''} ${user.lastName || ''}`.trim() || "Tên không có sẵn"}</h5>
                                <p className="text-muted mb-2">ID: {user.id}</p>
                                <div className="d-flex justify-content-center gap-2">
                                    <button className="btn btn-sm btn-outline-primary">Chi tiết</button>
                                    <button className="btn btn-sm btn-outline-danger">Xóa</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">Chưa có khách hàng nào</p>
                )}
            </div>


            {/* Pagination controls */}
            <div className="pagination-controls text-center mt-4">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={`btn ${currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"} mx-1`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>

    );
}

export default CustomerList;

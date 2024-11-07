import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu";
import Header from "../../components/Header/Header";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import * as UserService from "../../services/UserService";
import { useSelector } from "react-redux";

const HotelOwnerLayout = () => {
    const menuItems = [
        {
            key: "home",
            title: "Trang chủ",
            path: "dashboard",
            icon: "bi-house-door",
        },
        {
            key: "myHotel",
            title: "Khách sạn của tôi",
            path: "#",
            icon: "bi-building",
            children: [
                {
                    key: "hotelInfo",
                    title: "Thông tin khách sạn",
                    path: "my-hotel",
                },
                {
                    key: "addRoom",
                    title: "Thêm phòng",
                    path: "add-room",
                },
                {
                    key: "allRooms",
                    title: "Tất cả các phòng",
                    path: "my-rooms",
                },
            ],
        },
        {
            key: "booked",
            title: "Đặt phòng",
            path: "booked",
            icon: "bi-calendar-check",
        },
        {
            key: "customerList",
            title: "Danh sách khách hàng",
            path: "customer-list",
            icon: "bi-people",
        },
        {
            key: "settings",
            title: "Cài đặt",
            path: "settings",
            icon: "bi-gear",
        },
        {
            key: "logout",
            title: "Đăng xuất",
            path: "#",
            icon: "bi-box-arrow-right",
        },
    ];

    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [ownHotel, setOwnHotel] = useState(false);

    const mutationUserDetails = useMutation(
        ({ userId, accessToken }) =>
            UserService.getDetailsUser(userId, accessToken),
        {
            onSuccess: (data) => {
                console.log("Giá trị hotelId:", data.hotelId);
                if (!data.hotelId) {
                    // Nếu không có hotelId
                    setOwnHotel(false); // Set ownHotel = false
                    navigate("/register-hotel-owner"); // Chuyển đến trang đăng ký
                } else {
                    setOwnHotel(true); // Nếu có hotelId, set ownHotel = true
                }
            },
            onError: () => {
                toast.error("Lỗi khi lấy thông tin người dùng");
            },
        }
    );

    // Gọi mutation khi component được render
    useEffect(() => {
        if (user?.id && user?.accessToken) {
            mutationUserDetails.mutate({
                userId: user.id,
                accessToken: user.accessToken,
            });
        }
    }, [user]);

    return (
        <div className="hotel-owner-layout">
            <Header />
            <div className="dashboard-wrapper">
                <SidebarMenu menuItems={menuItems} />
                <div className="main-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default HotelOwnerLayout;

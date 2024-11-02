import React from "react";
import { Outlet } from "react-router-dom";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu";
import Header from "../../components/Header/Header"; // Adjust the path to your Header component
import { ToastContainer } from "react-toastify";

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
    return (
        <>
            <div className="hotel-owner-layout">
                <Header />
                <div className=" dashboard-wrapper">
                    {/* <HotelOwnerSidebar /> */}
                    <SidebarMenu menuItems={menuItems} />
                    <div className="main-content">
                        {/* <HotelOwnerNavbar /> */}
                        <Outlet />
                    </div>
                </div>
                {/* <HotelOwnerFooter /> */}
            </div>
        </>
    );
};

export default HotelOwnerLayout;

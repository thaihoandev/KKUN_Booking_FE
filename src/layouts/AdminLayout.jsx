import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";

const AdminLayout = () => {
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
                    path: "hotel-upload",
                },
                {
                    key: "addRoom",
                    title: "Thêm phòng",
                    path: "add-room",
                },
                {
                    key: "allRooms",
                    title: "Tất cả các phòng",
                    path: "all-rooms",
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
        <div className="admin-layout">
            <Header />
            <div className=" dashboard-wrapper">
               
                <SidebarMenu menuItems={menuItems} />
                <div className="main-content">
                    <Outlet />
                </div>
            </div>
            
        </div>
        
    );
};

export default AdminLayout;

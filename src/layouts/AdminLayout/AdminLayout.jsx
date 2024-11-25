import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu";
import { ToastContainer } from "react-toastify";

const AdminLayout = () => {
    const menuItems = [
        {
            key: "home",
            title: "Trang chủ",
            path: "dashboard",
            icon: "bi-house-door",
        },
        {
            key: "hotelList",
            title: "Khách sạn",
            path: "hotels",
            icon: "bi-building",
        },
        {
            key: "amenities",
            title: "Tiện ích",
            path: "#",
            icon: "bi-calendar-check",
            children: [
                {
                    key: "addAmenities",
                    title: "Thêm Tiện ích",
                    path: "add-amenity",
                },
                {
                    key: "allAmenities",
                    title: "Tất cả tiện ích",
                    path: "amenities",
                },
            ],
        },
        {
            key: "vouchers",
            title: "Khuyến mãi",
            path: "#",
            icon: "bi-gift",
            children: [
                {
                    key: "addPromotion",
                    title: "Thêm ưu đãi",
                    path: "add-voucher",
                },
                {
                    key: "allPromotions",
                    title: "Tất cả ưu đãi",
                    path: "vouchers",
                },
            ],
        },
        {
            key: "customerList",
            title: "Người dùng",
            path: "customer-list",
            icon: "bi-people",
        },
        {
            key: "blogPostList",
            title: "Danh sách bài viết",
            path: "blog-post-list",
            icon: "bi-newspaper",
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
            <div className="admin-layout">
                <Header />
                <div className=" dashboard-wrapper">
                    <SidebarMenu menuItems={menuItems} />
                    <div className="main-content">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLayout;

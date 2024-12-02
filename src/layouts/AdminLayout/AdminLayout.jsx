import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu";
import { ToastContainer } from "react-toastify";
import DashboardFooter from "../../components/DashboardFooter/DashboardFooter";
import { useTranslation } from "react-i18next";


const AdminLayout = () => {

    const { t } = useTranslation();

    const menuItems = [
        {
            key: "home",
            title: t("adminLayout.home"),
            path: "dashboard",
            icon: "bi-house-door",
        },
        {
            key: "hotelList",
            title: t("adminLayout.hotelList"),
            path: "hotels",
            //   path: "admin-all-hotel", // hiện thị luôn danh sách khách sạn
            icon: "bi-building",
            // children: [
            //     // {
            //     //     key: "hotelInfo",
            //     //     title: "Thông tin khách sạn",
            //     //     path: "hotel-upload",
            //     // },
            //     {
            //         key: "addHotel",
            //         title: "Thêm khách sạn",
            //         path: "admin-add-hotel",
            //     },
            //     {
            //         key: "allHotel",
            //         title: "Tất cả khách sạn",
            //         path: "admin-all-hotel",
            //     },
            // ],
        },
        {
            key: "amenities",
            title: t("adminLayout.amenities"),
            path: "#",
            icon: "bi-calendar-check",
            children: [
                {
                    key: "addAmenities",
                    title: t("adminLayout.addAmenities"),
                    path: "add-amenity",
                },
                {
                    key: "allAmenities",
                    title: t("adminLayout.allAmenities"),
                    path: "amenities",
                },
            ],
        },
        {
            key: "vouchers",
            title: t("adminLayout.vouchers"),
            path: "#",
            icon: "bi-gift",
            children: [
                {
                    key: "addPromotion",
                    title: t("adminLayout.addPromotion"),
                    path: "add-voucher",
                },
                {
                    key: "allPromotions",
                    title: t("adminLayout.allPromotions"),
                    path: "vouchers",
                },
            ],
        },
        {
            key: "customerList",
            title: t("adminLayout.customerList"),
            path: "customer-list",
            icon: "bi-people",
        },
        {
            key: "blogPostList",
            title: t("adminLayout.blogPostList"),
            path: "blog-post-list",
            icon: "bi-newspaper",
        },
        {
            key: "settings",
            title: t("adminLayout.settings"),
            path: "settings",
            icon: "bi-gear",
        },
        {
            key: "logout",
            title: t("adminLayout.logout"),
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
                    <div class="dashboard-footer">
                        <DashboardFooter />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLayout;

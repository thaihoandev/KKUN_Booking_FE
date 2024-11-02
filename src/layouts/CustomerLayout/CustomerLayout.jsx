import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu";
import { ToastContainer } from "react-toastify";

const AdminLayout = () => {
    const menuItems = [
        {
            key: "profile",
            title: "Trang cá nhân",
            path: "profile",
            icon: "bi-person",
        },
        {
            key: "bookedList",
            title: "Đơn đặt",
            path: "booked",
            icon: "bi-book",
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
            <div className="customer-layout">
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

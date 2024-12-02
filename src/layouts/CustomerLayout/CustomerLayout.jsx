import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

const AdminLayout = () => {

    const { t } = useTranslation();
    const menuItems = [
        {
            key: "profile",
            title: t("customerLayout.menu.profile"),
            path: "profile",
            icon: "bi-person",
        },
        {
            key: "bookedList",
            title: t("customerLayout.menu.bookedList"),
            path: "booked",
            icon: "bi-book",
        },
        {
            key: "logout",
            title: t("customerLayout.menu.logout"),
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

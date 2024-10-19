import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            {/* <AdminSidebar /> */}
            <Header />
            <div className=" dashboard-wrapper">
                {/* <HotelOwnerSidebar /> */}
                <SidebarMenu />
                <div className="main-content">
                    {/* <HotelOwnerNavbar /> */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;

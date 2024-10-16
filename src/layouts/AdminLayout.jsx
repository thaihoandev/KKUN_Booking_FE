import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            {/* <AdminSidebar /> */}
            <div className="main-content">
                {/* <AdminNavbar /> */}
                <div className="content-wrapper">
                    Admin layout
                    <Outlet />
                </div>
                {/* <AdminFooter /> */}
            </div>
        </div>
    );
};

export default AdminLayout;

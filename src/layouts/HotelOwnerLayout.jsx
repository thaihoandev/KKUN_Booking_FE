import React from "react";
import { Outlet } from "react-router-dom";

const HotelOwnerLayout = () => {
    return (
        <div className="hotel-owner-layout">
            {/* <HotelOwnerSidebar /> */}
            <div className="main-content">
                {/* <HotelOwnerNavbar /> */}
                <div className="content-wrapper">
                    Hotel Owner Layout
                    <Outlet />
                </div>
                {/* <HotelOwnerFooter /> */}
            </div>
        </div>
    );
};

export default HotelOwnerLayout;

import React, { useState } from "react";
import SidebarMenuItem from "./SidebarMenuItem/SidebarMenuItem";
function SidebarMenu({ menuItems }) {
    const [openMenu, setOpenMenu] = useState("");

    const toggleMenu = (menuName) => {
        setOpenMenu(openMenu === menuName ? "" : menuName);
    };

    return (
        <div className="dashboard-sidebar-wrapper">
            <div className="dashboard-sidebar-menu">
                <ul>
                    {menuItems.map((item) => (
                        <SidebarMenuItem
                            key={item.key}
                            item={item}
                            openMenu={openMenu}
                            toggleMenu={toggleMenu}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SidebarMenu;

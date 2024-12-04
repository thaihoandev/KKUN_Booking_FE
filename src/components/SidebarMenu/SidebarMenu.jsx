import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SidebarMenuItem from "./SidebarMenuItem/SidebarMenuItem";

function SidebarMenu({ menuItems }) {
    const [openMenu, setOpenMenu] = useState("");
    const [activeItem, setActiveItem] = useState("");
    const location = useLocation();

    // Set active item mặc định và kiểm tra path hiện tại
    useEffect(() => {
        const currentPath = location.pathname;
        let foundActive = false;

        // Tìm item active dựa trên current path
        menuItems.forEach((item) => {
            if (item.children) {
                item.children.forEach((child) => {
                    if (currentPath.includes(child.path)) {
                        setActiveItem(child.key);
                        setOpenMenu(item.key); // Mở parent menu
                        foundActive = true;
                    }
                });
            }
            // if (currentPath.includes(item.path) && item.path !== "#") {
            //     setActiveItem(item.key);
            //     foundActive = true;
            // }

            // xác định item active mở submenu
            if (!foundActive && currentPath.includes(item.path) && item.path !== "#") {
                setActiveItem(item.key);
                foundActive = true;
            }
        });

        // Nếu không tìm thấy item active, set item đầu tiên làm mặc định
        if (!foundActive && menuItems.length > 0) {
            const firstItem = menuItems[0];
            setActiveItem(firstItem.key);
            if (firstItem.children) {
                setOpenMenu(firstItem.key);
            }
        }
    }, [location.pathname, menuItems]);

    const toggleMenu = (menuName) => {
        setOpenMenu(openMenu === menuName ? "" : menuName);
    };

    const handleSetActive = (itemKey) => {
        setActiveItem(itemKey);
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
                            isActive={activeItem === item.key}
                            onSetActive={handleSetActive}
                            activeItem={activeItem}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SidebarMenu;

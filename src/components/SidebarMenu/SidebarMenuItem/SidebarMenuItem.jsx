import React from "react";
import { Link } from "react-router-dom";

const SidebarMenuItem = ({ item, openMenu, toggleMenu }) => {
    const hasChildren = item.children && item.children.length > 0;

    return (
        <li className={hasChildren ? "item-has-children" : ""}>
            <Link
                to={item.path}
                onClick={() => hasChildren && toggleMenu(item.key)}
            >
                {item.icon && <i className={`bi ${item.icon}`}></i>}
                <h6>{item.title}</h6>
            </Link>
            {hasChildren && (
                <>
                    <i
                        className={`bi bi-chevron-down dropdown-icon ${
                            openMenu === item.key ? "active" : ""
                        }`}
                    ></i>
                    {openMenu === item.key && (
                        <ul className="sub-menu" style={{ display: "block" }}>
                            {item.children.map((child) => (
                                <li key={child.key}>
                                    <Link to={child.path}>
                                        {child.icon && (
                                            <i
                                                className={`bi ${child.icon}`}
                                            ></i>
                                        )}
                                        {child.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </li>
    );
};
export default SidebarMenuItem;

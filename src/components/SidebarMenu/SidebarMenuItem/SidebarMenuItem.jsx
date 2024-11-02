import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as UserService from "../../../services/UserService";
import { useDispatch } from "react-redux";
import { resetUser } from "../../../store/UserSlide";

const SidebarMenuItem = ({
    item,
    openMenu,
    toggleMenu,
    isActive,
    onSetActive,
    activeItem,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const hasChildren = item.children && item.children.length > 0;

    const handleLogout = async () => {
        setIsLoading(true);
        await UserService.logoutUser();
        dispatch(resetUser());
        localStorage.removeItem("access_token");
        localStorage.removeItem("state");
        setIsLoading(false);
        navigate("/");
    };

    const handleClick = () => {
        if (item.key === "logout") {
            handleLogout();
        } else {
            onSetActive(item.key);
            if (hasChildren) {
                toggleMenu(item.key);
            }
        }
    };

    return (
        <li
            className={`${hasChildren ? "item-has-children" : ""} ${
                isActive ? "active" : ""
            }`}
        >
            <Link
                to={item.path}
                onClick={handleClick}
                className={isActive ? "active" : ""}
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
                            {item.children.map((child) => {
                                const isChildActive = activeItem === child.key;
                                return (
                                    <li key={child.key}>
                                        <Link
                                            to={child.path}
                                            className={
                                                isChildActive ? "active" : ""
                                            }
                                            onClick={() =>
                                                onSetActive(child.key)
                                            }
                                        >
                                            {child.icon && (
                                                <i
                                                    className={`bi ${child.icon}`}
                                                ></i>
                                            )}
                                            {child.title}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </>
            )}
        </li>
    );
};

export default SidebarMenuItem;

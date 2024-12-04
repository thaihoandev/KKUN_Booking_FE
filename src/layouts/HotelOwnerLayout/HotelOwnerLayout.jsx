import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu";
import Header from "../../components/Header/Header";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import * as UserService from "../../services/UserService";
import { useSelector } from "react-redux";
import DashboardFooter from "../../components/DashboardFooter/DashboardFooter";
import { useTranslation } from "react-i18next";

const HotelOwnerLayout = () => {

    const { t } = useTranslation();
    const menuItems = [
        {
            key: "home",
            title: t("HotelOwnerLayout.menu.home"),
            path: "dashboard",
            icon: "bi-house-door",
        },
        {
            key: "myHotel",
            title: t("HotelOwnerLayout.menu.myHotel"),
            path: "#",
            icon: "bi-building",
            children: [
                {
                    key: "hotelInfo",
                    title: t("HotelOwnerLayout.menu.hotelInfo"),
                    path: "my-hotel",
                },
                {
                    key: "addRoom",
                    title: t("HotelOwnerLayout.menu.addRoom"),
                    path: "add-room",
                },
                {
                    key: "allRooms",
                    title: t("HotelOwnerLayout.menu.allRooms"),
                    path: "my-rooms",
                },
            ],
        },
        {
            key: "booked",
            title: t("HotelOwnerLayout.menu.booked"),
            path: "booked",
            icon: "bi-calendar-check",
        },
        {
            key: "customerList",
            title: t("HotelOwnerLayout.menu.customerList"),
            path: "customer-list",
            icon: "bi-people",
        },
        {
            key: "settings",
            title: t("HotelOwnerLayout.menu.settings"),
            path: "settings",
            icon: "bi-gear",
        },
        {
            key: "logout",
            title: t("HotelOwnerLayout.menu.logout"),
            path: "#",
            icon: "bi-box-arrow-right",
        },
    ];

    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [ownHotel, setOwnHotel] = useState(false);

    const mutationUserDetails = useMutation(
        ({ userId, accessToken }) =>
            UserService.getDetailsUser(userId, accessToken),
        {
            onSuccess: (data) => {
                console.log("Giá trị hotelId:", data.hotelId);
                if (!data.hotelId) {
                    // Nếu không có hotelId
                    setOwnHotel(false); // Set ownHotel = false
                    navigate("/register-hotel-owner"); // Chuyển đến trang đăng ký
                } else {
                    setOwnHotel(true); // Nếu có hotelId, set ownHotel = true
                }
            },
            onError: () => {
                toast.error(t("error.fetchUserDetails"));
            },
        }
    );

    // Gọi mutation khi component được render
    useEffect(() => {
        if (user?.id && user?.accessToken) {
            mutationUserDetails.mutate({
                userId: user.id,
                accessToken: user.accessToken,
            });
        }
    }, [user]);

    return (
        <div className="hotel-owner-layout">
            <Header />
            <div className="dashboard-wrapper">
                <SidebarMenu menuItems={menuItems} />
                <div className="main-content">
                    <Outlet />
                </div>
                <div class="dashboard-footer">
                    <DashboardFooter />
                </div>
            </div>
        </div>
    );
};

export default HotelOwnerLayout;

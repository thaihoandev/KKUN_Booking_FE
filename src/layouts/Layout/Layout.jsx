import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header"; // Adjust the path to your Header component
import Footer from "../../components/Footer/Footer"; // Adjust the path to your Footer component
import { ToastContainer } from "react-toastify";
import ChatButton from "../../components/ChatButton/ChatButton";

const Layout = () => {
    return (
        <>
            <div className="layout-container">
                {/* Main layout with header, footer, and outlet for content */}
                <Header />

                <main className="main-content">
                    {/* The Outlet will render the child routes */}
                    <Outlet />
                    <ChatButton /> {/* Nút Chat cố định */}
                </main>

                <Footer />
            </div>
        </>
    );
};

export default Layout;

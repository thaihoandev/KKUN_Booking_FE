import React, { useEffect, useState } from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Outlet,
} from "react-router-dom";
import { Provider } from "react-redux";
import {
    GoogleLogin,
    GoogleOAuthProvider,
    useGoogleLogin,
} from "@react-oauth/google";

import store from "./store/Store";

import Home from "./pages/Home/Home";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import HotelOwnerLayout from "./layouts/HotelOwnerLayout/HotelOwnerLayout";
import Layout from "./layouts/Layout/Layout";
import ProfileSettings from "./pages/ProfileSettings/ProfileSettings";
import RoomList from "./pages/HotelOwner/RoomList/RoomList";
import BookedList from "./pages/HotelOwner/BookedList/BookedList";
import CustomerList from "./pages/HotelOwner/CustomerList/CustomerList";
import AdminCustomerList from "./pages/Admin/AdminCustomerList/AdminCustomerList";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import HotelOwnerSignUp from "./pages/HotelOwner/HotelOwnerSignUp/HotelOwnerSignUp";
import HotelOwnerDashBoard from "./pages/HotelOwner/HotelOwnerDashboard/HotelOwnerDashboard";
import HotelInfoes from "./pages/HotelOwner/HotelInofes/HotelInfoes";
import CustomerLayout from "./layouts/CustomerLayout/CustomerLayout";
import { ToastContainer } from "react-toastify";

import ProtectedRoute from "./routes/ProtectedRoute";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "home", element: <Home /> },
            { path: "sign-up/hotel-owner", element: <HotelOwnerSignUp /> },
        ],
    },
    {
        path: "/customer",
        element: (
            <ProtectedRoute requiredRole="CUSTOMER">
                <CustomerLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <ProfileSettings /> },
            { path: "profile", element: <ProfileSettings /> },
        ],
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute requiredRole="ADMIN">
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <AdminDashboard /> },
            { path: "dashboard", element: <AdminDashboard /> },
            { path: "customer-list", element: <AdminCustomerList /> },
            { path: "settings", element: <ProfileSettings /> },
        ],
    },
    {
        path: "/hotel-owner",
        element: (
            <ProtectedRoute requiredRole="HOTELOWNER">
                <HotelOwnerLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <HotelOwnerDashBoard /> },
            { path: "dashboard", element: <HotelOwnerDashBoard /> },
            { path: "settings", element: <ProfileSettings /> },
            { path: "hotel", element: <HotelInfoes /> },
            { path: "rooms", element: <RoomList /> },
            { path: "booked", element: <BookedList /> },
            { path: "customer-list", element: <CustomerList /> },
        ],
    },
]);

function App() {
    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <Provider store={store}>
                <div className="App">
                    <RouterProvider router={router} />
                    <ToastContainer />
                </div>
            </Provider>
        </GoogleOAuthProvider>
    );
}

export default App;

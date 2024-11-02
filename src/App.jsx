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
import BookedListHotelOwner from "./pages/HotelOwner/BookedList/BookedList";
import CustomerList from "./pages/HotelOwner/CustomerList/CustomerList";
import AdminCustomerList from "./pages/Admin/AdminCustomerList/AdminCustomerList";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import HotelOwnerSignUp from "./pages/HotelOwner/HotelOwnerSignUp/HotelOwnerSignUp";
import HotelOwnerDashBoard from "./pages/HotelOwner/HotelOwnerDashboard/HotelOwnerDashboard";
import HotelInfoes from "./pages/HotelOwner/HotelInofes/HotelInfoes";
import CustomerLayout from "./layouts/CustomerLayout/CustomerLayout";
import { ToastContainer } from "react-toastify";

import ProtectedRoute from "./routes/ProtectedRoute";
import HotelSearchList from "./pages/HotelSearchList/HotelSearchList";
import RoomDetails from "./pages/RoomDetails/RoomDetails";
import BookingCheckout from "./pages/BookingCheckout/BookingCheckout";
import BookingSuccess from "./pages/BookingSuccess/BookingSuccess";
import PaymentCallback from "./pages/PaymentCallback/PaymentCallback";
import BookingFailure from "./pages/BookingFailure/BookingFailure";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ReviewPage from "./pages/ReviewPage/ReviewPage";
import BookedListCustomer from "./pages/Customer/BookedList/BookedList";
import RoomCreate from "./pages/HotelOwner/RoomCreate/RoomCreate";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "home", element: <Home /> },
            { path: "sign-up/hotel-owner", element: <HotelOwnerSignUp /> },
            { path: "hotels/search", element: <HotelSearchList /> },
            {
                path: "hotels/:hotelName/rooms/:roomId",
                element: <RoomDetails />,
            },
            {
                path: "booking/:roomId/checkout",
                element: <BookingCheckout />,
            },
            {
                path: "bookings/booking-success",
                element: <BookingSuccess />,
            },
            {
                path: "bookings/booking-failure",
                element: <BookingFailure />,
            },
            {
                path: "bookings/payment-callback",
                element: <PaymentCallback />,
            },
            {
                path: "rooms/:roomId/bookings/:bookingId/review",
                element: <ReviewPage />,
            },

            { path: "*", element: <NotFoundPage /> },
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
            { path: "booked", element: <BookedListCustomer /> },

            { path: "*", element: <NotFoundPage /> },
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
            { path: "*", element: <NotFoundPage /> },
        ],
    },
    {
        path: "/hotelowner",
        element: (
            <ProtectedRoute requiredRole="HOTELOWNER">
                <HotelOwnerLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <HotelOwnerDashBoard /> },
            { path: "dashboard", element: <HotelOwnerDashBoard /> },
            { path: "settings", element: <ProfileSettings /> },
            { path: "my-hotel", element: <HotelInfoes /> },
            { path: "add-room", element: <RoomCreate /> },
            { path: "my-rooms", element: <RoomList /> },
            { path: "booked", element: <BookedListHotelOwner /> },
            { path: "customer-list", element: <CustomerList /> },
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);

function App() {
    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <Provider store={store}>
                <div className="App">
                    <RouterProvider router={router} />
                </div>
            </Provider>
        </GoogleOAuthProvider>
    );
}

export default App;

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
import "./i18n";

import Home from "./pages/Home/Home";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import HotelOwnerLayout from "./layouts/HotelOwnerLayout/HotelOwnerLayout";
import Layout from "./layouts/Layout/Layout";
import ProfileSettings from "./pages/ProfileSettings/ProfileSettings";
import RoomList from "./pages/HotelOwner/Room/RoomList/RoomList";
import BookedListHotelOwner from "./pages/HotelOwner/BookedList/BookedList";
import CustomerList from "./pages/HotelOwner/CustomerList/CustomerList";
import AdminCustomerList from "./pages/Admin/AdminCustomerList/AdminCustomerList";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import HotelOwnerSignUp from "./pages/HotelOwner/HotelOwnerSignUp/HotelOwnerSignUp";
import HotelOwnerDashBoard from "./pages/HotelOwner/HotelOwnerDashboard/HotelOwnerDashboard";
import HotelInfoes from "./pages/HotelOwner/Hotel/HotelInofes/HotelInfoes";
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
import RoomCreate from "./pages/HotelOwner/Room/RoomCreate/RoomCreate";
import HotelEditPage from "./pages/HotelOwner/Hotel/HotelEditPage/HotelEditPage";
import AmenityCreate from "./pages/Admin/AmenityPage/AmenityCreate/AmenityCreate";
import AmenityList from "./pages/Admin/AmenityPage/AmenityList/AmenityList";
import AmenityEdit from "./pages/Admin/AmenityPage/AmenityEdit/AmenityEdit";
import HotelList from "./pages/Admin/Hotel/HotelList/HotelList";
import AboutPage from "./pages/AboutPage/AboutPage";
import BlogDetails from "./pages/Blog/BlogDetails/BlogDetails";
import FAQPage from "./pages/FAQ/FAQPage/FAQPage";
import ChatbotPage from "./pages/ChatbotPage/ChatbotPage";
import RegisterAccountHotelOwner from "./pages/RegisterAccount/RegisterAccountHotelOwner";
import BlogPage from "./pages/Blog/BlogPage/BlogPage";
import BlogCreate from "./pages/Blog/BlogCreate/BlogCreate";
import BlogListPage from "./pages/Admin/Blog/BlogListPage/BlogListPage";
import PromotionPage from "./pages/PromotionPage/PromotionPage";
import PromotionListPage from "./pages/Admin/Promotion/PromotionListPage/PromotionListPage";
import PromotionCreatePage from "./pages/Admin/Promotion/PromotionCreatePage/PromotionCreatePage";
import PromotionEditPage from "./pages/Admin/Promotion/PromotionEditPage/PromotionEditPage";
import { LanguageProvider } from "./context/LanguageContext"; // Đảm bảo đúng đường dẫn tới context của bạn

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "home", element: <Home /> },
            { path: "about", element: <AboutPage /> },
            { path: "blogs", element: <BlogPage /> },
            { path: "blogs/:postId", element: <BlogDetails /> },
            { path: "blogs/post", element: <BlogCreate /> },
            { path: "faq", element: <FAQPage /> },
            { path: "chatbot", element: <ChatbotPage /> },
            { path: "vouchers", element: <PromotionPage /> },

            {
                path: "sign-up/hotel-owner",
                element: <RegisterAccountHotelOwner />,
            },
            { path: "register-hotel-owner", element: <HotelOwnerSignUp /> },

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
            { path: "hotels", element: <HotelList /> },
            { path: "blog-post-list", element: <BlogListPage /> },
            { path: "customer-list", element: <AdminCustomerList /> },
            { path: "settings", element: <ProfileSettings /> },
            { path: "amenities", element: <AmenityList /> },
            { path: "add-amenity", element: <AmenityCreate /> },
            { path: "amenities/:amenityId/edit", element: <AmenityEdit /> },
            { path: "*", element: <NotFoundPage /> },
            { path: "vouchers", element: <PromotionListPage /> },
            { path: "add-voucher", element: <PromotionCreatePage /> },
            {
                path: "vouchers/:voucherId/edit",
                element: <PromotionEditPage />,
            },
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
            { path: "my-hotel/edit", element: <HotelEditPage /> },

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
            {/* Đặt LanguageProvider ở ngoài để toàn bộ ứng dụng có thể sử dụng context ngôn ngữ */}
            <LanguageProvider>
                <Provider store={store}>
                    <div className="App">
                        <RouterProvider router={router} />
                    </div>
                </Provider>
            </LanguageProvider>
        </GoogleOAuthProvider>
    );
}

export default App;

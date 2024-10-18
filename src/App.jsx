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
import AdminLayout from "./layouts/AdminLayout";
import HotelOwnerLayout from "./layouts/HotelOwnerLayout";
import Layout from "./layouts/Layout";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, // Your main layout
        children: [
            { index: true, element: <Home /> },
            { path: "home", element: <Home /> },
            // Other public routes can be added here
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />, // Admin layout
        children: [
            // Other admin routes
        ],
    },
    {
        path: "/hotel-owner",
        element: <HotelOwnerLayout />, // Hotel Owner layout
        children: [
            // Other hotel owner routes
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

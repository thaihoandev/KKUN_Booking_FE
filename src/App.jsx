import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Outlet,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/Store";

import Home from "./pages/Home/Home";
import AdminLayout from "./layouts/AdminLayout";
import HotelOwnerLayout from "./layouts/HotelOwnerLayout";
import Layout from "./layouts/Layout";
import Admin_Dashboard from "./pages/Home/Dashboard/Admin/Admin_Dashboard"
import Dashboard from "./pages/Home/Dashboard/Admin/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, // Your main layout
        children: [
            { index: true, element: <Home /> },
            { path: "home", element: <Home /> },
            { path: "test", element: <Admin_Dashboard /> },
            { path: "test2", element: <Dashboard /> },
            // Other public routes can be added here
            
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
        <Provider store={store}>
            <div className="App">
                <RouterProvider router={router} />
            </div>
        </Provider>
    );
}

export default App;

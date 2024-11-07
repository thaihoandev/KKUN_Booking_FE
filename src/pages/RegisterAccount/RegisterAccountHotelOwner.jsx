import React from "react";
import AccountDetails from "../../components/HotelOwner/AccountDetails/AccountDetails";
import { ToastContainer } from "react-toastify";

function RegisterAccountHotelOwner() {
    return (
        <>
            <ToastContainer />
            <div className="dashboard-wrapper container my-4 d-flex justify-content-center align-items-center bg-white">
                <div className="main-content p-0 mx-0">
                    <div class="dashboard-profile-wrapper">
                        <AccountDetails />
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterAccountHotelOwner;

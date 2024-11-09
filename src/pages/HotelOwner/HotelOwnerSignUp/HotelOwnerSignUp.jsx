import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import AccountDetails from "../../../components/HotelOwner/AccountDetails/AccountDetails";
import PropertyInfo from "../../../components/HotelOwner/PropertyInfo/PropertyInfo";
import LocationDetails from "../../../components/HotelOwner/LocationDetails/LocationDetails";
import RoomDetails from "../../../components/HotelOwner/RoomDetails/RoomDetails";
import ConfirmationRegisterHotelOwner from "../../../components/HotelOwner/ConfirmationRegisterHotelOwner/ConfirmationRegisterHotelOwner";

function HotelOwnerSignUp() {
    const user = useSelector((state) => state.user);
    const [hotelDetails, setHotelDetails] = useState({});
    const [roomDetails, setRoomDetails] = useState({});
    const [location, setLocation] = useState();
    const [activeTab, setActiveTab] = useState("property"); // Bắt đầu với tab đầu tiên

    // Hàm chuyển qua tab tiếp theo
    const handleNextTab = () => {
        if (activeTab === "property") {
            setActiveTab("location");
        } else if (activeTab === "location") {
            setActiveTab("roomdetails");
        } else if (activeTab === "roomdetails") {
            setActiveTab("confirmation-submit");
        }
        window.scrollTo(0, 0);
    };

    console.log("Hotel:", hotelDetails);
    console.log("location:", location);
    console.log("roomDetails:", roomDetails);

    return (
        <>
            <ToastContainer closeOnClick />
            <div className="dashboard-wrapper d-flex justify-content-center align-items-center">
                <div className="main-content m-0 rounded">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="main-content-title-profile mb-30">
                                <div className="main-content-title">
                                    <h3>
                                        ĐĂNG KÝ CHO THUÊ CƠ SỞ LƯU TRÚ TRÊN
                                        KKUNBOOKING
                                    </h3>
                                </div>
                            </div>
                            <div className="dashboard-profile-wrapper">
                                <div className="dashboard-profile-nav h-100">
                                    <ul
                                        className="nav flex-column nav-pills"
                                        id="pills-tab"
                                        role="tablist"
                                    >
                                        <li
                                            className="nav-item"
                                            role="presentation"
                                        >
                                            <button
                                                className={`nav-link ${
                                                    activeTab === "property"
                                                        ? "active"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setActiveTab("property")
                                                }
                                            >
                                                Thông tin khách sạn
                                            </button>
                                        </li>
                                        <li
                                            className="nav-item"
                                            role="presentation"
                                        >
                                            <button
                                                className={`nav-link ${
                                                    activeTab === "location"
                                                        ? "active"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setActiveTab("location")
                                                }
                                            >
                                                Vị trí chi tiết
                                            </button>
                                        </li>
                                        <li
                                            className="nav-item"
                                            role="presentation"
                                        >
                                            <button
                                                className={`nav-link ${
                                                    activeTab === "roomdetails"
                                                        ? "active"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setActiveTab("roomdetails")
                                                }
                                            >
                                                Thông tin phòng
                                            </button>
                                        </li>
                                        <li
                                            className="nav-item"
                                            role="presentation"
                                        >
                                            <button
                                                className={`nav-link ${
                                                    activeTab ===
                                                    "confirmation-submit"
                                                        ? "active"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setActiveTab(
                                                        "confirmation-submit"
                                                    )
                                                }
                                            >
                                                Đăng ký
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    className="tab-content w-100"
                                    id="pills-tabContent"
                                >
                                    <div
                                        className={`tab-pane fade ${
                                            activeTab === "property"
                                                ? "active show"
                                                : ""
                                        }`}
                                    >
                                        <PropertyInfo
                                            hotelDetails={hotelDetails}
                                            setHotelDetails={setHotelDetails}
                                            onNext={handleNextTab} // Truyền hàm chuyển tab tiếp theo
                                        />
                                    </div>
                                    <div
                                        className={`tab-pane fade ${
                                            activeTab === "location"
                                                ? "active show"
                                                : ""
                                        }`}
                                    >
                                        <LocationDetails
                                            location={location}
                                            setLocation={setLocation}
                                            onNext={handleNextTab} // Truyền hàm chuyển tab tiếp theo
                                        />
                                    </div>
                                    <div
                                        className={`tab-pane fade ${
                                            activeTab === "roomdetails"
                                                ? "active show"
                                                : ""
                                        }`}
                                    >
                                        <RoomDetails
                                            roomDetails={roomDetails}
                                            setRoomDetails={setRoomDetails}
                                            onNext={handleNextTab} // Truyền hàm chuyển tab tiếp theo
                                        />
                                    </div>
                                    <div
                                        className={`tab-pane fade ${
                                            activeTab === "confirmation-submit"
                                                ? "active show"
                                                : ""
                                        }`}
                                    >
                                        <ConfirmationRegisterHotelOwner
                                            hotelDetails={hotelDetails}
                                            location={location}
                                            roomDetails={roomDetails}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



export default HotelOwnerSignUp;

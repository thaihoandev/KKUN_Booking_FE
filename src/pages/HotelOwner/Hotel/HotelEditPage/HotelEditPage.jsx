import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import PropertyInfo from "../../../../components/HotelOwner/PropertyInfo/PropertyInfo";
import LocationDetails from "../../../../components/HotelOwner/LocationDetails/LocationDetails";
import RoomDetails from "../../../../components/HotelOwner/RoomDetails/RoomDetails";
import ConfirmationRegisterHotelOwner from "../../../../components/HotelOwner/ConfirmationRegisterHotelOwner/ConfirmationRegisterHotelOwner";
import * as HotelService from "../../../../services/HotelService";

function HotelEditPage() {
    const user = useSelector((state) => state.user);
    const { hotelId } = useParams(); // Lấy hotelId từ URL
    const [hotelDetails, setHotelDetails] = useState({});
    const [roomDetails, setRoomDetails] = useState({});
    const [location, setLocation] = useState();
    const [activeTab, setActiveTab] = useState("property");
    
    useEffect(() => {
        // Lấy thông tin khách sạn hiện tại để điền vào form
        async function fetchHotelDetails() {
            try {
                const response = await HotelService.getHotelById(hotelId);
                setHotelDetails(response);
                setLocation(response.location);
                setRoomDetails(response.rooms[0] || {});
            } catch (error) {
                console.error("Không thể tải thông tin khách sạn:", error);
                toast.error("Lỗi khi tải dữ liệu khách sạn");
            }
        }
        fetchHotelDetails();
    }, [hotelId]);

    // Hàm xử lý cập nhật
    const handleUpdate = async () => {
        try {
            await HotelService.updateHotel(hotelId, hotelDetails, user.accessToken);
            toast.success("Cập nhật thành công");
        } catch (error) {
            toast.error("Cập nhật thất bại");
        }
    };

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

    return (
        <>
            <ToastContainer closeOnClick />
            <div className="row">
                <div className="col-xl-12">
                    <div className="main-content-title-profile mb-30">
                        <h3>Chỉnh sửa thông tin khách sạn</h3>
                    </div>
                    <div className="dashboard-profile-wrapper">
                        <div className="dashboard-profile-nav h-100">
                            <ul className="nav flex-column nav-pills" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link ${activeTab === "property" ? "active" : ""}`}
                                        onClick={() => setActiveTab("property")}
                                    >
                                        Thông tin khách sạn
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link ${activeTab === "location" ? "active" : ""}`}
                                        onClick={() => setActiveTab("location")}
                                    >
                                        Vị trí chi tiết
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link ${activeTab === "roomdetails" ? "active" : ""}`}
                                        onClick={() => setActiveTab("roomdetails")}
                                    >
                                        Thông tin phòng
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link ${activeTab === "confirmation-submit" ? "active" : ""}`}
                                        onClick={() => setActiveTab("confirmation-submit")}
                                    >
                                        Cập nhật
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-content w-100" id="pills-tabContent">
                            <div className={`tab-pane fade ${activeTab === "property" ? "active show" : ""}`}>
                                <PropertyInfo
                                    hotelDetails={hotelDetails}
                                    setHotelDetails={setHotelDetails}
                                    onNext={handleNextTab}
                                />
                            </div>
                            <div className={`tab-pane fade ${activeTab === "location" ? "active show" : ""}`}>
                                <LocationDetails
                                    location={location}
                                    setLocation={setLocation}
                                    onNext={handleNextTab}
                                />
                            </div>
                            <div className={`tab-pane fade ${activeTab === "roomdetails" ? "active show" : ""}`}>
                                <RoomDetails
                                    roomDetails={roomDetails}
                                    setRoomDetails={setRoomDetails}
                                    onNext={handleNextTab}
                                />
                            </div>
                            <div className={`tab-pane fade ${activeTab === "confirmation-submit" ? "active show" : ""}`}>
                                <ConfirmationRegisterHotelOwner
                                    hotelDetails={hotelDetails}
                                    location={location}
                                    roomDetails={roomDetails}
                                    onUpdate={handleUpdate}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HotelEditPage;

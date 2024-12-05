import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import PropertyInfo from "../../../../components/HotelOwner/PropertyInfo/PropertyInfo";
import LocationDetails from "../../../../components/HotelOwner/LocationDetails/LocationDetails";
import RoomDetails from "../../../../components/HotelOwner/RoomDetails/RoomDetails";
import ConfirmationRegisterHotelOwner from "../../../../components/HotelOwner/ConfirmationRegisterHotelOwner/ConfirmationRegisterHotelOwner";
import * as HotelService from "../../../../services/HotelService";

import { useMutation } from "react-query";
import * as UserService from "../../../../services/UserService";
import Loading from "../../../../components/Loading/Loading";


function HotelEditPage() {
    const user = useSelector((state) => state.user);
    const { hotelId } = useParams(); // Lấy hotelId từ URL
    const [hotelDetails, setHotelDetails] = useState({});
    const [roomDetails, setRoomDetails] = useState({});
    const [location, setLocation] = useState({});
    const [activeTab, setActiveTab] = useState("property");

    const [loading, setLoading] = useState(true);



    const mutationHotel = useMutation(
        (hotelId) => HotelService.getHotelById(hotelId),
        {
            onSuccess: (data) => {

                setHotelDetails({
                    name: data.name,
                    category: data.category,
                    description: data.description,
                    paymentPolicy: data.paymentPolicy,
                    freeCancellation: data.freeCancellation,
                    breakfastIncluded: data.breakfastIncluded,
                    prePayment: data.prePayment,
                    facilities: data.amenities.map((amenity) => amenity.id),
                    images: data.exteriorImages,
                }); // Gán thông tin khách sạn vào state
                setLocation(data.location || {}); // Gán location
                setRoomDetails(data.rooms?.[0] || {}); // Gán thông tin phòng
                setLoading(false); // Tắt trạng thái loading

                //console.log("Dữ hotel detail:", hotelDetails);  // Log phản hồi từ API

                setLoading(false);
            },
            onError: (error) => {
                toast.error(error.message);

                setLoading(false);
            },
        }
    );

    const mutationGetUserDetails = useMutation(
        ({ userId, accessToken }) => {
            return UserService.getDetailsUser(userId, accessToken);
        },
        {
            onSuccess: (data) => {
                mutationHotel.mutate(data.hotelId);
            },
            onError: (error) => {
                toast.error(error.message || "Đã xảy ra lỗi.");
            },
        }
    );
    useEffect(() => {
        mutationGetUserDetails.mutate({
            userId: user.id,
            accessToken: user.accessToken,
        });
    }, []);



    // Hàm xử lý cập nhật
    const handleUpdate = async () => {
        try {
            const updatedHotel = {
                ...hotelDetails,
                location,
            };
            await HotelService.updateHotel(hotelId, updatedHotel, user.accessToken);
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

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <ToastContainer closeOnClick />
            <div className="row">
                <div className="col-xl-12">
                    <div className="main-content-title-profile mb-30">
                        <h3>Chỉnh sửa thông tin khách sạn</h3>
                    </div>
                    <div className="dashboard-profile-wrapper">
                        {/* Sidebar */}
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
                                        className={`nav-link ${activeTab === "confirmation-submit" ? "active" : ""}`}
                                        onClick={() => setActiveTab("confirmation-submit")}
                                    >
                                        Cập nhật
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Content */}
                        <div className="tab-content w-100" id="pills-tabContent">
                            {/* Tab: Thông tin khách sạn */}
                            <div className={`tab-pane fade ${activeTab === "property" ? "active show" : ""}`}>
                                <PropertyInfo
                                    hotelDetails={hotelDetails}
                                    setHotelDetails={setHotelDetails}
                                    onNext={handleNextTab}
                                />
                            </div>

                            {/* Tab: Vị trí chi tiết */}
                            <div className={`tab-pane fade ${activeTab === "location" ? "active show" : ""}`}>
                                <LocationDetails
                                    location={location}
                                    setHotelLocation={setLocation}
                                    onNext={handleNextTab}
                                />
                            </div>

                            {/* Tab: Cập nhật */}
                            <div className={`tab-pane fade ${activeTab === "confirmation-submit" ? "active show" : ""}`}>
                                <ConfirmationRegisterHotelOwner
                                    hotelDetails={hotelDetails}
                                    setHotelLocation={setLocation}
                                    // roomDetails={roomDetails}
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


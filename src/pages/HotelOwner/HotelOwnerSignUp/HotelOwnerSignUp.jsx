import React from "react";

import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import AccountDetails from "./AccountDetails/AccountDetails"; // 1. AccountDetails (Thông tin tài khoản)
import PropertyInfo from "./PropertyInfo/PropertyInfo";      // 2 Property Information (Thông tin cơ bản về khách sạn)
import LocationDetails from "./LocationDetails/LocationDetails"; // 3 Location & Details (Vị trí chi tiết)
import RoomDetails from "./RoomDetails/RoomDetails";        // 4 Room Details & Pricing (Thông tin phòng + giá)
import Confirmation from "./Confirmation/Confirmation";   // 6. Confirmation & Submit (Xem lại & Đăng ký)


function HotelOwnerSignUp() {
    const user = useSelector(state => state.user)
    return (
        <>
            <ToastContainer />
            <div className="dashboard-wrapper d-flex justify-content-center align-items-center " >
                <div className="main-content m-0 rounded" >  {/*style={{ border: "1px solid #aaa" }} */}
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="main-content-title-profile mb-30">
                                <div class="main-content-title">
                                    <h3>ĐĂNG KÝ CHO THUÊ CƠ SỞ LƯU TRÚ TRÊN KKUNBOOKING</h3>
                                </div>
                            </div>
                            {/* ============ ProgressBar ============= */}
                            <div class="dashboard-profile-wrapper">
                                <div class="dashboard-profile-nav h-100">
                                    <ul
                                        class="nav flex-column nav-pills "
                                        id="pills-tab"
                                        role="tablist"
                                    >
                                        {/* --------- 1 AccountDetails (Thông tin tài khoản) ------------- */}
                                        <li class="nav-item" role="presentation">
                                            <button
                                                class="nav-link active"
                                                id="profile-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#profile"
                                                type="button"
                                                role="tab"
                                                aria-controls="profile"
                                                aria-selected="true"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm-4,21.164v-.164c0-2.206,1.794-4,4-4s4,1.794,4,4v.164c-1.226.537-2.578.836-4,.836s-2.774-.299-4-.836Zm9.925-1.113c-.456-2.859-2.939-5.051-5.925-5.051s-5.468,2.192-5.925,5.051c-2.47-1.823-4.075-4.753-4.075-8.051C2,6.486,6.486,2,12,2s10,4.486,10,10c0,3.298-1.605,6.228-4.075,8.051Zm-5.925-15.051c-2.206,0-4,1.794-4,4s1.794,4,4,4,4-1.794,4-4-1.794-4-4-4Zm0,6c-1.103,0-2-.897-2-2s.897-2,2-2,2,.897,2,2-.897,2-2,2Z"
                                                    />
                                                </svg>
                                                Thông tin tài khoản
                                            </button>
                                        </li>
                                        {/* -------- 2 Property Information (Thông tin cơ bản về khách sạn) -------- */}
                                        <li class="nav-item" role="presentation">
                                            <button
                                                class="nav-link"
                                                id="property-information-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#property"
                                                type="button"
                                                role="tab"
                                                aria-controls="property"
                                                aria-selected="false"
                                                tabindex="-1"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M18,0H6c-1.654,0-3,1.346-3,3V24H11v-6h2v6h8V3c0-1.654-1.346-3-3-3Zm1,22h-4v-4h2v-2H7v2h2v4H5V3c0-.551,.449-1,1-1h12c.551,0,1,.449,1,1V22ZM7,12h2v2h-2v-2Zm8,0h2v2h-2v-2ZM7,4h2v2h-2v-2Zm8,0h2v2h-2v-2ZM7,8h2v2h-2v-2Zm8,0h2v2h-2v-2Zm-4,4h2v2h-2v-2Zm0-8h2v2h-2v-2Zm0,4h2v2h-2v-2Z" />
                                                </svg>
                                                Thông tin khách sạn
                                            </button>
                                        </li>
                                        {/* ------  3 Location & Details (Vị trí & Chi tiết) ------- */}
                                        <li class="nav-item" role="presentation">
                                            <button
                                                class="nav-link"
                                                id="location-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#location"
                                                type="button"
                                                role="tab"
                                                aria-controls="location"
                                                aria-selected="false"
                                                tabindex="-1"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 512 512"
                                                >
                                                    <g id="_01_align_center">
                                                        <path d="M255.104,512.171l-14.871-12.747C219.732,482.258,40.725,327.661,40.725,214.577c0-118.398,95.981-214.379,214.379-214.379   s214.379,95.981,214.379,214.379c0,113.085-179.007,267.682-199.423,284.932L255.104,512.171z M255.104,46.553   c-92.753,0.105-167.918,75.27-168.023,168.023c0,71.042,110.132,184.53,168.023,236.473   c57.892-51.964,168.023-165.517,168.023-236.473C423.022,121.823,347.858,46.659,255.104,46.553z" />
                                                        <path d="M255.104,299.555c-46.932,0-84.978-38.046-84.978-84.978s38.046-84.978,84.978-84.978s84.978,38.046,84.978,84.978   S302.037,299.555,255.104,299.555z M255.104,172.087c-23.466,0-42.489,19.023-42.489,42.489s19.023,42.489,42.489,42.489   s42.489-19.023,42.489-42.489S278.571,172.087,255.104,172.087z" />
                                                    </g>
                                                </svg>
                                                Vị trí chi tiết
                                            </button>
                                        </li>
                                        {/* --------- 4 Room Details & Pricing (Chi tiết & Giá phòng) ------------- */}
                                        <li class="nav-item" role="presentation">
                                            <button
                                                class="nav-link"
                                                id="roomdetails-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#roomdetails"
                                                type="button"
                                                role="tab"
                                                aria-controls="roomdetails"
                                                aria-selected="false"
                                                tabindex="-1"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    width="14"
                                                    height="14"
                                                >
                                                    <path
                                                        d="M19,6H13A4.987,4.987,0,0,0,8.584,8.705,3.464,3.464,0,0,0,6.5,8,3.5,3.5,0,0,0,3,11.5,3.464,3.464,0,0,0,3.351,13H2V3A1,1,0,0,0,0,3V21a1,1,0,0,0,2,0V19H22v2a1,1,0,0,0,2,0V11A5.006,5.006,0,0,0,19,6Zm-9,5a3,3,0,0,1,3-3h6a3,3,0,0,1,3,3v2H10Zm-5,.5A1.5,1.5,0,1,1,6.5,13,1.5,1.5,0,0,1,5,11.5ZM2,17V15H22v2Z"
                                                    />
                                                </svg>

                                                Thông tin phòng
                                            </button>
                                        </li>
                                        {/* ---------5. Photos (Hình ảnh) ------------- */}
                                        
                                        
                                        {/* --------- 6. Confirmation & Submit (Xem lại & Đăng ký) ------------- */}
                                        <li class="nav-item" role="presentation">
                                            <button
                                                class="nav-link"
                                                id="confirmation-submit-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#confirmation-submit"
                                                type="button"
                                                role="tab"
                                                aria-controls="confirmation-submit"
                                                aria-selected="false"
                                                tabindex="-1"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    width="14"
                                                    height="14"
                                                >
                                                    <path
                                                        d="m11.696,11.718l-1.862,1.805c-.318.318-.74.478-1.163.478-.427,0-.856-.163-1.183-.489l-.681-.654c-.398-.383-.411-1.016-.028-1.414.383-.398,1.017-.41,1.414-.028l.473.455,1.638-1.588c.396-.383,1.029-.375,1.414.022.384.396.375,1.029-.022,1.414Zm4.304,5.282h-3c-.552,0-1,.448-1,1s.448,1,1,1h3c.552,0,1-.448,1-1s-.448-1-1-1Zm0-12h-3c-.552,0-1,.448-1,1s.448,1,1,1h3c.552,0,1-.448,1-1s-.448-1-1-1Zm0,6h-2c-.552,0-1,.448-1,1s.448,1,1,1h2c.552,0,1-.448,1-1s-.448-1-1-1Zm-7.5,5.5c-.828,0-1.5.672-1.5,1.5s.672,1.5,1.5,1.5,1.5-.672,1.5-1.5-.672-1.5-1.5-1.5Zm0-9c.828,0,1.5-.672,1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5,1.5.672,1.5,1.5,1.5Zm13.5-2.5v14c0,2.757-2.243,5-5,5H7c-2.757,0-5-2.243-5-5V5C2,2.243,4.243,0,7,0h10c2.757,0,5,2.243,5,5Zm-2,0c0-1.654-1.346-3-3-3H7c-1.654,0-3,1.346-3,3v14c0,1.654,1.346,3,3,3h10c1.654,0,3-1.346,3-3V5Z"
                                                    />
                                                </svg>
                                                Đăng ký
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div class="tab-content w-100" id="pills-tabContent">
                                    <div
                                        class="tab-pane fade active show"
                                        id="profile"
                                        role="tabpanel"
                                        aria-labelledby="profile-tab"
                                    >
                                        {/* ================================================ */}
                                        <AccountDetails></AccountDetails>
                                        {/* ================================================ */}
                                    </div>
                                    <div
                                        class="tab-pane fade"
                                        id="property"
                                        role="tabpanel"
                                        aria-labelledby="property-tab"
                                    >
                                        {/* ================================================ */}
                                        <PropertyInfo></PropertyInfo>
                                        {/* ================================================ */}
                                    </div>
                                    <div
                                        class="tab-pane fade"
                                        id="location"
                                        role="tabpanel"
                                        aria-labelledby="location-tab"
                                    >
                                        {/* ================================================ */}
                                        <LocationDetails></LocationDetails>
                                        {/* ================================================ */}
                                    </div>
                                    <div
                                        class="tab-pane fade"
                                        id="roomdetails"
                                        role="tabpanel"
                                        aria-labelledby="roomdetails-tab"
                                    >
                                        {/* ================================================ */}
                                        <RoomDetails></RoomDetails>
                                        {/* ================================================ */}
                                    </div>
                                    
                                    <div
                                        class="tab-pane fade"
                                        id="confirmation-submit"
                                        role="tabpanel"
                                        aria-labelledby="confirmation-submit-tab"
                                    >
                                        {/* ================================================ */}
                                        <Confirmation></Confirmation>
                                        {/* ================================================ */}
                                    </div>



                                    {/* <ChangePassword user={user} /> */}


                                    {/* <div className="form-inner">
                                    <button type="submit" className="primary-btn3">
                                        Tiếp theo
                                    </button>
                                </div> */}

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

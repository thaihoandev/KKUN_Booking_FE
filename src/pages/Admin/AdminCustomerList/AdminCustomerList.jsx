import React from "react";
import "swiper/css"; // Import CSS cho Swiper
import "swiper/css/navigation"; // Import CSS cho Navigation
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";

import Loading from "../../../components/Loading/Loading";

function AdminCustomerList() {
    return (
        <>
            {/* ======================================== */}

            <div class="row">
                <div class="col-xl-12">
                    <div class="main-content-title-profile mb-50">
                        <div class="main-content-title">
                            <h3>Customer List</h3>
                        </div>
                        <div class="search-area">
                            <form>
                                <div class="search-box">
                                    <input type="text" placeholder="Search Here"/>
                                        <button type="submit"><i class="bx bx-search"></i></button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="row">
                        <div class=" col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div class="eg-profile-card text-center">
                                <div class="profile-img">
                                    <img class="rounded-circle" src="assets/img/innerpage/profile-img.png" alt=""/>
                                        <button class="eg-btn green-light--btn">Active</button>
                                </div>
                                <div class="profile-bio">
                                    <h4>Zephyr Crestwood</h4>
                                    <h6>Marchant ID: 120002</h6>
                                </div>
                                <div class="card-action d-flex justify-content-between">
                                    <div class="d-flex flex-row justify-content-md-center justify-content-end align-items-center gap-2">
                                        <button class="eg-btn add--btn"><i class="bi bi-pencil-square"></i></button>
                                        <button class="eg-btn delete--btn"><i class="bi bi-trash"></i></button>
                                        <button class="eg-btn account--btn"><i class="far fa-user"></i></button>
                                    </div>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=" col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div class="eg-profile-card text-center">
                                <div class="profile-img">
                                    <img class="rounded-circle" src="assets/img/innerpage/profile-img.png" alt=""/>
                                        <button class="eg-btn green-light--btn">Active</button>
                                </div>
                                <div class="profile-bio">
                                    <h4>Seraphina Nightingale</h4>
                                    <h6>Marchant ID: 120003</h6>
                                </div>
                                <div class="card-action d-flex justify-content-between">
                                    <div class="d-flex flex-row justify-content-md-center justify-content-end align-items-center gap-2">
                                        <button class="eg-btn add--btn"><i class="bi bi-pencil-square"></i></button>
                                        <button class="eg-btn delete--btn"><i class="bi bi-trash"></i></button>
                                        <button class="eg-btn account--btn"><i class="far fa-user"></i></button>
                                    </div>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=" col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div class="eg-profile-card text-center">
                                <div class="profile-img">
                                    <img class="rounded-circle" src="assets/img/innerpage/profile-img.png" alt=""/>
                                        <button class="eg-btn red-light--btn">Deactive</button>
                                </div>
                                <div class="profile-bio">
                                    <h4>Magnus Thornwood</h4>
                                    <h6>Marchant ID: 120004</h6>
                                </div>
                                <div class="card-action d-flex justify-content-between">
                                    <div class="d-flex flex-row justify-content-md-center justify-content-end align-items-center gap-2">
                                        <button class="eg-btn add--btn"><i class="bi bi-pencil-square"></i></button>
                                        <button class="eg-btn delete--btn"><i class="bi bi-trash"></i></button>
                                        <button class="eg-btn account--btn"><i class="far fa-user"></i></button>
                                    </div>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=" col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div class="eg-profile-card text-center">
                                <div class="profile-img">
                                    <img class="rounded-circle" src="assets/img/innerpage/profile-img.png" alt=""/>
                                        <button class="eg-btn green-light--btn">Active</button>
                                </div>
                                <div class="profile-bio">
                                    <h4>Amara Sterling</h4>
                                    <h6>Marchant ID: 120005</h6>
                                </div>
                                <div class="card-action d-flex justify-content-between">
                                    <div class="d-flex flex-row justify-content-md-center justify-content-end align-items-center gap-2">
                                        <button class="eg-btn add--btn"><i class="bi bi-pencil-square"></i></button>
                                        <button class="eg-btn delete--btn"><i class="bi bi-trash"></i></button>
                                        <button class="eg-btn account--btn"><i class="far fa-user"></i></button>
                                    </div>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=" col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div class="eg-profile-card text-center">
                                <div class="profile-img">
                                    <img class="rounded-circle" src="assets/img/innerpage/profile-img.png" alt=""/>
                                        <button class="eg-btn red-light--btn">Deactive</button>
                                </div>
                                <div class="profile-bio">
                                    <h4>Asher Wilde</h4>
                                    <h6>Marchant ID: 120006</h6>
                                </div>
                                <div class="card-action d-flex justify-content-between">
                                    <div class="d-flex flex-row justify-content-md-center justify-content-end align-items-center gap-2">
                                        <button class="eg-btn add--btn"><i class="bi bi-pencil-square"></i></button>
                                        <button class="eg-btn delete--btn"><i class="bi bi-trash"></i></button>
                                        <button class="eg-btn account--btn"><i class="far fa-user"></i></button>
                                    </div>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=" col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div class="eg-profile-card text-center">
                                <div class="profile-img">
                                    <img class="rounded-circle" src="assets/img/innerpage/profile-img.png" alt=""/>
                                        <button class="eg-btn green-light--btn">Active</button>
                                </div>
                                <div class="profile-bio">
                                    <h4>Luna Everhart</h4>
                                    <h6>Marchant ID: 120007</h6>
                                </div>
                                <div class="card-action d-flex justify-content-between">
                                    <div class="d-flex flex-row justify-content-md-center justify-content-end align-items-center gap-2">
                                        <button class="eg-btn add--btn"><i class="bi bi-pencil-square"></i></button>
                                        <button class="eg-btn delete--btn"><i class="bi bi-trash"></i></button>
                                        <button class="eg-btn account--btn"><i class="far fa-user"></i></button>
                                    </div>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=" col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div class="eg-profile-card text-center">
                                <div class="profile-img">
                                    <img class="rounded-circle" src="assets/img/innerpage/profile-img.png" alt=""/>
                                        <button class="eg-btn green-light--btn">Active</button>
                                </div>
                                <div class="profile-bio">
                                    <h4>Orion Storm</h4>
                                    <h6>Marchant ID: 120008</h6>
                                </div>
                                <div class="card-action d-flex justify-content-between">
                                    <div class="d-flex flex-row justify-content-md-center justify-content-end align-items-center gap-2">
                                        <button class="eg-btn add--btn"><i class="bi bi-pencil-square"></i></button>
                                        <button class="eg-btn delete--btn"><i class="bi bi-trash"></i></button>
                                        <button class="eg-btn account--btn"><i class="far fa-user"></i></button>
                                    </div>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ======================================== */}
        </>
    );
}

export default AdminCustomerList;

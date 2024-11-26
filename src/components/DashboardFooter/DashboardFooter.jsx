import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function DashboardFooter() {

    return (
        <>
            <div class="copyright-area">
                <p>Copyright 2024 <a href="#">KKUN Booking</a> | Design By <a href="#">Nhom 18</a></p>
            </div>
            <ul class="footer-menu-list">
                <li>
                    {/* <a href="#">Terms & Conditions</a> */}  
                        <img
                            style={{ height: "32px" }}
                            alt="image"
                            src={`${process.env.PUBLIC_URL}/assets/img/logo_kkun/Trans_logoKKUNFull.png`}
                        />
                </li>
            </ul>
        </>
    );
}
export default DashboardFooter;
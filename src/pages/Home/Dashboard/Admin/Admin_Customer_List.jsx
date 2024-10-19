import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css"; // Import CSS cho Swiper
import "swiper/css/navigation"; // Import CSS cho Navigation
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { useState, useEffect } from "react";

import HotelItem from "../../components/HotelItem/HotelItem";
import BannerContainer from "../../components/BannerContainer/BannerContainer";
import Loading from "../../components/Loading/Loading";
function Home() {
    const [popularHotels, setPopularHotels] = useState([]);
    const [ratingHotels, setRatingHotels] = useState([]);
    const [personalizedHotels, setPersonalizedHotels] = useState([]);
    const [selectedCity, setSelectedCity] = useState("Hà Nội"); // Default city

    const [loading, setLoading] = useState(true);



    ///============================

    if (loading) {
        return <Loading></Loading>;
    }

    return (
        <>
        {/* ======================================== */}
        
        
        
        {/* ======================================== */}
        </>
    );
}

export default Home;
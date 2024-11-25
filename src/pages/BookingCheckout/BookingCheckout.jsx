import React, { useEffect, useState } from "react";
import BookingForm from "../../components/BookingForm/BookingForm";
import SidebarBookingForm from "../../components/BookingForm/SidebarBookingForm/SidebarBookingForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { toast, ToastContainer } from "react-toastify";

import * as RoomService from "../../services/RoomService";
import * as HotelService from "../../services/HotelService";
import Loading from "../../components/Loading/Loading";
import CountDownNotification from "../../components/CountDownNotification/CountDownNotification";
function BookingCheckout() {
    const { roomId } = useParams();
    const [room, setRoom] = useState({});
    const [hotel, setHotel] = useState({});
    const [loading, setLoading] = useState(true);
    const [discount, setDiscount] = useState(0);
    const booking = useSelector((state) => state.booking);

    const mutationRoom = useMutation(
        (roomId) => RoomService.getRoomById(roomId),
        {
            onSuccess: (data) => {
                setRoom(data);
                mutationHotel.mutate(data.hotelId);
            },
            onError: (error) => {
                toast.error(error.message);
                setLoading(false);
            },
        }
    );

    const mutationHotel = useMutation(
        (hotelId) => HotelService.getHotelById(hotelId),
        {
            onSuccess: (data) => {
                setHotel(data);
                setLoading(false);
            },
            onError: (error) => {
                toast.error(error.message);
                setLoading(false);
            },
        }
    );
    useEffect(() => {
        mutationRoom.mutate(roomId);
    }, []);
    if (loading) {
        return <Loading />;
    }
    return (
        <>
            <ToastContainer />
            <div className="container my-3">
                <CountDownNotification />
                <div className="row ">
                    <div className="col-8">
                        <BookingForm
                            hotel={hotel}
                            room={room}
                            setDiscount={setDiscount}
                            discount={discount}
                        />
                    </div>
                    <div className="col-4">
                        <SidebarBookingForm
                            booking={booking}
                            hotel={hotel}
                            room={room}
                            discount={discount}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookingCheckout;

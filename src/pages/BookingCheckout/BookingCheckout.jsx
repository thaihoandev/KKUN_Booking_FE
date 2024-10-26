import React, { useEffect, useState } from "react";
import BookingForm from "../../components/BookingForm/BookingForm";
import SidebarBookingForm from "../../components/BookingForm/SidebarBookingForm/SidebarBookingForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import * as RoomService from "../../services/RoomService";
import * as HotelService from "../../services/HotelService";
import Loading from "../../components/Loading/Loading";
function BookingCheckout() {
    const { roomId } = useParams();
    const [room, setRoom] = useState({});
    const [hotel, setHotel] = useState({});
    const [loading, setLoading] = useState(true);

    const bookingDate = useSelector((state) => state.bookingDate);

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
            <div className="container my-3">
                <div className="row ">
                    <div className="col-8">
                        <BookingForm />
                    </div>
                    <div className="col-4">
                        <SidebarBookingForm
                            bookingDate={bookingDate}
                            hotel={hotel}
                            room={room}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookingCheckout;

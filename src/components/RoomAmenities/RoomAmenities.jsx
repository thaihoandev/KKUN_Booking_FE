import React from "react";
import AmenityItem from "./AmenityItem/AmenityItem";

function RoomAmenities({ amenities }) {
    return (
        <>
            <ul className="room-features">
                {amenities.map((amenity, index) => (
                    <AmenityItem key={index} name={amenity.name} />
                ))}
            </ul>
        </>
    );
}

export default RoomAmenities;

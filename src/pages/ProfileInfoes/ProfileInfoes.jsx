import React from "react";
import { useSelector } from "react-redux";

function ProfileInfoes() {
    const user = useSelector((state) => state.user);
    return <div>ProfileInfoes {user.email}</div>;
}

export default ProfileInfoes;

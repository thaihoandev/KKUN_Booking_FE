import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
    access_token: "",
    id: "",
    role: "",
};

export const userSlide = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {
                firstName = "",
                lastName = "",
                email = "",
                access_token = "",
                address = "",
                phone = "",
                avatar = "",
                _id = "",
                role,
            } = action.payload;
            state.firstName = firstName ? firstName : state.firstName;
            state.lastName = lastName ? lastName : state.lastName;
            state.email = email ? email : state.email;
            state.address = address ? address : state.address;
            state.phone = phone ? phone : state.phone;
            state.avatar = avatar ? avatar : state.avatar;
            state.id = _id ? _id : state.id;
            state.access_token = access_token
                ? access_token
                : state.access_token;
            state.role = role ? role : state.role;
        },
        resetUser: (state) => {
            state.firstName = "";
            state.lastName = "";
            state.email = "";
            state.address = "";
            state.phone = "";
            state.avatar = "";
            state.id = "";
            state.access_token = "";
            state.role = "";
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;

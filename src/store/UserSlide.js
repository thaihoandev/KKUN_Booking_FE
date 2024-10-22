import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
    accessToken: "",
    id: "",
    role: "",
    authProvider: "",
    hasPassword: false, // Thêm trường này vào initialState
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
                accessToken = "",
                address = "",
                phone = "",
                avatar = "",
                _id = "",
                authProvider = "",
                role,
                hasPassword = false, // Nhận hasPassword từ payload
            } = action.payload;
            state.firstName = firstName ? firstName : state.firstName;
            state.lastName = lastName ? lastName : state.lastName;
            state.email = email ? email : state.email;
            state.address = address ? address : state.address;
            state.phone = phone ? phone : state.phone;
            state.avatar = avatar ? avatar : state.avatar;
            state.id = _id ? _id : state.id;
            state.authProvider = authProvider
                ? authProvider
                : state.authProvider;
            state.accessToken = accessToken ? accessToken : state.accessToken;
            state.role = role ? role : state.role;
            state.hasPassword = hasPassword; // Cập nhật hasPassword vào state
        },
        resetUser: (state) => {
            state.firstName = "";
            state.lastName = "";
            state.email = "";
            state.address = "";
            state.phone = "";
            state.avatar = "";
            state.id = "";
            state.accessToken = "";
            state.role = "";
            state.authProvider = "";
            state.hasPassword = false; // Đặt lại hasPassword về false
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;

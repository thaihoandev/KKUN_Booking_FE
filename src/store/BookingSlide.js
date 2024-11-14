import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    location: "",
    checkInDate: null,
    checkOutDate: null,
    childQty: null,
    adultQty: null,
};

export const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        updateBooking: (state, action) => {
            const { location, checkInDate, checkOutDate, childQty, adultQty } =
                action.payload;
            state.location = location ?? state.location;
            state.checkInDate = checkInDate ?? state.checkInDate;
            state.checkOutDate = checkOutDate ?? state.checkOutDate;
            state.childQty = childQty ?? state.childQty;
            state.adultQty = adultQty ?? state.adultQty;
        },
        resetBooking: (state) => {
            state.location = "";
            state.checkInDate = null;
            state.checkOutDate = null;
            state.childQty = null;
            state.adultQty = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateBooking, resetBooking } = bookingSlice.actions;

export default bookingSlice.reducer;

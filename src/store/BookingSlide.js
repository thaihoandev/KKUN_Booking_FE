import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    checkInDate: null,
    checkOutDate: null,
};

export const bookingSlide = createSlice({
    name: "bookingDate",
    initialState,
    reducers: {
        updateBookingDate: (state, action) => {
            const { checkInDate = null, checkOutDate = null } = action.payload;
            state.checkInDate = checkInDate ?? state.checkInDate; // Sử dụng toán tử nullish coalescing
            state.checkOutDate = checkOutDate ?? state.checkOutDate; // Sử dụng toán tử nullish coalescing
        },
        resetBookingDate: (state) => {
            state.checkInDate = null; // Đặt về null thay vì chuỗi rỗng
            state.checkOutDate = null; // Đặt về null thay vì chuỗi rỗng
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateBookingDate, resetBookingDate } = bookingSlide.actions;

export default bookingSlide.reducer;

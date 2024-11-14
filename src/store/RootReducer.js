import { combineReducers } from "redux";
import userReducer from "./UserSlide"; // Sửa thành userReducer thay vì userSlide
import bookingReducer from "./BookingSlide"; // Sửa thành userReducer thay vì userSlide

const rootReducer = combineReducers({
    // Add other reducers here if you have them
    user: userReducer, // Sử dụng đúng reducer được export
    booking: bookingReducer, // Thêm booking vào store
});

export default rootReducer;

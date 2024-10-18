import { combineReducers } from "redux";
import userReducer from "./UserSlide"; // Sửa thành userReducer thay vì userSlide

const rootReducer = combineReducers({
    // Add other reducers here if you have them
    user: userReducer, // Sử dụng đúng reducer được export
});

export default rootReducer;

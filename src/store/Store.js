import { createStore, compose } from "redux";
import rootReducer from "./RootReducer";

// Hàm lưu `state` vào localStorage
function saveToLocalStorage(state) {
    try {
        // Chỉ lưu phần `user` của `state`
        const serializedState = JSON.stringify({ user: state.user });
        localStorage.setItem("state", serializedState);
    } catch (e) {
        console.error("Could not save state", e);
    }
}

// Hàm lấy `state` từ localStorage
function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) return undefined;

        const state = JSON.parse(serializedState);

        // Kiểm tra nếu `accessToken` không tồn tại hoặc là chuỗi rỗng
        if (
            !state.user ||
            !state.user.accessToken ||
            state.user.accessToken === ""
        ) {
            // Xoá `localStorage` để đảm bảo người dùng phải đăng nhập lại
            localStorage.removeItem("state");
            return undefined;
        }

        console.log("Khôi phục state từ localStorage:", state);
        return state;
    } catch (e) {
        console.error("Could not load state", e);
        return undefined;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Khởi tạo `store` với trạng thái khởi tạo từ localStorage
const store = createStore(
    rootReducer,
    loadFromLocalStorage(), // Khôi phục state từ localStorage
    composeEnhancers()
);

// Lắng nghe sự thay đổi trong store và lưu `state` vào localStorage
store.subscribe(() => {
    const state = store.getState();
    console.log("Current state:", state);
    // Lưu `state` vào `localStorage` chỉ khi `accessToken` tồn tại và không rỗng
    if (state.user && state.user.accessToken && state.user.accessToken !== "") {
        saveToLocalStorage(state);
    }
});

export default store;

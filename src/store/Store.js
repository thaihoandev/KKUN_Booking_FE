import { createStore, compose } from "redux";
import rootReducer from "./RootReducer";

// Hàm lưu `state` vào localStorage
function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify({
            booking: state.booking, // Luôn lưu booking
            ...(state.user.accessToken || state.user.refreshToken
                ? { user: state.user } // Chỉ lưu user khi có accessToken hoặc refreshToken
                : {}),
        });
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

        // Chỉ khôi phục user nếu có accessToken hoặc refreshToken
        const hasValidToken =
            localStorage.getItem("accessToken") ||
            localStorage.getItem("refreshToken");
        if (!hasValidToken || (state.user && !state.user.accessToken)) {
            // Xóa user khỏi state nếu không hợp lệ
            delete state.user;
        }

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

    // Lưu toàn bộ `state` vào `localStorage`
    saveToLocalStorage(state);
});

export default store;

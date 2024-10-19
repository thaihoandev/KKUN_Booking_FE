import { createStore, compose } from "redux";
import rootReducer from "./RootReducer";

// Lưu state vào localStorage
function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch (e) {
        console.error("Could not save state", e);
    }
}

// Lấy state từ localStorage
function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.error("Could not load state", e);
        return undefined;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Tạo store với trạng thái khởi tạo từ localStorage
const store = createStore(
    rootReducer,
    loadFromLocalStorage(), // Khôi phục state từ localStorage
    composeEnhancers()
);

// Lắng nghe sự thay đổi trong store và lưu state vào localStorage
store.subscribe(() => {
    saveToLocalStorage(store.getState());
});

export default store;

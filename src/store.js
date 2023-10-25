import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import pocketbaseReducer from "./reducers/pocketbaseReducer";

export const store = configureStore({
    reducer: {
        user: userReducer,
        pocketbase: pocketbaseReducer
    }
})
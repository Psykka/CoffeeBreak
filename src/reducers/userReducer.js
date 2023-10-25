import { createSlice } from "@reduxjs/toolkit"

const userReducer = createSlice({
    name: "user",
    initialState: {
        name: "",
        avatar: "",
    },
    reducers: {
        login: (state, action) => {
            state.name = action.payload.name;
            state.avatar = action.payload.avatar;
        },
        logout: (state) => {
            state.name = "";
            state.avatar = "";
        }
    }
})

export const { login, logout } = userReducer.actions;
export default userReducer.reducer;
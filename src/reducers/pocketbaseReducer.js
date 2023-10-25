import { createSlice } from "@reduxjs/toolkit"
import Pocketbase from 'pocketbase'

const pocketbaseReducer = createSlice({
    name: "pocketbase",
    initialState: {
        pb: new Pocketbase('https://coffeebreak.hop.sh')
    },
    reducers: {
        auth: (state, action) => {
            switch (action.payload.type) {
                case 'email':
                    state.pb.collection('users').authWithPassword(action.payload.email, action.payload.password)
                    break;
                case 'google':
                    state.pb.collection('users').authWithOAuth2({ provider: 'google' });
                    break;
                case 'instagram':
                    state.pb.collection('users').authWithOAuth2({ provider: 'instagram' });
                    break;
                case 'signup':
                    const data = {
                        email: action.payload.email,
                        password: action.payload.password,
                        passwordConfirm: action.payload.password,
                        name: action.payload.name,
                    }
                    state.pb.collection('users').create(data)
                    break;
                default:
                    break;
            }
        }
    }
})

export const { auth } = pocketbaseReducer.actions;
export default pocketbaseReducer.reducer;
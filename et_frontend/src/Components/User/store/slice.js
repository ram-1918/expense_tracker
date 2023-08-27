// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: null,
        userName: null, 
        isLoggedIn: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.userId = action.payload;
        },
        setUserStatus: (state, action) => {
            state.isLoggedIn = action.payload;
        },
    }
})

export const {setUser, setUserStatus} = userSlice.actions;

export const selectUserId = (state) => state.user.userId;
export const selectUserName = (state) => state.user.userName;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export default userSlice.reducer;
// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: 0,
        userName: 0, 
        isLoggedIn: 0,
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

export const selectUserId = () => userId;
export const selectUserName = (state) => state.userName;
export const selectIsLoggedIn = (state) => state.isLoggedIn;

export default userSlice.reducer;
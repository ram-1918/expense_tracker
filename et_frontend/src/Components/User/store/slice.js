// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: null,
        userName: null, 
        isLoggedIn: false,
        linkStyles: 'text-blue-700 text-[0.8rem]',
        responsiveBGs: 'tablet:bg-gradient-to-r from-cyan-200 to-cyan-100 mobile:bg-gradient-to-r from-cyan-200 to-cyan-100 small:bg-gradient-to-r from-cyan-200 to-cyan-100'
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
export const selectLinkStyles = (state) => state.user.linkStyles;
export const selectResponsiveBGs = (state) => state.user.responsiveBGs;

export default userSlice.reducer;
// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        // User related
        activeUserID: localStorage.getItem('id', null) ? JSON.parse(localStorage.getItem('id')) : null,
        userRole: localStorage.getItem('role', "employee") ? localStorage.getItem('role') : "employee",

        // Style related
        linkStyles: 'text-blue-700 text-[0.8rem]',
        responsiveBGs: 'tablet:bg-gradient-to-r from-cyan-200 to-cyan-100 mobile:bg-gradient-to-r from-cyan-200 to-cyan-100 small:bg-gradient-to-r from-cyan-200 to-cyan-100'
    },
    reducers: {
        setActiveUserID: (state, action) => {
            state.activeUserID = action.payload;
        },
        setUserRole: (state, action) => {
            state.userRole = action.payload;
        },
    }
})

export const {setActiveUserID, setUserRole} = userSlice.actions;

// User export
export const selectActiveUserID = (state) => state.user.activeUserID;
export const selectUserRole = (state) => state.user.userRole;

// Style export
export const selectLinkStyles = (state) => state.user.linkStyles;
export const selectResponsiveBGs = (state) => state.user.responsiveBGs;

export default userSlice.reducer;
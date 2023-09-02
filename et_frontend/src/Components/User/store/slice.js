// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        // User related
        activeUserID: localStorage.getItem('id', null) ? JSON.parse(localStorage.getItem('id', null)): null,
        userRole: "employee",
        username: null,
        company: null,
        employeeid: null,
        
        // app related
        prevRoute: '',
        
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
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setCompany: (state, action) => {
            state.company = action.payload;
        },
        setEmployeeid: (state, action) => {
            state.employeeid = action.payload;
        },
        setPrevRoute: (state, action) => {
            state.prevRoute = action.payload;
        }
    }
})

export const {setActiveUserID, setUserRole, setUsername, setCompany, setEmployeeid, setPrevRoute} = userSlice.actions;

// User export
export const selectActiveUserID = (state) => state.user.activeUserID;
export const selectUserRole = (state) => state.user.userRole;
export const selectUsername = (state) => state.user.username;
export const selectCompany = (state) => state.user.company;
export const selectEmployeeid = (state) => state.user.employeeid;
export const selectPrevRoute = (state) => state.user.prevRoute;

// Style export
export const selectLinkStyles = (state) => state.user.linkStyles;
export const selectResponsiveBGs = (state) => state.user.responsiveBGs;

export default userSlice.reducer;
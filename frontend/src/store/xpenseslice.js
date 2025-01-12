
import { createSlice } from '@reduxjs/toolkit';

export const expenseSlice = createSlice({
    name: 'expenses',
    initialState: {
        activeSection: '1',
        totalRegiRequests: 0,
        sidenavLinkStyles: 'border-b border-neutral-400 hover:opacity-80 flex flex-row justify-center items-center hover:bg-neutral-300 w-full p-2 transition duration-300',
        responsiveBGs: 'tablet:bg-gradient-to-r from-neutral-200 to-neutral-100 mobile:bg-gradient-to-r from-neutral-200 to-neutral-100 small:bg-gradient-to-r from-neutral-200 to-neutral-100'
    },
    reducers: {
        setActiveSection: (state, action) => {
            state.activeSection = action.payload;
        },
        setTotalRegiRequests: (state, action) => {
            state.totalRegiRequests = action.payload;
        },

    }
})

export const {setActiveSection, setTotalRegiRequests} = expenseSlice.actions;

// Export selectors
export const selectActiveSection = (state) => state.expenses.activeSection;
export const selectTotalRegiRequests = (state) => state.expenses.totalRegiRequests;
export const selectSidenavLinkStyles = (state) => state.expenses.sidenavLinkStyles;
export const selectResponsiveBGs = (state) => state.expenses.responsiveBGs;

// Export the reducer
export default expenseSlice.reducer;
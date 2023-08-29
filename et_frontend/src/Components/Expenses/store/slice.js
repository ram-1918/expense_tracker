
import { createSlice } from '@reduxjs/toolkit';

export const expenseSlice = createSlice({
    name: 'expenses',
    initialState: {
        activeSection: '1',
        sidenavLinkStyles: 'border-b border-cyan-400 hover:opacity-80 hover:bg-cyan-300 w-full p-2 transition duration-300',
        responsiveBGs: 'tablet:bg-gradient-to-r from-cyan-200 to-cyan-100 mobile:bg-gradient-to-r from-cyan-200 to-cyan-100 small:bg-gradient-to-r from-cyan-200 to-cyan-100'
    },
    reducers: {
        setActiveSection: (state, action) => {
            state.activeSection = action.payload;
        },

    }
})

export const {setActiveSection} = expenseSlice.actions;

// Export selectors
export const selectActiveSection = (state) => state.expenses.activeSection;
export const selectSidenavLinkStyles = (state) => state.expenses.sidenavLinkStyles;
export const selectResponsiveBGs = (state) => state.expenses.responsiveBGs;

// Export the reducer
export default expenseSlice.reducer;
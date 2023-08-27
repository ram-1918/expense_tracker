import { createSlice } from '@reduxjs/toolkit';
// import userState from '../states/userState';
import userReducer from '../reducers/userReducer';
// import { userActions } from '../actions/userActions';
// import userTypes from '../constants/userTypes';

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
    value: 9,
  },
  userReducer
})


export const selectCount = (state) => state.user.value;

export default userSlice.reducer

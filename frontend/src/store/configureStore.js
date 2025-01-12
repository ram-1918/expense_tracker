// store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit'; // npm install @reduxjs/toolkit
import userReducer from '../features/users/usersSlice';
import expenseReducer from '../features/core/coreSlice'

const rootReducer = combineReducers({
    user: userReducer,
    expense: expenseReducer
})

export default configureStore({
    reducer: rootReducer
  });

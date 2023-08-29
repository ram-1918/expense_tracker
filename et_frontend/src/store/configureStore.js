// store.js

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../Components/User/store/slice';
import expenseReducer  from '../Components/Expenses/store/slice';

// combines all reducers and pass the rootReducers const as argument in configStore
const rootReducer = combineReducers({
    user: userReducer,
    expenses: expenseReducer
})

export default configureStore({
    reducer: rootReducer
  });

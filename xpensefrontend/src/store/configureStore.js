// store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit'; // npm install @reduxjs/toolkit
import userReducer from '../features/users/usersSlice';
// import expenseReducer  from '../Components/features/store/slice';

// combines all reducers and pass the rootReducers const as argument in configStore
const rootReducer = combineReducers({
    user: userReducer,
    // expenses: expenseReducer
})

export default configureStore({
    reducer: rootReducer
  });

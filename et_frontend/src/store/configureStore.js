// store.js

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../Components/User/store/slice';

// combines all reducers and pass the rootReducers const as argument in configStore
const rootReducer = combineReducers({
    user: userReducer
})

export default configureStore({
    reducer: rootReducer
  });

// store.js

import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../Components/User/store/slice';

// combines all reducers and pass the rootReducers const as argument in configStore
// const rootReducer = combineReducers({
//     user: userSlice
// })

export default configureStore({
    reducer: {
      user: userSlice
    }
  });

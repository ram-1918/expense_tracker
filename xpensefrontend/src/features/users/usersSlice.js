import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// export const asyncHook1 = createAsyncThunk('name/asyncFuncName', async_function); 

const initialState = {
    userid: localStorage.getItem('id', null)
}

export const userSlice = createSlice({name:'users', initialState, reducers:{}}); //  extraReducers(builder) {builder.addCase()}

export const {} = userSlice.actions; 

export const selectUserid = (state) => state.user.userid; // 'user' is the Name of the reducer, which is used in configstore


export default userSlice.reducer;
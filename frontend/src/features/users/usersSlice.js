import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchuserinfo = createAsyncThunk('users/fetchuserinfo', 
    async (userid) => {
        const response = await axios.get(`http://localhost:8002/users/user/${userid}`, {withCredentials:true});
        // console.log(response.data, response);
        return response.data;
    }
);

export const fetchsingleuserinfo = createAsyncThunk('users/fetchsingleuserinfo', 
    async (userid) => {
        const response = await axios.get(`http://localhost:8002/users/user/${userid}`, {withCredentials:true});
        // console.log(response.data, response);
        return response.data;
    }
);

const initialState = {
    userid: localStorage.getItem('id', null),
    userinfo: null,
    singleuserinfo: null,
}

export const userSlice = createSlice({
    name:'users', 
    initialState,
    reducers:{
        setUserid: (state, action) => {
            state.userid = action.payload;
        },
        setUserInfo: (state, action) => {
            state.userinfo = action.payload;
        },
        setSingleUserInfo: (state, action) => {
            state.singleuserinfo = action.payload;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchuserinfo.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.userinfo = action.payload;
        })
        .addCase(fetchsingleuserinfo.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.singleuserinfo = action.payload;
        })
    }
}); //  extraReducers(builder) {builder.addCase()}

export const {setUserid, setUserInfo, setSingleUserInfo} = userSlice.actions; 

export const selectUserid = (state) => state.user.userid; // 'user' is the Name of the reducer, which is used in configstore
export const selectUserInfo = (state) => state.user.userinfo;


export default userSlice.reducer;
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../../store/constants';


export const fetchsummaries = createAsyncThunk('expenses/fetchsummaries', 
    async () => {
        try{
            const response = await axios.get(`${API_URL}/users/user_summaries_for_dashboard`, {withCredentials: true});
            return response.data;
        } catch{
            console.log("ERROR IN FETCH SUMMARIES")
        }
    }
);

export const fetchusers = createAsyncThunk('expenses/fetchusers', 
    async (data={"filters": '', page: 1, size: 1 }) => {
        const {page, size} = data
        const response = await axios.post(`http://localhost:8002/users/listusers/?page=${page}&page_size=${size}`, data, {withCredentials:true});
        return response.data;
    }
);

export const fetchsingleuser = createAsyncThunk('expenses/fetchsingleuser', 
    async (userid) => {
        try{
            const response = await axios.post('http://localhost:8002/users/getsingleuser/', {"userid": userid}, {withCredentials: true});
            return response.data;
        }
        catch(error) {
            console.log("ERROR IN FETCHING SINGLE USER THUNK");
        }
    }
)

export const updateuserinfo = createAsyncThunk('expenses/updateuser', 
    async (enteredData) => {
        try {
            const response = await axios.put('http://localhost:8002/users/updateuser/', enteredData, {withCredentials:true});
            return response.data;
        }
        catch {
            console.log('update userinfo thunk');
        }
    }
);

export const deleteuserbyadmin = createAsyncThunk('expenses/deleteuserbyadmin', 
    async (id) => {
        try {
            const response = await axios.post('http://localhost:8002/users/deleteuserbyadmin/', {"userid": id}, {withCredentials:true});
            return response.data;
        }
        catch(errors) {
            console.log('delete userinfo thunk');
        }
    }
);

export const registrationrequestsbyadmin = createAsyncThunk('expenses/registrationrequestsbyadmin', 
    async () => {
        try {
            const response = await axios.get('http://localhost:8002/users/registrationrequests/', {withCredentials:true});
            return response.data;
        }
        catch {
            console.log('Registation requests thunk');
        }
    }
);

export const changeregistrationstatus = createAsyncThunk('expenses/changeregistrationstatus', 
    async (data) => {
        try {
            const response = await axios.post('http://localhost:8002/users/changeregistrationstatus/', data, {withCredentials:true});
            return response.data;
        }
        catch {
            console.log('Expense requests thunk');
        }
    }
);

export const expenserequestsbyadmin = createAsyncThunk('expenses/expenserequestsbyadmin', 
    async () => {
        try {
            const response = await axios.get('http://localhost:8002/expenses/list_pending/', {withCredentials:true});
            return response.data;
        }
        catch {
            console.log('Expense requests thunk');
        }
    }
);

export const changeexpensestatus = createAsyncThunk('expenses/changeexpensestatus', 
    async (data) => {
        try {
            const response = await axios.post('http://localhost:8002/expenses/changeexpensestatus/', data, {withCredentials:true});
            return response.data;
        }
        catch {
            console.log('Change reuqest status thunk');
        }
    }
);

export const listexpenses = createAsyncThunk('expenses/listexpenses', 
    async () => {
        try {
            const response = await axios.get('http://localhost:8002/expenses/list/', {withCredentials:true});
            return response.data;
        }
        catch {
            console.log('listexpenses thunk');
        }
    }
);

export const allexpenseslist = createAsyncThunk('expenses/alllistexpenses', 
    async () => {
        try {
            const response = await axios.get('http://localhost:8002/expenses/listall/', {withCredentials:true});
            return response.data;
        }
        catch {
            console.log('allexpenselist thunk');
        }
    }
);

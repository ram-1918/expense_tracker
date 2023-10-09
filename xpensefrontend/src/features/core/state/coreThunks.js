import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000'

export const fetchsummaries = createAsyncThunk('expenses/fetchsummaries', 
    async () => {
        const response = await axios.get(`${API_URL}/users/user_summaries_for_dashboard`, {withCredentials: true});
        console.log(response.data);
        return response.data
    }
);

export const fetchusers = createAsyncThunk('expenses/fetchusers', 
    async (data={"filters": '', page: 1, size: 1 }) => {
        const {page, size} = data
        const response = await axios.post(`http://localhost:8000/users/listusers/?page=${page}&page_size=${size}`, data, {withCredentials:true});
        console.log(response.data, response, "INSIDE FETCH USERS");
        return response.data;
    }
);

export const fetchsingleuser = createAsyncThunk('expenses/fetchsingleuser', 
    async (userid) => {
        try{
            const response = await axios.post('http://localhost:8000/users/getsingleuser/', {"userid": userid}, {withCredentials: true});
            console.log(response, response.data, "TESTING IN SIGNLE USER")
            return response.data;
        }
        catch(error) {
            console.log(error);
        }
    }
)

export const updateuserinfo = createAsyncThunk('expenses/updateuser', 
    async (enteredData) => {
        try {
            const response = await axios.put('http://localhost:8000/users/updateuser/', enteredData, {withCredentials:true});
            console.log(response.data);
            return response.data;
        }
        catch(errors) {
            console.log(errors, 'update thunk');
        }
    }
);

export const deleteuserbyadmin = createAsyncThunk('expenses/deleteuserbyadmin', 
    async (id) => {
        try {
            const response = await axios.post('http://localhost:8000/users/deleteuserbyadmin/', {"userid": id}, {withCredentials:true});
            console.log(response.data);
            return response.data;
        }
        catch(errors) {
            console.log(errors, 'delete thunk');
        }
    }
);

export const registrationrequestsbyadmin = createAsyncThunk('expenses/registrationrequestsbyadmin', 
    async () => {
        try {
            const response = await axios.get('http://localhost:8000/users/registrationrequests/', {withCredentials:true});
            console.log(response.data);
            return response.data;
        }
        catch(errors) {
            console.log(errors, 'requests thunk');
        }
    }
);

export const changeregistrationstatus = createAsyncThunk('expenses/changeregistrationstatus', 
    async (data) => {
        try {
            const response = await axios.post('http://localhost:8000/users/changeregistrationstatus/', data, {withCredentials:true});
            console.log(response.data);
            return response.data;
        }
        catch(errors) {
            console.log(errors, 'requests thunk');
        }
    }
);

export const expenserequestsbyadmin = createAsyncThunk('expenses/expenserequestsbyadmin', 
    async (data) => {
        try {
            const response = await axios.get('http://localhost:8000/expenses/list_pending/', {withCredentials:true});
            console.log("Expense request data", response.data);
            return response.data;
        }
        catch(errors) {
            console.log(errors, 'expense requests thunk');
        }
    }
);

export const changeexpensestatus = createAsyncThunk('expenses/changeexpensestatus', 
    async (data) => {
        try {
            const response = await axios.post('http://localhost:8000/expenses/changeexpensestatus/', data, {withCredentials:true});
            console.log(response.data);
            return response.data;
        }
        catch(errors) {
            console.log(errors, 'epxpense request change thunk');
        }
    }
);

export const listexpenses = createAsyncThunk('expenses/listexpenses', 
    async () => {
        try {
            const response = await axios.get('http://localhost:8000/expenses/list/', {withCredentials:true});
            console.log("Expense data", response.data);
            return response.data;
        }
        catch(errors) {
            console.log(errors, 'listexpenses thunk');
        }
    }
);

export const allexpenseslist = createAsyncThunk('expenses/alllistexpenses', 
    async () => {
        try {
            const response = await axios.get('http://localhost:8000/expenses/listall/', {withCredentials:true});
            console.log("all Expense data", response.data);
            return response.data;
        }
        catch(errors) {
            console.log(errors, 'alllistexpenses thunk');
        }
    }
);

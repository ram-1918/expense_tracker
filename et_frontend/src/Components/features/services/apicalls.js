import axios from 'axios';
import { API_URL } from '../../../store/constants';
import { selectActiveUserID } from '../../users/store/slice';

// axios.defaults.withCredentials = true; // enforcing withCredentials with all the requests

// Set up Axios instance with the token by setting withCredentials:true

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

// For posting an expense
function submit_expense(formdata){
    return axiosInstance.post(`${API_URL}/expenses/post/`, formdata, {
        headers: {
            'Content-Type': 'multipart/form-data', // Important for file upload
          }
    })
}

function update_status(data){
    alert(data.id)
    return axiosInstance.patch(`${API_URL}/expenses/update_status/${data.userid}`, data)
}

// For getting expenses
function get_expenses(){
    return axiosInstance.get(`${API_URL}/expenses/list/`)
}

// For getting expenses by user
function get_expenses_by_user(){
    return axiosInstance.get(`${API_URL}/expenses/list_by_user/`)
}

// For getting expenses by role
function get_expenses_by_role(){
    return axiosInstance.get(`${API_URL}/expenses/list_by_role/`)
}

function get_user_for_an_expense(expid){
    return axiosInstance.get(`${API_URL}/expenses/get_user_for_an_expense/${expid}`)
}
export {
    submit_expense,
    update_status,
    get_expenses,
    get_user_for_an_expense,
    get_expenses_by_user,
    get_expenses_by_role,
}; 
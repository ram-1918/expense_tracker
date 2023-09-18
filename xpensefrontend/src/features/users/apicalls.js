import axios from 'axios';
import { API_URL } from '../../store/constants';

// axios.defaults.withCredentials = true; // enforcing withCredentials with all the requests

// Set up Axios instance with the token by setting withCredentials:true
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

// For registering users;
function register(data){
    return axiosInstance.post(`${API_URL}users/register/`, data)
}

function login(data){
    return axiosInstance.post(`${API_URL}users/login/`, data)
}

// Updating profile information; user specific
function updateUserProfile(id, formdata){
    return axiosInstance.patch(`${API_URL}users/user/${id}`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file upload
        }})
}

function userlogout() {
    return axiosInstance.get(`${API_URL}users/logout/`)
}

export const get_user_info = (userid) => `${API_URL}users/user/${userid}`;

export {
    register,
    login,
    updateUserProfile,
    userlogout
}; 
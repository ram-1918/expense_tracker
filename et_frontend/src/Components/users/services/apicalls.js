import axios from 'axios';
import { API_URL } from '../../../store/constants';

// axios.defaults.withCredentials = true; // enforcing withCredentials with all the requests

// Set up Axios instance with the token by setting withCredentials:true
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

// For registering users;
function register(data){
    return axiosInstance.post(`${API_URL}/users/register/`, data)
}

// For logging in users; pass credentials email, password
function userlogin(data){
    return axiosInstance.post(`${API_URL}/users/login/`, data)
}

// For retrieving all users; 
function getUsers(id){
    return axiosInstance.get(`${API_URL}/users/register/?id=${id}`)
}

// For displaying registration requests; Role based
function registerRequests(role){
    return axiosInstance.get(`${API_URL}/users/approverequest/`, {params:{"role":role }})
}

// For approving or rejecting registration requests; role based; only superadmin
function changeRequestStatus(data){
    return axiosInstance.post(`${API_URL}/users/approverequest/`, data)
}

// For retreiving single user; user specific
function getUserProfile(id){
    return axiosInstance.get(`${API_URL}/users/user/${id}`)
}

// Updating profile information; user specific
function updateUserProfile(id, formdata){
    return axiosInstance.patch(`${API_URL}/users/user/${id}`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file upload
        }})
}

// For retrieving list of all companies; role based
function getCompanies(role){
    return axiosInstance.get(`${API_URL}/users/list/companies/${role}`)
}

// For retrieveing list of all users in a company
function getUsersByCompanies(role, company){
    return axiosInstance.get(`${API_URL}/users/list/${role}/${company}`)
}

function userlogout() {
    return axiosInstance.get(`${API_URL}/users/logout/`)
}

export {
    register,
    userlogin, 
    getUsers,
    registerRequests, 
    changeRequestStatus, 
    getUserProfile, 
    updateUserProfile,
    getCompanies,
    getUsersByCompanies,
    userlogout
}; 
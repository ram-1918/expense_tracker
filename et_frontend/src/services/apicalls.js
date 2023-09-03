import axios from 'axios';
import { API_URL } from '../store/constants';

// Retrieve the token from cookies
console.log(document.cookie);
// const token = document.cookie
//   .split("; ")
//   .find((row) => row.startsWith("jwt="))
//   .split("=")[1];

// Set up Axios instance with the token
const axiosInstance = axios.create({
  baseURL: API_URL,
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
});

function register(data){
    return axiosInstance.post(`${API_URL}/users/register/`, data)
}
function login(data){
    return axiosInstance.post(`${API_URL}/users/login`, data)
}
function getUsers(id){
    return axiosInstance.get(`${API_URL}/users/register/?id=${id}`)
}
function registerRequests(role){
    return axiosInstance.get(`${API_URL}/users/approverequest/`, {params:{"role":role }})
}

function changeRequestStatus(data){
    return axiosInstance.post(`${API_URL}/users/approverequest/`, data)
}

function getUserProfile(id){
    return axiosInstance.get(`${API_URL}/users/register/${id}`)
}

function updateProfile(id, formdata){
    return axiosInstance.patch(`${API_URL}/users/register/${id}`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file upload
        }})
}

function getCompanies(role){
    return axiosInstance.get(`${API_URL}/users/list/companies/${role}`)
}

function getUsersByCompanies(role, company){
    return axiosInstance.get(`${API_URL}/users/list/${role}/${company}`)
}

export {
    axiosInstance,
    register,
    login, 
    getUsers, 
    registerRequests, 
    changeRequestStatus, 
    getUserProfile, 
    updateProfile,
    getCompanies,
    getUsersByCompanies
}; 
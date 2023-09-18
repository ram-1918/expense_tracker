import axios from 'axios';
import { API_URL } from '../../store/constants';

// axios.defaults.withCredentials = true; // enforcing withCredentials with all the requests

// Set up Axios instance with the token by setting withCredentials:true
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

// export const get_user_info = (userid) => `${API_URL}users/user/${userid}`;
export const get_allusers = () => `${API_URL}users/listusers`;

export {
    
}; 
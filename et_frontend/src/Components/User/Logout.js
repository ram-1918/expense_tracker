import axios from 'axios';
import { useEffect } from 'react';
import { API_URL } from '../../store/constants';

const Logout = () => {
    useEffect(() => {
        axios.post(`${API_URL}/logout`, data)
        .then((response) => {
            console.log(response.data, response.status)
            localStorage.remove('id');
        })
        .catch((err) => {
            console.log(err);
        })
    }, [API_URL])
}

export default Logout;
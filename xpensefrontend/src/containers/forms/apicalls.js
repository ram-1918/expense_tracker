import axios from "axios";

const API_URL = 'http://localhost:8000/';

export const Updateuserinfobyadmin = async (data) => {
    let result = null;
    await axios.put(`${API_URL}users/updateuser/`, data, {withCredentials:true})
    .then((res) => {
        console.log(res.data, "UPDATE AFTER");
        result = res.data;
    })
    .catch((error) => {
        console.log(error);
        result = error.data;
    })
    return result;
}
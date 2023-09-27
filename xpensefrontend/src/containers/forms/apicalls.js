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

export const postexpense = async (data) => {
    let result = null;
    await axios.post(`${API_URL}expenses/post/`, data, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } }
    )
    .then((res) => {
        console.log(res.data, "Posted expense info");
        result = res.data;
    })
    .catch((error) => {
        console.log(error);
        result = error.data;
    })
    return result;
}
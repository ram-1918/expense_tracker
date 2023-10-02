import axios from "axios";

const API_URL = 'http://localhost:8000/';

export const updateuser = async (userid, data) => {
    let result = null;
    await axios.patch(`${API_URL}users/user/${userid}`, data, {withCredentials:true})
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

export const listsingleexpense = async (expenseid) => {
    let result = null;
    await axios.get(`${API_URL}expenses/list_single/${expenseid}`, {withCredentials:true})
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

export const updateExpense = async (expenseid, newExpense) => {
    let result = null;
    await axios.patch(`${API_URL}expenses/update/${expenseid}`, newExpense, { withCredentials: true })
    .then((res) => {
        console.log(res.data, "Updated expense info");
        result = res.data;
    })
    .catch((error) => {
        console.log(error);
        result = error.data;
    })
    return result;
}

export const updateExpenseProof = async (proofid, newProof) => {
    let result = null;
    await axios.patch(`${API_URL}expenses/update_proof/${proofid}`, newProof, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } })
    .then((res) => {
        console.log(res.data, "Updated expense info");
        result = res.data;
    })
    .catch((error) => {
        console.log(error);
        result = error.data;
    })
    return result;
}

export const updateExpenseTags = async (newTags) => {
    let result = null;
    await axios.post(`${API_URL}expenses/update_tag/`, newTags, { withCredentials: true })
    .then((res) => {
        console.log(res.data, "Updated Tag info");
        result = res.data;
    })
    .catch((error) => {
        console.log(error);
        result = error.data;
    })
    return result;
}



export const deleteExpense = async (expenseid) => {
    let result = null;
    await axios.delete(`${API_URL}expenses/delete/${expenseid}`, { withCredentials: true })
    .then((res) => {
        console.log(res.data, "Delete expense info");
        result = res.data;
    })
    .catch((error) => {
        console.log(error);
        result = error.data;
    })
    return result;
}
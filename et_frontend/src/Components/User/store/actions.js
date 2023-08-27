import {SET_USER, SET_USER_STATUS, UPDATE, DELETE} from './types';

const setUser = (data) => {
    return {
        type: SET_USER,
        payload: data
    }
}

const setUserStatus = (status) => {
    alert(status);
    return {
        type: SET_USER_STATUS,
        payload: status
    }
}

const updateUser = (data) => {
    return {
        type: UPDATE,
        payload: data
    }
}

const deleteUser = (id) => {
    return {
        type: DELETE,
        payload: id
    }
}

export {setUser, setUserStatus, updateUser, deleteUser};
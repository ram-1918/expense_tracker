// reducers.js
import { SET_USER, SET_USER_STATUS, UPDATE, DELETE } from "./types";

const initialState = {
    // userId: null,
    // userName: null,
    userInfo: null,
    isLoggedIn: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) 
    {
        case SET_USER: {
            return {
                ...state,
                userInfo: action.payload,
                // userName: action.payload.data.name
            }
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                isLoggedIn: action.payload
            }
        }
        case UPDATE: {
            return {
                ...state
            }
        }
        case DELETE: {
            return {
                ...state
            }
        }
        default:
            return state
    }
}

export default userReducer;
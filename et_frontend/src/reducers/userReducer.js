import { SET_USER, INCREMENT, DECREMENT } from "../constants/userTypes";

const initialState = {
  user: null,
  value: 0,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      console.log(action.payload)
      return {
        ...state,
        user: action.payload
      }
    }
    case INCREMENT: {
      return {
        ...state,
        value: state.value + 1
      };
    }
    case DECREMENT: {
      return {
        ...state,
        value: state.value - 1
      }
    }
    default:
      return state
  }
};

export default userReducer;
  
import { SET_USER } from '../constants/userTypes';

const setUser = (userData) => {
  alert('inside setUser')
  return {
    type: SET_USER,
    payload: userData
  }
}

const increment = () => {
    return {
      type: 'INCREMENT'
    };
  };
  
const decrement = () => {
    return {
      type: 'DECREMENT'
    };
  };
  
export {setUser, increment, decrement};
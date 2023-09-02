import { useSelector } from "react-redux";
import { selectActiveUserID } from "./Components/User/store/slice";

import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { setActiveSection } from './Components/Expenses/store/slice';

export const IsAuthenticated = () => {
    const loggedin = useSelector(selectActiveUserID);
    return loggedin ? true : false;
}

export const Userid = () => {
    const userid = useSelector(selectActiveUserID);
    return userid;
}

export const UpdateState = () => {
    const {userid, section} = useParams();
    const dispatch = useDispatch();
    dispatch(setActiveSection(section));
    return [userid, section];
}

export const isLoggedIn = () => {
    const id = localStorage.getItem('id', null)
    return id ? true : false;
}

export function containsUppercase(str) {
    return /[A-Z]/.test(str);
  }
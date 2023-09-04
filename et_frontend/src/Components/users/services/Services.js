import { useSelector } from "react-redux";
import { selectActiveUserID } from "../store/slice";

import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { setActiveSection } from '../../features/store/slice';

export const IsAuthenticated = () => {
    const userInLocalStore = localStorage.getItem('id', null);
    return userInLocalStore ? true : false;
}

export const UpdateState = () => {
    const {userid, section} = useParams();
    const dispatch = useDispatch();
    dispatch(setActiveSection(section));
    return [userid, section];
}

export function containsUppercase(str) {
    return /[A-Z]/.test(str);
  }
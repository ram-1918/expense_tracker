import { useSelector } from "react-redux";
import { selectActiveUserID } from "./Components/User/store/slice";

export const IsAuthenticated = () => {
    const loggedin = useSelector(selectActiveUserID);
    return loggedin ? true : false;
}

export const Userid = () => {
    const userid = useSelector(selectActiveUserID);
    return userid;
}
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { selectUserid } from "../features/users/usersSlice";

const PrivateRoute = () => {
    const userid = useSelector(selectUserid) || localStorage.getItem('id', null); // should be retrieved from the session storage
    console.warn("PRIVATE ROUTE!", userid);
    return userid ? <Outlet /> : <Navigate replace to='/users/login/' />;
}

export default PrivateRoute;
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectUserid } from "../features/users/usersSlice";

const PublicRoute = () => {
    console.info("PUBLIC ROUTE!");
    const userid = useSelector(selectUserid) || localStorage.getItem('id', null); // should be retrieved from the session storage
    return userid ? <Navigate replace to={`/user/${userid}/home/dashboard`} /> : <Outlet />
}

export default PublicRoute;
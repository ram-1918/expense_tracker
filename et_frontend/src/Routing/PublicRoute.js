import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectActiveUserID } from "../Components/users/store/slice";
import { IsAuthenticated } from "../services/Services"

const PublicRoute = () => {
    const auth = IsAuthenticated();
    const userid = useSelector(selectActiveUserID);
    // const location = useLocation();
    // const prevroute = localStorage.getItem('prevroute', null)
    // if(prevroute){
    //     localStorage.setItem('prevroute', location.pathname);
    // }
    const redirectRoute = userid ? `/user/${userid}/1/dashboard` : `/InvaidRequest`
    // Outlet allows user to access login page
    return (auth ? <Navigate replace to={redirectRoute} /> : <Outlet /> )
}

export default PublicRoute;
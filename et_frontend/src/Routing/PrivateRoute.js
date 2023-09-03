import { Navigate, Outlet } from "react-router-dom";
import { IsAuthenticated } from "../services/Services"

const PrivateRoute = () => {
    // const location = useLocation();
    const auth = IsAuthenticated();
    // if(!localStorage.getItem('prevroute', null)){
    //     localStorage.setItem('prevroute', location.pathname);
    // }
    return (auth ? <Outlet /> : <Navigate to='/users/login'/> )
}

export default PrivateRoute;
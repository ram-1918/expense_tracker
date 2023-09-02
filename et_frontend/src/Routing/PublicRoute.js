import { Navigate, Outlet } from "react-router-dom";
import { IsAuthenticated, Userid } from "../Services"

const PublicRoute = () => {
    const auth = IsAuthenticated();
    const userid = Userid();
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
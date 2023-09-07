import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectActiveUserID, selectUserRole } from "../Components/users/store/slice";
import { IsAuthenticated } from "../Components/users/services/Services"


const PublicRoute = () => {
    const auth = IsAuthenticated();
    const userid = useSelector(selectActiveUserID);
    const userRole = useSelector(selectUserRole);
    console.log('PUBLIC ROUTE MANAGER')
    // const location = useLocation();
    // const prevroute = localStorage.getItem('prevroute', null)
    // if(prevroute){
    //     localStorage.setItem('prevroute', location.pathname);
    // }
    const redirectRoute = userid ? `/user/${userid}/${userRole}/1/1/Dashboard` : `/InvaidRequest`
    // Outlet allows user to access login page
    return (auth ? <Navigate replace to={redirectRoute} /> : <Outlet /> )
}

export default PublicRoute;
import { Outlet, useLocation } from "react-router-dom";
import { IsAuthenticated } from "../Components/users/services/Services"

const AdminRoute = () => {
    const location = useLocation();
    const auth = IsAuthenticated();
    console.log('Admin ROUTE MANAGER', location.pathname.split('/').slice(-1))
    // if(!localStorage.getItem('prevroute', null)){
    //     localStorage.setItem('prevroute', location.pathname);
    // }
    return (auth ? <Outlet /> : <div>Unauthorized</div> )
}

// wrap each route with secure comp, inorder to display only role based stuff

export default AdminRoute;
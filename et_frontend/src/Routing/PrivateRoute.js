import { Navigate, Outlet } from "react-router-dom";
import { IsAuthenticated } from "../Services"

const PrivateRoute = () => {
    const auth = IsAuthenticated();
    return (auth ? <Outlet /> : <Navigate to='/users/login'/> )
}

export default PrivateRoute;
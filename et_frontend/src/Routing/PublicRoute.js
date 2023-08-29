import { Navigate, Outlet } from "react-router-dom";
import { IsAuthenticated, Userid } from "../Services"

const PublicRoute = () => {
    const auth = IsAuthenticated();
    const userid = Userid();
    const redirectRoute = userid ? `/user/${userid}/1/Dashboard` : `/InvaidRequest`
    // Outlet allows user to access login page
    return (auth ? <Navigate replace to={redirectRoute} /> : <Outlet /> )
}

export default PublicRoute;
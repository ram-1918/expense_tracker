import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
    const userid = useSelector((state) => state.user.userid); 
    console.log("PRIVATE ROUTE");
    return userid ? <Outlet /> : <Navigate replace to='/users/login/' />;
}

export default PrivateRoute;
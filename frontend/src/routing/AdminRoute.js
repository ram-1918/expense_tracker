import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const AdminRoute = () => {
    const userid = useSelector((state) => state.user.userid); 
    const userinfo = useSelector((state) => state.user.userinfo); 
    
    if(!userinfo){
        return <div>loading...</div>
    }

    console.log("ADMIN ROUTE");
    return (userinfo.role === 'superadmin' || userinfo.role === 'admin') ? <Outlet /> : <Outlet />; //<Navigate replace to='PageNotFound' />;
}

export default AdminRoute;
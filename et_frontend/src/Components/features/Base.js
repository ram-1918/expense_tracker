// Builtins
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { selectActiveUserID } from "../users/store/slice";

// components
import SideNav from './SideNav';

// Constants and values from redux

const Varying = () => {
    // let {userid} = useParams();
    // let navigate = useNavigate();
    // const user = useSelector(selectActiveUserID);
    // useEffect(() => {
    //     if ( userid !== user || !userid ) {
    //         navigate('/PageNotFound');
    //     }
    // }, [userid, navigate, user])
    return <Outlet />
}

function ExpenseHome(){
    
    return (
        <div className="w-full h-screen flex flex-row">
            <div className='w-[20%] br-2'>
                <SideNav />
            </div>
            <div className="w-[80%] mx-2 h-full tablet:w-full mobile:w-full small:w-full">
                <Varying />
            </div>
        </div>
    )
}

export default ExpenseHome;
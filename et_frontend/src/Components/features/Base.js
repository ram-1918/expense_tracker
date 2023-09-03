// Builtins
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { selectActiveUserID } from "../users/store/slice";

// components
import SideNav from './SideNav';

// Constants and values from redux

const Varying = () => {
    let {userid, section} = useParams();
    let navigate = useNavigate();
    const user = useSelector(selectActiveUserID);
    useEffect(() => {
        if ( userid !== user || !userid ) {
            navigate('/PageNotFound');
        }
    }, [userid, section, navigate, user])
    return <Outlet />
}

function ExpenseHome(){
    
    return (
        <div className="w-full h-screen flex flex-row">
            <div className='w-[20%]'>
                <SideNav />
            </div>
            <div className="w-[80%] h-full tablet:w-full mobile:w-full small:w-full">
                <Varying />
            </div>
        </div>
    )
}

export default ExpenseHome;
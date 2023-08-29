// Builtins
import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

// components
import SideNav from './SideNav';

// Constants and values from redux
import { Userid } from "../../Services";

const Varying = () => {
    let {userid, section} = useParams();
    let navigate = useNavigate();
    const user = Userid();
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
            <div className="w-[80%] tablet:w-full mobile:w-full small:w-full">
                <Varying />
            </div>
        </div>
    )
}

export default ExpenseHome;
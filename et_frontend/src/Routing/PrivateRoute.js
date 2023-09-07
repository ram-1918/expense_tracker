import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { IsAuthenticated } from "../Components/users/services/Services"
import { selectActiveUserID, selectUserRole } from "../Components/users/store/slice";
import PageNotFound from "../pages/PageNotFound";

const PrivateRoute = () => {
    const location = useLocation();
    const urlpath = location.pathname;
    const userRole = useSelector(selectUserRole);
    const id = useSelector(selectActiveUserID);
    let { userid, role, section, mainsection } = useParams();
    section = parseInt(section); mainsection = parseInt(mainsection);
    const adminSections = [6, 7, 8, 9];
    const sectionRouteMapper = {
        1:'Dashboard', 2:'submityourexpense', 3:'myexpenses', 4:'makearequest', 5:'expenseforecast',
        6:'viewusers', 7:'viewexpenses', 8:'registrationrequests', 9:'expenserequests',
        10:'updateprofile',
    };
    const auth = IsAuthenticated();
    console.log('PRIVATE ROUTE MANAGER', userid, role, userRole, section, mainsection, typeof section, typeof mainsection, typeof parseInt(section), adminSections.findIndex((obj) => obj === section))
    console.log(urlpath, sectionRouteMapper[section])
    // should also check for integer
    if ((section === mainsection) && (typeof section === 'number') && (role === userRole) && (userid === id) ){
        // check if the current urlpath has correct section and its name mapped
        console.log('LAEYR1')
        if (urlpath.includes(sectionRouteMapper[section])){
            console.log('LAEYR2')
            // if role is employee and is requesting for admin stuff, return unautorized; -1 refers to somthing not found
            if (role === 'employee' && adminSections.findIndex((obj) => obj === section) !== -1){
                console.log('LAEYR3')
                return <div>unautorized {role}{section}</div>
            }
            return (auth ? <Outlet /> : <Navigate to='/users/login'/> )
        }
        // return <PageNotFound />
    }
    else{
        // return <PageNotFound />
    }
}

// wrap each route with secure comp, inorder to display only role based stuff

export default PrivateRoute;
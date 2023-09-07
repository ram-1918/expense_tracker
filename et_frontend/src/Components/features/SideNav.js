import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTotalRegiRequests } from './store/slice';
import { selectActiveUserID, selectUsername, selectUserRole } from '../users/store/slice';
import { sideNavBar } from '../BaseStyles';
import { userlogout } from '../users/services/apicalls';

const SideNav = () => {
    const {section} = useParams();

    const activeUserID = useSelector(selectActiveUserID);
    const userRole = useSelector(selectUserRole);
    const username = useSelector(selectUsername);
    const totalRequests = useSelector(selectTotalRegiRequests);
    const activeStyles = sideNavBar.active;

    const logout = (event) => {
        event.preventDefault();
        console.log(activeUserID);
        userlogout()
        .then((response) => {
            console.log(response.data, response.status)
            localStorage.removeItem('id');
            localStorage.removeItem('prevroute');
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
    }


    // NEEDS OPTIMIZATION USE FORLOOP FOR BELOW NAV BUTTONS
    const commonOptions = [
        {'displayname':'Dashboard', 'path':'1/1/Dashboard'},
        {'displayname':'Submit your expense', 'path':'2/2/submityourexpense'}, // Form
        {'displayname':'My expenses', 'path':'3/3/myexpenses'}, // All submissions like leetcode
        {'displayname':'Make a request', 'path':'4/4/makearequest'}, // Request for an out-of-company expense by filling a form
        {'displayname':'Expense Forecast', 'path':'5/5/expenseforecast'}
    ]

    const adminStuff = [
        {'displayname':'Manage Users', 'path': '6/6/viewusers'},
        {'displayname':'View Expenses', 'path': '7/7/viewexpenses'},
        {'displayname':'Registration Requests', 'path':'8/8/registrationrequests'},
        {'displayname':'Expense Requests', 'path': '9/9/expenserequests'},
        // {'displayname':'All Requests', 'path':'allrequests'} // approvals, rejections and pending filters; merge registration and expense requests
    ]

    const userNavButtons = [
        {'displayname': 'Update profile', 'path': '10/10/updateprofile'},
    ]
    return (
        <div className="sticky top-0 left-0 w-full h-full text-center flex flex-col justify-between items-center  mobile:hidden small:hidden">
            <div className='w-full flex flex-col space-y-[-13px] text-left pl-8'>
                <span className='text-[1.2rem] font-light'>Siri info's</span>
                <span className='text-[1.6rem] font-light'><span className='font-semibold text-[2rem] text-purple-700'>X</span>pense<span className='font-semibold text-[2rem] text-purple-700'>T</span>racker</span>
            </div>
            <div className="w-full flex flex-col justify-center items-center">
            {
                commonOptions.map((obj, index) => {
                    return <button 
                        id={index+1} 
                        key={index+1}
                        className={`${sideNavBar.body} ${section === String(index+1) ? activeStyles : ''}`}
                        > 
                        <Link to={`/user/${activeUserID}/${userRole}/${obj.path}`}>{obj.displayname}</Link>
                    </button>
                    }
                )
            }
            {
                userRole === "admin" || userRole === 'superadmin' ? 
                // userRole === "2" || userRole === '1' ? 
                adminStuff.map((obj, index) => {
                    const idx = index + commonOptions.length + 1
                    return <button 
                        id={idx} 
                        key={idx}
                        className={`${sideNavBar.body} ${section === String(idx) ? activeStyles : ''}`}
                        > 
                        <Link to={`/user/${activeUserID}/${userRole}/${obj.path}`} className='w-full flex flex-row justify-center items-center space-x-2'>
                            <span>{obj.displayname} </span>
                            {obj.path === 'viewrequests' && totalRequests ? <span className='border border-black w-6 h-6 rounded-full flex justify-center items-center bg-neutral-100'> {totalRequests}</span> : ''} </Link>
                    </button>
                    }
                )
                : <span></span>
            }
            </div>
            <div className='w-full flex flex-col justify-between items-center'>
                <button type='disable' className={`${sideNavBar.body} border-t border-t-neutral-200`}>{username} - {userRole}</button>
            {
                userNavButtons.map((obj, index) => {
                    const idx = index + commonOptions.length + adminStuff.length + 1
                    return <button 
                        id={idx} 
                        key={idx}
                        className={`${sideNavBar.body} ${section === String(idx) ? activeStyles : ''}`}
                        > 
                        <Link to={`/user/${activeUserID}/${userRole}/${obj.path}`}>{obj.displayname}</Link>
                    </button>
                    }
                )
            }
                <button type='submit' onClick={logout} className='bg-red-800 text-white hover:opacity-80 w-full p-2'>Logout</button>
            </div>
        </div>
    )
}

export default SideNav;

// Submit an expense by a form, profile, total credit limits, list expenses, how to VALIDATE JWT on each request (expiry, tempered or not)?
// 
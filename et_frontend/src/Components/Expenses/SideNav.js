import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSidenavLinkStyles, selectTotalRegiRequests } from './store/slice';
import { selectActiveUserID, selectUsername, selectUserRole } from '../User/store/slice';
import axios from 'axios';
import { API_URL } from '../../store/constants';

const SideNav = () => {
    const {section} = useParams();

    const sidenavLinkStyles = useSelector(selectSidenavLinkStyles);
    const activeUserID = useSelector(selectActiveUserID);
    const userRole = useSelector(selectUserRole);
    const username = useSelector(selectUsername);
    const totalRequests = useSelector(selectTotalRegiRequests);
    const activeStyles = 'bg-neutral-300 hover:opacity-100';

    const logout = (event) => {
        event.preventDefault();
        console.log(activeUserID);
        axios.post(`${API_URL}/users/logout/`, {"id": activeUserID})
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
        {'displayname':'Dashboard', 'path':'Dashboard'},
        {'displayname':'Submit your expense', 'path':'submityourexpense'}, // Form
        {'displayname':'My expenses', 'path':'myexpenses'}, // All submissions like leetcode
        {'displayname':'Make a request', 'path':'makearequest'}, // Request for an out-of-company expense by filling a form
        {'displayname':'Expense Forecast', 'path':'expenseforecast'}
    ]

    const adminStuff = [
        {'displayname':'View Users', 'path': 'viewusers'},
        {'displayname':'Expense Requests', 'path': 'expenserequests'},
        {'displayname':'Registration Requests', 'path':'viewrequests'},
        {'displayname':'All Requests', 'path':'allrequests'} // approvals, rejections and pending filters; merge registration and expense requests
    ]

    const userNavButtons = [
        {'displayname': 'Update profile', 'path': 'updateprofile'},
        {'displayname': 'Credit line increase', 'path': 'creditlineincrease'},
    ]
    return (
        <div className="sticky top-0 left-0 w-full h-full text-center flex flex-col justify-between items-center bg-gradient-to-r from-neutral-100 to-neutral-200 mobile:hidden small:hidden">
            <div className='w-full flex flex-col space-y-[-13px] text-left pl-8'>
                <span className='text-[1.2rem] font-light'>Siri info's</span>
                <span className='text-[2rem] font-light'>Expense Tracker</span>
            </div>
            <div className="w-full flex flex-col justify-center items-center">
            {
                commonOptions.map((obj, index) => {
                    return <button 
                        id={index+1} 
                        key={index+1}
                        className={`${sidenavLinkStyles} ${section === String(index+1) ? activeStyles : ''}`}
                        > 
                        <Link to={`/user/${activeUserID}/${String(index+1)}/${obj.path}`}>{obj.displayname}</Link>
                    </button>
                    }
                )
            }
            {
                userRole === "admin" || userRole === 'superadmin' ? 
                adminStuff.map((obj, index) => {
                    const idx = index + commonOptions.length + 1
                    return <button 
                        id={idx} 
                        key={idx}
                        className={`${sidenavLinkStyles} ${section === String(idx) ? activeStyles : ''}`}
                        > 
                        <Link to={`/user/${activeUserID}/${String(idx)}/${obj.path}`} className='w-full flex flex-row justify-center items-center space-x-2'>
                            <span>{obj.displayname} </span>
                            {obj.path === 'viewrequests' && totalRequests ? <span className='border border-black w-6 h-6 rounded-full flex justify-center items-center bg-neutral-100'> {totalRequests}</span> : ''} </Link>
                    </button>
                    }
                )
                : <span></span>
            }
            </div>
            <div className='w-full flex flex-col justify-between items-center'>
                <button type='disable' className={`${sidenavLinkStyles} border-t border-t-neutral-200`}>{username} - {userRole}</button>
            {
                userNavButtons.map((obj, index) => {
                    const idx = index + commonOptions.length + adminStuff.length + 1
                    return <button 
                        id={idx} 
                        key={idx}
                        className={`${sidenavLinkStyles} ${section === String(idx) ? activeStyles : ''}`}
                        > 
                        <Link to={`/user/${activeUserID}/${String(idx)}/${obj.path}`}>{obj.displayname}</Link>
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
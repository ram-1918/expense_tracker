import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSidenavLinkStyles } from './store/slice';
import { selectActiveUserID, selectUserRole } from '../User/store/slice';
import axios from 'axios';
import { API_URL } from '../../store/constants';

const SideNav = () => {
    const navigate = useNavigate();
    const {section} = useParams();

    const sidenavLinkStyles = useSelector(selectSidenavLinkStyles);
    const activeUserID = useSelector(selectActiveUserID);
    const userRole = useSelector(selectUserRole);
    const activeStyles = 'bg-cyan-300 hover:opacity-100';

    const logout = (event) => {
        event.preventDefault();
        console.log(activeUserID);
        axios.post(`${API_URL}/users/logout/`, {"id": activeUserID})
        .then((response) => {
            console.log(response.data, response.status)
            localStorage.removeItem('id');
            navigate(`/user/${activeUserID}/Dashboard`);
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // NEEDS OPTIMIZATION USE FORLOOP FOR BELOW NAV BUTTONS
    const navButtons = [
        {'displayname':'Dashboard', 'path':'Dashboard'},
        {'displayname':'Submit your expense', 'path':'submityourexpense'},
        {'displayname':'View Submissions', 'path':'viewsubmissions'},
        {'displayname':'Make a request', 'path':'makearequest'},
        {'displayname':'Track request', 'path':'trackrequest'},
        {'displayname':'View Requests', 'path':'viewrequests'},
        {'displayname':'Expense Forecast', 'path':'expenseforecast'},
    ]

    const adminStuff = [
        {'displayname':'View Users', 'path': 'viewusers'},
        {'displayname':'Process Requests', 'path': 'processrequests'},
    ]

    const userNavButtons = [
        {'displayname': 'Update profile', 'path': 'updateprofile'},
        {'displayname': 'Credit line increase', 'path': 'creditlineincrease'},
    ]
    return (
        <div className="sticky top-0 left-0 w-full h-full text-center flex flex-col justify-between items-center bg-gradient-to-r from-cyan-100 to-cyan-200 shadow-3xl mobile:hidden small:hidden">
            <div className='w-full flex flex-col space-y-[-13px] text-left pl-8'>
                <span className='text-[1.2rem] font-light'>Siri info's</span>
                <span className='text-[2rem] font-light'>Expense Tracker</span>
            </div>
            <div className="w-full flex flex-col justify-center items-center">
            {
                navButtons.map((obj, index) => {
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
                userRole !== "admin" || userRole !== 'superadmin' ? 
                adminStuff.map((obj, index) => {
                    const idx = index + navButtons.length + 1
                    return <button 
                        id={idx} 
                        key={idx}
                        className={`${sidenavLinkStyles} ${section === String(idx) ? activeStyles : ''}`}
                        > 
                        <Link to={`/user/${activeUserID}/${String(idx)}/${obj.path}`}>{obj.displayname}</Link>
                    </button>
                    }
                )
                : <button>hi</button>
            }
            </div>
            <div className='w-full flex flex-col justify-between items-center'>
            {
                userNavButtons.map((obj, index) => {
                    const idx = index + navButtons.length + adminStuff.length + 1
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

                {/* <button onClick={() => {dispatch(setActiveSection('9'))}}
                className={`${sidenavLinkStyles} ${activeSection === '9' ? activeStyles : ''}`}> <Link to=''>Update profile</Link>
                </button>
                <button onClick={() => {dispatch(setActiveSection('10'))}}
                className={`${sidenavLinkStyles} ${activeSection === '10' ? activeStyles : ''}`}> <Link to=''>Credit line increase</Link>
                </button> */}
                <button type='submit' onClick={logout} className='bg-red-800 text-white hover:opacity-80 w-full p-2'>Logout</button>
            </div>
        </div>
    )
}

export default SideNav;

// Submit an expense by a form, profile, total credit limits, list expenses, how to VALIDATE JWT on each request (expiry, tempered or not)?
// 
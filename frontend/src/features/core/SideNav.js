import { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faReceipt, faChartBar, faWallet, faChartLine, faCheckCircle, faClock, faUsers, faInbox, faRegistered, faTimeline } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSideNav } from "./coreSlice";


function SideNav({showSideNav, setShowSideNav}){
    const dispatch = useDispatch();
    const { userid } = useParams();
    const navigate = useNavigate();
    const userinfo = useSelector(state => state.user.userinfo);
    const activeSideNav = useSelector(state => state.expense.activeSideNav);
    const setActive = (value) => {dispatch(setActiveSideNav(value))};
    const [role, setRole] = useState(null);

    useEffect(() => {
        if(userinfo){
            setRole(userinfo.role)
        }
    }, [userinfo])
    const dashboard = `border-b border-b-slate-400 w-full h-fit ${showSideNav ? 'text-left font-medium': 'text-center'} p-2 text-[0.9rem] hover:bg-teal-200 hover:text-black ${activeSideNav === 'dashboard' && 'bg-teal-200 text-black'}`;
    const commons = (title) => `border-b border-b-slate-400 w-full h-fit p-2 ${showSideNav ? 'text-left text-[0.9rem]': 'text-center text-[1.2rem] font-light'} ${activeSideNav === title && 'bg-teal-200 text-black'} hover:bg-teal-200 hover:text-black`;
    const sideNavTitle = `w-full ${showSideNav ? 'text-left': 'text-center'} text-slate-400 text-[0.85rem]`;
    return (
        <div className={`w-full flex-col-style justify-start space-y-8`}>
            <div className="w-full flex-col-style justify-center">
                <span onClick={() => {setShowSideNav((prev) => !prev)}} className={`w-full h-fit text-left p-2 text-[1rem] ${showSideNav ? 'text-right' : 'text-center'}`}>
                    {showSideNav ? <i className="fa fa-minus"></i> : <i className="fa fa-bars"></i>}
                </span>
                {showSideNav ? <span onClick={() => setActive('dashboard')} className={`${dashboard}`}><Link to={`/user/${userid}/home/dashboard`}><i className='fa fa-home text-[1rem]'></i> Dashboard</Link></span> : <span onClick={() => {setActive('dashboard'); setShowSideNav(true);}} className={`${dashboard}`}><Link to={`/user/${userid}/home/dashboard`}><FontAwesomeIcon icon={faHome} /></Link></span>}

            </div>
            <div className='w-full flex-col-style justify-start'>
                {/* My expenses contains Rejected ones as well */}
                {showSideNav ? <span className={`${sideNavTitle}`}>Functions</span> : <span className={`${sideNavTitle}`}></span>}
                {showSideNav ? <span className={`${commons('recent')}`}><Link to={`/user/${userid}/home/manage/expenses`}><FontAwesomeIcon icon={faTimeline} /> Recents activity</Link></span> : <span className={commons('recents')}><Link to={`/user/${userid}/home/manage/expenses`}><FontAwesomeIcon icon={faWallet} /></Link></span>}
                {showSideNav ? <span className={`${commons('myexpenses')}`}><Link to={`/user/${userid}/home/manage/expenses`}><FontAwesomeIcon icon={faWallet} /> My Expenses</Link></span> : <span className={commons('myexpenses')}><Link to={`/user/${userid}/home/manage/expenses`}><FontAwesomeIcon icon={faWallet} /></Link></span>}
                {showSideNav ? <span className={`${commons('receipts')}`}><FontAwesomeIcon icon={faReceipt} /> Reciepts</span> : <span className={commons('receipts')}><FontAwesomeIcon icon={faReceipt} /></span>}
                {showSideNav ? <span className={`${commons('reports')}`}><FontAwesomeIcon icon={faChartBar} /> Reports</span> : <span className={commons('reports')}><FontAwesomeIcon icon={faChartBar} /></span>}
                {showSideNav ? <span className={`${commons('forecasts')}`}><FontAwesomeIcon icon={faChartLine} /> Forecasts</span> : <span className={commons('forecasts')}><FontAwesomeIcon icon={faChartLine} /></span>}
            </div>
            <div className='w-full flex-col-style justify-start'>
                {/* Pending, All approvals[contains only approved ones] */}
                {showSideNav ? <span className={`${sideNavTitle}`}>Approvals</span> : <span className={`${sideNavTitle}`}></span>}
                {showSideNav ? <span onClick={() => setActive('pendingapprovals')} className={`${commons('pendingapprovals')}`}><FontAwesomeIcon icon={faClock} /> Pending Approvals</span> : <span className={commons('pendingapprovals')}><FontAwesomeIcon icon={faClock} /></span>}
                {showSideNav ? <span onClick={() => setActive('approvals')} className={`${commons('approvals')}`}><FontAwesomeIcon icon={faCheckCircle} /> All Approvals</span> : <span className={commons('approvals')}><FontAwesomeIcon icon={faCheckCircle} /></span>}
            </div>
            {((role === 'superadmin') || (role === 'admin')) && <div className='w-full flex-col-style justify-start'>
            {showSideNav ? <span className={`${sideNavTitle}`}>Admin</span> : <span className={`${sideNavTitle}`}></span>}
                {showSideNav ? <span onClick={() => setActive('manageusers')} className={`${commons('manageusers')}`}><Link to={`/user/${userid}/home/manage/users`}><FontAwesomeIcon icon={faUsers} /> Manage Users</Link></span> : <span onClick={() => setActive('manageusers')} className={commons('manageusers')}><Link to={`/user/${userid}/home/manage/users`}><FontAwesomeIcon icon={faUsers} /></Link></span>}
                {showSideNav ? <span onClick={() => setActive('allexpenses')} className={`${commons('allexpenses')}`}><Link to={`/user/${userid}/home/manage/allexpenses`}><FontAwesomeIcon icon={faWallet} /> All Expenses</Link></span> : <span onClick={() => setActive('allexpenses')} className={commons('allexpenses')}><Link to={`/user/${userid}/home/manage/allexpenses`}><FontAwesomeIcon icon={faWallet} /></Link></span>}
                {showSideNav ? <span onClick={() => setActive('expenses')} className={`${commons('expenses')}`}><FontAwesomeIcon icon={faWallet} /><Link to={`/user/${userid}/home/requests`} > Expenses by user</Link> </span> : <span onClick={() => setActive('expenses')} className={commons('expenses')}><Link to={`/user/${userid}/home/requests`} ><FontAwesomeIcon icon={faRegistered} /></Link></span>}
                {showSideNav ? <span onClick={() => setActive('exprequests')} className={`${commons('exprequests')}`}><FontAwesomeIcon icon={faInbox} /> <Link to={`/user/${userid}/home/requests/expenses`} > Expense Requests</Link> </span> : <span onClick={() => setActive('exprequests')} className={commons('exprequests')}><Link to={`/user/${userid}/home/requests/expenses`} ><FontAwesomeIcon icon={faInbox} /></Link></span>}
                {showSideNav ? <span onClick={() => setActive('regirequests')} className={`${commons('regirequests')}`}><FontAwesomeIcon icon={faRegistered} /><Link to={`/user/${userid}/home/requests/registration`} > Registration Requests</Link> </span> : <span onClick={() => setActive('regirequests')} className={commons('regirequests')}><Link to={`/user/${userid}/home/requests/registration`} ><FontAwesomeIcon icon={faRegistered} /></Link></span>}
                {/* {showSideNav ? <span className={`${commons}`}><FontAwesomeIcon icon={faRegistered} /><Link to={`/user/${userid}/home/requests`} ></Link> </span> : <span className={commons}><FontAwesomeIcon icon={faRegistered} /></span>} */}
            </div>}
        </div>
    )
}

export default SideNav;
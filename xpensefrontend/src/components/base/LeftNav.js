import { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faReceipt, faChartBar, faWallet, faChartLine, faCheckCircle, faClock, faUsers, faInbox, faRegistered } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";


function Left({showSideNav, setShowSideNav}){
    const dashboard = `border-b border-b-slate-400 w-full h-fit ${showSideNav ? 'text-left font-medium': 'text-center'} p-2 pt-4 text-[0.9rem]`;
    const commons = `border-b border-b-slate-400 w-full h-fit p-2 ${showSideNav ? 'text-left text-[0.9rem]': 'text-center text-[1.2rem] font-light'}`;
    const sideNavTitle = `w-full ${showSideNav ? 'text-left': 'text-center'} text-slate-400 text-[0.85rem]`;
    return (
        <div className={`w-full flex-col-style justify-start space-y-8`}>
            <div className="w-full flex-col-style justify-center">
                <span onClick={() => {setShowSideNav((prev) => !prev)}} className={`w-full h-fit text-left p-2 text-[1rem] ${showSideNav ? 'text-right' : 'text-center'}`}>
                    {showSideNav ? <i className="fa fa-minus"></i> : <i className="fa fa-bars"></i>}
                </span>
                {showSideNav ? <span className={`${dashboard}`}>Dashboard</span> : <span className={`${dashboard}`}><FontAwesomeIcon icon={faHome} /></span>}

            </div>
            <div className='w-full flex-col-style justify-start'>
                {/* My expenses contains Rejected ones as well */}
                {showSideNav ? <span className={`${sideNavTitle}`}>Functions</span> : <span className={`${sideNavTitle}`}></span>}
                {showSideNav ? <span className={`${commons}`}><Link to='/user/dashboard/manage/xpenses'><FontAwesomeIcon icon={faWallet} /> My Expenses</Link></span> : <span className={commons}><FontAwesomeIcon icon={faWallet} /></span>}
                {showSideNav ? <span className={`${commons}`}><FontAwesomeIcon icon={faReceipt} /> Reciepts</span> : <span className={commons}><FontAwesomeIcon icon={faReceipt} /></span>}
                {showSideNav ? <span className={`${commons}`}><FontAwesomeIcon icon={faChartBar} /> Reports</span> : <span className={commons}><FontAwesomeIcon icon={faChartBar} /></span>}
                {showSideNav ? <span className={`${commons}`}><FontAwesomeIcon icon={faChartLine} /> Forecasts</span> : <span className={commons}><FontAwesomeIcon icon={faChartLine} /></span>}
            </div>
            <div className='w-full flex-col-style justify-start'>
                {/* Pending, All approvals[contains only approved ones] */}
                {showSideNav ? <span className={`${sideNavTitle}`}>Approvals</span> : <span className={`${sideNavTitle}`}></span>}
                {showSideNav ? <span className={`${commons}`}><FontAwesomeIcon icon={faClock} /> Pending Approvals</span> : <span className={commons}><FontAwesomeIcon icon={faClock} /></span>}
                {showSideNav ? <span className={`${commons}`}><FontAwesomeIcon icon={faCheckCircle} /> All Approvals</span> : <span className={commons}><FontAwesomeIcon icon={faCheckCircle} /></span>}
            </div>
            <div className='w-full flex-col-style justify-start'>
            {showSideNav ? <span className={`${sideNavTitle}`}>Admin</span> : <span className={`${sideNavTitle}`}></span>}
                {showSideNav ? <span className={`${commons}`}><Link to='/user/dashboard/manage/users'><FontAwesomeIcon icon={faUsers} /> Manage Users</Link></span> : <span className={commons}><FontAwesomeIcon icon={faUsers} /></span>}
                {showSideNav ? <span className={`${commons}`}><FontAwesomeIcon icon={faInbox} /> Expense Requests</span> : <span className={commons}><FontAwesomeIcon icon={faInbox} /></span>}
                {showSideNav ? <span className={`${commons}`}><FontAwesomeIcon icon={faRegistered} /> Registration Requests</span> : <span className={commons}><FontAwesomeIcon icon={faRegistered} /></span>}
            </div>

        </div>
    )
}

export default Left;
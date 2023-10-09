// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s

import receipt from '../../assets/images/receipt.jpeg';
import report from '../../assets/images/generatereport.jpeg';
import invite from '../../assets/images/inviteuser.png';
import dollar from '../../assets/images/addexpense.png';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../users/usersSlice';
import ChartComponent from '../plots/ChartComponent';
import UsersVsExpenses from '../plots/UsersVsExpenses';
import ExpensePerMonth from '../plots/ExpensePerMonth';


let box_70 = 'border-0 w-full h-56 flex-col-style justify-between';
let titles = 'border-b border-neutral-300 w-full py-2 px-4 text-xl text-green-900 font-normal';
let title_3 = 'border border-slate-200 rounded-lg shadow-xl w-64 h-[70%] flex-col-style justify-center space-y-2';
let title_3_header = "text-xl font-light";
let title_3_value = "text-lg font-medium before:content-['$']";
let navButtonStyles = 'border-r border-slate-300 w-full flex-col-style justify-center text-md text-green-900 font-normal';

let cellStyle = 'border-0 p-[5px] text-left';


function Dashboard() {
    return (
          <div className="border-0 w-[97%] h-full flex-col-style justify-start space-y-4 pb-8 overflow-y-scroll">
            <span className={`${titles}`}>Dashboard</span>
            <div className='w-full h-48 mt-2 border-b-2 flex-row-style justify-around space-x-2'>
                <UsersVsExpenses />
                <ChartComponent />
                <ExpensePerMonth />
            </div>
            <DisplayTasks />
            <DisplayApprovals />
            <Summary />
            <Outlet />
          </div>
    );
  }
  
  export default Dashboard;

function DisplayTasks(){
    box_70 = 'border-0 w-full shadow-lg my-4 flex-col-style justify-around';
    const {userid} = useParams();
    return (
        <div className={`${box_70} `}>
            <span className={`${titles}`}>Quick Forms</span>
            <div className="border-0 w-full flex-row-style justify-around space-x-4 py-4">
                <Link to={`/user/${userid}/home/dashboard/submit/addexpense`} className={`${navButtonStyles}`}>
                    <span><img src={dollar} alt="newexpense" className='w-14 h-14 flex-row-syle justify-center opacity-70'></img></span>
                    <span>New Expense</span>
                </Link>
                <Link to={`/user/${userid}/home/dashboard/submit/sendinvitation`} className={`${navButtonStyles}`}>
                    <span><img src={invite} alt="invite_user" className='w-12 h-12 flex-row-syle justify-center '></img></span>
                    <span>Send Invitation</span>
                </Link>
                <Link to={`/user/${userid}/home/dashboard/submit/attachreciept`} className={`${navButtonStyles}`}>
                    <span><img src={receipt} alt="receipt" className='w-12 h-12 flex-row-syle justify-center '></img></span>
                    <span>Attach Reciept</span>
                </Link>
                <span className={`${navButtonStyles}`}> 
                    <span><img src={report} alt="report" className='w-14 h-14 flex-row-syle justify-center '></img></span>
                    <span>Generate Reports</span>
                </span>
            </div>
        </div>
    )
}


function DisplayList({obj}) {
    return (
        <tr className='border-b w-full flex-row-style justify-around even:bg-white odd:bg-gray-100'>
            <td className='border-0 flex-col-style justify-start px-2'>
                <span className={`w-64 text-md text-[#3b82f6] font-semibold`}>{obj.name}</span>
                <span className={`w-64 text-sm italic`}>Submitted by: {obj.by}</span>
            </td>
            <td className={`${cellStyle} w-44 text-md`}>{obj.date}</td>
            <td className={`${cellStyle} w-32 font-sans before:content-['$']`}>{obj.amount}</td>
            <td className={`${cellStyle} w-12 text-lg font-bold`}><i className='fa fa-comment-o'></i><sup>{obj.count}</sup></td>
            <td className={`${cellStyle} w-44 text-md text-gray-600 font-light `}>{obj.status === '3' && "Pending approval..."}</td>
        </tr>
    )
}

function DisplayApprovals(){
    box_70 = 'border w-full shadow-lg my-4 flex-col-style justify-between pb-2';
    const receipt = [
        {"name": "Expense1", "date": "September 7th, 2023", "by":"Srinivas", "status": "3", "amount": "213.00", "count": 2},
        {"name": "Expense2", "date": "August 30, 2023", "by":"Harsha", "status": "3", "amount": "43.23", "count": 0}
    ]
    return (
        <div className={`${box_70} h-64`}>
            <span className={`${titles}`}>Recent Submissions</span>
            <div className='border-0 w-full flex-row-style px-4'>
                <table className='border-0 w-full flex-col-style mx-8'>
                    <tbody className='w-full'>
                        {receipt.map((obj, idx) => <DisplayList key={idx} obj={obj} />)}
                    </tbody>
                </table>
            </div>
            <span className='border-0 w-full px-4 text-right '>View all <i className="fa fa-caret-right"></i></span>
        </div>
    )
}

// total_registration_requests, total_expense_requests, sum_of_submitted_expenses, sum_of_pending_expenses, sum_of_reembersements

function Summary(){
    const summaries = useSelector(state => state.expense.dashboard_summaries) || null
    if(!summaries) return <div>Loading...</div>
    return (
        <div className='border w-full h-56 flex-row-style justify-around space-x-8'>
            <div className={`${box_70} h-44`}>
                <span className={`${titles}`}>Summary Board</span>
                <div className='border-0 w-full h-full flex-row-style justify-center space-x-8'>
                    <div className={`${title_3}`}>
                        <span className={`${title_3_header}`}>Submitted and Approved</span>
                        <span className={`${title_3_value}`}>{summaries['sum_of_submitted_expenses'][0]} / {summaries['sum_of_submitted_expenses'][1]}</span>
                    </div>
                    <div className={`${title_3}`}>
                        <span className={`${title_3_header}`}>Submitted and Pending</span>
                        <span className={`${title_3_value}`}>{summaries['sum_of_pending_expenses'][0]} / {summaries['sum_of_pending_expenses'][1]}</span>
                    </div>
                    <div className={`${title_3}`}>
                        <span className={`${title_3_header}`}>Total reimbersements</span>
                        <span className={`${title_3_value}`}>{summaries['sum_of_reembersements'][0]} / {summaries['sum_of_reembersements'][1]}</span>
                    </div>
                </div>
            </div>
            <div className='border-0 rounded-lg shadow-lg w-72 h-full flex-col-style justify-center space-y-2'>
                <span className='border-0 flex-row-style space-x-2'>
                    <span className='text-[2rem] text-green-800 font-semibold'>{summaries['total_registration_requests']}</span>
                    <span>Registration requests</span>
                </span>
                <span className='border-0 flex-row-style space-x-2'>
                    <span className='text-[2rem] text-green-800 font-semibold'>{summaries['total_expense_requests']}</span>
                    <span>Expense requests</span>
                </span>
            </div>
        </div>
    )
}


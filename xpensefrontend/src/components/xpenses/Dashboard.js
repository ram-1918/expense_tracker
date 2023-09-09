// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s

import receipt from '../../images/receipt.jpeg';
import report from '../../images/generatereport.jpeg';
import invite from '../../images/inviteuser.png';
import dollar from '../../images/addexpense.png';


function DisplayTasks(){
    const box_70 = 'border-0 w-full shadow-lg my-4 flex-col-style justify-around';
    const titles = 'border-b border-neutral-300 w-full py-2 px-4 text-2xl text-green-900 font-normal';
    const navButtonStyles = 'border-r border-slate-300 w-full flex-col-style justify-center text-md text-green-900 font-normal';
    return (
        <div className={`${box_70} h-48`}>
            <span className={`${titles}`}>Dashboard</span>
            <div className="border-0 w-full flex-row-style justify-around space-x-4">
                <span className={`${navButtonStyles}`}>
                    {/* <span><i className="fa fa-dollar text-3xl"></i></span> */}
                    <span><img src={dollar} alt="newexpense" className='w-14 h-14 flex-row-syle justify-center '></img></span>
                    <span>New Expense</span>
                </span>
                <span className={`${navButtonStyles}`}>
                    <span><img src={invite} alt="invite_user" className='w-12 h-12 flex-row-syle justify-center '></img></span>
                    <span>Send Invitation</span>
                </span>
                <span className={`${navButtonStyles}`}>
                    <span><img src={receipt} alt="receipt" className='w-12 h-12 flex-row-syle justify-center '></img></span>
                    <span>Submit Reciept</span>
                </span>
                <span className={`${navButtonStyles}`}> 
                    <span><img src={report} alt="report" className='w-14 h-14 flex-row-syle justify-center '></img></span>
                    <span>Generate Reports</span>
                </span>
            </div>
        </div>
    )
}


function DisplayList({obj}) {
    const cellStyle = 'border-0 p-[5px] text-left';
    return (
        <tr className='border-b w-full flex-row-style justify-around even:bg-white odd:bg-gray-100'>
            <div className='border-0 flex-col-style justify-start px-2'>
                <span className={`w-64 text-md text-[#3b82f6] font-semibold`}>{obj.name}</span>
                <span className={`w-64 text-sm italic`}>Submitted by: {obj.by}</span>
            </div>
            <span className={`${cellStyle} w-44 text-md`}>{obj.date}</span>
            <span className={`${cellStyle} w-32 font-sans before:content-['$']`}>{obj.amount}</span>
            <span className={`${cellStyle} w-12 text-lg font-bold`}><i className='fa fa-comment-o'></i><sup>{obj.count}</sup></span>
            <span className={`${cellStyle} w-44 text-md text-gray-600 font-light `}>{obj.status === '3' && "Pending approval..."}</span>
        </tr>
    )
}

function DisplayApprovals(){
    const box_70 = 'border w-full shadow-lg my-4 flex-col-style justify-between pb-2';
    const titles = 'border-b border-neutral-300 w-full py-2 px-4 text-2xl text-green-900 font-normal';
    const navButtonStyles = 'border w-full flex-col-style justify-center text-xl text-green-900 font-normal';
    const receipt = [
        {"name": "Expense1", "date": "September 7th, 2023", "by":"Srinivas", "status": "3", "amount": "213.00", "count": 2},
        {"name": "Expense2", "date": "August 30, 2023", "by":"Harsha", "status": "3", "amount": "43.23", "count": 0}
    ]
    return (
        <div className={`${box_70} h-64`}>
            <span className={`${titles}`}>Recent Submissions</span>
            <div className='border-0 w-full flex-row-style px-4'>
                <table className='border-0 w-full flex-col-style mx-8'>
                    {receipt.map((obj, idx) => <DisplayList key={idx} obj={obj} />)}
                </table>
            </div>
            <span className='border-0 w-full px-4 text-right '>View all <i className="fa fa-caret-right"></i></span>
        </div>
    )
}

function Summary(){
    const box_70 = 'border-0 w-full h-56 flex-col-style justify-between';
    const titles = 'border-b border-neutral-300 w-full py-2 px-4 text-2xl text-green-900 font-normal';
    const title_3 = 'border border-slate-200 rounded-lg shadow-xl w-64 h-[70%] flex-col-style justify-center space-y-2';
    const title_3_header = "text-xl font-light"
    const title_3_value = "text-xl font-semibold before:content-['$']"
    return (
        <div className='border w-full h-56 flex-row-style justify-around space-x-8'>
            <div className={`${box_70} h-44`}>
                <span className={`${titles}`}>Expense Summary</span>
                <div className='border-0 w-full h-full flex-row-style justify-center space-x-8'>
                    <div className={`${title_3}`}>
                        <span className={`${title_3_header}`}>Submitted</span>
                        <span className={`${title_3_value}`}>5,413</span>
                    </div>
                    <div className={`${title_3}`}>
                        <span className={`${title_3_header}`}>Pending</span>
                        <span className={`${title_3_value}`}>23,402</span>
                    </div>
                    <div className={`${title_3}`}>
                        <span className={`${title_3_header}`}>Pending reimbersements</span>
                        <span className={`${title_3_value}`}>12,313</span>
                    </div>
                </div>
            </div>
            <div className='border-0 rounded-lg shadow-lg w-72 h-full flex-col-style justify-center space-y-2'>
                <span className='border-0 flex-row-style space-x-2'>
                    <span className='text-[2rem] text-green-800 font-semibold'>2</span>
                    <span>Registration requests</span>
                </span>
                <span className='border-0 flex-row-style space-x-2'>
                    <span className='text-[2rem] text-green-800 font-semibold'>5</span>
                    <span>Expense requests</span>
                </span>
            </div>
        </div>
    )
}
function Dashboard() {
    const box_70 = 'border w-full shadow-lg my-4';
    const titles = 'text-xl text-green-900 font-normal';
  return (
        <div className="border-0 w-[97%] h-full flex-col-style justify-around space-y-8 pb-8">
            <DisplayTasks />
            <DisplayApprovals />
            <Summary />
        </div>
  );
}

export default Dashboard;

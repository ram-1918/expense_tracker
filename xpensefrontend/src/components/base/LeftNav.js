function Left(){
    const commons = 'border w-full h-fit text-left p-2 text-[0.9rem]';
    const sideNavTitle = 'w-full text-left text-slate-400 text-[0.85rem]';
    return (
        <div className='border w-full flex-col-style justify-start space-y-8'>
            <span className='border w-full h-fit text-left p-2 mt-10 text-[0.9rem]'>Dashboard</span>
            <div className='border w-full flex-col-style justify-start'>
                {/* My expenses contains Rejected ones as well */}
                <span className={`${sideNavTitle}`}>Functions</span>
                <span className={`${commons}`}>My Expenses</span>
                <span className={`${commons}`}>Reciepts</span>
                <span className={`${commons}`}>Reports</span>
                <span className={`${commons}`}>Forecasts</span>
            </div>
            <div className='border w-full flex-col-style justify-start'>
                {/* Pending, All approvals[contains only approved ones] */}
                <span className={`${sideNavTitle}`}>Approvals</span>
                <span className={`${commons}`}>Pending Approvals</span>
                <span className={`${commons}`}>All Approvals</span>
            </div>
            <div className='border w-full flex-col-style justify-start'>
                <span className={`${sideNavTitle}`}>Admin</span>
                <span className={`${commons}`}>Manage Users</span>
                <span className={`${commons}`}>Expense Requests</span>
                <span className={`${commons}`}>Registration Requests</span>
            </div>

        </div>
    )
}

export default Left;
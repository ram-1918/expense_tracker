import { Outlet } from "react-router-dom";

const LeftPart = () => {
    const displayText = "Our Goal is to provide businesses with a launchpad to succeed and move further in their respective missions with smart and dynamic IT solutions. We pay great attention to details and that is what sets us apart from others. Be assured of flexible IT solutions that are finely tuned with finesse for your specific components."
    return (
        <div className="w-[40%] flex flex-col justify-center items-center bg-gradient-to-r from-cyan-200 to-cyan-100 shadow-3xl tablet:hidden mobile:hidden small:hidden">
            <div className="w-full flex flex-col px-4 space-y-[-1px]">
                <span className='text-[2.5rem] w-full font-light text-teal-600'>Siri Info's</span>
                <span className='text-[3.8rem] w-full font-normal text-teal-800'>Expense Tracker</span>
            </div>
            <p className='text-[1rem] px-4'>{displayText}</p>
        </div>
    )
}

function HomePage(){
    return (
        <div className="w-full h-screen flex flex-row">
            <LeftPart />
            <div className="w-[60%] flex justify-center items-center tablet:w-full mobile:w-full small:w-full">
                <Outlet />
            </div>
        </div>
    )
}

export default HomePage;
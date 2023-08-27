import LoginPage from "./Components/User/Login";
import { useState } from "react";
import RegisterPage from "./Components/User/Register";

function HomePage(){
    const [toggleLoginSignup, setToggleLoginSignup] = useState(false);
    const displayText = "Our Goal is to provide businesses with a launchpad to succeed and move further in their respective missions with smart and dynamic IT solutions. We pay great attention to details and that is what sets us apart from others. Be assured of flexible IT solutions that are finely tuned with finesse for your specific components."

    return (
        <div className="w-full h-screen  flex flex-row">
            <div className="w-[40%] flex flex-col justify-center items-center mobile:hidden">
                <div className="w-full flex flex-col px-4 space-y-[-1px]">
                    <span className='text-[2.5rem] w-full py-0 text-teal-600'>Siri Info's</span>
                    <span className='text-[3.8rem] w-full text-teal-800'>Expense Tracker</span>
                </div>
                <p className='text-[1rem] px-4'>{displayText}</p>
            </div>
            <div className="w-[60%] flex justify-center items-center border-l-2 mobile:w-full">
                { toggleLoginSignup ? 
                <RegisterPage setToggleLoginSignup={setToggleLoginSignup}/> : 
                <LoginPage setToggleLoginSignup={setToggleLoginSignup} /> }
            </div>
        </div>
    )
}

export default HomePage;
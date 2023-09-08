// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]

import { Outlet } from "react-router";
// import login_walpaper from '../images/xt_login_home.jpeg'
// import fallwp from '../images/fall_walpaper.webp';

function Left() {
    const displayText = "Our Goal is to provide businesses with a launchpad to succeed and move further in their respective missions with smart and dynamic IT solutions. We pay great attention to details and that is what sets us apart from others."
    return (
        <div className="border-r-0  text-white w-[40%] h-full flex-col-style justify-center">
            <div className='w-full h-full bg-login2-bg opacity-90 flex-col-style justify-center '>
                <div className="w-full flex flex-col px-4 space-y-[-1px]">
                    <span className='text-[2.5rem] w-full font-light'>Siri Info's</span>
                    <span className='text-[3.8rem] w-full font-normal '>Expense Tracker</span>
                </div>
                <p className='text-[1rem] px-4'>{displayText}</p>
            </div>
        </div>
    )
}

function Home() {
  return (
    <div className="w-screen h-screen flex-row-style justify-center">
        <Left />
        <div className="w-[60%] h-full flex-col-style justify-center">
            <Outlet />
        </div>
    </div>
  );
}

export default Home;

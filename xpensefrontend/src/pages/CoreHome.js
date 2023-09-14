// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]

import { Outlet } from "react-router";
import Topnav from '../features/core/Topnav';
import SideNav from "../features/core/SideNav";
import { useState } from "react";



function CoreHome() {
    const [showSideNav, setShowSideNav] = useState(true);
  return (
    <>
        <Topnav />
        <div className="w-full h-screen flex-row-style justify-center">
            <div onMouseOver={() => {setShowSideNav(true)}} className={`${showSideNav ? 'w-[15%]' : 'w-[4%]'} sticky  h-full flex-col-style justify-start bg-[#282c34] text-white transition-transform ease-linear duration-700`}>
                <SideNav showSideNav={showSideNav} setShowSideNav={setShowSideNav}/>
            </div>
            <div className={`${showSideNav ? 'w-[85%]' : 'w-[97%]'} h-full flex-col-style justify-center`}>
                <div className="border-0 w-full h-screen flex-row-style justify-center">
                    <Outlet />
                </div>
            </div>
        </div>
    </>
  );
}

export default CoreHome;

// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]

import { Outlet } from "react-router";
import Topnav from '../components/base/Topnav';
import Left from "../components/base/LeftNav";
import { useState } from "react";



function XHome() {
    const [showSideNav, setShowSideNav] = useState(true);
  return (
    <>
        <Topnav />
        <div className="w-full h-full flex-row-style justify-center">
            <div className={`${showSideNav ? 'w-[15%]' : 'w-[9%]'} sticky  h-screen flex-col-style justify-start bg-[#282c34] text-white`}>
                <Left showSideNav={showSideNav} setShowSideNav={setShowSideNav}/>
            </div>
            <div className={`${showSideNav ? 'w-[85%]' : 'w-[97%]'} h-screen flex-col-style justify-center`}>
                <span className="border w-full px-4">Sandwitch</span>
                <div className="border w-full h-screen flex-row-style justify-center">
                    <Outlet />
                </div>
            </div>
        </div>
    </>
  );
}

export default XHome;

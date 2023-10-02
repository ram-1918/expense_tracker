// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]

import { Outlet } from "react-router";
import Topnav from './Topnav';
import SideNav from "./SideNav";
import { useState } from "react";


const outerdiv = "w-full h-screen flex-row-style justify-center";
const inner_1 = (showSideNav) => `${showSideNav ? 'w-[15%]' : 'w-[4%]'} sticky  h-full flex-col-style justify-start bg-[#282c34] text-white transition-transform ease-linear duration-700`;
const inner_2 = (showSideNav) => ` ${showSideNav ? 'w-[85%]' : 'w-[97%]'} h-full flex-col-style justify-center flex-grow`; //
const inner_2_1 = "border-0 w-full h-screen flex-col-style justify-center";


function CoreHome() {
    const [showSideNav, setShowSideNav] = useState(true);
  return (
    <>
        <Topnav />
        <div className={outerdiv}>
            <div className={inner_1(showSideNav)}>
                <SideNav showSideNav={showSideNav} setShowSideNav={setShowSideNav}/>
            </div>
            <div className={inner_2(showSideNav)}>
                <div className={inner_2_1}>
                    <Outlet />
                </div>
            </div>
        </div>
    </>
  );
}

export default CoreHome;

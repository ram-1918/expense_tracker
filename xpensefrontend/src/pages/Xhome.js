// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]

import { Outlet } from "react-router";
import Topnav from '../components/base/Topnav';
import Left from "../components/base/LeftNav";



function XHome() {
  return (
    <>
        <Topnav />
        <div className="border w-full h-full flex-row-style justify-center">
            <div className="sticky w-[15%] h-screen flex-col-style justify-start bg-[#282c34] text-white">
                <Left />
            </div>
            <div className="border w-full h-screen flex-col-style justify-center overflow-scroll overflow-x-hidden">
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

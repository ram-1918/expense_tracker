import { useSelector } from "react-redux";
import { selectTotalRegiRequests } from "../features/store/slice";


const BaseHeader = ({text}) => {
    const totalRequests = useSelector(selectTotalRegiRequests);
    return (
        <>
            {text === "Registration Requests" ?
                <div className="w-full flex p-2 flex items-center justify-center space-x-2">
                    <span className='text-xl font-normal text-neutral-500'>{text}</span>
                    <sup className='text-[1rem] border border-neutral-400 w-6 h-6 rounded-full flex justify-center items-center'>{totalRequests}</sup>
                </div>
                :
                text === "Registration" || text === "Login" ?
                <div className="w-full flex p-2 flex items-center justify-center space-x-2">
                    <span className='text-2xl font-normal text-neutral-500'>{text}</span>
                </div>
                :
                <div className="w-full flex flex-col ml-8 space-y-[-15px]">
                    <span className='text-[1.5rem] w-full font-lighter text-teal-600'>Siri Info's</span>
                    <span className='text-[2.8rem] w-full font-light text-teal-800'>Xpense Tracker</span>
                </div>
            }
        </>

    )
}

export default BaseHeader;
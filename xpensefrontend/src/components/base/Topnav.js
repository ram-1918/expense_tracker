// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]
import defaultpic from '../../images/default.png'

const Topnav = () => {
    const optionStyle = 'border-r border-r-gray-300 w-12 h-7 flex-row-style justify-center';
    const isloggedin = true;
    return (
        <div className="sticky border-b border-b-red-200 w-full h-9 justify-between flex-row-style px-2">
            {/* Title */}
            <div className="border w-44 h-7 flex-row-style justify-center text-xl font-bold">XpenseTracker</div>
            {/* options */}
            <div className="w-[47%] flex-row-style justify-between">
                <div className='flex items-center justify-center space-x-0'>
                    <button className='border border-r-0 w-6 h-7 flex-row-style justify-center hover:opacity-60'><i className='fa fa-search'></i></button>
                    <input type="text" placeholder="search..." className='border w-72 h-7 px-2 outline-none'/>
                </div>
                <div className='flex justify-center items-center'>
                    <span className={`${optionStyle}`}><i className='fa fa-bell'></i></span>
                    <span className={`${optionStyle}`}><i className='fa fa-gear'></i></span>
                    <span className={`${optionStyle}`}><i className='fa fa-question-circle text-[1.1rem]'></i></span>
                </div>
                <span className='w-44 h-7 flex-row-style justify-center space-x-2 px-2'>
                    {
                    isloggedin ? 
                    <div className='flex-row-style justify-center space-x-0'>
                        <button className='border w-20 h-7 flex-row-style justify-center bg-white text-orange-500 hover:opacity-80' >Login</button>
                        <button className='border-0 w-20 h-7 flex-row-style justify-center bg-orange-500 text-white hover:opacity-80' >Register</button>
                    </div> :
                    <>
                        <span className=''>Username</span>
                        <img src={defaultpic} alt="profilepic" className='object-contain w-5 h-5'/> <i className='fa fa-caret-down'></i>
                    </>
                    }  
                </span>
            </div>
        </div>
    )
}

export default Topnav;

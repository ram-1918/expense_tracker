// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassDollar, faMagnifyingGlassArrowRight, faMagnifyingGlassMinus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import defaultpic from '../../images/default.png'
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../users/usersSlice';

const optionStyle = 'border-r border-r-gray-300 w-12 h-7 flex-row-style justify-center';

const Topnav = () => {
    console.info('TOPNAV');
    const userinfo = useSelector((state) => state.user.userinfo);
    if(!userinfo){
        return <div>Loading...</div>
    }
    const {fullname, image, company_id, employee_id, role} = userinfo;

    return (
        <div className="sticky border-b border-b-red-200 w-full h-10 justify-between flex-row-style shadow-lg px-2">
            {/* Title */}
            <div className="border-0 w-44 h-7 flex-row-style justify-center text-2xl text-teal-600"><span className="px-2 text-2xl text-teal-600 font-medium">XpenseTracker</span> <FontAwesomeIcon icon={faMagnifyingGlassDollar} /></div>
            {/* options */}
            <div className="w-[47%] flex-row-style justify-between">
                <div className='border border-slate-400 flex items-center justify-center space-x-0'>
                    <button className='border-r border-r-slate-400 w-6 h-7 flex-row-style justify-center bg-neutral-100 text-gray-600 hover:opacity-60'><i className='fa fa-search'></i></button>
                    <input type="text" placeholder="search..." className='border-0 w-80 h-7 px-2 outline-none '/>
                </div>
                <div className='flex justify-center items-center'>
                    <span className={`${optionStyle}`}><i className='fa fa-bell'></i></span>
                    <span className={`${optionStyle}`}><i className='fa fa-gear'></i></span>
                    <span className={`${optionStyle}`}><i className='fa fa-question-circle text-[1.1rem]'></i></span>
                </div>
                <span className='min-w-fit h-7 flex-row-style justify-center space-x-2 px-2'>
                    <span className=''>{userinfo.fullname}</span>
                    <img src={image} alt="profilepic" className='object-contain w-5 h-5'/> <i className='fa fa-caret-down'></i>
                </span>
            </div>
        </div>
    )
}

export default Topnav;

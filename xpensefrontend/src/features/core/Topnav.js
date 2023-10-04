// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassDollar, faMagnifyingGlassArrowRight, faMagnifyingGlassMinus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import defaultpic from '../../assets/images/default.png'
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../users/usersSlice';
import { API_URL } from '../../store/constants';
import { capitalize } from '../../utils/helper';

const optionStyle = 'border-r border-r-gray-300 w-12 h-7 flex-row-style justify-center';
const contentStyle = 'px-2 cursor-pointer hover:bg-gray-100';

const Topnav = () => {
    console.info('TOPNAV');
    const userinfo = useSelector((state) => state.user.userinfo);
    if(!userinfo){
        return <div>Loading...</div>
    }
    const {fullname, image, company_id, employee_id, role} = userinfo;

    return (
        <div className="sticky border-b border-b-red-200 w-full h-10 justify-between flex-row-style shadow-lg px-4">
            {/* Title */}
            <div className="border-0 w-44 h-7 flex-row-style justify-center text-2xl text-slate-600"><span className="px-4 text-2xl text-slate-600 font-medium">ExpenseTracker</span> <FontAwesomeIcon icon={faMagnifyingGlassDollar} /></div>

            {/* options */}
            <div className="w-[47%] flex-row-style justify-end">
                <div className='flex justify-center items-center'>
                    <span className={`${optionStyle}`}><i className='fa fa-bell'></i></span>
                    <span className={`${optionStyle}`}><i className='fa fa-gear'></i></span>
                    <span className={`${optionStyle}`}><i className='fa fa-question-circle text-[1.1rem]'></i></span>
                </div>
                <div className='group/profiledropdown relative'>
                    <div className='min-w-fit h-7 flex-row-style justify-center space-x-2 px-2'>
                        <span className=''>{capitalize(userinfo.fullname)}</span>
                        <img src={`${API_URL}${image}`} alt="profilepic" className='object-contain w-5 h-5'/> <i className='fa fa-caret-down'></i>
                    </div>
                    <div className='absolute right-0 z-10 w-44 shadow-lg rounded-bl rounded-br invisible grid grid-flow-row grid-cols-1 space-y-2 group-hover/profiledropdown:visible bg-white py-2'>
                        <span className={`${contentStyle}`}>Submissions({})</span>
                        <span className={`${contentStyle}`}>Approvals</span>
                        <span className={`${contentStyle}`}>Pending</span>
                        <span className={`${contentStyle}`}>rejected</span>
                        <span className={`${contentStyle}`}><i className='fa fa-edit'></i> Update Profile</span>
                        <span className={`${contentStyle}`}><i className='fa fa-sign-out'></i> Sign Out</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topnav;

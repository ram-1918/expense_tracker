// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassDollar, faMagnifyingGlassArrowRight, faMagnifyingGlassMinus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import defaultpic from '../../assets/images/default.png'
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../users/usersSlice';
import { API_URL } from '../../store/constants';
import { capitalize } from '../../utils/helper';
import axios from 'axios';
import { useEffect } from 'react';

const optionStyle = 'border-r border-r-gray-300 w-12 h-7 flex-row-style justify-center';
const contentStyle = 'p-1 text-sm cursor-pointer hover:bg-gray-200';

const Topnav = () => {
    console.info('TOPNAV');
    const handleSignout = () => {
        axios.get(`${API_URL}/users/logout/`, {withCredentials: true})
        .then((res) => {
            console.log(res.data, "LOGOUT")
            localStorage.removeItem('id');
            window.location.reload(false);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const userinfo = useSelector((state) => state.user.userinfo);
    if (!userinfo){
        return <div>Loading...</div>
    }
    const {id, image, fullname, role, employee_id} = userinfo;


    return (
        <div className="z-20 sticky shadow-lg w-full h-10 justify-between flex-row-style shadow-lg px-4">
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
                        <span className=''>{capitalize(fullname)}</span>
                        <img src={`${API_URL}${image}`} alt="profilepic" className='object-contain w-5 h-5'/> <i className='fa fa-caret-down'></i>
                    </div>
                    <div className='absolute right-0 w-44 shadow-xl rounded-bl-lg rounded-br-lg invisible grid grid-flow-row grid-cols-1 space-y-0 group-hover/profiledropdown:visible bg-white'>
                        <span className={`${contentStyle}`}>Role: <span>{capitalize(role)}</span></span>
                        <span className={`${contentStyle}`}>Emp ID: <span>{employee_id}</span></span>
                        <span className={`${contentStyle}`}>Total approvals: 3</span>
                        <span className={`${contentStyle}`}>Total pending: 4</span>
                        <span className={`${contentStyle}`}>Total rejected: 6</span>
                        <Link to={`dashboard/viewprofile/${id}`} className={`${contentStyle}`}><i className='fa fa-edit'></i> Update Profile</Link>
                        <span onClick={() => handleSignout()} className={`${contentStyle}`}><i className='fa fa-sign-out'></i> Sign Out</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topnav;

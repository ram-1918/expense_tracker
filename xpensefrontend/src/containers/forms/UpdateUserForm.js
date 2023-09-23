// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import BaseDropdown from '../../components/base/BaseDropdown';
import { fetchsingleuser, updateuserinfo } from '../../features/core/coreSlice';

const formStyles = 'border-r border-l w-full h-full flex-col-style justify-between space-y-8 overscroll-hidden';
const groupStyles = 'border-0 w-fit h-fit flex-col-style space-y-2';
const labelStyles = 'w-full text-sm font-semibold flex-row-style space-x-2';
const inputStyles = 'border border-gray-400 h-10 px-2 outline-none focus:border-gray-400 placeholder:text-sm';
const resetButtonStyles = 'border border-green-900 rounded-xl p-2 px-4 text-md font-light text-green-900 cursor-pointer hover:opacity-80';
const sendButtonStyles = 'border rounded-xl p-2 px-4 text-mg font-light bg-green-600 text-white cursor-pointer hover:opacity-80';
const selectedOptionStyle = 'w-full flex-row-style h-full justify-evenly rounded-lg cursor-pointer before:border-b-2 before:border-l-2 before:border-blue-400 before:w-4 before:h-2 before:-rotate-45';


function UpdateUserForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userid } = useParams();
    const { state } = useLocation();
    const status = useSelector(state => state.expense.status);
    const singleuser = useSelector(state => state.expense.singleuserinfo);

    const [name, setName] = useState(singleuser.fullname);
    const [email, setEmail] = useState(state.userdata.email);
    const [phone, setPhone] = useState(state.userdata.phone);
    const [role, setRole] = useState(state.userdata.role);
    const [isactive, setIsActive] = useState(state.userdata.is_active);
    const [isauthorized, setIsAuthorized] = useState(state.userdata.authorized);
    const [checkIfFull, setCheckIfFull] = useState(true);
    const [company, setCompany] = useState('Choose Company');
    const [showCompanies, setShowCompanies] = useState(false);

    const [error, setError] = useState(null);

    const dropdownOptions = ['Choose Company', 'Cloud5', 'I5Tech']
    
    function handleClose() {
        const message = checkIfFull && "Details will not be saved, Proceed?";
        if(window.confirm(message)) navigate('../');
    }

    const basefield = (label, placeholder, type, value, setFunction) => <span className={groupStyles}>
        <span className={labelStyles}><span>{label}</span></span>
        <input className={`${inputStyles} w-[28rem]`} placeholder={placeholder} type={type} value={value} onChange={(e) => setFunction(e.target.value)} />
    </span>

    const handleUpdate = () => {
        let enteredData = {
            "id": state.userdata.id,
            "fullname": name,
            "email": email,
            "role": role,
            "is_active": isactive,
            "authorized": isauthorized,
        }
        if(company === "Choose Company") {
            setError('Invalid company name');
            return
        }
        enteredData = {...enteredData, "company": company};
        console.log(enteredData, state.userdata, 'UPDAING USER')
        dispatch(updateuserinfo(enteredData));
        dispatch(fetchsingleuser(state.userdata.id));
    }
    return (
        <div className={`fixed top-0 left-0 bottom-0 w-[100%] h-full flex-col-style justify-center bg-[rgba(0,0,0,0.8)] text-sm`}>
            <div className='absolute w-[45%] h-[80%] flex-col-style justify-between bg-white rounded-lg'>
                <div className='border-0 w-full h-12 flex-row-style justify-between bg-slate-100 rounded-md'>
                    <span className='p-2 text-xl font-medium'>Update User</span>
                    <span onClick={() => {handleClose()}}
                        className='p-2 px-4 text-lg font-medium cursor-pointer transition duration-300 hover:rotate-90'><i className='fa fa-close'></i>
                    </span>
                </div>
                {/* Body */}
                {status === 'loading' && <span>Loading...</span>}
                {error && <span>{error}</span>}
                <form className={formStyles}>
                    <div className='border-0 w-full h-full flex-row-style justify-center'>
                        <div className='border-0 h-full flex-col-style justify-center space-y-4'>
                            <span className={groupStyles}>
                                <span className={labelStyles}><span>Id</span></span>
                                <input className={`${inputStyles} w-[28rem]`} type="text" value={userid} disabled />
                            </span>
                            {basefield("Name", "Change username", "text", name, setName)}
                            {basefield("Email", "Change user's email", "email", email, setEmail)}
                            {basefield("Phone", "Change user's phone number", "phone", phone, setPhone)}
                            {basefield("Role", "Change user's role", "text", role, setRole)}
                            <div className='w-full flex-row-style justify-around'>
                                <span className='flex-row-style justify-center'>
                                    <span className={labelStyles}><span>Active</span></span>
                                    <input className={`px-2`} type="checkbox" checked={isactive} onChange={() => setIsActive(prev => !prev)} />
                                </span>
                                <span className='flex-row-style justify-center'>
                                    <span className={labelStyles}><span>Authorized</span></span>
                                    <input className={`px-2`} type="checkbox" checked={isauthorized} onChange={() => setIsAuthorized(prev => !prev)} />
                                </span>
                                <BaseDropdown
                                    options={dropdownOptions}
                                    setShowFunction={setShowCompanies}
                                    show={showCompanies}
                                    setValueFunction={setCompany}
                                    value={company}
                                    selectStyle={selectedOptionStyle} />
                            </div>
                        </div>
                    </div>
                    <div className='border w-full p-4 text-right space-x-2'>
                        <button type="button" onClick={() => { dispatch(fetchsingleuser(userid)) }} className={resetButtonStyles}>Reset</button>
                        <button type="button" onClick={() => { handleUpdate() }} className={sendButtonStyles}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateUserForm;
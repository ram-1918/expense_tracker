// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import BaseDropdown from '../../components/base/BaseDropdown';
import Spinner from '../../components/base/Spinner';
import { fetchsingleuser, fetchusers, updateuserinfo } from '../../features/core/coreSlice';
import { Updateuserinfobyadmin } from './apicalls';

const formStyles = 'border-r border-l w-full h-full flex-col-style justify-between space-y-8 overscroll-hidden';
const groupStyles = 'border-0 w-fit h-fit flex-col-style space-y-2';
const labelStyles = 'w-full text-sm font-semibold flex-row-style space-x-2';
const inputStyles = 'border border-gray-400 h-10 px-2 outline-none focus:border-gray-400 placeholder:text-sm';
const resetButtonStyles = 'border border-green-900 rounded-xl p-2 px-4 text-md font-light text-green-900 cursor-pointer hover:opacity-80';
const sendButtonStyles = 'border rounded-xl p-2 px-4 text-mg font-light bg-green-600 text-white cursor-pointer hover:opacity-80';
const selectedOptionStyle = 'w-full flex-row-style h-full justify-evenly rounded-lg cursor-pointer before:border-b-2 before:border-l-2 before:border-blue-400 before:w-4 before:h-2 before:-rotate-45';

const LocalField = ({label, placeholder, type, value, setFunction, field}) => 
    { return (
        <span className={groupStyles}>
            <span className={labelStyles}><span>{label}</span></span>
            <input className={`${inputStyles} w-[28rem]`} placeholder={placeholder} type={type} value={value} onChange={(e) => setFunction(prev => ({...prev, [field]: e.target.value}))} />
        </span>
    )}


function UpdateUserForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userid } = useParams();
    const { state } = useLocation();

    const dropdownOptions = {'Cloud5': 'cloud5', 'I5Tech': 'i5tech'}
    const initial_details = {
        id: state.userdata.id, fullname: state.userdata.fullname,
        email: state.userdata.email, phone: state.userdata.phone,
        role: state.userdata.role, is_active: state.userdata.is_active,
        authorized: state.userdata.authorized, company: state.userdata.company,
    }
    const [userdetails, setUserdetails] = useState(initial_details);
    const [spinner, setSpinner] = useState(false);

    const handleUpdate = async () => {
        const enteredData = {...userdetails};
        setSpinner(true);
        try{
            const response = await Updateuserinfobyadmin(enteredData);
            console.log(response);
            setSpinner(false);
            dispatch(fetchusers());
            navigate('../');
        }
        catch{
            console.log("error occured");
            setSpinner(false);
        }
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
                {spinner && <Spinner name="Updating details" />}
                <form className={formStyles}>
                    <div className='border-0 w-full h-full flex-row-style justify-center'>
                        <div className='border-0 h-full flex-col-style justify-center space-y-4'>
                            <span className={groupStyles}>
                                <span className={labelStyles}><span>Id</span></span>
                                <input className={`${inputStyles} w-[28rem]`} type="text" value={userid} disabled />
                            </span>
                            <LocalField label="Name" placeholder="Change username" type="text" value={userdetails.fullname} setFunction={setUserdetails} field="fullname"/>
                            <LocalField label="Email" placeholder="Change user's email" type="text" value={userdetails.email} setFunction={setUserdetails} field="email" />
                            <LocalField label="Phone" placeholder="Change user's phone number" type="text" value={userdetails.phone} setFunction={setUserdetails} field="phone" />
                            <LocalField label="Role" placeholder="Change user's role" type="text" value={userdetails.role} setFunction={setUserdetails} field="role" />
                            <div className='w-full flex-row-style justify-around'>
                                <span className='w-24 flex-row-style justify-around'>
                                    <input className={`px-2`} type="checkbox" checked={userdetails.is_active} onChange={() => setUserdetails(prev => ({...prev, ['is_active']: !prev['is_active']}))} />
                                    <span className={labelStyles}>Active</span>
                                </span>
                                <span className='w-28 flex-row-style justify-around'>
                                    <input className={`px-8`} type="checkbox" checked={userdetails.authorized} onChange={() => setUserdetails(prev => !prev)} />
                                    <span className={labelStyles}>Authorized</span>
                                </span>
                                <BaseDropdown options={dropdownOptions} setValueFunction={setUserdetails} value={userdetails.company} rarecase="company" />
                            </div>
                        </div>
                    </div>
                    <div className='border w-full p-4 text-right space-x-2'>
                        <button type="button" onClick={() => { dispatch(fetchsingleuser(userid)) }} className={resetButtonStyles}>Reset</button>
                        <button type="button" onClick={ () => handleUpdate()} className={sendButtonStyles}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateUserForm;
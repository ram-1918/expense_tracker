// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s

import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router';
import BaseDropdown from '../../components/base/BaseDropdown';
import Spinner from '../../components/base/Spinner';
import { changeexpensestatus, fetchsingleuser, fetchusers, updateuserinfo } from '../../features/core/state/coreThunks';
import {setUsersList} from '../../features/core/coreSlice';
import {deleteuserbyadmin} from '../../features/core/state/coreThunks';
import { capitalize, dateformater } from '../../utils/helper';
import { deleteExpense, listsingleexpense, updateExpense, updateExpenseProof, updateExpenseTags, updateuser, Updateuserinfobyadmin } from './apicalls';
import ImageSlider from '../../components/base/ImageSlider';
import { API_URL } from '../../store/constants';

const formStyles = 'border-r border-l w-full h-full flex-col-style justify-between space-y-8 overscroll-hidden';
const groupStyles = 'border-0 w-fit h-fit flex-col-style space-y-2';
const labelStyles = 'w-full text-sm font-semibold flex-row-style space-x-2';
const inputStyles = 'border border-gray-400 h-10 px-2 outline-none focus:border-gray-400 placeholder:text-sm';
const resetButtonStyles = 'border border-green-900 rounded-xl p-2 px-4 text-md font-light text-green-900 cursor-pointer hover:opacity-80';
const sendButtonStyles = 'border rounded-xl p-2 px-4 text-mg font-light bg-green-600 text-white cursor-pointer hover:opacity-80';
const selectedOptionStyle = 'w-full flex-row-style h-full justify-evenly rounded-lg cursor-pointer before:border-b-2 before:border-l-2 before:border-blue-400 before:w-4 before:h-2 before:-rotate-45';
const fileStyles = 'border border-gray-400 w-full text-slate-400 text-sm font-medium file:cursor-pointer file:border-none file:rounded-0 file:bg-slate-200 file:px-2 file:py-[5px] file:text-slate-600 file:font-bold';

const tagstyles = 'border-2 px-[5px] rounded-md mx-2 bg-neutral-100 '

function ViewUserProfile() {
    const initialProofValues = {
        'id': '',
        'filename': '',
        'image': {},
        'expense': ''
    };
    const initialTags = {
        "id": '',
        "name": ''
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formdata = new FormData();

    const registrationrequests = useSelector(state => state.expense.registrationrequests);
    const users = useSelector(state => state.expense.userslist);
    const userinfo = useSelector(state => state.user.userinfo);

    const status = useSelector((state) => state.user.status);

    const { curruser } = useParams();
    const [user, setUser] = useState({});
    const [tags, setTags] = useState([]);
    const [image, setImage] = useState(null);
    const [spinner, setSpinner] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);
    const [newInfo, setNewInfo] = useState({});
    const [newImage, setNewImage] = useState(null);

    const [keys, setKeys] = useState([
        'fullname', 
        'gender', 
        'email', 
        'phone',
        'role', 
        'is_active',
        'authorized',
        'employee_id', 
        'company', 
        'created_at', 
    ]);

    // const [newProof, setNewProof] = useState(initialProofValues);
    // const [newTags, setNewTags] = useState(null);

    useEffect(() => {
        console.log('__--_--_-_-_-_', userinfo);
        const registrations_idx = registrationrequests.findIndex((obj) => obj.id === curruser)
        const users_idx = users.findIndex((obj) => obj.id === curruser)
        const singleuser = registrations_idx !== -1 ? registrationrequests[registrations_idx] : users_idx !== -1 ? users[users_idx] : userinfo
        if (singleuser) {
            setUser(singleuser);
            setTags([singleuser.role, singleuser.company]);
            setImage(singleuser['image']);
        }
    }, [users, registrationrequests])

    if(!user) {
        return <div>Loading...</div>
    }

    const handleUpdate = async () => {
        setSpinner(true);
        console.log(newInfo);
        const data = {
            'fullname': newInfo['fullname'],
            'phone': newInfo['phone'],
            'gender': newInfo['gender']
        }
        try {
            const result = await updateuser(curruser, data);
            const updatedUsers = users.filter((obj) => obj.id !== result.id);
            dispatch(setUsersList(updatedUsers));
            setUser(result);
            setSpinner(false);
        }
        catch(error) {
            console.log(error);
            setSpinner(false);
        }
    }

    const handleImageUpdate = async () => {
        setSpinner(true);
        console.log(newImage);
        formdata.append('image', newImage);
        try{
            const result = await updateuser(curruser, formdata);
            setImage(result);
            setNewImage(null);
            setSpinner(false);
        }
        catch(error) {
            console.log(error);
            setSpinner(false);

        }
    }

    // const handleTags = async () => {
    //     setSpinner(true);
    //     try{
    //         const result = await updateExpenseTags({"expense": expense.id, "tags": newTags});
    //         const names = [];
    //         result.map((obj) => {names.push(obj.name)})
    //         setTags(names);
    //         setNewTags([]);
    //         setSpinner(false);
    //     }
    //     catch(error) {
    //         console.log(error);
    //         setSpinner(false);

    //     }
    // }

    const handleDelete = async () => {
        setSpinner(true);
        try{
            await deleteuserbyadmin(curruser);
            const newuserlist = users.filter((obj) => obj.id !== curruser);
            dispatch(setUsersList(newuserlist));
            setSpinner(false);
            navigate('../');
        }
        catch{
            console.log("error occured");
            setSpinner(false);
        }
    }


    // function handleRequest(data){
    //     const id = expense.id;
    //     dispatch(changeexpensestatus({...data, "expense_id":id}));
    //     if (status === 'succeeded'){
    //         const result = expenserequests.filter(request => request.id !== id);
    //         dispatch(setExpenseRequests(result));
    //         navigate('../')
    //         console.log(expense);
    //     }
    //     else{
    //         alert('Action failed')
    //     }
    // }

    const keyMapper = {
        'fullname': 'Fullname', 
        'email': 'Email', 
        'role': 'Role',
        'phone': 'Phone',
        'employee_id': 'Employee Id', 
        'company': 'Company', 
        'gender': 'Gender',
        'created_at': 'Date Created', 
        'is_active': 'Is Active',
        'authorized': 'Authorized'
    }
    const statusStyleMapper = {
        'pending': 'capitalize text-blue-700 font-medium after:content-["..."]',
        'approved': 'capitalize text-green-500 font-medium',
        'rejected': 'capitalize text-red-500 font-medium',
        'invalidated': 'capitalize text-red-600 font-medium',
    }

    const afterUpdateOptions = (
        <span className='flex-row-style justify-around space-x-2'>
            <span className='cursor-pointer'onClick={() => {setUpdateMode(prev => !prev)}}>Cancel</span>
            <span onClick={() => {handleUpdate()}} className={`cursor-pointer border rounded-md px-2 bg-slate-200 hover:opacity-80 ${spinner ? 'opacity-60' : ''}`}>{spinner && <Spinner type='inline' />} Update</span>
        </span>
    )

    const beforeUpdateOptions = <span className='cursor-pointer' onClick={() => {setUpdateMode(prev => !prev)}}><i className='fa fa-edit text-blue-700'></i></span>

    const deleteButton = <span onClick={() => {handleDelete(curruser)}}><i className='fa fa-trash text-red-500'></i></span>

    // const statusDiv = <span className={statusStyleMapper[expense['status']]}>{expense['status']}</span>;

    // function handleStatusDisplay() {
    //     if(expense['userid'] === curruser){
    //         if (expense['status'] === 'pending') return <>{!updateMode ? <>{beforeUpdateOptions} {deleteButton}</> : <>{afterUpdateOptions}</>} {statusDiv} </>
    //         if (expense['status'] === 'approved') return <>{statusDiv} </>
    //         if (expense['status'] === 'rejected') return <>{!updateMode ? <> {beforeUpdateOptions} </> : <> {afterUpdateOptions} </>} {statusDiv} </>
    //         if (expense['status'] === 'invalidated') return <>{statusDiv} </>
    //     } else {
    //         if (userinfo && ((userinfo['role'] === 'superadmin') || (userinfo['role'] === 'admin'))) {
    //             return (
    //                 <>
    //                     <span onClick={() => handleRequest({status:'accept'})} className='btn-save text-sm'>Approve</span>
    //                     <span onClick={() => handleRequest({status:'reject'})} className='btn-delete text-sm'>Reject</span>
    //                 </>
    //             )
    //         }
    //     }
    // }



    return (
        <div className={`z-30 fixed top-0 left-0 bottom-0 w-[100%] h-full flex-col-style justify-start bg-[rgba(0,0,0,0.9)] text-sm`}>
            {spinner && <Spinner name="Loading expense..." />}
            <div className='z-50 w-fit h-fit shadow-lg rounded-lg flex-col-style justify-center m-2 bg-white'>
                <div className='border-b w-full flex-row-style justify-between px-2'>
                    <span className='w-fit h-fit flex-row-style justify-center space-x-2 p-0 text-md font-light'><span className='text-base font-medium '>User Profile </span> <span> {curruser} </span> </span>
                    <span className='w-fit h-full p-2 flex-row-style justify-center cursor-pointer' onClick={() => navigate('../')}><i className='fa fa-close text-lg'></i></span>
                </div>
                <div className='border w-full flex flex-row-style justify-center flex-grow px-2'>
                    <div className='border-r w-fit h-fit px-2'>
                    <img src={`${API_URL}${image}`} alt='Profile picture' className={`object-cover object-center w-full h-80 flex-shrink:0 overflow-hidden`} />
                        <div className='flex-row-style justify-around'>
                            <div className='flex-col-style justify-center'>
                                {updateMode && <input className={fileStyles} type="file" accept=".jpeg, .jpg, .png. image/*" onChange={(e) => setNewImage(e.target.files[0])} />}

                            </div>
                            {updateMode && 
                            <>
                                <span onClick={() => {handleImageUpdate()}} className='cursor-pointer border rounded-md p-2 bg-slate-200 my-8 mx-2 hover:opacity-80'>Replace proof</span>
                            </> 
                            }
                        </div>
                    </div>
                    <div className='w-fit h-full px-2 overflow-x-scroll'>
                        <table className='w-full h-full'>
                            <tbody>
                                {!updateMode && keys.map((key, idx) => (
                                <tr key={idx} className='w-full px-2'>
                                    <td className='text-base font-medium text-left'>{keyMapper[key]}</td>
                                    <td className={`text-base font-normal px-2 text-left`}>
                                        {key.includes('created_at') ? dateformater(user[key]) : 
                                        // (key.includes('fullname') && user[key]) ? capitalize(user[key]) :
                                        key.includes('is_active') ? (user['is_active'] ? 'Active' : 'Inactive') :
                                        key.includes('authorized') ? (user['authorized'] ? 'Authorized' : 'Unauthorized') :
                                        key.includes('employee_id') ? (user['employee_id'] ? user['employee_id'] : 'N/A') :
                                        key.includes('phone') ? (user['phone'] ? user['phone'] : 'N/A') :
                                        user[key] && capitalize(user[key])}
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                            {updateMode && <UpdateExpense user={user} newInfo={newInfo} setNewInfo={setNewInfo}/>}
                        </table>
                    </div>
                </div>
                <div className='border-t w-full flex-row-style justify-between p-2'>
                    <span className={`border-r ${user['authorized']  ? 'w-[70%]':'w-[65%]'} h-full flex-row-style justify-start px-2 list-none`}>
                        <span className='text-base font-medium'>TAGS: </span>
                        {tags && tags.map((obj, idx) => <li key={idx} className={tagstyles}>{obj}</li>)}
                        {/* {updateMode && <input type='text' value={newTags} onChange={(e) => setNewTags(e.target.value)} />} */}
                        {/* {updateMode && <span onClick={() => {}}>Update tags</span>} */}
                    </span>
                    {/* 
                    1. if expense_user === current_user => 
                        if status == pending => delete & update
                        if status == approved => n/a
                        if status == rejected => update
                        if status == invalidated => n/a => re-send new one
                    2. else if role === 'superadmin' or 'admin' => approve or reject => delete
                    */}
                    <span className={`${user['authorized'] ? 'flex-grow' : 'w-[35%]'} h-full flex-row-style justify-end space-x-4 px-2 font-medium text-base`}>
                        {/* {handleStatusDisplay()} */}
                        
                        
                        {/* {expense['status'] === 'pending' &&
                            <>
                                {updateMode ? afterUpdateOptions : beforeUpdateOptions}
                                {deleteButton}
                            </>
                        } */}
                        {/* <span>{expense['status']}...</span> */}

                        {!registrationrequests.length ? (updateMode ? afterUpdateOptions : beforeUpdateOptions) : ''}
                        {(users.length || registrationrequests.length) ? deleteButton : ''}

                    </span>
                </div>
            </div>
        </div>
    )
}

export default ViewUserProfile;

const commonIputstyles = 'w-full outline-none text-md px-2';

const UpdateExpense = ({user, newInfo, setNewInfo}) => {
    const initialValues = {
        fullname: user.fullname,
        gender: user.gender,
        email: user.email,
        company: user.company,
        phone: user.phone,
        employee_id: user.employee_id,
        is_active: user.is_active ,
        authorized: user.authorized,
    }
    useEffect(() => {
        setNewInfo(initialValues);
    }, [])
    const t_row = (idx, title, value) => (
        <tr key={idx} className='w-full h-8 my-8'>
            <td className='text-left'>{title}</td>
            <td><input type='text' className={`${commonIputstyles} border border-gray-300 text-left`} value={newInfo[value] || 'N/A'} onChange={(e) => setNewInfo(prev => ({...prev, [value]: e.target.value}))} /> </td>
        </tr>
    )
    const t_row_disabled = (idx, title, value) => (
        <tr key={idx} className='w-full h-8 my-8'>
            <td className='text-left'>{title}</td>
            {value !== 'password' ? 
            <td><input type='text' className={`${commonIputstyles} border border-gray-300 text-left disabled:bg-slate-100 opacity-60`} value={newInfo[value] || 'N/A'} disabled /> </td> :
            <td><input type='password' className={`${commonIputstyles} border border-gray-300 text-left disabled:bg-slate-100 opacity-60`} value='.....' disabled /> </td> }
        </tr>
    )
    const display = [
        {title: "Fullname", value: 'fullname'},
        {title: "Phone", value: 'phone'},
    ]
    const display_disabled = [
        {title: "Email", value: 'email'},
        {title: "Password", value: 'password'},
        {title: "Company", value: 'company'},
        {title: "Employee Id", value: 'employee_id'},
        {title: "Is Active", value: 'is_active'},
        {title: "Is Authorized", value: 'authorized'},
    ]

    return (
        <tbody className=' w-full h-full px-4'>
            {display.map((obj, idx) => (t_row(idx, obj.title, obj.value)))}
            <tr className='h-fit'>
                <td className='h-8 text-left'>Gender</td>
                <td className='h-8 text-left flex-row-style justify-center space-x-2'>
                    <label>Male </label> <input type='radio' value='male' checked={newInfo['gender'] === 'male'} onChange={() => setNewInfo(prev => ({...prev, ['gender']: 'male'}))} /> 
                    <label>Female </label> <input type='radio' value='female' checked={newInfo['gender'] === 'female'} onChange={() => setNewInfo(prev => ({...prev, ['gender']: 'female'}))} /> 
                </td>
            </tr>
            {display_disabled.map((obj, idx) => (t_row_disabled(idx, obj.title, obj.value)))}
        </tbody>
    )
}
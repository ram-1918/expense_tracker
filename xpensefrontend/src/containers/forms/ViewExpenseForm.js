// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s

import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router';
import BaseDropdown from '../../components/base/BaseDropdown';
import Spinner from '../../components/base/Spinner';
import { changeexpensestatus, fetchsingleuser, fetchusers, updateuserinfo } from '../../features/core/state/coreThunks';
import {setExpenseList, setExpenseRequests} from '../../features/core/coreSlice';
import { capitalize, dateformater } from '../../utils/helper';
import { deleteExpense, listsingleexpense, updateExpense, updateExpenseProof, updateExpenseTags, Updateuserinfobyadmin } from './apicalls';
import ImageSlider from '../../components/base/ImageSlider';

const formStyles = 'border-r border-l w-full h-full flex-col-style justify-between space-y-8 overscroll-hidden';
const groupStyles = 'border-0 w-fit h-fit flex-col-style space-y-2';
const labelStyles = 'w-full text-sm font-semibold flex-row-style space-x-2';
const inputStyles = 'border border-gray-400 h-10 px-2 outline-none focus:border-gray-400 placeholder:text-sm';
const resetButtonStyles = 'border border-green-900 rounded-xl p-2 px-4 text-md font-light text-green-900 cursor-pointer hover:opacity-80';
const sendButtonStyles = 'border rounded-xl p-2 px-4 text-mg font-light bg-green-600 text-white cursor-pointer hover:opacity-80';
const selectedOptionStyle = 'w-full flex-row-style h-full justify-evenly rounded-lg cursor-pointer before:border-b-2 before:border-l-2 before:border-blue-400 before:w-4 before:h-2 before:-rotate-45';
const fileStyles = 'border border-gray-400 w-full text-slate-400 text-sm font-medium file:cursor-pointer file:border-none file:rounded-0 file:bg-slate-200 file:px-2 file:py-[5px] file:text-slate-600 file:font-bold';

const tagstyles = 'border-2 px-[5px] rounded-md mx-2 bg-neutral-100 '

const Dynamics = () => {

}

function ViewExpenseForm() {
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
    const expenserequests = useSelector(state => state.expense.expenserequests);
    const expenses = useSelector(state => state.expense.expenselist);
    const status = useSelector((state) => state.expense.status);

    const { userid, expenseid } = useParams();
    const userinfo = useSelector(state => state.user.userinfo);
    const [expense, setExpense] = useState({});
    const [tags, setTags] = useState([]);
    const [images, setImages] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);
    const [newExpense, setNewExpense] = useState({});
    const [newProof, setNewProof] = useState(initialProofValues);
    const [newTags, setNewTags] = useState(null);

    useEffect(() => {
        const singleexpense = (expenserequests.length ? expenserequests : expenses ).filter((obj) => obj.id === expenseid)[0];

        console.log(singleexpense, expenses, "FROM VIEW EXPENSE FORM")
        if (singleexpense) {
            setExpense(singleexpense);
            setTags(singleexpense.expense_tag.names);
            setImages(singleexpense['expense_proof']);
        }
    }, [expenses])

    const handleUpdate = async () => {
        setSpinner(true);
        try{
            const result = await updateExpense(expense.id, newExpense);
            const filteredexpenses = expenses.filter((obj) => obj.id !== result.id);
            dispatch(setExpenseList(filteredexpenses));
            setExpense(result);
            setSpinner(false);
        }
        catch(error) {
            console.log(error);
        }
    }

    const handleProofUpdate = async () => {
        setSpinner(true);
        formdata.append('image', newProof['image']);
        try{
            const result = await updateExpenseProof(newProof.id, formdata);
            const idx2 = images.findIndex((image) => image.id === result.id);
            let newimages = [...images];
            newimages[idx2] = result;
            setImages(newimages);
            setNewProof(initialProofValues);
            setSpinner(false);
        }
        catch(error) {
            console.log(error);
            setSpinner(false);

        }
    }

    const handleTags = async () => {
        setSpinner(true);
        try{
            const result = await updateExpenseTags({"expense": expense.id, "tags": newTags});
            const names = [];
            result.map((obj) => {names.push(obj.name)})
            setTags(names);
            setNewTags([]);
            setSpinner(false);
        }
        catch(error) {
            console.log(error);
            setSpinner(false);

        }
    }

    const handleDelete = async () => {
        setSpinner(true);
        try{
            await deleteExpense(expense.id);
            const newexpenselist = expenses.filter((obj) => obj.id !== expense.id);
            dispatch(setExpenseList(newexpenselist));
            setSpinner(false);
            navigate('../');
        }
        catch{
            console.log("error occured");
            setSpinner(false);
        }
    }

    function handleRequest(data){
        const id = expense.id;
        dispatch(changeexpensestatus({...data, "expense_id":id}));
        if (status === 'succeeded'){
            const result = expenserequests.filter(request => request.id !== id);
            dispatch(setExpenseRequests(result));
            navigate('../')
            console.log(expense);
        }
        else{
            alert('Action failed')
        }
    }

    const [keys, setKeys] = useState([
        'username', 
        'payment_recepient', 
        'amount', 
        'category', 
        'description', 
        'payment_method', 
        'date_submitted', 
        'last_modified',
    ]);
    const keyMapper = {
        'username': 'Username', 
        'payment_recepient': 'Recepient', 
        'amount': 'Amount',
        'category': 'Category', 
        'description': 'Description', 
        'payment_method': 'Payment Method',
        'date_submitted': 'Date Submitted', 
        'last_modified': 'Last Updated', 
        'rejection_count': 'Rejection Count'
    }
    const statusStyleMapper = {
        'pending': 'capitalize text-blue-600 font-medium after:content-["..."]',
        'approved': 'capitalize text-green-600 font-medium',
        'rejected': 'capitalize text-red-600 font-medium',
        'invalidated': 'capitalize text-red-600 font-medium',
    }

    const afterUpdateOptions = (
        <span className='flex-row-style justify-around space-x-2'>
            <span className='cursor-pointer'onClick={() => {setUpdateMode(prev => !prev)}}>Cancel</span>
            <span onClick={() => {handleUpdate()}} className='cursor-pointer border rounded-md px-2 bg-slate-200 hover:opacity-80'>Update</span>
        </span>
    )
    const beforeUpdateOptions = <span className='cursor-pointer' onClick={() => {setUpdateMode(prev => !prev)}}><i className='fa fa-edit text-blue-700'></i></span>
    const deleteButton = <span onClick={() => {handleDelete(expense.id)}}><i className='fa fa-trash text-red-500'></i></span>
    const statusDiv = <span className={statusStyleMapper[expense['status']]}>{expense['status']}</span>;

    function handleStatusDisplay() {
        if(expense['userid'] === userid){
            if (expense['status'] === 'pending') return <>{!updateMode ? <>{beforeUpdateOptions} {deleteButton}</> : <>{afterUpdateOptions}</>} {statusDiv} </>
            if (expense['status'] === 'approved') return <>{statusDiv} </>
            if (expense['status'] === 'rejected') return <>{!updateMode ? <> {beforeUpdateOptions} </> : <> {afterUpdateOptions} </>} {statusDiv} </>
            if (expense['status'] === 'invalidated') return <>{statusDiv} </>
        } else {
            if (userinfo && ((userinfo['role'] === 'superadmin') || (userinfo['role'] === 'admin'))) {
                return (
                    <>
                        <span onClick={() => handleRequest({status:'accept'})} className='btn-save text-sm'>Approve</span>
                        <span onClick={() => handleRequest({status:'reject'})} className='btn-delete text-sm'>Reject</span>
                    </>
                )
            }
        }
    }



    return (
        <div className={`z-30 fixed top-0 left-0 bottom-0 w-[100%] h-full flex-col-style justify-start bg-[rgba(0,0,0,0.8)] text-sm`}>
            {spinner && <Spinner name="Loading expense..." />}
            <div className='w-fit h-fit shadow-lg rounded-lg flex-col-style justify-center m-2 bg-white'>
                <div className='border-b w-full flex-row-style justify-between px-2'>
                    <span className='w-fit h-fit flex-row-style justify-center p-0 text-md font-light'><span className='text-base font-medium'>Expense details</span> - {expense.id} <sup>{expense.rejection_count}</sup></span>
                    <span className='w-fit h-full p-2 flex-row-style justify-center cursor-pointer' onClick={() => navigate('../')}><i className='fa fa-close text-lg'></i></span>
                </div>
                <div className='border w-full flex flex-row-style justify-center flex-grow px-2'>
                    <div className='border-r w-fit h-fit px-2'>
                        {<ImageSlider slides={images} setNewProof={setNewProof} />}
                        <div className='flex-row-style justify-around'>
                            <div className='flex-col-style justify-center'>
                                <span className='w-full'>{updateMode && 'current: '} {newProof['filename']} ({images.findIndex((image) => image.filename === newProof['filename']) + 1}/{images.length})</span>
                                {updateMode && <input className={fileStyles} type="file" accept=".jpeg, .jpg, .png. image/*" onChange={(e) => setNewProof(prev => ({...prev, 'image': e.target.files[0]}))} />}

                            </div>
                            {updateMode && 
                            <>
                                <span onClick={() => {handleProofUpdate()}} className='cursor-pointer border rounded-md p-2 bg-slate-200 my-8 mx-2 hover:opacity-80'>Replace proof</span>
                            </> 
                            }
                        </div>
                    </div>
                    <div className='w-96 h-full px-2 overflow-x-scroll'>
                        <table className='w-full h-full bg-red-300'>
                            <tbody>
                                {!updateMode && keys.map((key, idx) => (
                                <tr key={idx} className='w-full px-2'>
                                    <td className='text-base font-medium text-left'>{keyMapper[key]}</td>
                                    <td className={`${key.includes('amount') ? 'before:content-["$"] before:font-bold' : ''} text-base font-normal px-2 text-left`}>
                                        {(key.includes('date_submitted') || key.includes('last_modified')) ? 
                                        dateformater(expense[key]) : 
                                        (key.includes('username') && expense[key]) ? capitalize(expense[key]) :
                                        expense[key]}
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                            {updateMode && <UpdateExpense expense={expense} newExpense={newExpense} setNewExpense={setNewExpense}/>}
                        </table>
                    </div>
                </div>
                <div className='border-t w-full flex-row-style justify-between p-2'>
                    <span className={`border-r ${expense['status'] === 'pending' ? 'w-[70%]':'w-[65%]'} h-full flex-row-style justify-start px-2 list-none`}>
                        <span className='text-base font-medium'>TAGS: </span>
                        {tags && tags.map((obj, idx) => <li key={idx} className={tagstyles}>{obj}</li>)}
                        {updateMode && <input type='text' value={newTags} onChange={(e) => setNewTags(e.target.value)} />}
                        {updateMode && <span onClick={() => {handleTags()}}>Update tags</span>}
                    </span>
                    {/* 
                    1. if expense_user === current_user => 
                        if status == pending => delete & update
                        if status == approved => n/a
                        if status == rejected => update
                        if status == invalidated => n/a => re-send new one
                    2. else if role === 'superadmin' or 'admin' => approve or reject => delete
                    */}
                    <span className={`${expense['status'] === 'pending' ? 'flex-grow' : 'w-[35%]'} h-full flex-row-style justify-end space-x-4 px-2 font-medium text-base`}>
                        {handleStatusDisplay()}
                        <span>APPROVE OR REJECT && JUST TO VIEW/EDIT EXPENSE</span>
                        
                        {/* {expense['status'] === 'pending' &&
                            <>
                                {updateMode ? afterUpdateOptions : beforeUpdateOptions}
                                {deleteButton}
                            </>
                        } */}
                        {/* <span>{expense['status']}...</span> */}

                    </span>
                </div>
            </div>
        </div>
    )
}

export default ViewExpenseForm;

const commonIputstyles = 'w-full outline-none text-md px-2';

const UpdateExpense = ({expense, newExpense, setNewExpense}) => {
    const initialValues = {
        username: expense.username,
        payment_recepient: expense.payment_recepient,
        amount: expense.amount,
        description: expense.description,
        payment_method: expense.payment_method,
        category: expense.category
    }
    useEffect(() => {
        setNewExpense(initialValues);
    }, [])
    const t_row = (idx, title, value) => (
        <tr key={idx} className='w-full h-8 my-8'>
            <td className='text-left'>{title}</td>
            <td><input type='text' className={`${commonIputstyles} border border-gray-300 text-left`} value={newExpense[value]} onChange={(e) => setNewExpense(prev => ({...prev, [value]: e.target.value}))} /> </td>
        </tr>
    )
    const display = [
        {title: "Recepient", value: 'payment_recepient'},
        {title: "Amount", value: 'amount'},
    ]
  const categories = { 'Entertainment':'entertainment', 'Food': 'food', 'Groceries': 'groceries', 'Travel':'travel', 'Regular': 'regular'};
  const payment_methods = {'Cash':'cash', 'Credit Card': 'credit', 'Debit Card': 'debit card', 'Cheque':'cheque'};

    return (
        <tbody className='h-full w-full px-4'>
            {display.map((obj, idx) => (t_row(idx, obj.title, obj.value)))}
            <tr className='h-fit'>
                <td className='h-10 text-left'>Description</td>
                <td className=''><textarea rows="3" value={newExpense.description} className={`border border-gray-300 ${commonIputstyles}`} onChange={(e) => setNewExpense(prev => ({...prev, ['description']: e.target.value}))}></textarea></td>
            </tr>
            <tr className='h-fit'>
                <td className='h-8 text-left'>Category</td>
                <td className=''><BaseDropdown options={categories} setValueFunction={setNewExpense} value={newExpense['category']} rarecase="category" mapper={categories} /></td>
            </tr>
            <tr className='h-fit'>
                <td className='h-8 text-left'>Payment Method</td>
                <td className=''><BaseDropdown options={payment_methods} setValueFunction={setNewExpense} value={newExpense['payment_method']} rarecase="payment_method" mapper={payment_methods} /></td>
            </tr>
        </tbody>
    )
    
}


    // 'id', 'userid', 'amount', 'status', 'message', 'category', 'currency', 'description', 'last_modified', 'date_submitted', 'payment_method', 'rejection_count', 'payment_recepient', 'username'
    // const dropdownOptions = {'Cloud5': 'cloud5', 'I5Tech': 'i5tech'}
    // const initial_details = {
    //     id: state.userdata.id, fullname: state.userdata.fullname,
    //     email: state.userdata.email, phone: state.userdata.phone,
    //     role: state.userdata.role, is_active: state.userdata.is_active,
    //     authorized: state.userdata.authorized, company: state.userdata.company,
    // }
// -----------------------
    // const getexpenseinfo = async () => {
    //     setSpinner(true);
    //     try{
    //         const data = await listsingleexpense(expenseid);
    //         setExpense(data);
    //         // const keys = Object.keys(data).filter((key) => !(key.includes('expense_tag') || key.includes('expense_proof')))
    //         setSpinner(false);
    //         setTags([...data['expense_tag']['names']]);
    //         setImages([...data['expense_proof']]);
    //         console.log(data, images, tags, "SINGLE EXPENSE INFO", '___----_-------_')
    //     }
    //     catch(error){
    //         setSpinner(false);
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     getexpenseinfo()
    // }, [])
// ------------------------
    // useEffect(() => {
    //     if (expense.expense_tag){
    //         setTags(expense['expense_tag']['names'])
    //     }
    // }, [expense.expense_tag])

    // useEffect(() => {
    //     if(Array.from(expense).length){
    //         const data = Object.entries(data).map(([key, _]) => key !== 'expense_tag' || key !== 'expense_proof')
    //         console.log(data, '_____---_----_-_-_-_-');
    //     }
    // }, [expense])
     
    // if(!Array.from(expense).length){
    //     return <Spinner name="Loading expense..." />
    // }
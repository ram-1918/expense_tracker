// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollar } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import FieldValidations from '../../components/base/FieldValidations';
import { capitalize } from '../../utils/helper';
import Popup from '../../components/base/Popup';
import BaseDropdown from '../../components/base/BaseDropdown';
import Spinner from '../../components/base/Spinner';
import { postexpense } from './apicalls';

const formStyles = 'border-r border-l w-full h-full flex-col-style justify-between space-y-4 overscroll-hidden';
const groupStyles = 'border-0 w-full h-fit flex-col-style space-y-0';
const labelStyles = 'w-full text-md font-medium';
const inputStyles = 'border border-gray-400 h-10 px-2 outline-none focus:border-gray-400 placeholder:text-sm';
const fileButtonStyles = 'border border-gray-400 w-full text-slate-400 text-sm font-medium overflow-x-scroll file:cursor-pointer file:border-none file:rounded-0 file:bg-slate-200 file:px-2 file:py-[5px] file:text-slate-600 file:font-bold';

function handleSubmit(){
    return 
}

function AddExpense({setCheckIfFull}){
    const navigate = useNavigate();
    const userid = useSelector(state => state.user.userid)
    const categories = {'Regular':'regular', 'Travel':'travel', 'Food':'food', 'Appliances':'appliances'}
    const paymentoptions = {'Cash':'cash', 'Credit Card':'credit', 'Cheque':'cheque', 'Debit Card':'debit'}
    const initialValues = {
        userid: userid, payment_recepient: '', amount: '', tags: '',
        category: 'regular', payment_method: 'credit', 
        description: '', images: []
    }
    const [data, setData] = useState(initialValues);
    const [spinner, setSpinner] = useState(false);

    const remove_image = (idx) => {
        const newlist = data['images'].filter((obj, index) => index != idx)
        setData(prev => ({...prev, ['images']: newlist}));
    }

    const post_expense = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        Object.entries(data).map(([key, value]) => key !== 'images' && formdata.append(key, value));
        data['images'].map((image, idx) => formdata.append('image'+(idx+1), image));
        // formdata.append('payment_recepient', data['payment_recepient'])
        setSpinner(true);
        try{
            const result = await postexpense(formdata);
            setSpinner(false);
            console.log(result, "POST EXPENSE");
            // navigate('../'); // Later navigate to MyExpenses page
        }
        catch(error){
            console.log(error, "ERROR while posting expense");
            setSpinner(false);
        }
    }


    // (name !== '' || amount !== ''|| tags !== '' || category !== ''|| comment !== '') ? setCheckIfFull(true) : setCheckIfFull(false);

    const LocalLabel = ({title}) => <label className={labelStyles}>{title}</label>

    return (
        <form onSubmit={(e) => {post_expense(e)}} className={formStyles}>
            {/* <Popup type='succuss' text={statusMsg} /> */}
            {spinner && <Spinner name="Submitting expense..." />}
            <div className='border w-full h-full flex-col-style justify-center'>
                <div className='space-y-4'>
                    <div className='flex-col-style'>
                        <LocalLabel title="Recepient" />
                        <input className={`${inputStyles} w-full`} placeholder="Name of the recepient" type="text" id="name" onChange={(e) => {setData(prev => ({...prev, ['payment_recepient']: e.target.value}))}} />
                    </div>
                    <div className='border-0 w-[28rem] h-fit flex-row-style justify-between space-x-4 overflow-x-hidden overflow-y-hidden'>
                        <span className={groupStyles}>
                            <LocalLabel title="Amount" />
                            <span className='flex-row-style w-full '>
                                <button type="button" className='border border-r-0 h-10 p-2 bg-gray-200'><FontAwesomeIcon icon={faDollar}/></button>
                                <input className={`${inputStyles} w-full`} placeholder="0.00" type="decimal" id="amount" onChange={(e) => {setData(prev => ({...prev, ['amount']: e.target.value}))}} />
                            </span>
                        </span>
                        <div className='flex-col-style'>
                            <LocalLabel title="Category" />
                            <BaseDropdown options={categories} setValueFunction={setData} value={data['category']} rarecase="category" />
                        </div>
                    </div>
                    <span className={`w-[28rem] ${groupStyles}`}>
                        <LocalLabel title="Description" />
                        <textarea placeholder="Short comment within just 100 charecters long" className={`border border-gray-400 w-[28rem] p-2 outline-none focus:border-gray-400 placeholder:text-sm`} rows="2" id="description" onChange={(e) => {setData(prev => ({...prev, ['description']: e.target.value}))}} ></textarea>
                    </span>
                    <span className={groupStyles}>
                        <LocalLabel title="Tags" />
                        <textarea placeholder="Enter appropriate tags (,) separated up to 5..." className={`border border-gray-400 w-[28rem] p-2 outline-none focus:border-gray-400 placeholder:text-sm`} id="tags" rows="1" onChange={(e) => {setData(prev => ({...prev, ['tags']: e.target.value}))}} />
                    </span>
                    <div className='border-0 w-[28rem] h-fit flex-row-style justify-between space-x-4 overflow-x-hidden overflow-y-hidden'>
                        <div className='flex-col-style'>
                            <LocalLabel title="Payment Method" />
                            <BaseDropdown options={paymentoptions} setValueFunction={setData} value={data['payment_method']} rarecase="payment_method" />
                        </div>
                        <span className={groupStyles}>
                            <LocalLabel title="Select Proofs" />
                            <input className={`${fileButtonStyles}`} type="file" accept=".jpeg, .jpg, .png. image/*" id="images" placeholder={data['images'].length} onChange={(e) => setData(prev => ({...prev, ['images']: [...prev['images'], ...e.target.files]}))} multiple />
                        </span>
                    </div>
                </div>
                <div className='w-[28rem] shadow-md mt-4 grid grid-flow-row grid-cols-2 gap-0 place-items-center'>
                    {data['images'].map((obj, idx) => (
                        <div key={idx} className="w-full flex-row-style justify-evenly">
                            <span className='w-32 h-fit overflow-scroll text-[0.8rem] text-red-600'>{idx+1}.{obj.name}</span>
                            <span onClick={() => {remove_image(idx)}}><i className='fa fa-close text-gray-400 cursor-pointer'></i></span>
                        </div>
                    ))}
                </div>
            </div>
            <div className='border w-full p-4 text-right space-x-2'>
                <span className='btn-reset transition duration-300'>Reset</span>
                <button type="submit" className='btn-save'>Save</button>
            </div>
        </form>
    )
}

export default AddExpense;
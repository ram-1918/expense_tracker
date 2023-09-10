// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faCross, faDollar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

function handleSubmit(){
    return 
}

function AddForm(){
    const formStyles = 'border-r border-l w-[70%] h-full flex-col-style justify-center space-y-8 overscroll-hidden';
    const groupStyles = 'border-0 w-fit h-fit flex-col-style space-y-2';
    const labelStyles = 'w-full';
    const inputStyles = 'border border-gray-300 h-10 px-2 outline-none focus:border-gray-400 placeholder:text-sm';
    const fileButtonStyles = 'border text-slate-400 text-sm font-medium overflow-x-scroll file:cursor-pointer file:border-none file:rounded-full file:bg-slate-200 file:px-2 file:py-[5px] file:text-slate-600 file:font-bold';
    const optionStyle = 'absolute  border-2 z-10 w-32 p-2';
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [tags, setTags] = useState('');
    const [category, setCategory] = useState('');
    const [comment, setComment] = useState('');
    const [images, setImages] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const categories = ['Travel', 'Food', 'Appliances', 'Others']

    return (
        <form onSubmit={handleSubmit} className={formStyles}>
            <div className='border-0 flex-row-style justify-center space-x-4'>
                <span className={groupStyles}>
                    <label className={labelStyles}>Expense Title</label>
                    <input className={`${inputStyles} w-[16.6rem]`} placeholder="Name your expense" type="text" id="name" onChange={(e) => {setName(e.target.value)}} />
                </span>
                <span className={groupStyles}>
                    <label className={labelStyles}>Amount</label>
                    <span className='flex-row-style'>
                        <button type="button" className='border border-r-0 h-10 p-2 bg-gray-200'><FontAwesomeIcon icon={faDollar}/></button>
                        <input className={`${inputStyles} w-[8.4rem]`} placeholder="0.00" type="number" id="amount" onChange={(e) => {setAmount(e.target.value)}} />
                    </span>
                </span>
            </div>
            <span className={`w-[28rem] ${groupStyles}`}>
                <label className={labelStyles}>Comment</label>
                <textarea placeholder="Short comment on the expense" className={`border border-gray-300 w-[28rem] p-2 outline-none focus:border-gray-400 placeholder:text-sm`} rows="4" id="comment" onChange={(e) => {setComment(e.target.value)}} ></textarea>
            </span>
            <span className={groupStyles}>
                <label className={labelStyles}>Tags</label>
                <textarea placeholder="Enter appropriate tags (,) separated up to 5..." className={`border border-gray-300 w-[28rem] p-2 outline-none focus:border-gray-400 placeholder:text-sm`} id="tags" rows="2" onChange={(e) => {setCategory(e.target.value)}} />
            </span>
            <div className='border-0 w-[28rem] h-fit flex-row-style justify-between space-x-4 overflow-x-hidden overflow-y-hidden'>
                <span className='relative block border-0 w-fit h-fit'>
                    <label onClick={() => {setShowOptions((prev) => !prev)}} className='border-2 py-2 w-28 rounded-lg flex-row-style justify-center space-x-2'><span>Category</span> <i className='fa fa-caret-down'></i></label>
                    {/* <input className={`${inputStyles} w-[10rem]`} id="category" onChange={(e) => {setCategory(e.target.value)}} /> */}
                    <ul className={`${showOptions ? optionStyle: 'hidden'}`}>
                        {categories.map((obj, idx) => <li key={idx} onClick={() =>{setCategory(obj)}}>{obj}</li>)}
                    </ul>
                </span>
                <span className={groupStyles}>
                    <label className={labelStyles}>Select Proofs</label>
                    <input className={`${fileButtonStyles}`} type="file" accept=".jpeg, .jpg, .png. image/*" id="images" onChange={(e) => {setImages(e.target.files)}} multiple />
                </span>
            </div>
        </form>
    )
}


function AddExpense() {
    const navigate = useNavigate();
    const [close, setClose] = useState(true);
  return (
        <div className={`fixed top-0 left-0 bottom-0 w-[100%] h-full  ${close ? 'flex-col-style justify-center' : 'hidden' } bg-[rgba(0,0,0,0.8)]`}>
            <div className='absolute w-[80%] h-[80%] flex-col-style justify-between bg-white rounded-lg '>
                <div className='border-0 w-full h-12 flex-row-style justify-between bg-slate-100 rounded-md '>
                    <span className='p-2 text-xl font-medium'>Add your Expense</span>
                    <span onClick={() => {navigate('/user/dashboard/home')}} className='p-2 px-4 text-lg font-medium cursor-pointer transition duration-300 hover:rotate-90'><i className='fa fa-close'></i></span>
                </div>
                <AddForm />
                <div className='border w-full p-4 text-right space-x-2'>
                    <span className='border border-green-900 rounded-xl p-2 px-4 text-lg font-light text-green-900 cursor-pointer hover:opacity-80'>Reset</span>
                    <span className='border rounded-xl p-2 px-4 text-lg font-light bg-green-600 text-white cursor-pointer hover:opacity-80'>Save</span>
                </div>
            </div>
        </div>
  );
}

export default AddExpense;

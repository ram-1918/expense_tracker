// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import FieldValidations from '../../components/base/FieldValidations';

function handleSubmit(){
    return 
}

function AddExpense({setCheckIfFull}){
    const formStyles = 'border-r border-l w-full h-full flex-col-style justify-between space-y-4 overscroll-hidden';
    const groupStyles = 'border-0 w-fit h-fit flex-col-style space-y-2';
    const labelStyles = 'w-full text-lg font-semibold';
    const inputStyles = 'border border-gray-400 h-10 px-2 outline-none focus:border-gray-400 placeholder:text-sm';
    const fileButtonStyles = 'border text-slate-400 text-sm font-medium overflow-x-scroll file:cursor-pointer file:border-none file:rounded-full file:bg-slate-100 file:px-2 file:py-[5px] file:text-slate-600 file:font-bold';
    const optionStyle = 'absolute  border-2 z-10 w-32 p-2';
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [tags, setTags] = useState('');
    const [category, setCategory] = useState('');
    const [comment, setComment] = useState('');
    const [images, setImages] = useState([]);
    const [showOptions, setShowOptions] = useState(false);

    if (name !== '' || amount !== ''|| tags !== '' || category !== ''|| comment !== ''){
        setCheckIfFull(true);
    }
    else{
        setCheckIfFull(false);
    }
    const categories = ['Travel', 'Food', 'Appliances', 'Others']

    return (
        <form onSubmit={handleSubmit} className={formStyles}>
            <div className='border w-full h-full flex-row-style justify-center'>
                <div className='space-y-4'>
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
                        <textarea placeholder="Short comment on the expense" className={`border border-gray-400 w-[28rem] p-2 outline-none focus:border-gray-400 placeholder:text-sm`} rows="4" id="comment" onChange={(e) => {setComment(e.target.value)}} ></textarea>
                    </span>
                    <span className={groupStyles}>
                        <label className={labelStyles}>Tags</label>
                        <textarea placeholder="Enter appropriate tags (,) separated up to 5..." className={`border border-gray-500 w-[28rem] p-2 outline-none focus:border-gray-400 placeholder:text-sm`} id="tags" rows="2" onChange={(e) => {setTags(e.target.value)}} />
                    </span>
                    <div className='border-0 w-[28rem] h-fit flex-row-style justify-between space-x-4 overflow-x-hidden overflow-y-hidden'>
                        <span className='relative block border-0 w-fit h-fit'>
                            <label onClick={() => {setShowOptions((prev) => !prev)}} className='border border-gray-400 py-2 w-28 rounded-lg flex-row-style justify-center space-x-2'><span>Category</span> <i className='fa fa-caret-down'></i></label>
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
                </div>
                <FieldValidations setexpensetitle={setName} setAmount={setAmount} setTags={setTags} />
            </div>
            <div className='border w-full p-4 text-right space-x-2'>
                <span className='border border-green-900 rounded-xl p-2 px-4 text-lg font-light text-green-900 cursor-pointer hover:opacity-80'>Reset</span>
                <span className='border rounded-xl p-2 px-4 text-lg font-light bg-green-600 text-white cursor-pointer hover:opacity-80'>Save</span>
            </div>
        </form>
    )
}

export default AddExpense;
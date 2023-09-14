// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import FieldValidations from '../../components/base/FieldValidations';

const formStyles = 'border-r border-l w-full h-full flex-col-style justify-between space-y-8 overscroll-hidden';
const groupStyles = 'border-0 w-fit h-fit flex-col-style space-y-2';
const labelStyles = 'w-full text-lg font-semibold flex-row-style space-x-2';
const inputStyles = 'border border-gray-400 h-10 px-2 outline-none focus:border-gray-400 placeholder:text-sm';
const mark = 'border border-gray-500 rounded-full w-4 h-4 flex-row-style justify-center text-sm px-2 cursor-pointer hover:scale-[1.03]';
const resetButtonStyles = 'border border-green-900 rounded-xl p-2 px-4 text-lg font-light text-green-900 cursor-pointer hover:opacity-80';
const sendButtonStyles = 'border rounded-xl p-2 px-4 text-lg font-light bg-green-600 text-white cursor-pointer hover:opacity-80';

function handleSubmit(){
    return 
}

function SendInvitation(){
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [comment, setComment] = useState('');
    const [showOptions, setShowOptions] = useState(false);

    const categories = ['Travel', 'Food', 'Appliances', 'Others'];
      
    return (
        <form onSubmit={handleSubmit} className={formStyles}>
            <div className='border-0 w-full h-full flex-row-style justify-center'>
                <div className='border-0 h-full flex-col-style justify-center space-y-4'>
                    <span className={groupStyles}>
                        <span className={labelStyles}><span>Name</span> <span className={mark}>?</span></span>
                        <input className={`${inputStyles} w-[28rem]`} placeholder="Name your expense" type="text" id="name" onChange={(e) => {setName(e.target.value)}} />
                    </span>
                    <span className={groupStyles}>
                        <label className={labelStyles}><span>Email</span> <span className={mark}>?</span></label>
                        <input className={`${inputStyles} w-[28rem]`} placeholder="email@example.com" type="email" id="email" onChange={(e) => {setEmail(e.target.value)}} />
                    </span>
                    <span className={groupStyles}>
                        <label className={labelStyles}>Role</label>
                        <input placeholder="Role of the invitee" className={`border border-gray-400 w-[28rem] p-2 outline-none focus:border-gray-400 placeholder:text-sm`} id="role" onChange={(e) => {setRole(e.target.value)}} />
                    </span>
                    <span className={`w-[28rem] ${groupStyles}`}>
                        <label className={labelStyles}>Comment</label>
                        <textarea placeholder="Write a shote note to the invitee" className={`border border-gray-400 w-[28rem] p-2 outline-none focus:border-gray-400 placeholder:text-sm`} rows="4" id="comment" onChange={(e) => {setComment(e.target.value)}} ></textarea>
                    </span>
                </div>
                <FieldValidations setName={setName} setEmail={setEmail}/>
            </div>
            <div className='border w-full p-4 text-right space-x-2'>
                <button className={resetButtonStyles}>Reset</button>
                <button className={sendButtonStyles}>Send</button>
            </div>
        </form>
    )
}

export default SendInvitation;
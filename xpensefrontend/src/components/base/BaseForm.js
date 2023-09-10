// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import AddExpenseForm from '../xpenses/AddExpenseForm';
import AttachReciept from '../xpenses/AttachReciept';
import SendInvitationForm from '../xpenses/SendInvitationForm';


function BaseForm() {
    const navigate = useNavigate();
    const { formtype } = useParams();
    const [close, setClose] = useState(true);
    const [checkIfFull, setCheckIfFull] = useState(true);
  return (
        <div className={`fixed top-0 left-0 bottom-0 w-[100%] h-full  ${close ? 'flex-col-style justify-center' : 'hidden' } bg-[rgba(0,0,0,0.8)]`}>
            <div className='absolute w-[65%] h-[85%] flex-col-style justify-between bg-white rounded-lg '>
                <div className='border-0 w-full h-12 flex-row-style justify-between bg-slate-100 rounded-md '>
                    {formtype === 'addexpense' && <span className='p-2 text-xl font-medium'>Add your Expense</span>}
                    {formtype === 'sendinvitation' && <span className='p-2 text-xl font-medium'>Send Invitation</span>}
                    {formtype === 'attachreciept' && <span className='p-2 text-xl font-medium'>Attach New Reciept</span>}
                    <span onClick={() => {checkIfFull ? alert('Details will not be saved?') : alert("Can proceed"); navigate('/user/dashboard/home')}} className='p-2 px-4 text-lg font-medium cursor-pointer transition duration-300 hover:rotate-90'><i className='fa fa-close'></i></span>
                </div>
                
                {formtype === 'addexpense' && <AddExpenseForm setcheckiffull={setCheckIfFull}/>}
                {formtype === 'sendinvitation' && <SendInvitationForm setcheckiffull={setCheckIfFull}/>}
                {formtype === 'attachreciept' && <AttachReciept setcheckiffull={setCheckIfFull}/>}

                {/* <div className='border w-full p-4 text-right space-x-2'>
                    <span className='border border-green-900 rounded-xl p-2 px-4 text-lg font-light text-green-900 cursor-pointer hover:opacity-80'>Reset</span>
                    <span className='border rounded-xl p-2 px-4 text-lg font-light bg-green-600 text-white cursor-pointer hover:opacity-80'>Save</span>
                </div> */}
            </div>
        </div>
  );
}

export default BaseForm;

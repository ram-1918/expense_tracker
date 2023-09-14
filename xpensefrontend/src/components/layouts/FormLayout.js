// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import AddExpense from '../../features/forms/AddExpense';
import AttachReciept from '../../features/forms/AttachReciept';
import SendInvitation from '../../features/forms/SendInvitation';


function FormLayout() {
    const navigate = useNavigate();
    const { formtype } = useParams();
    const [checkIfFull, setCheckIfFull] = useState(true);

    function handleClose(){
        if (checkIfFull){
            alert("Details will not be saved, Proceed?");
            navigate('/user/home/dashboard/');
        }
        else{
            // proceed ot cancel
            navigate('/user/home/dashboard/');
        }
    }

  return (
        <div className={`fixed top-0 left-0 bottom-0 w-[100%] h-full flex-col-style justify-center bg-[rgba(0,0,0,0.8)]`}>
            <div className='absolute w-[65%] h-[85%] flex-col-style justify-between bg-white rounded-lg'>
                <div className='border-0 w-full h-12 flex-row-style justify-between bg-slate-100 rounded-md'>
                    {formtype === 'addexpense' && <span className='p-2 text-xl font-medium'>Add your Expense</span>}
                    {formtype === 'sendinvitation' && <span className='p-2 text-xl font-medium'>Send Invitation</span>}
                    {formtype === 'attachreciept' && <span className='p-2 text-xl font-medium'>Attach New Reciept</span>}
                    <span 
                    onClick={handleClose}
                    className='p-2 px-4 text-lg font-medium cursor-pointer transition duration-300 hover:rotate-90'><i className='fa fa-close'></i>
                    </span>
                </div>
                {/* Body */}
                {formtype === 'addexpense' && <AddExpense setCheckIfFull={setCheckIfFull}/>}
                {formtype === 'sendinvitation' && <SendInvitation />}
                {formtype === 'attachreciept' && <AttachReciept setCheckIfFull={setCheckIfFull}/>}
            </div>
        </div>
  );
}

export default FormLayout;

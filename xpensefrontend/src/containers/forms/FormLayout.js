// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import AddExpense from './AddExpense';
import AttachReciept from './AttachReciept';
import SendInvitation from './SendInvitation';

const outerdiv = `fixed top-0 left-0 bottom-0 w-[100%] h-full flex-col-style justify-center bg-[rgba(0,0,0,0.8)]`;
const innerdiv = 'absolute w-[65%] h-[85%] flex-col-style justify-between bg-white rounded-lg';
const innerdiv_1 = 'border-0 w-full h-12 flex-row-style justify-between bg-slate-100 rounded-md';
const innerdiv_1_span_123 = 'p-2 text-xl font-medium';
const innerdiv_1_span_4 = 'p-2 px-4 text-lg font-medium cursor-pointer transition duration-300 hover:rotate-90';


function FormLayout() {
    const navigate = useNavigate();
    const { formtype, userid } = useParams();
    const [checkIfFull, setCheckIfFull] = useState(false);
    const titleMapper = {'addexpense': 'Add Your Expense', 'sendinvitation': 'Send Invitation', 'attachreciept': 'Attach New Reciept'};
    const formTitle = (type) => <span className={innerdiv_1_span_123}> {titleMapper[type]} </span>;

    const typeFormMapper = {
        'addexpense': <AddExpense setCheckIfFull={setCheckIfFull}/>,
        'sendinvitation': <SendInvitation setCheckIfFull={setCheckIfFull}/>,
        'attachreciept': <AttachReciept setCheckIfFull={setCheckIfFull}/>,
    }

    function handleClose(){
        const msg = "Details will not be saved, Proceed?";
        if (checkIfFull && window.confirm(msg)) navigate('/user/'+userid+'/home/dashboard/');
        else navigate('/user/'+userid+'/home/dashboard/');
    }

  return (
        <div className={outerdiv}>
            <div className={innerdiv}>
                <div className={innerdiv_1}>
                    {formTitle(formtype)} 
                    <span onClick={handleClose} className={innerdiv_1_span_4}><i className='fa fa-close'></i> </span>
                </div>
                {typeFormMapper[formtype]}
            </div>
        </div>
  );
}

export default FormLayout;

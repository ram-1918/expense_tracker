// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import FieldValidations from '../base/FieldValidations';

function handleSubmit(){
    return 
}

function AttachReciept({setcheckiffull}){
    const formStyles = 'border-r border-l w-full h-full flex-col-style justify-between space-y-8 overscroll-hidden';
    const groupStyles = 'border-0 w-fit h-fit flex-col-style space-y-2';
    const labelStyles = 'w-full text-lg font-semibold flex-row-style space-x-2';
    const inputStyles = 'border border-gray-400 h-10 px-2 outline-none focus:border-gray-400 placeholder:text-sm';
    const fileButtonStyles = 'border text-slate-400 text-sm font-medium overflow-x-scroll file:cursor-pointer file:border-none file:rounded-full file:bg-slate-100 file:px-2 file:py-[5px] file:text-slate-600 file:font-bold';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [image, setImage] = useState([]);
    const [showOptions, setShowOptions] = useState(false);

    if (image !== []){
        setcheckiffull(true);
    }
    else{
        setcheckiffull(false);
    }
    const categories = ['Travel', 'Food', 'Appliances', 'Others'];
    const mark = 'border border-gray-500 rounded-full w-4 h-4 flex-row-style justify-center text-sm px-2 cursor-pointer hover:scale-[1.03]';

    return (
        <form onSubmit={handleSubmit} className={formStyles}>
           <div>
            <input type="file" accept=".jpeg, .jpg, .png, images/*" onChange={(e) => setImage(e.target.files[0])} className={fileButtonStyles}></input>
           </div>
           {/* After reciept has been chosen */}
           <div>

           </div>
        </form>
    )
}

export default AttachReciept;
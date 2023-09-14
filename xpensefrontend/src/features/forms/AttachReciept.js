// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import FieldValidations from '../../components/base/FieldValidations';
import { useNavigate } from 'react-router';

function AttachReciept({setCheckIfFull}){
    const navigate = useNavigate();
    const formStyles = 'border-r border-l w-full h-full flex-col-style justify-start space-y-8 overscroll-hidden';
    const groupStyles = 'border-0 w-fit h-fit flex-col-style space-y-2';
    const listStyles = 'text-sm font-normal p-2';
    const inputStyles = 'border border-gray-400 rounded-full w-72 h-8 p-2 outline-none focus:border-gray-400 placeholder:text-sm';
    const fileButtonStyles = 'border text-slate-400 text-sm font-medium overflow-x-scroll file:cursor-pointer file:border-none file:rounded-full file:bg-slate-100 file:px-2 file:py-[5px] file:text-slate-600 file:font-bold';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [image, setImage] = useState([]);
    const [selected_image, setSelectedImage] = useState('sample.png');
    const [showOptions, setShowOptions] = useState(false);

    const categories = ['Travel', 'Food', 'Appliances', 'Others'];
    const mark = 'border border-gray-500 rounded-full w-4 h-4 flex-row-style justify-center text-sm px-2 cursor-pointer hover:scale-[1.03]';
    const [activeSection, setActiveSection] = useState(1);

    const listExpenses = [
        {"name":"Expense1", "date": "August 13th, 2023", "status": "Pending..."},
        {"name":"Expense2", "date": "September 10th, 2023", "status": "Approved"},
        {"name":"Expense3", "date": "September 2th, 2023", "status": "Rejected"},
    ]
    setCheckIfFull(false);

    function handleSubmit(){
        alert('Attached proof is under review, only if attached to any of your expenses');
        navigate('/user/dashboard/home');
        return 
    }

    return (
        <form onSubmit={handleSubmit} className={formStyles}>
            <span className='border-0 w-full h-7 flex-row-style justify-around cursor-pointer'>
                <span onClick={() => setActiveSection(1)} className={`relative w-[50%] text-center ${activeSection === 1 ? 'bg-slate-300':'bg-slate-200'}`}>
                    <span className={`flex-row-style justify-center  after:content-[""] after:absolute after:-right-2 after:border-t after:border-r after:p-2 after:rotate-45 ${activeSection === 1 ? 'after:bg-slate-300 after:border-slate-300':'after:bg-slate-200 after:border-slate-200'} `}>
                        1. Upload an appropriate image </span>
                </span>
                <span onClick={() => setActiveSection(2)} className={`w-[50%] text-center ${activeSection === 1 ? 'bg-slate-200':'bg-slate-300'}`}>2. Attach it to your expenses</span>
            </span>

           <div className={`${activeSection === 1 ? 'flex-col-style justify-between' : 'hidden'} w-full h-full border-2`}>
            <div className='border w-full h-[60%] flex-col-style justify-center space-y-4'>
                <p className='text-lg font-light'>Please select supporting file, which serves as a proof,<br /> to attach with your already made expense.</p>
                <input type="file" accept=".jpeg, .jpg, .png, images/*" onChange={(e) => setImage(e.target.files[0])} className={fileButtonStyles}></input>
            </div>
            <span className='border-t-2 w-full p-2 text-right pr-8'>
                <button type="button" onClick={() => {setActiveSection(2)}} className='border border-slate-400 rounded-lg w-16 h-10 text-lg font-semibold'>Next <i className='fa fa-angle-right'></i></button>
            </span>
           </div>

           {/* After reciept has been chosen */}
           <div className={`${activeSection === 2 ? 'flex-col-style justify-between' : 'hidden'}  w-full h-full border-2`}>
            <div className='border w-full h-[60%] flex-col-style justify-start space-y-4'>
                <span className='text-lg font-light'>Attach the image to your expenses below</span>
                <span className='font-light'>Selected Image: <span className='inline-flex font-normal'>{selected_image}</span></span>
                <input type="text" placeholder='Search your expenses...' onChange={(e) => setName(e.target.value)} className={inputStyles}></input>
                <div className='border w-full h-full p-2 flex-col-style justify-center'>
                    <div className='border-0 w-[60%] h-full flex-col-style justify-start space-y-2 p-2 px-4'>
                        {listExpenses.map((obj, idx) => <div key={idx} className='border border-gray-300 rounded-lg w-full flex-row-style justify-between px-2 py-[5px] list-none'>
                            <input type="checkbox"></input>
                            <li className={`w-40 ${listStyles}`}>{obj.name}</li>
                            <li className={`w-52 ${listStyles}`}>{obj.date}</li>
                            <li className={`border rounded-full w-24 h-fit text-center ${listStyles}  ${obj.status === 'Rejected' ? 'border-red-500 text-red-500' : obj.status === 'Approved' ? 'border-green-600 text-green-600' : '' }`}>{obj.status}</li>
                        </div>)}
                    </div>
                </div>
            </div>
            <span className='border-t-2 w-full p-2 text-right pr-8 flex-row-style justify-between'>
                <button type="button" onClick={() => {setActiveSection(1)}} className='border border-slate-400 rounded-lg w-24 h-10 text-lg font-semibold'><i className='fa fa-angle-left'></i> Previous</button>
                <button type="submit" onClick={handleSubmit} className='border border-slate-400 rounded-lg w-20 h-10 text-lg font-semibold'>Attach <i className='fa fa-angle-right'></i></button>
            </span>
           </div>
        </form>
    )
}

export default AttachReciept;
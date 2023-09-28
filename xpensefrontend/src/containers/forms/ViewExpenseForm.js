// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router';
import BaseDropdown from '../../components/base/BaseDropdown';
import Spinner from '../../components/base/Spinner';
import { fetchsingleuser, fetchusers, updateuserinfo } from '../../features/core/coreSlice';
import { capitalize, dateformater } from '../../utils/helper';
import { listsingleexpense, Updateuserinfobyadmin } from './apicalls';

const formStyles = 'border-r border-l w-full h-full flex-col-style justify-between space-y-8 overscroll-hidden';
const groupStyles = 'border-0 w-fit h-fit flex-col-style space-y-2';
const labelStyles = 'w-full text-sm font-semibold flex-row-style space-x-2';
const inputStyles = 'border border-gray-400 h-10 px-2 outline-none focus:border-gray-400 placeholder:text-sm';
const resetButtonStyles = 'border border-green-900 rounded-xl p-2 px-4 text-md font-light text-green-900 cursor-pointer hover:opacity-80';
const sendButtonStyles = 'border rounded-xl p-2 px-4 text-mg font-light bg-green-600 text-white cursor-pointer hover:opacity-80';
const selectedOptionStyle = 'w-full flex-row-style h-full justify-evenly rounded-lg cursor-pointer before:border-b-2 before:border-l-2 before:border-blue-400 before:w-4 before:h-2 before:-rotate-45';

const API_URL = 'http://localhost:8000';

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return <div>No image content yet</div>;
  }

  return (
    <section className='group/image relative flex flex-col justify-center items-center bg-black'>
      {slides.map((slide, index) => {
        return (
          <div
            className={`${index === current ? 'opacity-1' : 'opacity-0'} transition duration-700 ease-in-out w-full h-full`}
            key={index}
          >
            {index === current && (
              <img src={`${API_URL}${slide.image}`} alt='expense proof' className='w-[100%] h-[100%]' ></img>
            )}
          </div>
        );
      })}
        <button className='invisible group-hover/image:visible absolute top-[50%] left-[1%] text-lg font-bold bg-opacity-80 bg-gray-300 p-[5px]' onClick={prevSlide}><i className="fas fa-angle-left"></i></button>
        <button className='invisible group-hover/image:visible absolute top-[50%] right-[1%] text-lg font-bold bg-opacity-80 bg-gray-300 p-[5px]' onClick={nextSlide}><i className="fas fa-angle-right"></i></button>
    </section>
  );
};

function ViewExpenseForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const role = useSelector(state => state.user.userinfo.role)
    const { expenseid } = useParams();
    const [expense, setExpense] = useState([]);
    const [tags, setTags] = useState(null);
    const [images, setImages] = useState(null);
    const [keys, setKeys] = useState([
        'username', 'payment_recepient', 'amount', 'category', 
        'description', 'payment_method', 'date_submitted', 'last_modified',
    ]);
    const keyMapper = {
        'username': 'Username', 'payment_recepient': 'Recepient', 'amount': 'Amount',
        'category': 'Category', 'description': 'Description', 'payment_method': 'Payment Method',
        'date_submitted': 'Date of Submission', 'last_modified': 'Last Updated', 'rejection_count': 'Rejection Count'
    }
    const [spinner, setSpinner] = useState(false);

    // 'id', 'userid', 'amount', 'status', 'message', 'category', 'currency', 'description', 'last_modified', 'date_submitted', 'payment_method', 'rejection_count', 'payment_recepient', 'username'
    // const dropdownOptions = {'Cloud5': 'cloud5', 'I5Tech': 'i5tech'}
    // const initial_details = {
    //     id: state.userdata.id, fullname: state.userdata.fullname,
    //     email: state.userdata.email, phone: state.userdata.phone,
    //     role: state.userdata.role, is_active: state.userdata.is_active,
    //     authorized: state.userdata.authorized, company: state.userdata.company,
    // }

    const getexpenseinfo = async () => {
        setSpinner(true);
        try{
            const data = await listsingleexpense(expenseid);
            setExpense(data);
            alert('hi')
            // const keys = Object.keys(data).filter((key) => !(key.includes('expense_tag') || key.includes('expense_proof')))
            setSpinner(false);
            setTags([...data['expense_tag']['names']]);
            setImages([...data['expense_proof']]);
            console.log(data, images, "SINGLE EXPENSE INFO", '___----_-------_')
        }
        catch(error){
            setSpinner(false);
            console.log(error);
        }
    }

    useEffect(() => {
        getexpenseinfo()
    }, [])

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

    // const handleUpdate = async () => {
    //     const enteredData = {...userdetails};
    //     setSpinner(true);
    //     try{
    //         const response = await Updateuserinfobyadmin(enteredData);
    //         console.log(response);
    //         setSpinner(false);
    //         dispatch(fetchusers());
    //         navigate('../');
    //     }
    //     catch{
    //         console.log("error occured");
    //         setSpinner(false);
    //     }
    // }
    const tagstyles = 'border-2 px-[5px] rounded-md mx-2'
    return (
        <div className={`fixed top-0 left-0 bottom-0 w-[100%] h-full flex-col-style justify-start bg-[rgba(0,0,0,0.8)] text-sm`}>
            {spinner && <Spinner name="Loading expense..." />}
            <div className='w-[85%] h-[32rem] shadow-lg rounded-lg flex-col-style justify-evenly m-2 bg-white'>
                <div className='border-b w-full h-10 flex-row-style justify-between px-2'>
                    <span className='w-fit h-fit p-0 text-md font-light'><span className='text-base font-medium'>Expense details</span> - {expense.id} <sup>{expense.rejection_count}</sup></span>
                    <span className='w-fit h-full p-2 flex-row-style justify-center' onClick={() => navigate('../')}><i className='fa fa-close text-lg'></i></span>
                </div>
                <div className='border w-full flex flex-row-style flex-grow'>
                    <div className='border-r w-[60%] h-full'>
                        {images && images.map((imageobj, idx) => <ImageSlider slides={imageobj} key={idx} />)}
                    </div>
                    <div className='w-[40%] h-full px-2'>
                        <table className='w-full h-full'>
                            <tbody>
                                {keys.map((key, idx) => (
                                <tr key={idx} className='w-full'>
                                    <td className='text-base font-medium'>{keyMapper[key]}</td>
                                    <td className={`${key.includes('amount') ? 'before:content-["$"] before:font-bold' : ''} text-base px-2`}>
                                        {(key.includes('date_submitted') || key.includes('last_modified')) ? 
                                        dateformater(expense[key]) : 
                                        (key.includes('username')) ? expense[key] : // capitalize(expense[key]) :
                                        expense[key]}
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='border-t w-full h-12 flex-row-style justify-center px-2'>
                    <span className='border-r w-[70%] h-full flex-row-style justify-start px-2 list-none'>
                        <span className='text-base font-medium'>TAGS: </span>
                        {tags && tags.map((obj, idx) => <li key={idx} className={tagstyles}>{obj}</li>)}
                    </span>
                    <span className='w-[30%] h-full flex-row-style justify-end px-2 font-medium text-base'>
                        {expense['status']}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ViewExpenseForm;
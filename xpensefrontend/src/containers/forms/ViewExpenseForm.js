// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s

import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router';
import BaseDropdown from '../../components/base/BaseDropdown';
import Spinner from '../../components/base/Spinner';
import { fetchsingleuser, fetchusers, setExpenseList, updateuserinfo } from '../../features/core/coreSlice';
import { capitalize, dateformater } from '../../utils/helper';
import { deleteExpense, listsingleexpense, Updateuserinfobyadmin } from './apicalls';

const formStyles = 'border-r border-l w-full h-full flex-col-style justify-between space-y-8 overscroll-hidden';
const groupStyles = 'border-0 w-fit h-fit flex-col-style space-y-2';
const labelStyles = 'w-full text-sm font-semibold flex-row-style space-x-2';
const inputStyles = 'border border-gray-400 h-10 px-2 outline-none focus:border-gray-400 placeholder:text-sm';
const resetButtonStyles = 'border border-green-900 rounded-xl p-2 px-4 text-md font-light text-green-900 cursor-pointer hover:opacity-80';
const sendButtonStyles = 'border rounded-xl p-2 px-4 text-mg font-light bg-green-600 text-white cursor-pointer hover:opacity-80';
const selectedOptionStyle = 'w-full flex-row-style h-full justify-evenly rounded-lg cursor-pointer before:border-b-2 before:border-l-2 before:border-blue-400 before:w-4 before:h-2 before:-rotate-45';

const API_URL = 'http://localhost:8000';

const ImageSlider = ({ slides }) => {
    // console.log(slides, "IMAGE SLIDER")
    const initialZoomSettings = {
        transform: 'scale(1)',
        transformOrigin: '0 0'
      };
  const [X, setX] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(initialZoomSettings);
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

  const handleMouseMovement = (e) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { width, height } = target.getBoundingClientRect();
    const xpos = (offsetX/width) *100;
    const ypos = (offsetY/height) *100;
    const zoom = `scale(1.6) translate(-${xpos}%, -${ypos}%)`;
    setZoomLevel({
        transform: zoom,
        transformOrigin: `-${xpos}% -${ypos}%`
    })
    console.log(xpos, ypos)
  }

  return (
  <section className='group/image relative w-full h-full flex flex-col justify-center items-center overflow-hidden'>
    {slides.map((slide, index) => (
      <div 
      onMouseEnter={() => setZoomLevel(initialZoomSettings)} 
      onMouseLeave={() => setZoomLevel(initialZoomSettings)} 

      className={`${index === current ? 'opacity-1' : 'opacity-0'} transition duration-300 ease-in-out w-full h-full flex-row-style justify-center`} 
      key={index}>
        {index === current && (
          <img src={`${API_URL}${slide.image}`} alt='expense proof' 
          onMouseMove={(e) => {handleMouseMovement(e)}} 
          
          style={{ ...zoomLevel, transition: 'transform 0.1s ease-out' }}
          className={`object-cover object-center w-full h-[28rem] flex-shrink:0 overflow-hidden`} />
        )}
      </div>
    ))}
    <button className='invisible group-hover/image:visible absolute top-[50%] left-[1%] text-lg font-bold bg-opacity-80 bg-gray-300 p-[5px]' onClick={prevSlide}>
      <i className="fa fa-angle-left"></i>
    </button>
    <button className='invisible group-hover/image:visible absolute top-[50%] right-[1%] text-lg font-bold bg-opacity-80 bg-gray-300 p-[5px]' onClick={nextSlide}>
      <i className="fa fa-angle-right"></i>
    </button>
  </section>
  );
};

function ViewExpenseForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const role = useSelector(state => state.user.userinfo.role)
    const expenses = useSelector(state => state.expense.expenselist);
    const { expenseid } = useParams();
    const [expense, setExpense] = useState([]);
    const [tags, setTags] = useState([]);
    const [images, setImages] = useState([]);
    const [keys, setKeys] = useState([
        'username', 'payment_recepient', 'amount', 'category', 
        'description', 'payment_method', 'date_submitted', 'last_modified',
    ]);
    const keyMapper = {
        'username': 'Username', 'payment_recepient': 'Recepient', 'amount': 'Amount',
        'category': 'Category', 'description': 'Description', 'payment_method': 'Payment Method',
        'date_submitted': 'Date Submitted', 'last_modified': 'Last Updated', 'rejection_count': 'Rejection Count'
    }
    const [spinner, setSpinner] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        let singleexpense = [];
        try{
            singleexpense = expenses.filter((obj) => obj.id === expenseid)[0];
            setExpense(singleexpense);
            setTags(singleexpense.expense_tag.names);
            setImages(singleexpense['expense_proof']);
        }
        catch(err){
            console.error(err);
        }
    }, [])

    // 'id', 'userid', 'amount', 'status', 'message', 'category', 'currency', 'description', 'last_modified', 'date_submitted', 'payment_method', 'rejection_count', 'payment_recepient', 'username'
    // const dropdownOptions = {'Cloud5': 'cloud5', 'I5Tech': 'i5tech'}
    // const initial_details = {
    //     id: state.userdata.id, fullname: state.userdata.fullname,
    //     email: state.userdata.email, phone: state.userdata.phone,
    //     role: state.userdata.role, is_active: state.userdata.is_active,
    //     authorized: state.userdata.authorized, company: state.userdata.company,
    // }
// -----------------------
    // const getexpenseinfo = async () => {
    //     setSpinner(true);
    //     try{
    //         const data = await listsingleexpense(expenseid);
    //         setExpense(data);
    //         // const keys = Object.keys(data).filter((key) => !(key.includes('expense_tag') || key.includes('expense_proof')))
    //         setSpinner(false);
    //         setTags([...data['expense_tag']['names']]);
    //         setImages([...data['expense_proof']]);
    //         console.log(data, images, tags, "SINGLE EXPENSE INFO", '___----_-------_')
    //     }
    //     catch(error){
    //         setSpinner(false);
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     getexpenseinfo()
    // }, [])
// ------------------------
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

    const handleDelete = async () => {
        setSpinner(true);
        try{
            await deleteExpense(expense.id);
            const newexpenselist = expenses.filter((obj) => obj.id !== expense.id);
            dispatch(setExpenseList(newexpenselist));
            setSpinner(false);
            navigate('../');
        }
        catch{
            console.log("error occured");
            setSpinner(false);
        }
    }
    const tagstyles = 'border-2 px-[5px] rounded-md mx-2 bg-neutral-100 '
    return (
        <div className={`fixed top-0 left-0 bottom-0 w-[100%] h-full flex-col-style justify-start bg-[rgba(0,0,0,0.8)] text-sm`}>
            {spinner && <Spinner name="Loading expense..." />}
            <div className='w-fit h-[34rem] shadow-lg rounded-lg flex-col-style justify-center m-2 bg-white'>
                <div className='border-b w-full flex-row-style justify-between px-2'>
                    <span className='w-fit h-fit flex-row-style justify-center p-0 text-md font-light'><span className='text-base font-medium'>Expense details</span> - {expense.id} <sup>{expense.rejection_count}</sup></span>
                    <span className='w-fit h-full p-2 flex-row-style justify-center cursor-pointer' onClick={() => navigate('../')}><i className='fa fa-close text-lg'></i></span>
                </div>
                <div className='border w-full flex flex-row-style justify-center flex-grow'>
                    <div className='border-r w-fit h-full'>
                        {<ImageSlider slides={images} />}
                    </div>
                    <div className='w-96 h-full px-2 overflow-x-scroll'>
                        <table className='w-full h-full'>
                            <tbody>
                                {keys.map((key, idx) => (
                                <tr key={idx} className='w-full'>
                                    <td className='text-base font-medium'>{keyMapper[key]}</td>
                                    <td className={`${key.includes('amount') ? 'before:content-["$"] before:font-bold' : ''} text-base px-2`}>
                                        {(key.includes('date_submitted') || key.includes('last_modified')) ? 
                                        dateformater(expense[key]) : 
                                        (key.includes('username') && expense[key]) ? capitalize(expense[key]) :
                                        expense[key]}
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='border-t w-full flex-row-style justify-between p-2'>
                    <span className='border-r w-[80%] h-full flex-row-style justify-start px-2 list-none'>
                        <span className='text-base font-medium'>TAGS: </span>
                        {tags && tags.map((obj, idx) => <li key={idx} className={tagstyles}>{obj}</li>)}
                    </span>
                    <span className={`${expense['status'] !== 'pending' ? 'w-fit' : 'w-[20%]'} h-full flex-row-style justify-start space-x-4 px-2 font-medium text-base`}>
                        {expense['status'] === 'pending' &&
                            <>
                                <span onClick={() => {setUpdateMode(prev => !prev)}}><i className='fa fa-edit'></i></span>
                                <span onClick={() => {handleDelete(expense.id)}}><i className='fa fa-trash'></i></span>
                            </>
                        }
                        <span>{expense['status']}...</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ViewExpenseForm;
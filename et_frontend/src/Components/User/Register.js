import { useState } from "react";
import axios from 'axios';
import { API_URL } from "../../store/constants";
import { Link, useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux';
import { selectLinkStyles, selectResponsiveBGs } from './store/slice';
import BaseHeader from "../basepages/BaseHeader";

function Register(){
  let navigate = useNavigate();
  const linkStyles = useSelector(selectLinkStyles);
  const keys = ['fullname', 'email', 'password'];
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [company, setCompany] = useState('');
  const [employeeid, setEmployeeid] = useState('');
  const [comment, setComment] = useState('');
  const [proceedCheck, setProceedCheck] = useState(false);
  const [succussMsg, setSuccussMsg] = useState('');
  const [errorField, setErrfield] = useState({});
  const [errorMsg, setErrorMsg] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    setErrfield({});
    if (password1 !== password2){
      setErrorMsg('Password incorrect');
    }
    let entered_data = {
      "fullname": fullname,
      "email": email,
      "password": password1,
      "company": company,
      "employee_id": employeeid,
      "proceedtorequest": false
    }
    entered_data = !proceedCheck ? 
    entered_data : 
    {
      ...entered_data,
      "proceedtorequest": true,
      "comment": comment
    }
    axios.post(`${API_URL}/users/register/`, entered_data)
    .then((response) => {
      console.log(response.data, response.status)
      if (response.data === 'created'){
        // redirect to login page
        navigate('/users/login');
      }
      setFullname('');
      setEmail('');
      setPassword1('');
      setPassword2('');
      setCompany('');
      setEmployeeid('');
      setComment('');
      navigate('/users/register');
      setSuccussMsg('Request sent succussfully!')
      setProceedCheck(false);
      setTimeout(() => setSuccussMsg(''), 2000)
    })
    .catch((err) => {
      const errors = err.response.data;
      console.log(errors);
      if (errors === 'unauthorized'){
        console.log(errors, 'Unauthorized check')
        setProceedCheck(true);
        setErrorMsg('you Seems like unauthorized, try to make a request for registration!');
        setTimeout(() => {setErrorMsg('')}, 2000)
      }
      setErrfield((prevstate) => ({...prevstate, ...errors}));
      console.log(errorField);
      
    })
  }
    const inputStyles = 'bg-inherit outline-0 p-2 w-72 text-md';
    const fieldsetStyles = 'border border-gray-200 text-left rounded-md flex justify-center items-center';
    const legendStyles = 'mx-4 text-md font-light px-2';
    const buttonStyles = 'border w-24 border-cyan-600 outline-none rounded-lg p-[4px] transition duration-300 hover:outline-none hover:border-cyan-600 hover:bg-cyan-600 hover:text-white';
    return (
      <>
        <p className='text-[1.8rem] font-light py-4'>Registration</p>
        {keys.map((key, index) => (
          errorField[key] ? <li className='text-[0.8rem] text-red-600 list-style-none' key={index}>{errorField[key]}</li> : ''
          ))}
          <span className='text-[0.8rem] text-red-600'>{errorMsg}</span>
          <span className='text-[0.8rem] text-green-600'>{succussMsg}</span>

        <div className='flex flex-col justify-center items-center w-full h-full space-y-2 mt-2'>
            <fieldset className={`${fieldsetStyles}`}>
                <legend className={`${legendStyles}`}>Email</legend>
                <input 
                className={`${inputStyles}`}
                type="text"
                placeholder='Enter your email address'
                value={email}
                onChange = {(e) => setEmail(e.target.value)} required />
            </fieldset>
              <fieldset className={`${fieldsetStyles}`}>
                  <legend className={`${legendStyles}`}>FullName</legend>
                  <input 
                  className={`${inputStyles}`}
                  type="text"
                  placeholder='Enter your fullname'
                  value={fullname}
                  onChange = {(e) => setFullname(e.target.value)} required />
              </fieldset>
              <fieldset className={`${fieldsetStyles}`}>
                  <legend className={`${legendStyles}`}>Password</legend>
                  <input 
                  className={`${inputStyles}`}
                  type="password"
                  placeholder='Enter your password'
                  value={password1}
                  onChange = {(e) => setPassword1(e.target.value)} required/>
              </fieldset>
              <fieldset className={`${fieldsetStyles}`}>
                  <legend className={`${legendStyles}`}>Re-password</legend>
                  <input 
                  className={`${inputStyles}`}
                  type="password"
                  placeholder='Enter your password'
                  value={password2}
                  onChange = {(e) => setPassword2(e.target.value)} required/>
              </fieldset>
              <fieldset className={`${fieldsetStyles}`}>
                  <legend className={`${legendStyles}`}>Company</legend>
                  <input 
                  className={`${inputStyles}`}
                  type="text"
                  placeholder='Enter your company'
                  value={company}
                  onChange = {(e) => setCompany(e.target.value)} required />
              </fieldset>
              <fieldset className={`${fieldsetStyles}`}>
                <legend className={`${legendStyles}`}>Employee ID</legend>
                <input 
                  className={`${inputStyles}`}
                  type="text"
                  placeholder='Enter your employee ID'
                  value={employeeid}
                  onChange = {(e) => setEmployeeid(e.target.value)} required />
              </fieldset>

            <div className={`${proceedCheck ? 'block' : 'hidden' }`}>
              <fieldset className={`${fieldsetStyles}`}>
                <legend className={`${legendStyles}`}>Comment</legend>
                <textarea 
                  className={`${inputStyles} `}
                  placeholder='Specify the reason to proceed for registration'
                  value={comment}
                  onChange = {(e) => setComment(e.target.value)} required ></textarea>
              </fieldset>
            </div>

            <button type='submit' onClick={(e) => handleSubmit(e)} className={`${buttonStyles}`}>{proceedCheck ? 'Proceed to request' : 'Submit'}</button>
            <div className='flex flex-col w-full justify-between items-center space-y-2'>
                <span className='text-sm'>Already registed? <Link to='/users/login' className={linkStyles}>Sign In</Link></span>
            </div>
        </div>
      </> 
  )
}

const RegisterPage = () => {
  const responsiveBGs = useSelector(selectResponsiveBGs);
  return (
    <div className={`flex flex-col w-full justify-center items-center h-screen ${responsiveBGs}`}>
      <div className="laptop:hidden desktop:hidden monitor:hidden w-full">
        <BaseHeader />
      </div>
      <form className='flex flex-col justify-around items-center m-auto border border-cyan-600 w-[28rem] h-fit py-8 rounded-xl shadow-3xl text-center bg-white tablet:w-[55%] mobile:w-[85%] small:w-[100%]'>
        <Register />
      </form>
    </div>
  )
}

export default RegisterPage;


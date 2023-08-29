import { useState } from "react";
import axios from 'axios';
import { API_URL } from "../../store/constants";
import { Link, useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux';
import { selectLinkStyles, selectResponsiveBGs } from './store/slice';
import BaseHeader from "../basepages/BaseHeader";

const dataValidation = (data) => {
  
  const new_data = {
    ...data,
    firstname: "ram"
  }
  return new_data;
}

function Register(){
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [employeeid, setEmployeeid] = useState('');
  // Error handlers
  const [errorField, setErrfield] = useState({});
  const keys = ['firstname', 'lastname', 'email', 'phone', 'password'];

  const linkStyles = useSelector(selectLinkStyles);

  let navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    setErrfield({});
    const entered_data = {
      "firstname": first,
      "lastname": last,
      "email": email,
      "phone": phone,
      "password": password,
      "company": company,
      "employee_id": employeeid
    }
    const cleaned_data = dataValidation(entered_data);
    console.log("Cleaned data ", cleaned_data)
    // API call
    axios.post(`${API_URL}/users/register/`, cleaned_data)
    .then((response) => {
      console.log(response.data, response.status)
      if (response.status === 201){
        // redirect to Home page
        setFirst('');
        setLast('');
        setEmail('');
        setPassword('');
        setPhone('');
        setCompany('');
        setEmployeeid('');
      }
      navigate('/users/login');
    })
    .catch((err) => {
      const errors = err.response.data;
      console.log(errors);
      setErrfield((prevstate) => ({...prevstate, ...errors}));
      console.log(errorField);
      
    })
  }
    return (
      <>
        <p className='text-[1.8rem] font-light py-4'>Registration</p>
        {keys.map((key, index) => (
          errorField[key] ? <li className='text-[0.8rem] text-red-600' key={index}>{errorField[key]}</li> : ''
          ))}
        <div className='flex flex-col justify-center items-center w-full h-full space-y-2 mt-2'>
            <fieldset className='border border-gray-400 text-left flex justify-center items-center'>
                <legend className='mx-2 text-sm font-light px-2'>Firstname</legend>
                <input 
                className='bg-inherit outline-0 mx-2 p-[4px] w-64 text-sm'
                type="text"
                placeholder='Enter your firstname'
                value={first}
                onChange = {(e) => setFirst(e.target.value)} required />
            </fieldset>
            <fieldset className='border border-gray-400 text-left flex justify-center items-center'>
                <legend className='mx-2 text-sm font-light px-2'>Lastname</legend>
                <input 
                className='bg-inherit outline-0 mx-2 p-[4px] w-64 text-sm'
                type="text"
                placeholder='Enter your lastname'
                value={last}
                onChange = {(e) => setLast(e.target.value)} required />
            </fieldset>
            <fieldset className='border border-gray-400 text-left flex justify-center items-center'>
                <legend className='mx-2 text-sm font-light px-2'>Email</legend>
                <input 
                className='bg-inherit outline-0 mx-2 p-[4px] w-64 text-sm'
                type="text"
                placeholder='Enter your email address'
                value={email}
                onChange = {(e) => setEmail(e.target.value)} required />
            </fieldset>
            <fieldset className='border border-gray-400 text-left flex justify-center items-center'>
                <legend className='mx-2 text-sm font-light px-2'>Phone</legend>
                <input 
                className='bg-inherit outline-0 mx-2 p-[4px] w-64 text-sm'
                type="text"
                placeholder='012-345-6789'
                value={phone}
                onChange = {(e) => setPhone(e.target.value)} required />
            </fieldset>
            <fieldset className='border border-gray-400 text-left flex justify-center items-center'>
                <legend className='mx-2 text-sm font-light font-light px-2 '>Password</legend>
                <input 
                className='bg-inherit outline-0 mx-2 p-[4px] w-64 text-sm'
                type="password"
                placeholder='Enter your password'
                value={password}
                onChange = {(e) => setPassword(e.target.value)} required/>
            </fieldset>

            <fieldset className='border border-gray-400 text-left flex justify-center items-center'>
                <legend className='mx-2 text-sm font-light px-2'>Company</legend>
                <input 
                className='bg-inherit outline-0 mx-2 p-[4px] w-64 text-sm'
                type="text"
                placeholder='Enter your email address'
                value={company}
                onChange = {(e) => setCompany(e.target.value)} required />
            </fieldset>
            {/* <div className="flex flex-row">
              <legend className='w-[50%] mx-0 text-sm font-light'>Upload an image</legend>
                <input 
                className='bg-inherit outline-0 mx-2 w-64 text-sm'
                type="file"
                value={profilepic}
                onChange = {(e) => setProfilepic(e.target.files[0])} required />
              </div> */}
              <fieldset className='border border-gray-400 text-left flex justify-center items-center'>
                <legend className='mx-2 text-sm font-light px-2'>Employee ID</legend>
                <input 
                  className='bg-inherit outline-0 mx-2 p-[4px] w-64 text-sm'
                  type="text"
                  placeholder='Enter your email address'
                  value={employeeid}
                  onChange = {(e) => setEmployeeid(e.target.value)} required />
              </fieldset>
            <button type='submit' onClick={(e) => handleSubmit(e)} className='border border-cyan-600 outline-none rounded-lg p-2 transition duration-300 hover:outline-none hover:border-cyan-600 hover:bg-cyan-600 hover:text-white'>Submit</button>

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
      <form className='flex flex-col justify-around items-center m-auto border border-cyan-600 w-96 h-fit py-8 rounded-xl shadow-3xl text-center bg-white tablet:w-[55%] mobile:w-[85%] small:w-[100%]'>
        <Register />
      </form>
    </div>
  )
}

export default RegisterPage;


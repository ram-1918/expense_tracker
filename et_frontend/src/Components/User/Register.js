import { useState } from "react";
import axios from 'axios';
import { API_URL } from "../../store/constants";


const dataValidation = (data) => {
  
  const new_data = {
    ...data,
    firstname: "ram"
  }
  return new_data;
}

function RegisterPage({setToggleLoginSignup}){
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  // Error handlers
  const [errorField, setErrfield] = useState({});
  // const [errorValue, setErrVlaue] = useState({});
  const keys = ['firstname', 'lastname', 'email', 'phone', 'password'];

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrfield({});
    const entered_data = {
      "firstname": first,
      "lastname": last,
      "email": email,
      "phone": phone,
      "password": password
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
      }
    })
    .catch((err) => {
      const errors = err.response.data;
      console.log(errors);
      setErrfield((prevstate) => ({...prevstate, ...errors}));
      console.log(errorField);
      
    })
  }
    return (
      <div className='flex justify-center items-center h-screen '>
          <form className='flex flex-col justify-around items-center m-auto border w-80 h-fit pt-8 pb-8 rounded-xl shadow-3xl text-center mobile:w-[80%]'>
              <p className='text-[1.8rem] font-bold py-4'>Registration Page</p>
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

                  <button type='submit' onClick={(e) => handleSubmit(e)} className='border-0 outline-0 w-18 p-2 bg-red-900 text-white rounded-lg'>Submit</button>

                    <div className='flex flex-col w-full justify-between items-center space-y-2'>
                        <span className='text-sm'>Already registed? <button onClick={() => {setToggleLoginSignup((prev) => {return !prev})}} className='text-blue-600 underline underline-offset-2'>Sign Up</button></span>
                    </div>
              </div>
          </form>
      </div>
  )
}

export default RegisterPage;


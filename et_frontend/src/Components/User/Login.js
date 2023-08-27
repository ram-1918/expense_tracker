// login.js
// import { useSelector, useDispatch } from 'react-redux';
// import {setUser, setUserStatus, selectUserId, selectIsLoggedIn} from './store/slice';
import { API_URL } from '../../store/constants';
import { useState } from 'react';
import axios from 'axios';



function LoginPage({setToggleLoginSignup}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Error handlers
    const [errorField, setErrfield] = useState('');
    // const keys = ['email', 'password'];

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrfield('');
        const entered_data = {
          "email": email,
          "password": password
        }
        // API call
        axios.post(`${API_URL}/users/login/`, entered_data)
        .then((response) => {
          console.log(response.data, response.status)
          if (response.status === 201){
            // redirect to Home page
            const token = response.data;
            console.log(token);
            setEmail('');
            setPassword('');
          }
        })
        .catch((err) => {
            try{
                const errors = err.response.data;
                console.log('errors ', errors);
                setErrfield(errors);
            }
            catch{
                console.log("except: ", err.response)
            }
        //   console.log('fewf', errorField);
          
        })
      }
    return (
        <div className='w-full flex justify-center items-center h-screen'>
            <form className='flex flex-col justify-evenly items-center m-auto border w-80 h-96 shadow-3xl text-center mobile:w-[90%]'>
                <p className='text-[1.8rem] font-bold pt-4'>Login Page</p>
                {errorField ? <li className='text-sm text-red-500 mt-4'>{errorField}</li> : ''}
                <div className='flex flex-col justify-center items-center w-full h-full space-y-2'>
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
                      <legend className='mx-2 text-sm font-light font-light px-2 '>Password</legend>
                      <input 
                        className='bg-inherit outline-0 mx-2 p-[4px] w-64 text-sm'
                        type="password"
                        placeholder='Enter your password'
                        value={password}
                        onChange = {(e) => setPassword(e.target.value)} required/>
                    </fieldset>

                    <button type='submit' onClick={handleSubmit} className='border-0 outline-0 w-18 p-2 bg-red-800 text-white rounded-lg'>Submit</button>
                    <div className='flex flex-col w-full justify-between items-center space-y-2'>
                        <span className='text-sm'>Already registed? <button onClick={() => {setToggleLoginSignup((prev) => {return !prev})}} className='text-blue-600 underline underline-offset-2'>Sign Up</button></span>
                        <a className='text-sm text-blue-600 underline underline-offset-2'>Forgot password?</a>
                    </div>
                </div>
            </form>
        </div>
    )
    }

export default LoginPage;
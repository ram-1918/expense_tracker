import { API_URL } from '../../store/constants';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { selectLinkStyles, selectResponsiveBGs } from './store/slice';
import BaseHeader from '../basepages/BaseHeader';


function ForgotPassword(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Error handlers
    const [errorField, setErrfield] = useState('');
    // const keys = ['email', 'password'];
    
    const linkStyles = useSelector(selectLinkStyles);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrfield('');
        const entered_data = {
          "email": email,
          "password": password
        }
        // needs change
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
                console.log("except: ", err)
            }
        //   console.log('fewf', errorField);
          
        })
      }
    return (
        <>
            <p className='text-[1.8rem] font-light py-8'>Password Reset</p>
            {errorField ? <li className='text-sm text-red-500 mt-4'>{errorField}</li> : ''}
            <div className='flex flex-col justify-center items-center w-full h-full space-y-8'>
                <fieldset className='border border-gray-400 text-left flex justify-center items-center'>
                    <legend className='mx-2 text-sm font-light px-2'>Email</legend>
                    <input 
                    className='bg-inherit outline-0 mx-2 p-[4px] w-64 text-sm'
                    type="text"
                    placeholder='Enter your email address'
                    value={email}
                    onChange = {(e) => setEmail(e.target.value)} required />
                </fieldset>
                {/* <fieldset className='border border-gray-400 text-left flex justify-center items-center'>
                    <legend className='mx-2 text-sm font-light font-light px-2 '>Password</legend>
                    <input 
                    className='bg-inherit outline-0 mx-2 p-[4px] w-64 text-sm'
                    type="password"
                    placeholder='Enter your password'
                    value={password}
                    onChange = {(e) => setPassword(e.target.value)} required/>
                </fieldset> */}
                <button type='submit' onClick={handleSubmit} className='border border-cyan-600 outline-none rounded-lg p-2 transition duration-300 hover:outline-none hover:border-cyan-600 hover:bg-cyan-600 hover:text-white'>Reset password</button>

                <div className='flex flex-col w-full justify-between items-center space-y-2'>
                    <span className='text-sm'>Try login? <Link to='/users/login' className={linkStyles}>Sign In</Link></span>
                </div>
            </div>
        </>
    )
    }


const ForgotPasswordPage = () => {
  const responsiveBGs = useSelector(selectResponsiveBGs);
    return (
        <div className={`flex flex-col w-full justify-center items-center h-screen ${responsiveBGs}`}>
            <div className="laptop:hidden desktop:hidden monitor:hidden">
                <BaseHeader />
            </div>
            <form className='flex flex-col justify-around items-center m-auto border border-cyan-600 w-96 h-auto py-4 px-10 rounded-xl shadow-3xl text-center bg-white tablet:w-[55%] mobile:w-[85%] small:w-[100%]'>
                <ForgotPassword />
            </form>
        </div>
    )
    }
export default ForgotPasswordPage;
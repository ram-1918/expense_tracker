import { API_URL } from '../../store/constants';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { selectLinkStyles, selectResponsiveBGs, setActiveUserID, setUsername, setUserRole } from './store/slice';
import BaseHeader from '../basepages/BaseHeader';
import BaseButton from '../basepages/BaseButton';
import { userlogin } from './services/apicalls';



function Login(){
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let prevroute = useSelector((state) => state.user.prevRoute);
    console.log('from logged comp ', prevroute);

    // Error handlers
    const [errorField, setErrfield] = useState('');
    
    const linkStyles = useSelector(selectLinkStyles);

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrfield('');
        const entered_data = {
          "email": email,
          "password": password
        }  
        // axios.post(`${API_URL}/users/login/`, entered_data, {withCredentials:true})
        userlogin(entered_data)
        .then((response) => {
            const id = response.data['id'];
            const role = response.data['role'];
            const username = response.data['fullname'];
            console.log(id, role, username)
            localStorage.setItem('id', JSON.stringify(id));
            // localStorage.setItem('role', btoa(role)); 
            // localStorage.setItem('uname', btoa(username));
            dispatch(setActiveUserID(id));
            dispatch(setUserRole(role));
            dispatch(setUsername(username));
            setEmail('');
            setPassword('');
            // const prevroute = localStorage('prevroute', null)
            navigate(`user/${id}/1/dashboard`);
        })
        .catch((err) => {
            try{
                console.log('errors ', err.response.data);
                setErrfield(err.response.data);
            }
            catch{
                console.log("except: ", err)
            }
        })
    }
    return (
        <>
            <p className='text-[1.8rem] font-light pt-4'>Login</p>
            {errorField ? <li className='text-sm text-red-500 mt-4'>{errorField}</li> : ''}
            <div className='flex flex-col justify-center items-center w-full h-full space-y-4'>
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
                <span onClick={handleSubmit}><BaseButton type="submit" mode="user" text="Login" others='w-20'/></span>


                <div className='flex flex-col w-full justify-between items-center'>
                    <span className='text-sm'>Already registed? <Link to='/users/register' className={linkStyles}>Sign Up</Link></span>
                    <Link to='/users/forgotpassword' className={linkStyles}>Forgot password?</Link>
                </div>
            </div>
        </>
    )
    }


const LoginPage = () => {
    const responsiveBGs = useSelector(selectResponsiveBGs);
    return (
        <div className={`flex flex-col w-full justify-center items-center h-screen ${responsiveBGs}`}>
            <div className="laptop:hidden desktop:hidden monitor:hidden">
                <BaseHeader />
            </div>
            <form className='flex flex-col justify-around items-center m-auto border border-cyan-600 w-auto h-96 py-4 px-10 rounded-xl shadow-3xl text-center bg-white tablet:w-[55%] mobile:w-[85%] small:w-[100%]'>
                <Login />
            </form>
        </div>
    )
    }
export default LoginPage;
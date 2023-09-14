// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]
import googlesso from '../../images/google_sso.png'
import fbsso from '../../images/fb_sso.png'
import linsso from '../../images/linksso.png'
import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router';
import BaseField from '../../components/base/BaseField';
import { login } from './apicalls';
// State
import {useDispatch, useSelector} from 'react-redux';


const userHeaderStyle = 'w-96 h-10 flex-row-style justify-center p-2 text-3xl text-green-800 font-semibold font-sans';
const userInputStyle = 'border-none w-80 h-10 px-2 bg-gray-100 text-md outline-none placeholder:text-gray-450 placeholder:text-sm';
const userButtonStyle = 'border-none rounded-full w-32 p-2 bg-green-600 text-white hover:opacity-80';
const labelStyles = 'w-full text-md font-light flex-row-style space-x-2';
const mark = 'border border-gray-500 rounded-full w-4 h-4 flex-row-style justify-center text-[0.8rem] px-2 cursor-pointer hover:scale-[1.03]';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [succussMsg, setSuccussMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');   
    

    function reset(){
       setEmail(''); setPassword(''); setSuccussMsg(''); setErrorMsg('');
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === '' || password === ''){
            setErrorMsg("Both fields are required!"); return;
        }
        const enteredValues = {
            "email": email,
            "password": password
        }
        try {
            const response = await login(enteredValues);
            console.log(response.status, response.data, "LOGIN");
            localStorage.setItem('id', response.data['id']);
            navigate('/user/home/dashboard');
        }
        catch (error){
            console.log(error, "LOGIN ERROR");
        }
    }
    return (
        <div className="w-full h-screen flex-col-style justify-center">
            <form className={`border border-gray-300 rounded-xl shadow-xl w-[50%] h-[28rem] flex-col-style justify-center`}>
                <div>
                    <span className={`${userHeaderStyle}`}>Welcome</span>
                </div>
                <div className="w-[23rem] h-fit flex-col-style justify-center space-y-[10px] p-4 ">
                    <BaseField label="Email" placeholder="Please enter your email address" type="email" setField={setEmail}  />
                    <BaseField label="Password" placeholder="Please enter your password" type="password" setField={setPassword} register={false} />
                    <span className='text-blue-500'>Forgot Password?</span>
                </div>
                <button onClick={(e) => {handleSubmit(e)}} className={`${userButtonStyle}`} type="submit">Login</button>
                <span className=" w-full px-2 text-[0.8rem] text-gray-500 text-center cursor-pointer pt-4">
                    Not yet registered? 
                    <span onClick={() => {reset(); navigate('/users/register')}} className='text-blue-500'> Register</span>
                </span>
            </form>
        </div>
    )
}

export default Login;
// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]
import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import BaseField from '../../components/base/BaseField';
import Popup from '../../components/base/Popup';

import Tooltip from '../../components/base/Tooltip';
import { register } from './apicalls';

const userHeaderStyle = 'w-96 h-10 flex-row-style justify-center p-2 text-3xl text-green-800 font-semibold font-sans';
const userInputStyle = 'border-none w-80 h-10 px-2 bg-gray-100 text-md outline-none placeholder:text-gray-450 placeholder:text-sm';
const userButtonStyle = 'border-none rounded-full w-32 p-2 bg-green-600 text-white hover:opacity-80';
const labelStyles = 'w-full text-md font-light flex-row-style space-x-2';

function handleRegister(){
    return 
}

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [comment, setComment] = useState('Register me an employee');
    const [proceedToRequest, setProceedToRequest] = useState(false);    
    const [succussMsg, setSuccussMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');   

    function reset(){
        setName(''); setEmail(''); setPassword1(''); setPassword2(''); setComment(''); setProceedToRequest(false); setSuccussMsg(''); setErrorMsg('');
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password1 !== password2){
            setErrorMsg('Passwords mismatch!'); return
        }else if ((password1.trim() !== password1) || (password1.includes(' '))){
            setErrorMsg('Password should not contain spaces'); return
        }
        const enteredValues = {
            "email": email,
            "phone": "",
            "password": password1,
            "fullname": name,
            "company": 9,
            "is_superadmin": false,
            "is_admin": false,
            "is_employee": true,
            "comment": comment,
            "proceedtorequest": proceedToRequest
        }
        try{
            const response = await register(enteredValues);
            console.log(response.status, ' Response');
            navigate('/users/login');
            // reset();
        }
        catch (error){
            if(error.response.status === 400){
                setErrorMsg('Not an Authorized user, so proceed to make a request');
                setProceedToRequest(true);
            }
        }
    }

    return (
        <div className="relative w-full h-screen flex-col-style justify-center">
            <Popup text={errorMsg} type="error" />
            <Popup text={succussMsg} type="succuss" />
            <form className={`border border-gray-300 rounded-xl shadow-xl w-[50%] ${proceedToRequest ? 'h-[40rem]' : 'h-{36rem}'}  flex-col-style justify-evenly`}>
                <div className='pt-8'>
                    <span className={`${userHeaderStyle}`}>Create Account</span>
                </div>
                <div className="w-[23rem] h-fit flex-col-style justify-center space-y-[10px] p-4 ">
                    <BaseField label="Name" placeholder="Please enter your fullname" type="text" setField={setName}  /> 
                    <BaseField label="Email" placeholder="Please enter your email address" type="email" setField={setEmail}  />
                    <BaseField label="Password" placeholder="Please enter your password" type="password" setField={setPassword1}  />
                    <BaseField label="Re-enter Password" placeholder="Please re-enter your password" type="password" setField={setPassword2}  />
                    {proceedToRequest && <BaseField label="Comment" placeholder="Specify the reason for this registration..." txtarea={true} setField={setComment} />}
                </div>
                <button onClick={(e) => {handleSubmit(e)}} className={`${userButtonStyle}`} type="submit">Register</button>
                <span className=" w-full px-2 text-[0.8rem] text-gray-500 text-center cursor-pointer pb-8">
                    Already registered? 
                    <span onClick={() => {reset(); navigate('/users/login')}} className='text-blue-500'> Login</span>
                </span>
            </form>
        </div>
    )
}

export default Register;
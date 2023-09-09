// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]
import googlesso from '../../images/google_sso.png'
import fbsso from '../../images/fb_sso.png'
import linsso from '../../images/linksso.png'
import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'


function handleRegister(){
    return 
}

function handleLogin(){
    return
}

const Login = () => {
    const navigate = useNavigate();
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password1, setpassword1] = useState('');
    const [password2, setpassword2] = useState('');
    const [succussMsg, setSuccussMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');   

    function reset(){
        setname(''); setemail(''); setpassword1(''); setpassword2(''); setSuccussMsg(''); setErrorMsg('');
    }
    
    const handleSubmit = (e, type) => {
        e.preventDefault();
        const formdata = new FormData();
        if (type === 'login'){
            const result = handleLogin(formdata);
        }
        else{
            const result = handleRegister(formdata);
        }
        navigate('/user/dashboard/home')
    }
    const {type} = useParams();
    const [login, setLogin] = useState(type==='login' ? true : false);
    const userHeaderStyle = 'w-96 h-10 flex-row-style justify-center p-2 text-3xl text-green-800 font-semibold font-sans';
    const userInputStyle = 'border-none w-80 h-10 p-4 bg-gray-100 text-md outline-none placeholder:text-gray-450';
    const userButtonStyle = 'border-none rounded-full w-32 p-2 bg-green-600 text-white hover:opacity-80';
    const ssoStyle = 'w-10 h-10 rounded-full p-2';
    return (
        <div className="w-full h-screen flex-col-style justify-center">
            <form className={`border border-gray-300 rounded-xl shadow-xl w-[50%] ${login ? 'h-[28rem] p-4':'h-[35rem]'} flex-col-style justify-evenly`}>
                <div>
                    <span className={`${userHeaderStyle}`}>{login ? 'Login' : 'Create Account'}</span>
                </div>
                <div className="w-[23rem] h-72 flex-col-style justify-center space-y-[10px] p-4 ">
                    {!login && <input onChange={(e) => setname(e.target.value)} type="text" placeholder='Name' className={`${userInputStyle}`} required/>}
                    {!login && <input onChange={(e) => setemail(e.target.value)} type="email" placeholder='Email' className={`${userInputStyle}`} required/>}
                    {login && <input onChange={(e) => setemail(e.target.value)} type="email" placeholder='Email' className={`${userInputStyle}`} required/>}
                    {login && <input onChange={(e) => setpassword1(e.target.value)} type="password" placeholder='Password' className={`${userInputStyle}`} required/>}
                    {!login && <input onChange={(e) => setpassword1(e.target.value)} type="password" placeholder='Password' className={`${userInputStyle}`} required/>}
                    {!login && <input onChange={(e) => setpassword2(e.target.value)} type="password" placeholder='Re-password' className={`${userInputStyle}`} required/>}
                    {login && <span className="underline underline-offset-4 w-full px-2 text-[0.8rem] text-blue-500 text-right"> Forgot password?</span>}
                    {login ? 
                    <button onClick={(e) => {handleSubmit(e, 'login')}} className={`${userButtonStyle}`} type="submit">Login</button> :
                    <button onClick={(e) => {handleSubmit(e, 'register')}} className={`${userButtonStyle}`} type="submit">Register</button>
                    }
                    {login ? 
                    <span className=" w-full px-2 text-[0.8rem] text-gray-500 text-center cursor-pointer">
                        Not registered? 
                        <span onClick={() => {reset(); return setLogin((prev) => !prev)}} className='text-blue-500'> Register</span>
                    </span> :
                    <span className=" w-full px-2 text-[0.8rem] text-gray-500 text-center cursor-pointer">
                        Already registered? 
                        <span onClick={() => {reset(); return setLogin((prev) => !prev)}} className='text-blue-500'> Login</span>
                    </span>
                    }
                </div>
                <fieldset className="border-t w-80 text-gray-400 text-center"><legend className="px-4">or</legend></fieldset>
                <div className="w-96 h-20 flex-row-style justify-center space-x-4">
                    <span><img src={fbsso} alt="" className={`${ssoStyle}`} /></span>
                    <span><img src={googlesso} alt="" className={`${ssoStyle}`} /></span>
                    <span><img src={linsso} alt="" className={`${ssoStyle}`} /></span>
                </div>
            </form>
        </div>
    )
}

export default Login;
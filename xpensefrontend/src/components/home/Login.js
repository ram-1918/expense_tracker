// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]
import googlesso from '../../images/google_sso.png'
import fbsso from '../../images/fb_sso.png'
import linsso from '../../images/linksso.png'
import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'


function handleRegister(){
    return 
}

const Register = () => {
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
        const result = handleRegister(formdata);
        navigate('/user/dashboard/home')
    }
    const userHeaderStyle = 'w-96 h-10 flex-row-style justify-center p-2 text-3xl text-green-800 font-semibold font-sans';
    const userInputStyle = 'border-none w-80 h-10 px-2 bg-gray-100 text-md outline-none placeholder:text-gray-450 placeholder:text-sm';
    const userButtonStyle = 'border-none rounded-full w-32 p-2 bg-green-600 text-white hover:opacity-80';
    const labelStyles = 'w-full text-md font-light flex-row-style space-x-2';
    const mark = 'border border-gray-500 rounded-full w-4 h-4 flex-row-style justify-center text-[0.8rem] px-2 cursor-pointer hover:scale-[1.03]';

    return (
        <div className="w-full h-screen flex-col-style justify-center">
            <form className={`border border-gray-300 rounded-xl shadow-xl w-[50%] h-[28rem] flex-col-style justify-center`}>
                <div>
                    <span className={`${userHeaderStyle}`}>Welcome</span>
                </div>
                <div className="w-[23rem] h-72 flex-col-style justify-center space-y-[10px] p-4">
                    <span>
                        <label className={`${labelStyles}`}><d>Email</d></label>
                        <input onChange={(e) => setemail(e.target.value)} type="email" placeholder='Enter your email address' className={`${userInputStyle}`} required/>
                    </span>
                    <span>
                        <label className={labelStyles}>Password</label>
                        <input onChange={(e) => setpassword2(e.target.value)} type="password" placeholder='Enter your password' className={`${userInputStyle}`} required/>
                    </span>
                </div>
                <button onClick={(e) => {handleSubmit(e, 'login')}} className={`${userButtonStyle}`} type="submit">Login</button>
                <span className=" w-full px-2 text-[0.8rem] text-gray-500 text-center cursor-pointer pt-4">
                    Not yet registered? 
                    <span onClick={() => {reset(); navigate('/users/register')}} className='text-blue-500'> Register</span>
                </span>
                {/* <fieldset className="border-t w-80 text-gray-400 text-center"><legend className="px-4">or</legend></fieldset> */}
            </form>
        </div>
    )
}

export default Register;
import { useState } from "react";
import axios from 'axios';
import { API_URL } from "../../store/constants";
import { Link, useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux';
import { selectLinkStyles, selectResponsiveBGs } from './store/slice';
import BaseHeader from "../basepages/BaseHeader";
import BaseButton from "../basepages/BaseButton";
import BaseField from "../basepages/BaseField";
import Message from "../basepages/Message";

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
  
  setTimeout(() => setSuccussMsg(''), 2800)
  setTimeout(() => {setErrorMsg('')}, 2800);

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
      alert('in')
      if (response.data === 'created'){
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
    })
    .catch((err) => {
      const errors = err.response.data;
      console.log(errors);
      if (errors === 'unauthorized'){
        setProceedCheck(true);
        setErrorMsg('you Seems like unauthorized, try to make a request for registration!');
      }
      setErrfield((prevstate) => ({...prevstate, ...errors}));
      console.log(errorField);
      
    })
  }
    return (
      <>
        <BaseHeader text="Registration" />
        {keys.map((key, index) => (
          errorField[key] ? <li className='text-[0.8rem] text-red-600 list-style-none' key={index}>{errorField[key]}</li> : ''
          ))}
        <Message msg={succussMsg} type="succuss"/>
        <Message msg={errorMsg} type="error"/>
        <div className='flex flex-col justify-center items-center w-full h-full space-y-2 mt-2'>
            <BaseField legend="Email" plholder="Enter your email address" value={email} type="email" setField={setEmail} />
            <BaseField legend="EmployeeID" plholder="Enter your employee ID"  type="text" value={employeeid} setField={setEmployeeid} />
            <BaseField legend="Fullname" plholder="Enter your fullname" value={fullname} type="text" setField={setFullname} />
            <BaseField legend="Password" plholder="Enter your password" value={password1} type="password" setField={setPassword1} />
            <BaseField legend="Re-enter password" plholder="Re-enter your password" type="password" value={password2} setField={setPassword2} />
            <BaseField legend="Company" plholder="Enter you company"  type="text" value={company} setField={setCompany} />
            <div className={`${proceedCheck ? 'block' : 'hidden' }`}>
              <BaseField legend="Comment" plholder="Specify the reason to proceed for registration"  type="text" value={comment} setField={setComment} />
            </div>

            <span onClick={(e) => handleSubmit(e)}><BaseButton type="submit" mode="user" text={proceedCheck ? 'Proceed to request' : 'Register'} others='w-24'/></span>
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


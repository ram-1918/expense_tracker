import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { API_URL } from "../../store/constants";
import { selectPrevRoute, setPrevRoute, setUsername } from './store/slice';
import { IsAuthenticated, UpdateState, containsUppercase} from "./services/Services";

import defaultimg from '../../images/default.png';
import { getUserProfile, updateUserProfile } from "./services/apicalls";
import Message from "../basepages/Message";
import BaseDisplay from "../basepages/BaseDisplay";

export function VerifyEmail({userid, setEmail, setEmailChange, setSuccussMsg, setErrorMsg}) {
    const [newEmail, setNewEmail] = useState('');
    let [emailVerified, setEmailVerified] = useState(false);

    const inputStyles = 'w-64 p-2 text-md font-normal border-b border-b-red-200 outline-none bg-inherit'

    const verifyEmail = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        // PHONE NUMBER VALIDATION REQUIRED
        if (newEmail === '' || ! /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}/.test(newEmail)){
            setErrorMsg('Enter a valid email address')
            setTimeout(() => setErrorMsg(''), 2000);
            return 
        }
        formdata.append('email', newEmail);
        formdata.append('passwordchange', false);
        formdata.append('emailchange', true);
        axios.patch(`${API_URL}/users/register/${userid}`, formdata)
        .then(() => {
            setEmail(newEmail);
            setNewEmail('');
            setEmailChange(false);
            setSuccussMsg('Email verified and updated!')
            setTimeout(() => setSuccussMsg(''), 2000);
            setErrorMsg('');
            setEmailVerified(true);
        })
        .catch((error) => {
            console.error(error);
            setErrorMsg('This email ID is already taken!');
            setTimeout(() => setErrorMsg(''), 2000);
        })
    }
    return (
        <div className="flex flex-col space-y-4 absolute top-[30%] left-[50%] bg-white p-8 shadow-3xl rounded-xl">
            <p className='text-2xl font-normal '>Modify email</p>
            <input className={`${inputStyles}`} placeholder='Enter new email address' type="text" value={newEmail} onChange = {(e) => {setNewEmail(e.target.value)}} required />
            <button className="p-2 w-36 rounded-xl border-none outline-none bg-red-100" onClick={verifyEmail}>Verify & update</button>
        </div>
    )
}

function VerifyPassword({userid, setPassword, setPasswordChange, setSuccussMsg, setErrorMsg}) {
    const formdata = new FormData();

    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');

    let [password1Type, setPassword1Type] = useState('text');
    let [password2Type, setPassword2Type] = useState('text');

    let [passwordVerified, setPasswordVerified] = useState(false);

    const inputStyles = 'w-64 p-2 text-md font-normal border-b border-b-red-200 outline-none bg-inherit'

    const verifyPassword = (e) => {
        e.preventDefault();
        if(newPassword1 === newPassword2){
            if (newPassword1.length >= 7){
                if (containsUppercase(newPassword1)){
                    if (/[0-9]/.test(newPassword1)){
                        formdata.append('password', newPassword1);
                        formdata.append('passwordchange', true);
                        formdata.append('emailchange', false);
                        axios.patch(`${API_URL}/users/register/${userid}`, formdata)
                        .then(() => {
                            setPassword(newPassword1);
                            setNewPassword1('');
                            setNewPassword2('');
                            setPasswordChange(false);
                            alert('few')
                            setErrorMsg('');
                            setPasswordVerified(true);
                            setSuccussMsg('Password updated');
                            setTimeout(() => setSuccussMsg(''), 2000);

                        })
                        .catch((error) => {
                            console.error(error);
                            setErrorMsg('Issue updating password!');
                        })
                    }
                    else{
                        setErrorMsg('Password should have atleast one number')
                    }
                }
                else{
                    setErrorMsg('should contain atleast one uppercase');
                }
            }
            else{
                setErrorMsg('Should be atleast 7 charecters long')
            }
        }
        else{
            setErrorMsg("Incorrect Password!");
        }
        setTimeout(() => setErrorMsg(''), 2000);
    }
    return (
        <div className="flex flex-col space-y-4 absolute top-[30%] left-[50%] bg-white p-8 shadow-3xl rounded-xl">
            <p className='text-2xl font-normal '>Modify password</p>
            <input className={`${inputStyles}`} placeholder='Enter new password' type={password1Type} value={newPassword1} onChange = {(e) => {
                setTimeout(() => setPassword1Type('password'), 1000)
                setNewPassword1(e.target.value)
                setPassword1Type('text')
                }} required/>
            <input className={`${inputStyles}`} placeholder='Re-enter new password' type={password2Type} value={newPassword2} onChange = {(e) => {
                setTimeout(() => setPassword2Type('password'), 1000)
                setNewPassword2(e.target.value)
                setPassword2Type('text')
                }} required/>
            <button className="p-2 w-36 rounded-xl border-none outline-none bg-red-100" onClick={verifyPassword}>Verify & update</button>
        </div>
    )
}

const UpdateProfile = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const isLogged = IsAuthenticated();
    const prevRoute = useSelector(selectPrevRoute)
    console.log("isLogged ", isLogged);
    if(isLogged){
        setPrevRoute(location.pathname);
        console.log('path set for reroute', prevRoute)
    }
    const [userid] = UpdateState();

    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [company, setCompany] = useState('');
    const [employeeid, setEmployeeid] = useState('');
    const [image, setImage] = useState('');
    const [newImage, setNewImage] = useState([]);

    let [emailChangeRequest, setEmailChange] = useState(false);
    let [passwordChangeRequest, setPasswordChange] = useState(false);
    let [password1Type, setPassword1Type] = useState('text');
    let [password2Type, setPassword2Type] = useState('text');
    let [emailVerified, setEmailVerified] = useState(false);
    let [passwordVerified, setPasswordVerified] = useState(false);

    let [succussMsg, setSuccussMsg] = useState('');
    let [errorMsg, setErrorMsg] = useState('');
    setTimeout(() => setSuccussMsg(''), 2000);
    setTimeout(() => setErrorMsg(''), 2000);

    // const inputStyles = 'w-64 p-2 text-md font-normal border-b border-b-red-200 outline-none bg-inherit'
    const trStyles = 'w-full flex flex-row justify-center items-center space-x-2 py-2';
    // const labelStyles = 'w-48 text-right text-lg font-light p-2';

    useEffect(() => {
        getUserProfile(userid)
        .then(((response) => {
            const data = response.data;
            setFullname(data['fullname'])
            setPhone(data['phone']);
            setEmail(data['email']);
            setPassword(data['password'].slice(0,15));
            setCompany(data['company_id']);
            setEmployeeid(data['employee_id']);
            setImage(data['image']);
            setSuccussMsg('Data loaded succussfully');
        }))
        .catch(() => {
            setErrorMsg('Error occurred, try to reload the page!')
        })
    }, [userid])

    const handleProfileData = (e) => {
        e.preventDefault();
        // CHECK DATA WITH THE OLD, BEFORE UPDATING; SAVE APICALLs
        const formdata = new FormData();
        formdata.append('fullname', fullname);
        formdata.append('passwordchange', false);
        formdata.append('emailchange', false);
        formdata.append('image', newImage);

        if(emailChangeRequest && emailVerified){
            formdata.append('email', email);
        }
        if (!(emailChangeRequest || passwordChangeRequest)){
            updateUserProfile(userid, formdata)
            .then((response) => {
                const data = response.data;
                dispatch(setUsername(fullname));
                const imageUrl = API_URL+response.data['image'];
                if(imageUrl !== image) {setImage(imageUrl); setNewImage([])}
                data === 'userupdated' ? setSuccussMsg('Updated Succussfully!') : setSuccussMsg('');
                setTimeout(() => setSuccussMsg(''), 2000);
            })
            .catch((err) => {
                console.log(err);
                setErrorMsg('Error occured');
                setTimeout(() => setErrorMsg(''), 2000);
            })
        }
        else if((emailChangeRequest || passwordChangeRequest) && !(emailVerified || passwordVerified)){
            setErrorMsg('Since you opted to modify, please verify email/password first');
            setTimeout(() => setErrorMsg(''), 2000);
        }
        else{
            setErrorMsg('');
        }
    }
    const vals = [
        {label: "EmployeeID", value:employeeid, setField: setEmployeeid, type:'text'},
        {label: "Fullname", value:fullname, setField: setFullname, type:'text'},
        {label: "Email", value:email, setField: setEmail, type:'email', setFieldChange:setEmailChange, checkBoxChange:emailChangeRequest},
        {label: "Password", value:password, setField: setPassword, type:'password', setFieldChange: setPasswordChange, checkBoxChange: passwordChangeRequest},
        {label: "Company", value:company, setField: setCompany, type:'text'},
        {label: "Phone", value:phone, setField: setPhone, type:'text'},
    ]
    return (
            <div className='w-full h-screen flex flex-col overflow-scroll overflow-x-hidden'>
                <Message msg={succussMsg} type="succuss"/>
                <Message msg={errorMsg} type="error"/>
                <div className="w-[80%] m-auto text-center py-8 flex flex-col  items-center space-y-2">
                    <h2 className='text-3xl font-light'>Update Information</h2>

                    <form className='w-full flex flex-row justify-center items-center m-auto'>

                        <div className={`${trStyles} flex flex-col space-y-2`}>
                            <img src={image} alt={defaultimg} width="200" height="200" ></img>
                            {/* <input type="file" accept="image/png, image/gif, .jpeg, image/*" onChange={(e) => {setNewImage(e.target.files[0])}}/> */}
                            <input type="file" accept="image/png, image/gif, .jpeg, image/*" onChange={(e) => {setNewImage(e.target.files[0])}}/>
                        </div>
                        <div>
                            {vals.map((obj) => 
                            <BaseDisplay 
                                type={obj.type} 
                                label={obj.label} 
                                value={obj.value} 
                                setField={obj.setField} 
                                setFieldChange={obj.setFieldChange}
                                checkBoxChange={obj.checkBoxChange} />
                            ) }
                            <span className='w-full flex flex-col ustify-center items-center space-x-4' onClick={() => setEmailChange((prev) => !prev)}>
                                <span className="flex space-x-2 justify-center items-center">
                                    <input type="checkbox" checked={emailChangeRequest} onChange = {() => setEmailChange((prev) => !prev)} />
                                    <label>Modify email</label>
                                </span>
                                <div className={` flex flex-col justify-center space-y-4 p-2`}>
                                    {emailChangeRequest && <VerifyEmail userid={userid} setEmail={setEmail} setEmailChange={setEmailChange} setSuccussMsg={setSuccussMsg} setErrorMsg={setErrorMsg} /> }
                                </div>
                            </span>
                            <span className='w-full flex flex-col ustify-center items-center space-x-4'>
                                <span className='flex space-x-2' onClick={() => setPasswordChange((prev) => !prev)}>
                                    <input type="checkbox" checked={passwordChangeRequest} onChange = {() => setPasswordChange((prev) => !prev)} />
                                    <label>Modify Password</label>
                                </span>
                                <div>
                                    {passwordChangeRequest && <VerifyPassword userid={userid} setPassword={setPassword} setPasswordChange={setPasswordChange} setSuccussMsg={setSuccussMsg} setErrorMsg={setErrorMsg} /> }
                                </div>
                            </span>
                        </div>
                    </form>
                    <button type='submit' onClick={handleProfileData} className='p-2 w-80 rounded-xl border-none outline-none text-white bg-gray-700'>Update</button>
                </div>
            </div>
        )
}

export default UpdateProfile;
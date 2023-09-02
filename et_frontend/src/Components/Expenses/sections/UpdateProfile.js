import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { UpdateState, containsUppercase, isLoggedIn } from "../../../Services";
import { API_URL } from "../../../store/constants";
import { selectPrevRoute, setPrevRoute, setUsername } from "../../User/store/slice";

const UpdateProfile = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const isLogged = isLoggedIn();
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

    const inputStyles = 'w-64 p-2 text-md font-normal border-b border-b-red-200 outline-none bg-inherit'
    const trStyles = 'w-full flex flex-row justify-center items-center space-x-2 py-2';
    const labelStyles = 'w-48 text-right text-lg font-light p-2';

    useEffect(() => {
        axios.get(`${API_URL}/users/register/${userid}`)
        .then(((response) => {
            // console.log(response.data)
            let data = response.data;
            console.log('After loading', data);
            setFullname(data['fullname'])
            setPhone(data['phone'])
            setEmail(data['email'])
            setPassword(data['password'].slice(0,15))
            setCompany(data['company_id'])
            setEmployeeid(data['employee_id'])
            setImage(data['image'])
            setSuccussMsg('Data loaded succussfully');
            setTimeout(() => setSuccussMsg(''), 2000)
        }))
        .catch((error) => {
            console.log(error);
            setErrorMsg('Error occurred, try to reload the page!')
            setTimeout(() => setErrorMsg(''), 2000)
        })
    }, [userid])

    const handleProfileData = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('email', email);
        formdata.append('image', newImage);
        formdata.append('passwordchange', false);
        formdata.append('emailchange', false);
        // let data = {
        //     "fullname": fullname,
        //     "email": email,
        //     "emailchange": false,
        //     "passwordchange": false
        // }
        // data = phone ? {...data, "phone":phone} : {...data}
        // data = newImage ? {...data, "image": newImage} : {...data}
        if(emailChangeRequest && emailVerified){
            // data['email'] = email
            formdata.append('email', email);
        }
        console.log(emailChangeRequest, passwordChangeRequest)
        if (!(emailChangeRequest || passwordChangeRequest)){
            axios.patch(`${API_URL}/users/register/${userid}`, formdata, {
                headers: {
                  'Content-Type': 'multipart/form-data', // Important for file upload
                }})
            .then((response) => {
                const data = response.data;
                console.log(data, 'from the update func');
                dispatch(setUsername(fullname));
                const imageUrl = response.data;
                setImage(imageUrl);
                data === 'userupdated' ? setSuccussMsg('Updated Succussfully!') : setSuccussMsg('');
                setTimeout(() => setSuccussMsg(''), 2000);
            })
            .catch((err) => {
                console.log(err);
                setErrorMsg('Enter valid email or password');
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
    const verifyEmail = (e) => {
        e.preventDefault();
        // PHONE NUMBER VALIDATION REQUIRED
        if (newEmail === '' || ! /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}/.test(newEmail)){
            setErrorMsg('Enter a valid email address')
            setTimeout(() => setErrorMsg(''), 2000);
            return 
        }
        const data = {
            "email": newEmail,
            "passwordchange": false,
            "emailchange": true
        }
        axios.patch(`${API_URL}/users/register/${userid}`, data)
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
    const verifyPassword = (e) => {
        e.preventDefault();
        if(newPassword1 === newPassword2){
            if (newPassword1.length >= 7){
                if (containsUppercase(newPassword1)){
                    if (/[0-9]/.test(newPassword1)){
                        const data = {
                            "password": newPassword1,
                            "passwordchange": true,
                            "emailchange": false
                        }
                        axios.patch(`${API_URL}/users/register/${userid}`, data)
                        .then(() => {
                            setPassword(newPassword1);
                            setNewPassword1('');
                            setNewPassword2('');
                            setPasswordChange(false);
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
            <div className='w-full h-screen flex flex-col overflow-scroll overflow-x-hidden'>
                <div className="w-[60%] h-[90%] m-auto text-center flex flex-col  items-center space-y-2">
                    <h2 className='text-3xl font-light'>Update Information</h2>
                    <span className="py-2 text-red-600">
                        {errorMsg}
                    </span>
                    <span className="text-green-600">
                        {succussMsg}
                    </span>
                    <form className='flex flex-col justify-center items-center m-auto'>
                        <div className={`${trStyles} flex flex-col space-y-2`}>
                            <img src={image} alt={image} width="200" height="200" ></img>
                            {/* <input type="file" accept="image/png, image/gif, .jpeg, image/*" onChange={(e) => {setNewImage(e.target.files[0])}}/> */}
                            <input type="file" accept="image/png, image/gif, .jpeg, image/*" onChange={(e) => {setNewImage(e.target.files[0])}}/>
                        </div>                        
                        <div className={`${trStyles}`}>
                            <label className={`${labelStyles} `} >Employee ID</label>
                            <input className={`${inputStyles} opacity-60`} name='Employeeid' value={employeeid} onChange={(e) => setEmployeeid(e.target.value) } disabled /> 
                        </div>
                        <div className={`${trStyles}`}>
                            <label className={`${labelStyles}`} >Fullname</label>
                            <input className={`${inputStyles}`} name='fullname' value={fullname} onChange={(e) => setFullname(e.target.value) } /> 
                        </div>
                        <div className={`${trStyles}`}>
                            <label className={`${labelStyles}`}>Email</label>
                            <input className={`${inputStyles} opacity-60`}  name='email' value={email} disabled/>
                        </div>
                        <div className={`w-full flex flex-col justify-center items-center space-y-2 p-2`}>
                            <span className='flex space-x-2' onClick={() => setEmailChange((prev) => !prev)}>
                                <input type="checkbox" checked={emailChangeRequest} onChange = {() => setEmailChange((prev) => !prev)} />
                                <label>Modify email</label>
                            </span>
                            {emailChangeRequest ?
                                <>
                                    <input className={`${inputStyles}`} placeholder='Enter new email address' type="text" value={newEmail} onChange = {(e) => {setNewEmail(e.target.value)}} required />
                                    <button className="p-2 w-36 rounded-xl border-none outline-none bg-red-100" onClick={verifyEmail}>Verify & update</button>
                                </>
                                : 
                                ''
                             }
                        </div>
                        <div className={`${trStyles}`}>
                            <label className={`${labelStyles}`}>Password</label>
                            <input className={`${inputStyles} opacity-60`}  type='password' name='password' value={password} disabled/>
                        </div>
                        <div className={`w-full flex flex-col justify-center items-center space-y-2 p-2`}>
                            <span className='flex space-x-2' onClick={() => setPasswordChange((prev) => !prev)}>
                                <input type="checkbox" checked={passwordChangeRequest} onChange = {() => setPasswordChange((prev) => !prev)} />
                                <label>Modify Password</label>
                            </span>
                            {passwordChangeRequest ?
                                <>
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
                                </>
                                : 
                                ''
                             }
                        </div>
                        <div className={`${trStyles}`}>
                            <label className={`${labelStyles}`}>Phone</label>
                            <input className={`${inputStyles}`} name='phone' value={phone} onChange={(e) => setPhone(e.target.value) } />
                        </div>
                        <div className={`${trStyles}`}>
                            {/* Dropdown */}
                            <label className={`${labelStyles}`}>Company</label>
                            <input className={`${inputStyles}`} name='company' value={company} onChange={(e) => setCompany(e.target.value) } />
                        </div>
                    </form>
                    <button type='submit' onClick={handleProfileData} className='p-2 w-80 rounded-xl border-none outline-none bg-red-100'>Update</button>
                </div>
            </div>
        )
}

export default UpdateProfile;
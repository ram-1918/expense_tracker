import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../store/constants';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {selectUserRole} from '../../User/store/slice';
import { selectTotalRegiRequests, setTotalRegiRequests} from '../store/slice';

const Display = ({obj, handlestatus}) => {
    const rowStyle = 'w-full text-center flex flex-row justify-around items-center p-2 border list-none'
    const objectStyle = 'text-md p-2 '
    const buttonStyle = 'border-none outline-none rounded-lg p-2 mx-2';
    const commentStyles = 'p-2 my-2 border bg-gray-100';
    const [viewComment, setViewComment] = useState(false);
    return (
            <>
                <div className={`flex flex-col`}>
                    <div className={`${rowStyle}`}>
                        <li className={`${objectStyle} w-44`}>
                            <button type="button" onClick={() => setViewComment((prev) => !prev)}>+</button> {obj.employeeid}
                        </li>
                        <li className={`${objectStyle} w-64`}>{obj.fullname}</li>
                        <li className={`${objectStyle}  w-80 overflow-x-scroll`}>{obj.email}</li>
                        <li className={`${objectStyle} w-64`}>{obj.phone ? obj.phone : 'N/A'}</li>
                        <li className={`${objectStyle} w-48`}>{obj.company}</li>
                        <div className='w-72'>
                            <button type="button" onClick= {() => {handlestatus({"email":obj.email, "status":true})}} className={`${buttonStyle} bg-green-200`}>Accept</button>
                            <button type="button" onClick={() => handlestatus({"email":obj.email, "status":false})} className={`${buttonStyle} bg-red-200`}>Reject</button>
                        </div>
                    </div>
                    { viewComment ?  
                    <div className={`${commentStyles}`}>
                        {obj.comment}
                    </div>
                    :
                    <></>
                    }
                </div>
            </>
        )
}

const ViewRequests = () => {
    let { userid } = useParams();
    const dispatch = useDispatch();
    const totalRequests = useSelector(selectTotalRegiRequests);

    const role = useSelector(selectUserRole);
    let [displayData, setDisplaydata] = useState([])

    const [succussMsg, setSuccussMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const headerStyle = 'w-full bg-gray-100 text-center flex flex-row justify-around items-center p-2 list-none'
    const headObjectStyle = 'border-r-2 text-lg font-light p-2 '

    const handleStatus = (data) => {
        // const index = displayData.findIndex((i) => { return i.email === data.email}); temp.splice(index, 1);
        axios.post(`${API_URL}/users/approverequest/`, data)
        .then(() => {
            console.log("status changed");
            const updatedData = displayData.filter((i) => i.email !== data.email)
            setDisplaydata(updatedData);
            dispatch(setTotalRegiRequests(updatedData.length))
            setSuccussMsg('Request accepted succussfully!');
            setTimeout(() => setSuccussMsg(''), 2000);
        })
        .catch((error) => {
            console.log(error.response, "VIEW REQUESTS")
            setErrorMsg('Issue occured!');
            setTimeout(() => setErrorMsg(''), 2000);
        })
    }

    useEffect(() => {
        axios.get(`${API_URL}/users/approverequest/`, {params:{"role":role }})
        .then((response) => {
            setDisplaydata(JSON.parse(response.data));
            dispatch(setTotalRegiRequests(displayData.length))
            // setSuccussMsg('Requests loaded succussfully!');
            // setTimeout(() => setSuccussMsg(''), 2000);
        })
        .catch(() => {
            setErrorMsg('Loading requests failed!');
            setTimeout(() => setErrorMsg(''), 2000);
        })
    }, [userid, role])

    return (
        <div className='flex flex-col h-screen mx-2 overflow-scroll'>
            <div className='w-full flex p-2 flex items-center justify-center space-x-2'>
                <span className='text-xl font-normal text-neutral-500'>Registration Requests</span>
                {succussMsg}
                {/* {errorMsg} */}
                <sup className='text-[1rem] border border-neutral-400 w-6 h-6 rounded-full flex justify-center items-center'>{totalRequests}</sup>
            </div>
            <div className={`${headerStyle}`}>
                <li className={`${headObjectStyle} w-44`}>EmployeeID</li>
                <li className={`${headObjectStyle} w-64`}>Fullname</li>
                <li className={`${headObjectStyle} w-80 overflow-x-scroll`}>Email address</li>
                <li className={`${headObjectStyle} w-64`}>Phone number</li>
                <li className={`${headObjectStyle} w-48`}>Company</li>
                <li className={`${headObjectStyle} w-72`}>Status</li>
            </div>
            {
                displayData.length ? 
                displayData.map((obj, idx) => ( <Display obj={obj} key={idx} handlestatus={handleStatus} /> )) : 
                <div className={`w-full bg-neutral-200 h-screen flex items-center justify-center`}>
                    <span className={`text-[3rem] font-extralight rotate-[-45deg]`}>No requests to display</span>
                </div>
            } 
        </div>
    )
}


export default ViewRequests;
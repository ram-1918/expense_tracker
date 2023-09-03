import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {selectUserRole} from '../users/store/slice';
import { setTotalRegiRequests} from './store/slice';
import { formStyles } from '../BaseStyles';
import NoContent from '../basepages/NoContent';
import Message from '../basepages/Message';
import BaseHeader from '../basepages/BaseHeader';
import { changeRequestStatus, registerRequests } from '../../services/apicalls';
import BaseButton from '../basepages/BaseButton';

const Display = ({obj, handlestatus}) => {
    const [viewComment, setViewComment] = useState(false);
    return (
            <>
                <div className={`flex flex-col`}>
                    <div className={`${formStyles.row}`}>
                        <li className={`${formStyles.object} w-44`}>
                            <button type="button" onClick={() => setViewComment((prev) => !prev)}>+</button> {obj.employeeid}
                        </li>
                        <li className={`${formStyles.object} w-64`}>{obj.fullname}</li>
                        <li className={`${formStyles.object}  w-80 overflow-x-scroll`}>{obj.email}</li>
                        <li className={`${formStyles.object} w-64`}>{obj.phone ? obj.phone : 'N/A'}</li>
                        <li className={`${formStyles.object} w-48`}>{obj.company}</li>
                        <div className='w-72'>
                            {/* <button type="button"  className={`${formStyles.button} bg-green-200`}>Accept</button> */}
                            <span onClick= {() => {handlestatus({"email":obj.email, "status":true})}}><BaseButton type="button" mode="accept" text="Accept"/></span>
                            <span onClick= {() => {handlestatus({"email":obj.email, "status":true})}}><BaseButton type="button" mode="reject" text="Reject"/></span>
                        </div>
                    </div>
                    { viewComment ?  
                    <div className={`${formStyles.comment}`}>
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

    const role = useSelector(selectUserRole);
    let [displayData, setDisplaydata] = useState([]);

    const [succussMsg, setSuccussMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    setTimeout(() => setSuccussMsg(''), 2800);
    setTimeout(() => setErrorMsg(''), 2800);

    useEffect(() => {
        registerRequests(role)
        .then((response) => {
            setDisplaydata(JSON.parse(response.data));
            dispatch(setTotalRegiRequests(displayData.length))
            setSuccussMsg('Requests loaded succussfully!');
        })
        .catch(() => {
            setErrorMsg('Loading requests failed!');
        })
    }, [userid, role, displayData.length])

    const handleStatus = (data) => {
        changeRequestStatus(data)
        .then(() => {
            const updatedData = displayData.filter((i) => i.email !== data.email)
            setDisplaydata(updatedData);
            dispatch(setTotalRegiRequests(updatedData.length))
            setSuccussMsg('Updated succussfully!');
        })
        .catch(() => {
            setErrorMsg('Issue occured!');
        })
    }
    return (
        <div className='flex flex-col h-screen mx-2 overflow-scroll'>
            <BaseHeader text="Registration Requests" />
            <Message msg={succussMsg} type="succuss"/>
            <Message msg={errorMsg} type="error"/>
            <div className={`${formStyles.header}`}>
                <li className={`${formStyles.headObject} w-44`}>EmployeeID</li>
                <li className={`${formStyles.headObject} w-64`}>Fullname</li>
                <li className={`${formStyles.headObject} w-80 overflow-x-scroll`}>Email address</li>
                <li className={`${formStyles.headObject} w-64`}>Phone number</li>
                <li className={`${formStyles.headObject} w-48`}>Company</li>
                <li className={`${formStyles.headObject} w-72`}>Status</li>
            </div>
            {
                displayData.length ? 
                displayData.map((obj, idx) => ( <Display obj={obj} key={idx} handlestatus={handleStatus} /> )) : 
                <NoContent msg="No requests to display" />
            } 
        </div>
    )
}


export default ViewRequests;
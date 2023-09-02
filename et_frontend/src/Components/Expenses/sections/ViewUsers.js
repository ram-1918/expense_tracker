import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {API_URL} from '../../../store/constants';

const Display = ({data}) => {
    return (
        <div className='flex flex-row w-[30%] justify-center items-center bg-stone-400 m-2'>
            <div className=''>{data.fullname}</div>
        </div>
    )
}

const ViewUsers = () => {
    let {userid} = useParams();
    let [usersData, setUsersData] = useState([]);
    useEffect(() => {
        axios.get(`${API_URL}/users/register/?id=${userid}`)
        .then((response) => {
            setUsersData(response.data);
        })
        .catch((error) => {
            console.log(error, 'VIEW USERS CATCH')
        })
    }, [userid, API_URL])
    return (
            <div className='flex flex-col h-screen overflow-scroll overflow-x-hidden'>
                <p>ViewUsers Page</p>
                
                <div className='flex flex-row w-full h-screen justify-center items-start bg-neutral-300'>
                    {usersData.map((obj, idx) => <Display key={idx} data={obj} />)}
                </div>
            </div>
        )

}

export default ViewUsers;
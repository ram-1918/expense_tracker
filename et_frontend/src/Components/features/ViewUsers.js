import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import {getCompanies, getUsersByCompanies} from '../../services/apicalls';
import { selectCompany, selectUserRole } from '../users/store/slice';

const Display = ({data}) => {
    return (
        <div className='flex flex-row w-[30%] justify-center items-center bg-stone-400 m-2'>
            <div className=''>
                {data.id}
                {data.name}
            </div>
        </div>
    )
}

const ViewUsers = () => {
    let {userid} = useParams();
    let [usersData, setUsersData] = useState([]);
    const role = useSelector(selectUserRole);
    const company = useSelector(selectCompany);

    useEffect(() => {
        console.log(role,company);
        if (role === 'superadmin' || role === 'admin'){
            getCompanies(role)
            .then((response) => {
                setUsersData(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error, 'VIEW USERS CATCH')
            })
        }
        // else if (role === 'admin') {
        //     getUsersByCompanies(role, company)
        //     .then((res) => {
        //         setUsersData(res.data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })
        // }

    }, [userid, role, company])
    return (
            <div className='flex flex-col h-screen overflow-scroll overflow-x-hidden'>
                <div className='flex flex-row w-full h-screen justify-center items-start bg-neutral-300'>
                    {usersData.map((obj, idx) => <Display key={idx} data={obj} />)}
                </div>
            </div>
        )

}

export default ViewUsers;
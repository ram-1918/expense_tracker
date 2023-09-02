
import { useSelector } from 'react-redux';
import { selectActiveUserID } from '../../User/store/slice';


const ViewSubmissions = () => {
    let activeUserId = useSelector(selectActiveUserID);

    return (
            <div className='flex flex-col h-screen overflow-scroll'>
                <p>ViewSubmissions Page</p>
                {activeUserId}
            </div>
        )

}

export default ViewSubmissions;
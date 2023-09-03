
import { useSelector } from 'react-redux';
import { selectActiveUserID } from '../users/store/slice';


const ViewSubmissions = () => {
    let activeUserId = useSelector(selectActiveUserID);

    return (
            <div className='flex flex-col h-screen overflow-scroll'>
                <p>MyExpenses Page</p>
                {activeUserId}
            </div>
        )

}

export default ViewSubmissions;
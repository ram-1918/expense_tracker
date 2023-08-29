
import { useSelector } from 'react-redux';
import { selectActiveUserID } from '../../User/store/slice';

const ViewRequests = () => {
    let activeUserId = useSelector(selectActiveUserID);

    return (
            <div className='flex flex-col h-screen overflow-scroll'>
                <p>ViewRequests Page</p>
                {activeUserId}
            </div>
        )

}

export default ViewRequests;
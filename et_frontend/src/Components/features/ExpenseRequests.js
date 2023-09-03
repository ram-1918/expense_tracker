import { useSelector } from 'react-redux';
import { selectActiveUserID } from '../users/store/slice';

const ProcessRequests = () => {
    let activeUserId = useSelector(selectActiveUserID);

    return (
            <div className='flex flex-col h-screen overflow-scroll'>
                <p>ProcessRequests Page</p>
                {activeUserId}
            </div>
        )

}

export default ProcessRequests;

import { useSelector } from 'react-redux';
import { selectActiveUserID } from '../../User/store/slice';

const TrackRequest = () => {
    let activeUserId = useSelector(selectActiveUserID);

    return (
            <div className='flex flex-col h-screen overflow-scroll'>
                <p>TrackRequest Page</p>
                {activeUserId}
            </div>
        )

}

export default TrackRequest;
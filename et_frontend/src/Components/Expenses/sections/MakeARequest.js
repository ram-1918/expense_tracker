
import { useSelector } from 'react-redux';
import { selectActiveUserID } from '../../User/store/slice';

const MakeARequest = () => {
    let activeUserId = useSelector(selectActiveUserID);

    return (
            <div className='flex flex-col h-screen overflow-scroll'>
                <p>MakeARequest Page</p>
                {activeUserId}
            </div>
        )

}

export default MakeARequest;
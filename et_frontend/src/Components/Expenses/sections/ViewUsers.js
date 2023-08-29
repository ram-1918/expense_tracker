
import { useSelector } from 'react-redux';
import { selectActiveUserID } from '../../User/store/slice';

const ViewUsers = () => {
    let activeUserId = useSelector(selectActiveUserID);

    return (
            <div className='flex flex-col h-screen overflow-scroll'>
                <p>ViewUsers Page</p>
                {activeUserId}
            </div>
        )

}

export default ViewUsers;
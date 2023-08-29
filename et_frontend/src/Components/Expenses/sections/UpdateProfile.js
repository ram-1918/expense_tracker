import { useSelector } from 'react-redux';
import { selectActiveUserID } from '../../User/store/slice';

const UpdateProfile = () => {
    let activeUserId = useSelector(selectActiveUserID);

    return (
            <div className='flex flex-col h-screen overflow-scroll'>
                <p>UpdateProfile Page</p>
                {activeUserId}
            </div>
        )

}

export default UpdateProfile;
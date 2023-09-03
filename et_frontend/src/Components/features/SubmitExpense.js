import { useSelector } from 'react-redux';
import { selectActiveUserID, selectPrevRoute } from '../users/store/slice';

const SubmitExpense = () => {
    let activeUserId = useSelector(selectActiveUserID);
    let prevroute = useSelector(selectPrevRoute);
    console.log('from logged comp ', prevroute);

    return (
            <div className='flex flex-col h-screen overflow-scroll'>
                <p>SubmitExpense Page</p>
                {activeUserId}
            </div>
        )

}

export default SubmitExpense;
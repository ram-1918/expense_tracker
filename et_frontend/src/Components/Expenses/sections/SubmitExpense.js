import { useSelector } from 'react-redux';
import { selectActiveUserID } from '../../User/store/slice';

const SubmitExpense = () => {
    let activeUserId = useSelector(selectActiveUserID);

    return (
            <div className='flex flex-col h-screen overflow-scroll'>
                <p>SubmitExpense Page</p>
                {activeUserId}
            </div>
        )

}

export default SubmitExpense;
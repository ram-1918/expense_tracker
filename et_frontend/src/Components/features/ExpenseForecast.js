
import { useSelector } from 'react-redux';
import { selectActiveUserID } from '../users/store/slice';

const ExpenseForecast = () => {
    let activeUserId = useSelector(selectActiveUserID);

    return (
            <div className='flex flex-col h-screen overflow-scroll'>
                <p>ExpenseForecast Page</p>
                {activeUserId}
            </div>
        )

}

export default ExpenseForecast;
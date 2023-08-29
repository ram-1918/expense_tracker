import { useSelector } from 'react-redux';
import { selectActiveUserID } from '../../User/store/slice';

const CreditLineIncrease = () => {
    let activeUserId = useSelector(selectActiveUserID);

    return (
            <div className='flex flex-col h-screen overflow-scroll'>
                <p>CreditLineIncrease Page</p>
                {activeUserId}
            </div>
        )

}

export default CreditLineIncrease;
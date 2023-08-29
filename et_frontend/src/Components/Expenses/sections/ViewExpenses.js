
import { useSelector } from 'react-redux';
import { selectActiveUserID } from '../../User/store/slice';

const ListExpenses = () => {
    let activeUserId = useSelector(selectActiveUserID);

    return (
            <div className='flex flex-col h-screen overflow-scroll'>
                <p>ListExpenses Page</p>
                {activeUserId}
            </div>
        )

}

export default ListExpenses;
import { useSelector } from 'react-redux';
import { selectActiveUserID } from '../../User/store/slice';

const ListExpenses = () => {
    // display cards provided to him, if not just diplay 0 so if he spends any siri has to reemberse it
    const sampleExpenses = [
        {'name':'Groceries for house', 'description': 'For guest house 2649', 'category':'Guest House', 'totalamount': '121.32', 'date': '29th Aug 2023', 'paymenttype': 'card 3031'},
        {'name':'Trip to Cali', 'description': 'Compnay purposes to meet client', 'category':'Travel', 'totalamount': '987.26', 'date': '24th Aug 2023', 'paymenttype': 'card 6011'},
        {'name':'Lights and fans', 'description': 'Purchased lights and fans for guest house 2876', 'category':'Guest House', 'totalamount': '486.12', 'date': '21th Aug 2023', 'paymenttype': 'card 3031'},
        {'name':'System crashed', 'description': 'Computer in cloud5 crashed, got it repair', 'category':'Repairs', 'totalamount': '112.2', 'date': '20th Aug 2023', 'paymenttype': 'cash'}
    ]
    return (
        sampleExpenses.map((obj) => (
        <div className=''>
            <table>
                <tr>
                    <td>{obj.name}</td>
                    <td>{obj.category}</td>
                    <td>{obj.totalamount}</td>
                    <td>{obj.date}</td>
                    <td>{obj.paymenttype}</td>
                </tr>
            </table>
            <span>{obj.description}</span>
        </div>
    ))
    )
}

const Dashboard = () => {
    let activeUserId = useSelector(selectActiveUserID);

    return (
            <div className='w-full h-screen flex flex-col  overflow-scroll'>
                <div className='w-full h-[20%] bg-red-200 p-4 shadow-xl'>
                    <p>Header for available balance</p>
                    {activeUserId}
                </div>
                <div className='w-full h-[5%] bg-blue-200 p-4 shadow-xl'>
                    <p>Filters for expenses</p>
                    {activeUserId}
                </div>
                <div className='w-full h-[75%] bg-green-200 p-4'>
                    <ListExpenses />
                </div>

            </div>
        )

}

export default Dashboard;
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUserRole } from '../users/store/slice';

// const ListExpenses = () => {
//     // display cards provided to him, if not just diplay 0 so if he spends any siri has to reemberse it
//     const userrole = useSelector(selectUserRole);
//     const sampleExpenses = [
//         {'name':'Groceries for house', 'description': 'For guest house 2649', 'category':'Guest House', 'totalamount': '121.32', 'date': '29th Aug 2023', 'paymenttype': 'card 3031', 'status': 'Approved'},
//         {'name':'Trip to Cali', 'description': 'Compnay purposes to meet client', 'category':'Travel', 'totalamount': '987.26', 'date': '24th Aug 2023', 'paymenttype': 'card 6011', 'status': 'Rejected'},
//         {'name':'Lights and fans', 'description': 'Purchased lights and fans for guest house 2876', 'category':'Guest House', 'totalamount': '486.12', 'date': '21th Aug 2023', 'paymenttype': 'card 3031', 'status': 'Approved'},
//         {'name':'Lights and fans', 'description': 'Purchased lights and fans for guest house 2876', 'category':'Guest House', 'totalamount': '486.12', 'date': '21th Aug 2023', 'paymenttype': 'card 3031', 'status': 'Approved'},
//         {'name':'Lights and fans', 'description': 'Purchased lights and fans for guest house 2876', 'category':'Guest House', 'totalamount': '486.12', 'date': '21th Aug 2023', 'paymenttype': 'card 3031', 'status': 'Approved'},
//         {'name':'Lights and fans', 'description': 'Purchased lights and fans for guest house 2876', 'category':'Guest House', 'totalamount': '486.12', 'date': '21th Aug 2023', 'paymenttype': 'card 3031', 'status': 'Approved'},
//         {'name':'Lights and fans', 'description': 'Purchased lights and fans for guest house 2876', 'category':'Guest House', 'totalamount': '486.12', 'date': '21th Aug 2023', 'paymenttype': 'card 3031', 'status': 'Approved'},
//         {'name':'Lights and fans', 'description': 'Purchased lights and fans for guest house 2876', 'category':'Guest House', 'totalamount': '486.12', 'date': '21th Aug 2023', 'paymenttype': 'card 3031', 'status': 'Approved'},
//         {'name':'System crashed', 'description': 'Computer in cloud5 crashed, got it repair', 'category':'Repairs', 'totalamount': '112.2', 'date': '20th Aug 2023', 'paymenttype': 'cash', 'status': 'Rejected'}
//     ]
//     const headings = ['Add to review', 'Title', 'Category', 'Amount', 'Date', 'Payment Method', 'Status']
//     const fields = ['name', 'category', 'totalamount', 'date', 'paymenttype']
//     const thStyle = 'border-none border-gray-400 px-4 py-2';
//     const tdStyle = 'border-none border-gray-400 px-4 py-2';
//     // {/* just like addding to cart, add expenses to cart for send all the requests together */}

//     return (
//         <div className='w-full h-full bg-slate-200 flex flex-col justify-start items-center'>
//             <table className="w-full border-collapse border border-gray-200 text-center">
//                 <thead>
//                     <tr className={`sticky top-0 left-0 right-0 bg-slate-300`}>
//                         { headings.map((obj) => <th className={`${thStyle}`}>{obj}</th> ) }
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {sampleExpenses.map((obj, index) => (
//                     <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''} >
//                         <td className={`${tdStyle} text-xl`}>+</td>
//                         {fields.map((field) => <td className={`${tdStyle}`}>{obj[field]}</td>)}
//                         {
//                             userrole === 'admin' || userrole === 'superadmin' ?
//                             <td className={`${tdStyle} flex flex-row space-x-2 justify-center items-center`}>
//                                 <button className='w-16 h-8 text-md border-none bg-green-300 rounded-lg'>Accept</button>
//                                 <button className='w-16 h-8 text-md border-none bg-red-300 rounded-lg'>Decline</button>
//                             </td>
//                             :
//                             <td>{obj.status}</td>
//                         }
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//         </div>
//     )
// }

const EasyNavigation = () => {
    const variable = 300;
    const easyNavStyles = 'w-[30%] h-[50%] bg-purple-100 rounded-xl shadow-xl p-2 flex flex-col justify-between items-center m-2';
    const easyTitle = 'text-lg font-semibold';
    const easyDescription = 'text-[1rem] font-light';
    const easyFooter = 'w-full p-2 text-right bg-purple-300 rounded-lg';
    const easyFooButton = 'font-semibold text-lg';
    return (
        <div className='h-[50%] m-8 flex flex-row flex-wrap justify-start items-round'>
            <span className={`${easyNavStyles}`}>
                <span className={`${easyTitle}`}>Pending approvals</span>
                <span className={`${easyDescription}`}>Pending approvals are those which awaits approval from either the company's admin or the superadmin for an expense</span>
                <span className={`${easyFooter}`}>
                    <Link to='' className={`${easyFooButton}`}>View <i className='fa fa-arrow-circle-right'></i></Link>
                </span>
            </span>
            <span className={`${easyNavStyles}`}>
                <span className={`${easyTitle}`}>Filter expenses by a Factor</span>
                <span className={`${easyDescription}`}>Apply filters on various factors which awaits approval from either the company's admin or the superadmin for an expense</span>
                <span className={`${easyFooter}`}>
                    <Link to='' className={`${easyFooButton}`}>View <i className='fa fa-arrow-circle-right'></i></Link>
                </span>
            </span>
            <span className={`${easyNavStyles}`}>
                <span className={`${easyTitle}`}>List of all who spent less that {variable}</span>
                <span className={`${easyDescription}`}>Apply filters on various factors which awaits approval from either the company's admin or the superadmin for an expense</span>
                <span className={`${easyFooter}`}>
                    <Link to='' className={`${easyFooButton}`}>View <i className='fa fa-arrow-circle-right'></i></Link>
                </span>
            </span>
            <span className={`${easyNavStyles}`}>
                <span className={`${easyTitle}`}>User info look up</span>
                <span className={`${easyDescription}`}>Apply filters on various factors which awaits approval from either the company's admin or the superadmin for an expense</span>
                <span className={`${easyFooter}`}>
                    <Link to='' className={`${easyFooButton}`}>View <i className='fa fa-arrow-circle-right'></i></Link>
                </span>
            </span>
        </div>
    )
}

const Header = ({title}) => {
    return (
        <div className='p-4 mb-2 border-0 border-purple-300'>
            <span className='text-[1.8rem] font-semibold text-center '>{title}</span>
        </div>
    )
}

const Dashboard = () => {
    const userrole = useSelector(selectUserRole);

    return (
        <div className='bg-violet-50 w-full h-screen'>
            <div className='w-full h-full'>
                <Header title="Easy Navigation" />
                <EasyNavigation />
                <Header title="Reports" />
            </div>
        </div>
    )

    // return (
    //         <div className='w-full h-full flex flex-col'>
    //             <div className='w-full h-[15%] flex flex-row justify-between items-center px-4 border'>
    //                 <div className='flex flex-col'>
    //                     <span className='text-xl'>Credit provided</span>
    //                     <span className='text-xl font-light'>BOFA(card 1) - 1300$</span> 
    //                     <span className='text-xl font-light'>Chase(card 2) - 1200$</span>
    //                 </div>
    //                 <div className='flex flex-row justfiy-center items-center space-x-2'>
    //                     <span className='text-2xl font-light'>Available Balance </span>
    //                     <span className='text-2xl font-light'>2500$</span>
    //                 </div>
    //             </div>
    //             <div className='w-full flex flex-row font-light items-center justify-around p-2'>
    //                 <span className=''>Filter1</span>
    //                 <span className=''>Filter2</span>
    //                 <span className=''>Filter3</span>
    //                 <span className=''>Filter4</span>
    //                 <span className=''>Filter5</span>
    //                 <span className=''><input className='outline-none border border-gray-300 w-80 rounded-lg p-2' type='text' placeholder='search...' /></span>
    //             </div>
    //             <div className='w-full h-[80%] overflow-scroll overflow-x-hidden'>
    //                 <ListExpenses />
    //             </div>
    //             <div className='sticky bottom-0 left-0 bg-white right-0 w-full h-[10%] border-t-2 p-2 flex flex-row justify-around items-center space-x-2'>
    //                 <span className='text-xl font-normal'>Summary</span>
    //                 <span className='text-lg font-light'>Count: </span>4
    //                 {
    //                     userrole==='admin' || userrole==='superadmin' ?
    //                     <>
    //                         <span className='text-lg font-light'>Total pending requests: </span>4
    //                         <span className='text-lg font-light'>Requests approved: </span>0
    //                         <span className='text-lg font-light'>Requests needs approval: </span>4
    //                     </>
    //                     :
    //                     <>
    //                         <span className='text-lg font-light'>Requests sent: </span>2
    //                         <span className='text-lg font-light'>Requests approved: </span>2
    //                         <span className='text-lg font-light'> Requests rejected: </span>2    
    //                     </>

    //                 }
    //                 <span className='text-lg font-light'>Total expense: </span>1076.9


    //             </div>
    //         </div>
    //     )

}

export default Dashboard;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/base/Pagination";
import TableCaption from "../../components/base/TableCaption";
import Spinner from "../../components/base/Spinner";
import { dateformater } from "../../utils/helper";
import FilterHeader from "./FilterHeader";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { listexpenses } from '../../features/core/state/coreThunks';


// Styles
const outerdiv = "sticky top-0 left-0 border-b-2 pb-2";
const innerdiv_reset = "text-sm px-2 underline underline-offset-4 cursor-pointer";
const innerdiv_1_2 = "w-full grid grid-flow-col grid-rows-1 place-items-end text-right";
const innerdiv_1_2_download = "text-sm border border-black rounded-md flex-row-style justify-center p-2 bg-slate-600 text-white cursor-pointer hover:opacity-80";

const table = "table-auto shadow-xl rounded-md m-auto";
const thead = ' w-full h-10 rounded-tl-lg rounded-tr-lg flex-row-style justify-between bg-[#334155] text-white '; // bg-[#0284c7]
const th = 'border-r h-6 text-left text-sm opacity-90 font-semibold capitalize tracking-wider px-2';

const tbody = 'flex-col justify-center items-center';
const tr = 'border w-full h-8 flex-row-style justify-between py-5 cursor:pointer odd:bg-white even:bg-slate-100 hover:border-teal-500';
const td = 'border-r overflow-x-hidden flex-row-style text-sm text-gray-700 px-2 py-[5px]';
const td1 = 'w-20 text-md text-gray-500 px-2 py-[5px]';

const profileImage = 'w-6 h-6 rounded-full object-cover ';

function ExpensesList({activecolumns}) {
  const initial_active_keys = [
    "id",
    "payment_recepient",
    "category",
    "username",
    "amount",
    "status"
  ];
  const initial_active = {
    id: true,
    category: true,
    username: true,
    amount: true,
    status: true,
    date_submitted: false,
    last_modified: false,
    currency: false,
    description: false,
    payment_method: false,
    payment_recepient: true,
    rejection_count: false
  };
  const fieldStyleMapper = {
    id: "w-96",
    userid: 'w-96',
    username: "w-32",
    category: "w-32",
    date_submitted: "w-44",
    last_modified: "w-44",
    amount: "w-32 before:content-['$']",
    currency: "w-32",
    description: "w-96 text-left",
    payment_method: "w-40",
    payment_recepient: "w-44",
    rejection_count: "w-36",
    status: "w-28",
    message: "w-96",
    company: "w-32",
  };

  const dispatch = useDispatch();
  const expenselist = useSelector((state) => state.expense.expenselist);
  const [keys, setKeys] = useState(initial_active_keys);
  const [active, setActive] = useState(initial_active);
  const [toggleFilterHeader, setToggleFilterHeader] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);
  const [viewexpenseobj, setViewexpenseobj] = useState(null);

  // if (!expenselist.length) {
  //   return <Spinner name="Loading expenses..." />;
  // }

  if (!activecolumns.length){
    return <div>No column selected</div>
  }

  const cols = [
    "id",
    "username",
    "category", 
    "date_submitted",
    "last_modified",
    "amount",
    "description",
    "payment_method",
    "payment_recepient",
    "currency",
    "rejection_count",
    "status"
  ];
  const refreshFunc = () => {
    return {
      caption: 'Expense Details',
      dispatch: dispatch,
      apifunc: listexpenses,
      otherArgs: null
    }
  }

  return (
    <div className="w-full">
      {!expenselist.length && <div className="w-full h-full flex-col-style justify-start bg-gray-100 text-xl font-light"><span>No expenses yet</span></div>}
      {expenselist.length && 
      <>
      <table className={table}>
        <TableCaption args={refreshFunc()}/>
        <thead className={`${thead}`}>
          <tr>
            {activecolumns.map((obj, idx) => (
              <th key={idx} className={`${th} ${obj === "amount" ? "w-32" : fieldStyleMapper[obj]}`}>
                {obj}
              </th>
            ))}
            <th className={`${th} w-20 text-center`}>Delete</th>
            <th className={`${th} w-32`}></th>
          </tr>
        </thead>
        <tbody className={`${tbody}`}>
          {/* {!activecolumns.length && <div className="w-full h-full flex-col-style justify-start bg-gray-100 text-xl font-light">No Column Selected</div>}  */}
          {/* {!expenselist.length && <div className="w-full h-full flex-col-style justify-start bg-gray-100 text-xl font-light"><span>No expenses yet</span></div>} */}
          {activecolumns.length && expenselist.map((obj, idx) => (
            <View key={idx} obj={obj} keys={activecolumns} fieldStyleMapper={fieldStyleMapper} setviewobj={setViewexpenseobj} />
          ))}
        </tbody>
      </table>
      </>}
      <Outlet />
    </div>
  );
}

export default ExpensesList;

function View({ obj, keys, fieldStyleMapper, setviewobj }) {
  const deleteUserInfo = () => {};
  return (
    <tr className={`${tr}`}>
      {keys.map((ele, idx) => (
        <td key={idx} className={`${td} ${fieldStyleMapper[ele]}`}>
          {(ele.includes("date") || ele.includes("last_modified")) ? dateformater(obj[ele]) :
          (obj[ele] === '') ? 'N/A' : obj[ele]}
        </td>
      ))}
      
        <td className={`${td1} w-20 flex-row-style justify-center space-x-2`}>
          {/* <Link to={`./updateuser/${obj.id}`} state={{ userdata: obj }}>
            <i className="fa fa-edit"></i>
          </Link> */}
          <span onClick={() => {deleteUserInfo()}}>
          {obj.status === "pending" ? (<i className="fa fa-trash"></i>) : "Can't be deleted"}
          </span>
        </td>
      {
        <td className={`${td1} w-32 flex-row-style justify-center space-x-2 cursor-pointer`}>
          <Link to={`viewexpense/${obj.id}`} onClick={() => {setviewobj(obj)}}>
            View
          </Link>
        </td>
      }
    </tr>
  );
}


// // [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]


// // https://www.smashingmagazine.com/2020/03/sortable-tables-react/

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Pagination from "../../components/base/Pagination";
// import TableCaption from "../../components/base/TableCaption";
// import Spinner from "../../components/base/Spinner";
// import { listexpenses } from "../../features/core/coreSlice";
// // import { listexpenses } from "../forms/apicalls";
// import { dateformater } from "../../utils/helper";
// import FilterHeader from "./FilterHeader";
// import { Outlet, useNavigate } from "react-router";
// import { Link } from "react-router-dom";

// // Styles
// const outerdiv = "sticky top-0 left-0 right-0 w-full border-b-2 pb-2 bg-white";
// const innerdiv_reset = "text-sm px-2 underline underline-offset-4 cursor-pointer";
// const innerdiv_1_2 = "w-full grid grid-flow-col grid-rows-1 place-items-end text-right";
// const innerdiv_1_2_download = "text-sm border border-black rounded-md flex-row-style justify-center p-2 bg-slate-600 text-white cursor-pointer hover:opacity-80";
// const innerdiv_1_2_add = "text-sm border border-black rounded-md flex-row-style justify-center p-2 bg-white text-black cursor-pointer hover:opacity-80";

// const table = "table-auto shadow-3xl rounded-lg bg-red-400";
// const thead = 'w-full h-10 rounded-tl-lg rounded-tr-lg flex-row-style justify-between bg-teal-600 '; // bg-[#0284c7]
// const th = 'border-r h-6 text-left text-sm font-bold text-white capitalize tracking-wider px-2';

// const tbody = 'flex-col-style justify-center';
// const tr = 'border w-full h-8 flex-row-style justify-between py-5 cursor:pointer odd:bg-white even:bg-slate-100 hover:border-teal-500';
// const td = 'border-r overflow-x-hidden flex-row-style text-sm text-gray-700 px-2 py-[5px]';
// const td1 = 'text-md text-gray-500 px-2 py-[5px]';


// function View({obj, keys, fieldStyleMapper, setviewobj}){
//   const deleteUserInfo = () =>{
//     return 
//   }
//   return (
//     <tr className={`${tr}`}>
//       {keys.map((ele, idx) => <td key={idx} className={`${td} ${fieldStyleMapper[ele]}`}>{(ele.includes('date') || ele.includes('last_modified')) ? dateformater(obj[ele]) : obj[ele]}</td>)}
//       {obj.status === 'pending' && <td className={`${td1} w-32 flex-row-style justify-center space-x-2`}><Link to={`./updateuser/${obj.id}`} state={{ userdata: obj }}><i className="fa fa-edit"></i></Link> <span onClick={() => {deleteUserInfo()}}><i className="fa fa-trash"></i></span></td>}
//       {<td className={`${td1} w-32 flex-row-style justify-center space-x-2 cursor-pointer`}><Link to={`viewexpense/${obj.id}`} onClick={() => {setviewobj(obj)}}>View</Link></td>}
//     </tr>
//   )
// }

// function ExpensesList() {
//   const initial_active_keys = ['id', 'payment_recepient', 'category', 'username', 'amount', 'status'];
//   const initial_active = {
//     id: true,  category: true, username: true, amount: true, 
//     status: true, date_submitted: false, last_modified: false,
//     currency: false, description: false, payment_method: false,
//     payment_recepient: true, rejection_count: false,
//   }
//   const fieldStyleMapper = {
//     id: 'w-96', username: "w-32", category: "w-32", date_submitted: "w-44",
//     last_modified: "w-44", amount: "w-32 before:content-['$']",
//     currency: "w-32", description: "w-56", payment_method: "w-40", payment_recepient: "w-44",
//     rejection_count: "w-36", status: "w-28",
//   }
// const dispatch = useDispatch();
// const expenselist = useSelector(state => state.expense.expenselist);
// const [keys, setKeys] = useState(initial_active_keys);
// const [active, setActive] = useState(initial_active);
// const [toggleFilterHeader, setToggleFilterHeader] = useState(true);

// const [pageNumber, setPageNumber] = useState(1);
// const [pageLimit, setPageLimit] = useState(1);

// const [viewexpenseobj, setViewexpenseobj] = useState(null);

// if(!expenselist.length){
//   return <Spinner name="Loading expenses..." />
// }

// const cols = ['id', 'username', 'category', 'date_submitted', 'last_modified', 'amount', 'description', 'payment_method', 'payment_recepient', 'currency', 'rejection_count', 'status'];

//   return (
//     <>
//       {/* {spinner && <Spinner name="expenses" />} */}
//       <div className={outerdiv}>
//         <div className="flex-row-style justify-between px-4">
//           <div className="flex-row-style justify-evenly">
//             <span className="text-lg">Columns Filters</span> 
//             <span>({keys.length})</span>
//             <span onClick={() => {setActive(initial_active); setKeys(initial_active_keys);}} className={innerdiv_reset}>Reset</span>
//           </div>
//           <span className="text-lg" onClick={() => {setToggleFilterHeader(prev => !prev)}}>
//             {toggleFilterHeader ? <i className="fa fa-minus"></i> : <i className="fa fa-plus"></i>}
//           </span> 
//         </div>
//         {toggleFilterHeader && (
//         <>
//           <FilterHeader allKeys={cols} setKeys={setKeys} active={active} setActive={setActive}/>
//           <div className="w-full h-fit flex-row-style justify-between mt-2 px-2 bg-white">
//             <span className="flex-row-style justify-end flex-grow px-4"><Link to={'./submit/addexpense'} className={innerdiv_1_2_add}>+ Add expense</Link></span>
//             <span className={innerdiv_1_2_download}>Download (.pdf) </span>
//           </div>
//         </>)}
//       </div>
//       <table className={table}>
//         <TableCaption caption={`Expense Details(${expenselist.length})`} /> 
//         <thead className={`${thead}`}>
//             <tr>
//               {keys.map((obj, idx) => <th key={idx} className={`${th} ${obj === 'amount' ? 'w-32' : fieldStyleMapper[obj]}`}>{obj}</th>)}
//               <th className={`${th} w-32`}>Edit/Delete</th>
//               <th className={`${th} w-32`}></th>
//             </tr>
//         </thead>
//         <tbody className={`${tbody}`}>
//           {expenselist.map((obj, idx) => <View key={idx} obj={obj} keys={keys} fieldStyleMapper={fieldStyleMapper} setviewobj={setViewexpenseobj}/>)}
//         </tbody>
//       </table>
//       <Pagination setPageLimit={setPageLimit} setPageNumber={setPageNumber} />
//       <Outlet />

//     </>
//   );
// }

// export default ExpensesList;

// // Multiple API calls - https://stackoverflow.com/questions/75693156/multiple-api-calling-in-functional-component-react-js
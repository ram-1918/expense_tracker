// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]


// https://www.smashingmagazine.com/2020/03/sortable-tables-react/

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/base/Pagination";
import TableCaption from "../../components/base/TableCaption";
import Spinner from "../../components/base/Spinner";
import { listexpenses } from "../../features/core/coreSlice";
import { dateformater } from "../../utils/helper";
import FilterHeader from "./FilterHeader";
import { useNavigate } from "react-router";

// Styles
const outerdiv = "sticky top-0 left-0 border-b-2 pb-2";
const innerdiv_reset = "text-sm px-2 underline underline-offset-4 cursor-pointer";
const innerdiv_1_2 = "w-full grid grid-flow-col grid-rows-1 place-items-end text-right";
const innerdiv_1_2_download = "text-md border border-black rounded-md flex-row-style justify-center p-2 bg-slate-600 text-white cursor-pointer hover:opacity-80";

const table = "table-auto shadow-xl rounded-md";
const thead = ' w-full h-12 rounded-tl-lg rounded-tr-lg flex-row-style justify-between bg-[#0284c7] ';
const th = 'border-r h-6 text-left text-sm font-bold text-white capitalize tracking-wider px-2';

const tbody = 'flex-col justify-center items-center';
const tr = 'w-full h-8 flex-row-style justify-between py-5 cursor:pointer odd:bg-white even:bg-slate-200 hover:scale-[1] hover:font-medium';
const td = 'border-r overflow-x-hidden flex-row-style text-sm text-gray-700 px-2 py-[5px]';

function View({obj, keys, fieldStyleMapper}){
  return (
    <tr className={`${tr}`}>
      {keys.map((ele, idx) => <td key={idx} className={`${td} ${fieldStyleMapper[ele]}`}>{(ele.includes('date') || ele.includes('last_modified')) ? dateformater(obj[ele]) : obj[ele]}</td>)}
    </tr>
  )
}

function ExpensesList() {
  const initial_active_keys = ['id', 'category', 'username', 'amount', 'status'];
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
    payment_recepient: false,
    rejection_count: false,
}
const dispatch = useDispatch();
const [keys, setKeys] = useState(initial_active_keys);
const [active, setActive] = useState(initial_active);

const [pageNumber, setPageNumber] = useState(1);
const [pageLimit, setPageLimit] = useState(1);

const fieldStyleMapper = {
  id: 'w-96',
  username: "w-32",
  category: "w-32",
  date_submitted: "w-44",
  last_modified: "w-44",
  amount: "w-32 before:content-['$']",
  currency: "w-32",
  description: "w-56",
  payment_method: "w-40",
  payment_recepient: "w-44",
  rejection_count: "w-36",
  status: "w-28",
}

const expenselist = useSelector(state => state.expense.expenselist);

useEffect(() => {
  dispatch(listexpenses());  
}, [dispatch]);

if(!expenselist.length){
  return <Spinner name="expenses" />
}

const cols = ['id', 'username', 'category', 'date_submitted', 'last_modified', 'amount', 'description', 'payment_method', 'payment_recepient', 'currency', 'rejection_count', 'status'];

  return (
    <>
      <div className={outerdiv}>
        <span className="text-lg">Columns Filters</span> 
        <span>({keys.length})</span>
        <span onClick={() => {setActive(initial_active); setKeys(initial_active_keys);}} className={innerdiv_reset}>Reset</span>
        <FilterHeader allKeys={cols} setKeys={setKeys} active={active} setActive={setActive}/>
        <div className={innerdiv_1_2}>
          <span className={innerdiv_1_2_download}>Download (.pdf)</span>
        </div>
      </div>
      <table className={table}>
        <TableCaption caption="Expense Details" />
        <thead className={`${thead}`}>
            <tr>
              {keys.map((obj, idx) => <th key={idx} className={`${th} ${obj === 'amount' ? 'w-32' : fieldStyleMapper[obj]}`}>{obj}</th>)}
            </tr>
        </thead>
        <tbody className={`${tbody}`}>
          {expenselist.map((obj, idx) => <View key={idx} obj={obj} keys={keys} fieldStyleMapper={fieldStyleMapper}/>)}
        </tbody>
      </table>
      <Pagination setPageLimit={setPageLimit} setPageNumber={setPageNumber} />
    </>
  );
}

export default ExpensesList;

// Multiple API calls - https://stackoverflow.com/questions/75693156/multiple-api-calling-in-functional-component-react-js
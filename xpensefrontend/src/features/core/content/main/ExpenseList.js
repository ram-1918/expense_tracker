// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]

import { useEffect, useState } from "react";
import Pagination from "../../../../components/base/Pagination";

// Styles
const thead = ' w-full h-8 flex-row-style justify-between bg-slate-300';
const tbody = 'flex-col justify-center items-center';
const tr = 'w-full h-8 flex-row-style justify-between py-4 cursor:pointer odd:bg-white even:bg-slate-200 hover:scale-[1.008] hover:font-bold';
const th = 'border-r w-48 h-6 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider px-2';
const td = 'w-48 text-sm text-gray-500 px-2 py-[5px]';



function getExpenseData(){
  const data = [
      {"expense":"System repairs", "email": "crc.5453@gmail.com", "submitted_at": "August 29th, 2023", "role": "admin", "mode_of_payment": "cash", "amount": "321.04"},
      {"expense":"Groceries", "email": "rcb.23@gmail.com", "submitted_at": "September 2th, 2023", "role": "Superadmin", "mode_of_payment": "credit card", "amount": "532.034"},
      {"expense":"Appliances", "email": "bhaviri278@gmail.com", "submitted_at": "July 12th, 2023", "role": "employee", "mode_of_payment": "cheque", "amount": "762.47"},
  ]
  // axios.get(`${API_URL}/users`)
  // .then((res) => console.log('Succuss'))
  return data
}

function View({obj}){
  return (
    <tr className={`${tr}`}>
      <td className={`text-[0.75rem] ${obj.colorTag ? 'text-'+obj.colorTag+'-500' : 'text-gray-300'}`}><i className="fa fa-circle"></i></td>
      <td className={`${td}`}>{obj.expense}</td>
      <td className={`${td}`}>{obj.email}</td>
      <td className={`${td}`}>{obj.role}</td>
      <td className={`${td}`}>{obj.submitted_at}</td>
      <td className={`${td}`}>{obj.mode_of_payment}</td>
      <td className={`${td} text-lg font-bold before:content-['$']`}>{obj.amount}</td>
    </tr>
  )
}

function ExpensesList() {
  const [data, setData] = useState(getExpenseData());
  const [keys, setKeys] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);

  useEffect(() => {
    console.info(data, "EXPENSES LIST");
    setKeys(Object.keys(data[0]));
  }, [setKeys, data]);

    return (
      <>
        <table className="table-auto">
          <caption className="caption-top py-2 text-xl text-gray-500 font-semibold ">Expense Details</caption>
          <thead className={`${thead}`}>
            <tr>
              <th><i className="fa fa-circle opacity-0"></i></th>
            </tr>
            <tr>
              {keys.map((obj, idx) => <th key={idx} className={th}>{obj}</th>)}
            </tr>
          </thead>
          <tbody className={`${tbody}`}>
            {data.map((obj, idx) => <View key={idx} obj={obj}/>)}
            <tr><td>{pageNumber}-{pageLimit}</td></tr>
          </tbody>
        </table>
        <Pagination setPageLimit={setPageLimit} setPageNumber={setPageNumber} />
      </>
    );
  }
  
export default ExpensesList;

// Multiple API calls - https://stackoverflow.com/questions/75693156/multiple-api-calling-in-functional-component-react-js
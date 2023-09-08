// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]

import { useState } from "react";

function View({obj}){
  const tr = 'w-full h-8 flex-row-style justify-between py-4 odd:bg-white even:bg-slate-100';
  const td = 'w-48 text-sm text-gray-500 px-2 py-[5px]';
  return (
    <tr className={`${tr}`}>
      <td className={`${td}`}>{obj.expense}</td>
      <td className={`${td}`}>{obj.email}</td>
      <td className={`${td}`}>{obj.phone}</td>
      <td className={`${td}`}>{obj.createdat}</td>
      <td className={`${td}`}>{obj.role}</td>
      <td className={`${td}`}>{obj.employeeid}</td>
    </tr>
  )
}

function XMain({data, keys}) {
  const [d, setd] = useState(data);
  // const thr = 'border w-full h-6 flex-row-style justify-around';
  const thead = ' w-full h-8 flex-row-style justify-between bg-gray-200';
  const th = 'border-r w-48 h-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider px-2';

  const tbody = 'flex-col justify-center items-center';
  
    return (
      // <div className="border w-full h-full flex-row-style justify-center">
        <table className="table-auto">
          <caption className="caption-top py-2 text-xl text-gray-500 font-semibold ">Expense Details</caption>
          <thead className={`${thead}`}>
            {/* <tr className={`${thr}`}> */}
            <tr>
              {keys.map((obj, idx) => <th key={idx} className={th}>{obj}</th>)}
            </tr>
          </thead>
          <tbody className={`${tbody}`}>
            {data.map((obj, idx) => <View key={idx} obj={obj}/>)}
          </tbody>
        </table>
      // </div>
    );
  }
  
export default XMain;

// Multiple API calls - https://stackoverflow.com/questions/75693156/multiple-api-calling-in-functional-component-react-js
// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]

import { useState } from "react";

function View({obj}){
  const tr = 'w-full h-8 flex-row-style justify-between py-4 cursor:pointer odd:bg-white even:bg-slate-200 hover:scale-[1.008] hover:font-bold';
  const td = 'w-48 text-sm text-gray-500 px-2 py-[5px]';
  return (
    <tr className={`${tr}`}>
      <td className={`text-[0.75rem] ${obj.colorTag ? 'text-'+obj.colorTag+'-500' : 'text-gray-300'}`}><i className="fa fa-circle"></i></td>
      <td className={`${td}`}>{obj.expense}</td>
      <td className={`${td}`}>{obj.email}</td>
      <td className={`${td}`}>{obj.role}</td>
      <td className={`${td}`}>{obj.submitted_at}</td>
      {/* <td className={`${td}`}>{obj.isactive ? 'Active': "Inactive"}</td> */}
      <td className={`${td}`}>{obj.mode_of_payment}</td>
      <td className={`${td}`}>{obj.amount}</td>
    </tr>
  )
}

function XMain({data, keys}) {
  const [d, setd] = useState(data);
  keys = keys.filter((obj) => obj !== 'colorTag');
  // const thr = 'border w-full h-6 flex-row-style justify-around';
  const thead = ' w-full h-8 flex-row-style justify-between bg-slate-300';
  const th = 'border-r w-48 h-6 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider px-2';

  const tbody = 'flex-col justify-center items-center';

  const pagenoStyle = 'border border-slate-100 rounded-full shadow-lg w-6 h-6 flex-row-style justify-center bg-slate-100 cursor-pointer hover:scale-[1.2] hover:bg-slate-200';
  const pageOptionStye = ''
  
    return (
      // <div className="border w-full h-full flex-row-style justify-center">
        <table className="table-auto">
          <caption className="caption-top py-2 text-xl text-gray-500 font-semibold ">Expense Details</caption>
          <thead className={`${thead}`}>
            {/* <tr className={`${thr}`}> */}
            <tr>
              <th><i className="fa fa-circle opacity-0"></i></th>
            </tr>
            <tr>
              {keys.map((obj, idx) => <th key={idx} className={th}>{obj}</th>)}
            </tr>
          </thead>
          <tbody className={`${tbody}`}>
            {data.map((obj, idx) => <View key={idx} obj={obj}/>)}

            <div className="w-full border-0 flex-row-style justify-center p-2">
              <div className="w-56 flex-row-style justify-around p-2">
                <span className={`${pagenoStyle}`}><i className="fa fa-angle-double-left"></i></span>
                <span className={`${pagenoStyle}`}>1</span>
                <span className={`${pagenoStyle}`}>2</span>
                <span className={`${pagenoStyle}`}>3</span>
                <span className={`${pagenoStyle}`}>4</span>
                <span className={`${pagenoStyle}`}>5</span>
                <span className={`${pagenoStyle}`}><i className="fa fa-angle-double-right"></i></span>
              </div>
              <div>
                <select className="border-0 rounded-full shadow-lg w-12 bg-slate-100 focus:outline-none">
                  <option className={`${pageOptionStye}`}>5</option>
                  <option className={`${pageOptionStye}`}>10</option>
                  <option className={`${pageOptionStye}`}>15</option>
                  <option className={`${pageOptionStye}`}>25</option>
                </select>
                <span> per page</span>
              </div>
            </div>
          </tbody>
        </table>
      // </div>
    );
  }
  
export default XMain;

// Multiple API calls - https://stackoverflow.com/questions/75693156/multiple-api-calling-in-functional-component-react-js
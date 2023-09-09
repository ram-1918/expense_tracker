// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function View({obj}){
  const tr = 'w-full h-8 flex-row-style justify-between py-4 cursor:pointer odd:bg-white even:bg-slate-200 hover:scale-[1.008] hover:font-bold hover:shadow hover:shadow-sm';
  const td = 'w-48 text-sm text-gray-500 px-2 py-[5px]';
  const td1 = 'w-20 text-md text-gray-500 px-2 py-[5px]';
  return (
    <tr className={`${tr}`}>
      <td className={`text-[0.75rem] ${obj.colorTag ? 'text-'+obj.colorTag+'-500' : 'text-gray-300'}`}><i className="fa fa-circle"></i></td>
      <td className={`${td}`}>{obj.name}</td>
      <td className={`${td}`}>{obj.email}</td>
      <td className={`${td}`}>{obj.phone}</td>
      <td className={`${td}`}>{obj.createdat}</td>
      <td className={`${td}`}>{obj.isactive ? 'Active': "Inactive"}</td>
      <td className={`${td}`}>{obj.role}</td>
      <td className={`${td}`}>{obj.employeeid}</td>
      {/* <td className={`${td}`}></td> */}
      <td className={`${td1}`}><i className="fa fa-edit"></i> <i className="fa fa-trash"></i></td>
    </tr>
  )
}

function UMain({data, keys}) {
  const [d, setd] = useState(data);
  keys = keys.filter((obj) => obj !== 'colorTag');
  // const thr = 'border w-full h-6 flex-row-style justify-around';
  const thead = 'sticky top-0 left-0 right-0 w-full h-10 m-0 flex-row-style justify-between bg-slate-300';
  const th = 'border-r w-48 h-6 text-left text-sm font-semibold text-black uppercase tracking-wider px-2';
  const th1 = 'border-r w-20 h-6 text-left text-sm font-semibold text-black uppercase tracking-wider px-2';

  const tbody = 'flex-col justify-center items-center';
  
  const pagenoStyle = 'border border-slate-400 rounded-full shadow-lg w-6 h-6 flex-row-style justify-center bg-slate-100 cursor-pointer hover:scale-[1.1]';
  const pageOptionStye = ''
  
    return (
      // <div className="border w-full h-full flex-row-style justify-center">
        <table className="">
          <caption className="caption-top py-2 text-xl text-gray-500 font-semibold ">Users Details</caption>
          <thead className={`${thead}`}>
            {/* <tr className={`${thr}`}> */}
            <tr>
              <th><i className="fa fa-circle opacity-0"></i></th>
            </tr>
            <tr>
              {keys.map((obj, idx) => <th key={idx} className={th}>{obj}</th>)}
              <td className={th1}>Edit</td>
              {/* <td className={th}>Delete</td> */}
            </tr>
          </thead>
          <tbody className={`${tbody}`}>
            {data.map((obj, idx) => <View key={idx} obj={obj}/>)}
            <div className="w-full border-2 flex-row-style justify-center p-2">
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
  
export default UMain;

// Multiple API calls - https://stackoverflow.com/questions/75693156/multiple-api-calling-in-functional-component-react-js
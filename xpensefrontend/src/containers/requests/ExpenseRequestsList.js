// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]
import { useEffect, useState } from "react";
import Pagination from "../../components/base/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { changeregistrationstatus, deleteuserbyadmin, registrationrequestsbyadmin, setRegistrationRequests, setUsersList } from "../../features/core/coreSlice";
import { Link, Outlet } from "react-router-dom";


const thead = 'sticky top-0 left-0 right-0 w-full h-10 m-0 flex-row-style justify-between bg-slate-300';
const tbody = 'flex-col justify-center items-center';
const tr = 'w-full h-8 flex-row-style justify-between py-5 cursor:pointer odd:bg-white even:bg-slate-200 hover:scale-[1.008] hover:font-bold hover:shadow hover:shadow-sm';
const th = 'border-r w-48 h-6 text-left text-sm font-semibold text-black uppercase tracking-wider px-2';
const th1 = 'border-r w-32 h-6 text-left text-sm font-semibold text-black uppercase tracking-wider px-2';
const td = 'w-48 text-sm text-gray-500 pl-2 py-[5px]';
const td1 = 'w-32 text-md text-gray-500 px-2 py-[5px]';




function View({obj}){
  const dispatch = useDispatch();
  const userslist = useSelector((state) => state.expense.userslist);
  const requests = useSelector((state) => state.expense.registrationrequests);
  const status = useSelector((state) => state.expense.status);

  function handleRequest(data){
    const id = obj.id;
    dispatch(changeregistrationstatus({...data, "userid":id}));
    if (status === 'succeeded'){
        const result = requests.filter(request => request.id !== id);
        dispatch(setRegistrationRequests(result));
    }
    else{
        alert('Action failed')
    }
  }

  return (
    <tr className={`${tr}`}>
      <td className={`text-[0.75rem] ${obj.colortag ? 'text-'+obj.colortag+'-500' : 'text-gray-300'}`}><i className="fa fa-circle"></i></td>
      <td className={`${td} w-96`}>{obj.id}</td>
      <td className={`${td}`}>{obj.email}</td>
      <td className={`${td}`}>{obj.fullname}</td>
      <td className={`${td}`}>{obj.role}</td>
      <td className={`${td}`}>{obj.phone ? obj.phone : 'N/A'}</td>
      <td className={`${td}`}>{obj.is_active ? 'Active': "Inactive"}</td> 
      <td className={`${td}`}>{obj.company.name}</td>
      <td className={`${td}`}>{obj.get_date_created}</td>
      <td className={`${td}`}>{obj.get_last_modified}</td>
      <td className={`${td}`}>{obj.authorized ? 'True': "False"}</td>
      <td className={`${td1}`}>
        <span onClick={() => handleRequest({status:'accept'})} className="px-2 border-0 w-8 h-8 rounded-full bg-green-600 text-white cursor-pointer hover:opacity-70"><i className="fa fa-check"></i></span>
        <span onClick={() => handleRequest({status:'reject'})} className="px-2 mx-2 border-0 w-8 h-8 rounded-full bg-red-600 text-white cursor-pointer hover:opacity-70"><i className="fa fa-close"></i></span>
      </td>
    </tr>
  )
}

const ExpenseRequestsList = () => {
  const dispatch = useDispatch();
  const [keys, setKeys] = useState(['id', 'email', 'fullname', 'role', 'phone', 'is_active', 'company', 'date_created', 'last_modified', 'authorized']);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);
  const requests = useSelector((state) => state.expense.registrationrequests);

  useEffect(() => {
    dispatch(registrationrequestsbyadmin());

  }, []);

    if (!requests){
      return <div>Requests loading...</div>
    }
    return (
        <div className='border-0 w-full h-full flex-row-style justify-center space-x-2 p-2'>
            <div className={`border border-t-0 border-b-0 w-full h-full flex-col-style overflow-x-scroll overflow-y-scroll`}>
                {/* <Filters type={type} /> */}
                <div className="w-full px-4 overflow-y-scroll overscroll-contain">
                    <table className="">
                        <caption className="caption-top py-2 text-xl text-gray-500 font-semibold ">Expense Requests</caption>
                        <thead className={`${thead}`}>
                            <tr>
                            <th><i className="fa fa-circle opacity-0"></i></th>
                            </tr>
                            <tr>
                            {keys.map((obj, idx) => <th key={idx} className={th}>{obj}</th>)}
                            <td className={th1}>Edit</td>
                            </tr>
                        </thead>
                        <tbody className={`${tbody}`}>
                            {requests.length ? requests.map((obj, idx) => <View key={idx} obj={obj}/>) : <tr>No pending requests</tr>}
                            <tr>
                                <td>{pageNumber} - {pageLimit}</td>
                            </tr>
                            <tr>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Pagination setPageLimit={setPageLimit} setPageNumber={setPageNumber} />
            </div>
        </div>

    );
  }
  
  
export default ExpenseRequestsList;

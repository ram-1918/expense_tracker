


// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]
// https://www.smashingmagazine.com/2020/03/sortable-tables-react/

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableCaption from "../../components/base/TableCaption";
import Spinner from "../../components/base/Spinner";
import { setActiveSideNav, setRegistrationRequests } from "../../features/core/coreSlice";
import {changeregistrationstatus, registrationrequestsbyadmin} from '../../features/core/state/coreThunks';

import { dateformater } from "../../utils/helper";
import { Link, Outlet, useLocation } from "react-router-dom";
import { API_URL } from "../../store/constants";


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
const td1 = 'w-32 text-md text-gray-500 px-2 py-[5px]';

const profileImage = 'w-6 h-6 rounded-full object-cover ';

function RegistrationRequestsList({activecolumns}) {
  const dispatch = useDispatch();
  const requests = useSelector(state => state.expense.registrationrequests);

  const initial_active_keys = ['id', 'fullname', 'email', 'is_active', 'role'];

  const fieldStyleMapper = {
    id: 'w-96', 
    fullname: "w-36", 
    email: "w-48", 
    phone: "w-32", 
    company: "w-32", 
    is_active: "w-20",
    role: "w-24", 
    created_at: "w-44", 
    employee_id: "w-44", 
    authorized: "w-28", 
    comment: "w-[28rem] text-left", 
    gender: "w-20"
  }

  useEffect(() => {
    dispatch(setActiveSideNav('regirequests'));
    dispatch(registrationrequestsbyadmin());
  }, [dispatch])

  const refreshFunc = () => {
    return {
      caption: 'Registration Requests',
      dispatch: dispatch,
      apifunc: registrationrequestsbyadmin,
      otherArgs: null
    }
  }

    return (
      <div className="w-full">
        <table className={table}>
          <TableCaption args={refreshFunc()} />
          {!requests.length && <div className="justify-start w-full h-full text-xl font-light bg-gray-100 flex-col-style"><span>No requests found</span></div>}
          {requests.length !== 0 && 
          <>
          <thead className={`${thead}`}>
              <tr>
                <th className={`${th} w-20`}>Picture</th>
                {activecolumns.map((obj, idx) => (
                <th key={idx} className={`${th} ${obj === 'amount' ? 'w-32' : fieldStyleMapper[obj]}`}>
                  {obj}
                </th>
                ))}
                <th className={`${th} w-32`}>Accept/Reject</th>
                <th className={` w-20 text-center`}></th>
              </tr>
          </thead>
          <tbody className={`${tbody}`}>
            {requests.map((obj, idx) => <View key={idx} obj={obj} keys={activecolumns} fieldStyleMapper={fieldStyleMapper}/>)}
          </tbody>
          </>}
        </table>
        <Outlet />
      </div>
    );
  }

  export default RegistrationRequestsList;


  function View({obj, keys, fieldStyleMapper}){
    
    const dispatch = useDispatch();
    const location = useLocation();
    const status = useSelector((state) => state.expense.status);
    const getStatus = (obj) => obj ? 'Active': 'Inactive';
    const getAuthorized = (obj) => obj ? 'Authorized': 'Unauthorized';
    const getPhone = (obj) => obj ? obj : 'N/A';
    const getEmpid = (obj) => obj ? obj : 'N/A';
    const getComment = (obj) => obj ? obj : 'N/A';
    const requests = useSelector(state => state.expense.registrationrequests);

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
        <td className={`border-r overflow-x-hidden flex-row-style text-sm text-gray-700 px-2 w-20 justify-center`}><img srcSet={`${API_URL}${obj.image}`} alt="profile" className={profileImage}></img></td>
        {keys.map((ele, idx) => (
          <td key={idx} className={`${td} ${fieldStyleMapper[ele]}`}>
            {ele.includes('created_at') ? dateformater(obj[ele]) : 
            ele === 'is_active' ? getStatus(obj[ele]) : 
            ele === 'phone' ? getPhone(obj[ele]) : 
            ele === 'authorized' ? getAuthorized(obj[ele]) : 
            ele === 'employee_id' ? getEmpid(obj[ele]) : 
            ele === 'comment' ? getComment(obj[ele]) : 
            obj[ele]}
          </td>
        ))}
        {/* <td className={`${td1} w-32 flex-row-style justify-center space-x-2`}><Link to={`./updateuser/${obj.id}`} state={{ userdata: obj }}><i className="fa fa-edit"></i></Link> <span onClick={() => {deleteUserInfo()}}><i className="fa fa-trash"></i></span></td> */}
        <td className={`${td1}`}>
          <span onClick={() => handleRequest({status:'accept'})} className="w-8 h-8 px-2 text-white bg-green-600 border-0 rounded-full cursor-pointer hover:opacity-70"><i className="fa fa-check"></i></span>
          <span onClick={() => handleRequest({status:'reject'})} className="w-8 h-8 px-2 mx-2 text-white bg-red-600 border-0 rounded-full cursor-pointer hover:opacity-70"><i className="fa fa-close"></i></span>
        </td>
        <td className={`${td1} w-20 text-center`}>
        <Link to={`viewprofile/${obj.id}`} >
            <i className='fa fa-eye'></i> View
          </Link>
        </td>
      </tr>
    )
  }



// Multiple API calls - https://stackoverflow.com/questions/75693156/multiple-api-calling-in-functional-component-react-js















// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]
// import { useEffect, useState } from "react";
// import Pagination from "../../components/base/Pagination";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteuserbyadmin, setUsersList } from "../../features/core/coreSlice";
// import Spinner from "../../components/base/Spinner";
// import axios from "axios";
// import UpdateUserForm from "../forms/UpdateUserForm";
// import { Link, Outlet } from "react-router-dom";


// const thead = 'sticky top-0 left-0 right-0 w-full h-10 m-0 flex-row-style justify-between bg-slate-300';
// const tbody = 'flex-col justify-center items-center';
// const tr = 'w-full h-8 flex-row-style justify-between py-5 cursor:pointer odd:bg-white even:bg-slate-200 hover:scale-[1.008] hover:font-bold hover:shadow hover:shadow-sm';
// const th = 'border-r w-48 h-6 text-left text-sm font-semibold text-black uppercase tracking-wider px-2';
// const th1 = 'border-r w-20 h-6 text-left text-sm font-semibold text-black uppercase tracking-wider px-2';
// const td = 'w-48 text-sm text-gray-500 pl-2 py-[5px]';
// const td1 = 'w-20 text-md text-gray-500 px-2 py-[5px]';




// function View({obj}){
//   const dispatch = useDispatch();
//   const userslist = useSelector((state) => state.expense.userslist);
  // function deleteUserInfo(){
  //   const id = obj.id;
  //   const updatedList = userslist.filter(user => user.id !== id);
  //   dispatch(deleteuserbyadmin(id));
  //   dispatch(setUsersList(updatedList));

  //   // filter or splice that from the list
  // }
//   return (
//     <tr className={`${tr}`}>
//       <td className={`text-[0.75rem] ${obj.colortag ? 'text-'+obj.colortag+'-500' : 'text-gray-300'}`}><i className="fa fa-circle"></i></td>
//       <td className={`${td} w-96`}>{obj.id}</td>
//       <td className={`${td}`}>{obj.email}</td>
//       <td className={`${td}`}>{obj.fullname}</td>
//       <td className={`${td}`}>{obj.role}</td>
//       <td className={`${td}`}>{obj.phone ? obj.phone : 'N/A'}</td>
//       <td className={`${td}`}>{obj.is_active ? 'Active': "Inactive"}</td> 
//       <td className={`${td}`}>{obj.company.name}</td>
//       <td className={`${td}`}>{obj.get_date_created}</td>
//       <td className={`${td}`}>{obj.get_last_modified}</td>
//       <td className={`${td}`}>{obj.authorized ? 'True': "False"}</td>
//       <td className={`${td1}`}><Link to={`./updateuser/${obj.id}`} state={{ userdata: obj }}><i className="fa fa-edit"></i></Link> <span onClick={() => {deleteUserInfo()}}><i className="fa fa-trash"></i></span></td>
//     </tr>
//   )
// }

// const UsersList = () => {
//   const dispatch = useDispatch();
//   const [keys, setKeys] = useState(['id', 'email', 'fullname', 'role', 'phone', 'is_active', 'company', 'date_created', 'last_modified', 'authorized']);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pageLimit, setPageLimit] = useState(1);
//   const userslist = useSelector((state) => state.expense.userslist);
  
//     if (!userslist){
//       // <Spinner data={userslist} />
//       return <div>Users loading...</div>
//     }
//     return (
//       <>
//         <table className="">
//           <caption className="py-2 text-xl font-semibold text-gray-500 caption-top ">User Details</caption>
//           <thead className={`${thead}`}>
//             <tr>
//               <th><i className="opacity-0 fa fa-circle"></i></th>
//             </tr>
//             <tr>
//               {keys.map((obj, idx) => <th key={idx} className={th}>{obj}</th>)}
//               <td className={th1}>Edit</td>
//             </tr>
//           </thead>
//           <tbody className={`${tbody}`}>
//             {userslist.map((obj, idx) => <View key={idx} obj={obj}/>)}
//             <tr>
//               <td>{pageNumber} - {pageLimit}</td>
//             </tr>
//             <tr>
//             </tr>
//           </tbody>
//         </table>
//         <Pagination setPageLimit={setPageLimit} setPageNumber={setPageNumber} />
//         <Outlet />
//       </>

//     );
//   }
  
  
// export default UsersList;

// // Multiple API calls - https://stackoverflow.com/questions/75693156/multiple-api-calling-in-functional-component-react-js




// // [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]
// import { useEffect, useState } from "react";
// import Pagination from "../../components/base/Pagination";
// import { useDispatch, useSelector } from "react-redux";
// import { changeregistrationstatus, deleteuserbyadmin, registrationrequestsbyadmin, setRegistrationRequests, setUsersList } from "../../features/core/coreSlice";
// import { Link, Outlet } from "react-router-dom";


// const thead = 'sticky top-0 left-0 right-0 w-full h-10 m-0 flex-row-style justify-between bg-slate-300';
// const tbody = 'flex-col justify-center items-center';
// const tr = 'w-full h-8 flex-row-style justify-between py-5 cursor:pointer odd:bg-white even:bg-slate-200 hover:scale-[1.008] hover:font-bold hover:shadow hover:shadow-sm';
// const th = 'border-r w-48 h-6 text-left text-sm font-semibold text-black uppercase tracking-wider px-2';
// const th1 = 'border-r w-32 h-6 text-left text-sm font-semibold text-black uppercase tracking-wider px-2';
// const td = 'w-48 text-sm text-gray-500 pl-2 py-[5px]';
// const td1 = 'w-32 text-md text-gray-500 px-2 py-[5px]';

// const RegistrationRequestsList = () => {
//   const dispatch = useDispatch();
//   const [keys, setKeys] = useState(['id', 'email', 'fullname', 'role', 'phone', 'is_active', 'company', 'date_created', 'last_modified', 'authorized']);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pageLimit, setPageLimit] = useState(1);
//   const requests = useSelector((state) => state.expense.registrationrequests);

//   useEffect(() => {
//     dispatch(registrationrequestsbyadmin());

//   }, []);

//     if (!requests){
//       return <div>Requests loading...</div>
//     }
//     return (
//         <div className='justify-center w-full h-full p-2 space-x-2 border-0 flex-row-style'>
//             <div className={`border border-t-0 border-b-0 w-full h-full flex-col-style overflow-x-scroll overflow-y-scroll`}>
//                 {/* <Filters type={type} /> */}
//                 <div className="w-full px-4 overflow-y-scroll overscroll-contain">
//                     <table className="">
//                         <caption className="py-2 text-xl font-semibold text-gray-500 caption-top ">Registration Requests</caption>
//                         <thead className={`${thead}`}>
//                             <tr>
//                             <th><i className="opacity-0 fa fa-circle"></i></th>
//                             </tr>
//                             <tr>
//                             {keys.map((obj, idx) => <th key={idx} className={th}>{obj}</th>)}
//                             <td className={th1}>Edit</td>
//                             </tr>
//                         </thead>
//                         <tbody className={`${tbody}`}>
//                             {requests.length ? requests.map((obj, idx) => <View key={idx} obj={obj}/>) : <tr>No pending requests</tr>}
//                             <tr>
//                                 <td>{pageNumber} - {pageLimit}</td>
//                             </tr>
//                             <tr>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//                 <Pagination setPageLimit={setPageLimit} setPageNumber={setPageNumber} />
//             </div>
//         </div>

//     );
//   }
  
  
// export default RegistrationRequestsList;


// function View({obj}){
//   const dispatch = useDispatch();
//   const userslist = useSelector((state) => state.expense.userslist);
//   const requests = useSelector((state) => state.expense.registrationrequests);
//   const status = useSelector((state) => state.expense.status);
//   console.log(obj, 'IFNEINOINW')

  // function handleRequest(data){
  //   const id = obj.id;
  //   dispatch(changeregistrationstatus({...data, "userid":id}));
  //   if (status === 'succeeded'){
  //       const result = requests.filter(request => request.id !== id);
  //       dispatch(setRegistrationRequests(result));
  //   }
  //   else{
  //       alert('Action failed')
  //   }
  // }

//   return (
//     <tr className={`${tr}`}>
//       {Object.entries(obj).map(([key, value],idx) => <td key={idx} >{value}</td>)}
//       <td className={`${td1}`}>
//         <span onClick={() => handleRequest({status:'accept'})} className="w-8 h-8 px-2 text-white bg-green-600 border-0 rounded-full cursor-pointer hover:opacity-70"><i className="fa fa-check"></i></span>
//         <span onClick={() => handleRequest({status:'reject'})} className="w-8 h-8 px-2 mx-2 text-white bg-red-600 border-0 rounded-full cursor-pointer hover:opacity-70"><i className="fa fa-close"></i></span>
//       </td>
//     </tr>
//   )
// }

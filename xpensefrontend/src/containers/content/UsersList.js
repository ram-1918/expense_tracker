// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]
// https://www.smashingmagazine.com/2020/03/sortable-tables-react/

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/base/Pagination";
import TableCaption from "../../components/base/TableCaption";
import Spinner from "../../components/base/Spinner";
import { setUsersList } from "../../features/core/coreSlice";
import { deleteuserbyadmin, fetchusers } from "../../features/core/state/coreThunks";

import { dateformater } from "../../utils/helper";
import FilterHeader from "./FilterHeader";
import { Link, Outlet } from "react-router-dom";
import FilterForm from "./FilterForm";

const API_URL = 'http://127.0.0.1:8000';

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

function UsersList({activecolumns, activeAction}) {
  const initial_active_keys = ['id', 'fullname', 'email', 'is_active', 'role'];
  const initial_active = {
    id: true, fullname: true, email: true, phone: false, company: false,
    is_active: true, role: true, created_at: false, employee_id: false, authorized: false, comment: false,
  }
const fieldStyleMapper = {
    id: 'w-96', fullname: "w-36", email: "w-48", phone: "w-32", company: "w-32", is_active: "w-20",
    role: "w-24", created_at: "w-44", employee_id: "w-44", authorized: "w-24", comment: "w-[28rem] text-left", gender: "w-20"
  }

const dispatch = useDispatch();
const [keys, setKeys] = useState(initial_active_keys);
const [active, setActive] = useState(initial_active);
const [toggleFilterHeader, setToggleFilterHeader] = useState(false);
const [toggleFilterOptions, setToggleFilterOptions] = useState(false);
const userslist = useSelector(state => state.expense.userslist);
// const max_pages = useSelector(state => state.expense.maxpagesForUsers);

// const [pageNumber, setPageNumber] = useState(1);
// const [pageSize, setPageSize] = useState(1);
// const pageLimit = max_pages;

// useEffect(() => {
//   if(pageNumber === max_pages && pageSize > max_pages){
//     console.log("Content already loaded", pageNumber, pageLimit, pageSize)
//   }
//   else {
//     dispatch(fetchusers({"filters":'', "page": pageNumber, "size": pageSize}));
//   }

// }, [dispatch, pageNumber, pageSize])

// DISPLAY AMOUNT SPENT BY EACH USER


const cols = ['id', 'fullname', 'email', 'phone', 'company', 'is_active', 'role', 'created_at', 'employee_id', 'authorized', 'comment'];

const head = (title, setToggleFunc, toggleValue, keys=[], column) =>
<>
  <div className="flex-row-style justify-evenly">
    <span className="text-lg">{title}</span>
    {column && <>
    <span>({keys.length})</span>
    <span onClick={() => {
          setActive(initial_active);
          setKeys(initial_active_keys);
        }}
        className={innerdiv_reset} > Reset </span>
    </>}
  </div>
  <span className="text-lg" onClick={() => {setToggleFunc((prev) => !prev)}}>
    {toggleValue ? <i className="fa fa-angle-up"></i> : <i className="fa fa-angle-down"></i>}
  </span>
</> 

  return (
    <div className="w-full overscroll-contain">
      {/* <div className={outerdiv}>
        <div className="flex-row-style justify-between px-4">
            {head('Columns Filters', setToggleFilterHeader, toggleFilterHeader, keys, true)}
        </div>
        {toggleFilterHeader && <FilterHeader allKeys={cols} setKeys={setKeys} active={active} setActive={setActive}/>}
      </div>
      <div className={outerdiv}>
        <div className="flex-row-style justify-between px-4">
          {head('Sort By', setToggleFilterOptions, toggleFilterOptions)}
        </div>
        {toggleFilterOptions && <FilterForm type='users' />}
      </div> */}

      {!userslist.length && <div className="w-full h-full flex-col-style justify-start bg-gray-100 text-xl font-light"><span>No users found</span></div>}
      {userslist.length && 
        <table className={table}>
          <TableCaption caption={`User Details`} />
          <thead className={`${thead}`}>
              <tr>
                <th className={`${th} w-20`}>Picture</th>
                {activecolumns.map((obj, idx) => (
                <th key={idx} className={`${th} ${obj === 'amount' ? 'w-32' : fieldStyleMapper[obj]}`}>
                  {obj}
                </th>
                ))}
                {activeAction && <th className={`${th} w-32`}>{activeAction === 'update' ? "Edit" : 'Delete'}</th>}
              </tr>
          </thead>
          <tbody className={`${tbody}`}>
            {userslist.map((obj, idx) => <View key={idx} obj={obj} keys={activecolumns} fieldStyleMapper={fieldStyleMapper} activeAction={activeAction} />)}
          </tbody>
        </table>
        }
      <Outlet />
    </div>
  );
}

export default UsersList;


function View({obj, keys, fieldStyleMapper, activeAction}){

  const dispatch = useDispatch();
  const getStatus = (obj) => obj ? 'Active': 'Inactive';
  const getAuthorized = (obj) => obj ? 'Authorized': 'Unauthorized';
  const getPhone = (obj) => obj ? obj : 'N/A';
  const getEmpid = (obj) => obj ? obj : 'N/A';
  const getComment = (obj) => obj ? obj : 'N/A';
  const userslist = useSelector(state => state.expense.userslist);

  function deleteUserInfo(){
    const id = obj.id;
    const updatedList = userslist.filter(user => user.id !== id);
    dispatch(deleteuserbyadmin(id));
    dispatch(setUsersList(updatedList));
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
      {activeAction && 
        <td className={`${td1} w-32 flex-row-style justify-center space-x-2`}>
          {activeAction === 'update' ? 
          <Link to={`./updateuser/${obj.id}`} state={{ userdata: obj }}><i className="fa fa-edit"></i></Link> :
          <span onClick={() => {deleteUserInfo()}}><i className="fa fa-trash"></i></span>
          }
        </td>
      }
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
//           <caption className="caption-top py-2 text-xl text-gray-500 font-semibold ">User Details</caption>
//           <thead className={`${thead}`}>
//             <tr>
//               <th><i className="fa fa-circle opacity-0"></i></th>
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
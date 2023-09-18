// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]
import { useEffect, useState } from "react";
import Pagination from "../../../../components/base/Pagination";
import { get_allusers } from "../../apicalls";
import {FetchData} from '../../../../components/customhooks/FetchData';
import { useDispatch, useSelector } from "react-redux";
import { setUsersList } from "../../coreSlice";
import Spinner from "../../../../components/base/Spinner";


const thead = 'sticky top-0 left-0 right-0 w-full h-10 m-0 flex-row-style justify-between bg-slate-300';
const tbody = 'flex-col justify-center items-center';
const tr = 'w-full h-8 flex-row-style justify-between py-4 cursor:pointer odd:bg-white even:bg-slate-200 hover:scale-[1.008] hover:font-bold hover:shadow hover:shadow-sm';
const th = 'border-r w-48 h-6 text-left text-sm font-semibold text-black uppercase tracking-wider px-2';
const th1 = 'border-r w-20 h-6 text-left text-sm font-semibold text-black uppercase tracking-wider px-2';
const td = 'w-48 text-sm text-gray-500 pl-2 py-[5px]';
const td1 = 'w-20 text-md text-gray-500 px-2 py-[5px]';

function getUsersData(){
  const data = [
      {"name":"Ram", "email": "crc.5453@gmail.com", "phone": "716671918", "createdat": "August 29th, 2023", "isactive": true, "role": "admin", "employeeid": 123, "colorTag": "red"},
      {"name":"Chandra", "email": "rcb.23@gmail.com", "phone": "7324748217", "createdat": "September 2th, 2023", "isactive": true, "role": "Superadmin", "employeeid": 423, "colorTag": "green"},
      {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": "blue"},
      {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": "red"},
      {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
      {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": "blue"},
      {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": "green"},
      {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
      {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": "green"},
      {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
      {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
      {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
      {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
      {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
      {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
      {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
      {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
      {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
      {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
      {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
      {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": "green"},
      {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
  ]
  // axios.get(`${API_URL}/users`)
  // .then((res) => console.log('Succuss'))
  return data
}


function View({obj}){
  // const dispatch = useDispatch();
  // const updateUsersList = () => {
  //   dispatch(setUsersList([]));
  // }
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
      <td className={`${td1}`}><i className="fa fa-edit"></i> <i className="fa fa-trash"></i></td>
    </tr>
  )
}

const UsersList = () => {
  const dispatch = useDispatch();
  const [keys, setKeys] = useState(['id', 'email', 'fullname', 'role', 'phone', 'is_active', 'company', 'date_created', 'last_modified', 'authorized']);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);
  const userslist = useSelector((state) => state.expense.userslist);
  
    if (!userslist){
      // <Spinner data={userslist} />
      return <div>Users loading...</div>
    }
    return (
      <>
        <table className="">
          <caption className="caption-top py-2 text-xl text-gray-500 font-semibold ">User Details</caption>
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
            {userslist.map((obj, idx) => <View key={idx} obj={obj}/>)}
            <tr>
              <td>{pageNumber} - {pageLimit}</td>
            </tr>
            <tr>
            </tr>
          </tbody>
        </table>
        <Pagination setPageLimit={setPageLimit} setPageNumber={setPageNumber} />
      </>

    );
  }
  
  
export default UsersList;

// Multiple API calls - https://stackoverflow.com/questions/75693156/multiple-api-calling-in-functional-component-react-js
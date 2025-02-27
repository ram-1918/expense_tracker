// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


function UserSummary() {
  let usersData = useSelector((state) => state.expense.userslist);
  if (!usersData){
    return <div>Loading...</div>
  }
  const titleStyle = 'font-light';
  const summaryTable = {
    "Users Count": usersData.length,
    "Super Admins": usersData.filter((obj)=>obj.role === 'superadmin').length,
    "Admins": usersData.filter((obj)=>obj.role === 'admin').length,
    "Employees": usersData.filter((obj)=>obj.role === 'employee').length,
    "Active": usersData.filter((obj)=>obj.is_active).length,
    "Authorized": usersData.filter((obj)=>obj.authorized).length,
  }
    return (
      <div className="w-full h-full flex-col-style justify-start space-y-4 px-2 ">
        <table className="w-full odd:bg-white even:bg-slate-200">
          <tbody className="">
            {Object.entries(summaryTable).map(([key, value], idx) => (
            <tr key={idx} className="">
              <td className={titleStyle}>{key}</td>
              <td>{value}</td>
            </tr>) 
            )}
          </tbody>
        </table>
      </div>
    );
  }
  

const ExpenseSummary = () => {
  return "Expenses Summary";
}

const Summary = ({type}) => {
  let result = null;
  if (type === 'users') result = <UserSummary />
  else if (type === 'expenses') result = <ExpenseSummary />
  return result;
}

export default Summary;
  
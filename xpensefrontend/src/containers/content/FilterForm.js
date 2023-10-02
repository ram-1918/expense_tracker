// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]

import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchusers } from "../../features/core/coreSlice";
import Tooltip from "../../components/base/Tooltip";
import BaseDropdown from "../../components/base/BaseDropdown";

const sectionStyles = 'w-full h-fit grid grid-flow-row grid-cols-5 justify-items-center justify-self-auto gap-4 text-[0.9rem] font-light'; // 'w-fit h-fit flex-row-style justify-center space-x-2';
const dateStyles = (inputErr) => `w-32 h-6 text-sm outline-none border rounded-md focus:border-gray-500 font-light px-2 ${inputErr && 'border-2 border-red-500'}`
const resetbutton = 'border border-teal-500 w-16 h-8 px-2 rounded-lg font-medium hover:opacity-70';
const applybutton = 'appearence-none bg-teal-500 w-16 h-8 px-2 rounded-lg text-white font-medium hover:opacity-80';

const companies = { 'SiriInfo': 'siriinfo', 'Cloud5': 'cloud5', 'Iniac': 'iniac', 'I5Tech': 'i5tech' };
const fullname_orders = { 'Fullnane Asc': '-fullname', 'Fullname Desc': 'fullname' };
const roles = { 'Super Admin': 'superadmin', 'Admin': 'admin', 'Employee': 'employee' };
const activeOptions = { 'Active': 'active', 'Inactive': 'inactive' }
const authorizedOptions = { 'Authorized': 'authorized', 'UnAuthorized': 'unauthorized' }

const initialValues = {
  'fullname': '',
  'role': '',
  'company': '',
  'isactive': null,
  'isauthorized': null,
  'location': 'Edison',
  'fromdate': null,
  'todate': null
}

const Label = ({ title, msg }) => {
  return (
    <div className="w-full h-6 flex">
      <span className="w-fit flex-row-style justify-start space-x-1">
        <span>{title}</span> <Tooltip type="custom" msg={msg} />
      </span>
    </div>)
}

const FilterForm = ({ type }) => {
  let result = null;
  if (type === 'users') result = <UserFilters />;
  else if (type === 'expenses') result = <ExpenseFilters />;
  return result;
}

export default FilterForm;

function UserFilters() {
  const dispatch = useDispatch();
  const [fields, setFields] = useState(initialValues);
  const [inputErr, setInputErr] = useState(false);

  const applyFilters = () => {
    const filteroptions = {
      'fullname': fullname_orders[fields['fullname']] || '',
      'role': roles[fields['role']] || '',
      'company': companies[fields['company']] || '',
      'isactive': activeOptions[fields['isactive']],
      'isauthorized': authorizedOptions[fields['isauthorized']],
      'fromdate': fields['fromdate'] || '',
      'todate': fields['todate'] || ''
    }
    dispatch(fetchusers({ "filters": filteroptions, page: 1, size: 5 }));
  }

  const handleFromDate = (e) => {
    const fromdate = new Date(e.target.value);
    const today = new Date();
    if (fromdate.getFullYear() - 2021 < 0) {
      console.log('enterDate later than 2021')
    }
    const [year, month, day] = [today.getFullYear(), today.getMonth(), today.getDate()]
    console.log(fromdate, year, month, day)
    setFields(prev => ({ ...prev, ['fromdate']: e.target.value }))
  }
  const handleToDate = (e) => {
    const fromdate = new Date(fields['fromdate']);
    const todate = new Date(e.target.value);
    console.log(fromdate, todate, fromdate > todate)
    if(fromdate <= todate){
      setFields(prev => ({ ...prev, ['todate']: e.target.value }))
      setInputErr(false);
    } else {
      setInputErr(true);
    }
  }

  const resetFilters = () => {
    setFields(initialValues);
  }

  return (
    <div className="sticky border-b w-full flex-col-styles justify-start space-y-2 px-4 transition duration-700 ease-linear">
      <section className={sectionStyles}>
        <BaseDropdown options={fullname_orders} setValueFunction={setFields} value={fields['fullname']} rarecase="fullname" />
        <BaseDropdown options={roles} setValueFunction={setFields} value={fields['role']} rarecase="role" />
        <BaseDropdown options={companies} setValueFunction={setFields} value={fields['company']} rarecase="company" />
        <BaseDropdown options={activeOptions} setValueFunction={setFields} value={fields['isactive']} rarecase="isactive" />
        <BaseDropdown options={authorizedOptions} setValueFunction={setFields} value={fields['isauthorized']} rarecase="isauthorized" />
        <div className="flex-col-style w-fit">
          <Label title="From" msg="Date should be after the year 2022" />
          <input type="date" onChange={(e) => handleFromDate(e)} className={dateStyles(inputErr)}></input>
        </div>
        <div className="flex-col-style w-fit">
          <Label title="To" msg="Date should be before today" />
          <input type="date" onChange={(e) => handleToDate(e)} className={dateStyles(inputErr)}></input>
        </div>
      </section>
      <section className='w-full flex-row-style justify-end space-x-2 p-2'>
        <button type="button" className={resetbutton} onClick={() => { resetFilters() }}>Reset</button>
        <button type="button" className={applybutton} onClick={() => { applyFilters() }}>Apply</button>
      </section>
    </div>
  );
}

const ExpenseFilters = () => {
  return <div>Fliters</div>
}

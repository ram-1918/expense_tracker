// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]

import { useState } from "react";
import { useDispatch } from "react-redux";
import BaseDropdown from "../../components/base/BaseDropdown";
import BaseSwitch from "../../components/base/BaseSwitch";
import { fetchusers } from "../../features/core/coreSlice";


const filterFormStyle = 'border rounded-lg bg-gray-50 px-[5px] text-sm cursor-pointer hover:bg-gray-200 ';
const filterFormSearch = `border-b w-full px-2 bg-inherit outline-none text-md placeholder:text-sm mb-4`;
const sectionStyles = 'shadow w-full h-fit flex-col-style justify-start space-y-2';
const headerStyles = 'py-2 w-full text-[0.9rem] font-semibold px-2';
const sortButtonStyles = 'border border-slate-400 w-32 h-8 flex-row-style justify-center rounded-lg cursor-pointer';
const activeSortButtonStyles = 'border border-blue-500 w-32 h-8 flex-row-style justify-evenly rounded-lg bg-blue-100 cursor-pointer before:border-b-2 before:border-l-2 before:border-blue-400 before:w-4 before:h-2 before:-rotate-45';
const selectedOptionStyle = 'w-full flex-row-style h-full justify-evenly rounded-lg cursor-pointer before:border-b-2 before:border-l-2 before:border-blue-400 before:w-4 before:h-2 before:-rotate-45';
const activebutton = `border-4 border-stone-200 w-4 h-4 rounded-full p-[5px]`;
const tagStyles = 'border list-none min-w-fit flex-row-style justify-center rounded-full cursor-pointer';
const dateStyles = 'text-sm outline-none border focus:border-gray-500 font-light '
// const dateStyles = 'dark:bg-dark-bg mt-1 block w-full rounded border-gray-400 text-sm dark:border-gray-600 dark:text-white dark:[color-scheme:dark]'
const resetbutton = 'border border-teal-500 w-16 p-2 rounded-lg font-medium hover:opacity-70';
const applybutton = 'appearence-none bg-teal-500 w-16 p-2 rounded-lg text-white font-medium hover:opacity-80';


function UserFilters() {
  const dispatch = useDispatch();
  const [isFullname, setIsFullname] = useState('');
  const [isRole, setIsRole] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [company, setCompany] = useState('Choose Company');
  const [showCompanies, setShowCompanies] = useState(false);
  const [isactive, setIsActive] = useState('');
  const [isauthorized, setIsAuthorized] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [location, setLocation] = useState('Edison');
  const [fromdate, setFromDate] = useState(null);
  const [todate, setToDate] = useState(null);
  const dropdownOptions = ['Choose Company', 'SiriInfo', 'Cloud5', 'Iniac', 'I5Tech'];

  const localheader = title => <span className={headerStyles}>{title}</span>

  const localswitch = (type, setFunction) => (
    <div className="w-full flex-row-style justify-between px-2">
      <span className={headerStyles}>{type}</span>
      <BaseSwitch setValue={setFunction} />
    </div>
  )
  
  const tagOptions = ['red', 'green', 'purple', 'yellow', 'gray'].map((obj, idx) => 
      <li key={idx} onClick={() => setActiveTag(obj)} className={`${tagStyles} ${activeTag === obj ? `bg-${activeTag}-100 border-${activeTag}-500` : 'bg-white'}`}>
        <span className={`bg-${obj}-500 rounded w-2 h-2 mx-2`}></span>
        <span>{obj}</span>
      </li>
  )

  const resetFilters = () => {
    setIsFullname(''); setIsRole(false); setCompany('Choose Company'); setShowCompanies(false); setIsActive('');
    setIsAuthorized(''); setActiveTag(''); setLocation('Edison'); setFromDate(null); setToDate(null)
  }

  const applyFilters = () => {
    const filteroptions = {
      'fullname': isFullname === 'asc' ? 'fullname' : isFullname === 'desc' ? '-fullname' : '',
      'role': isRole ? isRole : '',
      'company': company !== 'Choose Company' ? company.toLowerCase() : '',
      'isactive': isactive,
      'isauthorized': isauthorized,
      'tag': activeTag,
      'location': location,
      'from': fromdate,
      'to': todate
    }
    dispatch(fetchusers({ "filters": filteroptions }));
  }
  return (
    <div className="w-full flex-col-style justify-start space-y-2 text-[0.9rem] font-light">
      <section className={sectionStyles}>
        {localheader("Sort by")}
        <div className={`w-full h-full flex justify-around grid grid-cols-2 grid-flow-row gap-4 p-2`}>
          <span onClick={() => setIsFullname('asc')} className={`${isFullname === 'asc' ? activeSortButtonStyles : sortButtonStyles}`}>Fullname ASC</span>
          <span onClick={() => setIsFullname('desc')} className={`${isFullname === 'desc' ? activeSortButtonStyles : sortButtonStyles}`}>Fullname DESC</span>
          <span onClick={() => setIsRole('superadmin')} className={`${isRole === 'superadmin' ? activeSortButtonStyles : sortButtonStyles}`}>Super Admin</span>
          <span onClick={() => setIsRole('admin')} className={`${isRole === 'admin' ? activeSortButtonStyles : sortButtonStyles}`}>Admin</span>
          <span onClick={() => setIsRole('employee')} className={`${isRole === 'employee' ? activeSortButtonStyles : sortButtonStyles}`}>Employee</span>
          <BaseDropdown options={dropdownOptions} setShowFunction={setShowCompanies} show={showCompanies} setValueFunction={setCompany} value={company} selectStyle={selectedOptionStyle} />
        </div>
      </section>
      <section className={sectionStyles}>
        {localswitch("Show only Active", setIsActive)}
        {localswitch("Show only Authorized", setIsAuthorized)}
      </section>
      <section className={sectionStyles}>
        <div className="shadow w-full p-2 flex-col-style justify-around space-y-2">
          {localheader("Tags")}
          <span className="w-full grid grid-rows-2 grid-flow-col gap-2">
            {tagOptions}
          </span>
        </div>
        <div className = "shadow w-full flex-row-style justify-between p-2 ">
          {localheader("Location")}
          <span className="w-[50%] flex-row-style justify-center">{location}</span> <i className="fa fa-angle-right"></i>
        </div>
      </section>
      <section className='w-full flex-row-style justify-between'>
        <div className="w-full flex-row-style justify-between px-2">
          <input type="date" onChange={(e) => setFromDate(e.target.value)} className={dateStyles}></input>
          <span className="px-[4px]">To</span>
          <input type="date" onChange={(e) => setToDate(e.target.value)} className={dateStyles}></input>
        </div>
      </section>
      <section className='w-full flex-row-style justify-between p-2'>
        <button type="button" className={resetbutton} onClick={() => { resetFilters() }}>Reset</button>
        <button type="button" className={applybutton} onClick={() => { applyFilters() }}>Apply</button>
      </section>
    </div>
  );
}

const ExpenseFilters = () => {
  return <div>Fliters</div>
}

const FilterForm = ({type}) => {
  let result = null;
  if (type === 'users') result = <UserFilters />;
  else if (type === 'expenses') result = <ExpenseFilters />;
  return result;
}

export default FilterForm;

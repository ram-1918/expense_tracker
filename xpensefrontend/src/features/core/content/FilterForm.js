// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]

import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchusers } from "../coreSlice";


const filterFormStyle = 'border rounded-lg bg-gray-50 px-[5px] text-sm cursor-pointer hover:bg-gray-200 ';
const filterFormSearch = `border-b w-full px-2 bg-inherit outline-none text-md placeholder:text-sm mb-4`;
const sectionStyles = 'shadow w-full h-fit flex-col-style justify-start space-y-2';
const headerStyles = 'py-2 w-full text-[0.9rem] font-semibold px-2';
const sortButtonStyles = 'border border-slate-400 w-24 h-8 flex-row-style justify-center rounded-lg cursor-pointer';
const activeSortButtonStyles = 'border border-blue-500 w-24 h-8 flex-row-style justify-evenly rounded-lg bg-blue-100 cursor-pointer before:border-b-2 before:border-l-2 before:border-blue-400 before:w-4 before:h-2 before:-rotate-45';
const activebutton = `border-4 border-stone-200 w-4 h-4 rounded-full p-[5px]`;
const tagStyles = 'border list-none min-w-fit flex-row-style justify-center rounded-full cursor-pointer';
const dateStyles = 'text-sm outline-none border focus:border-gray-500 font-light ' 
// const dateStyles = 'dark:bg-dark-bg mt-1 block w-full rounded border-gray-400 text-sm dark:border-gray-600 dark:text-white dark:[color-scheme:dark]'
const resetbutton = 'border border-teal-500 w-16 p-2 rounded-lg font-medium hover:opacity-70';
const applybutton = 'appearence-none bg-teal-500 w-16 p-2 rounded-lg text-white font-medium hover:opacity-80';

const resetFilters = () => {
  return 
}



function FilterForm({type}) {
  const dispatch = useDispatch();
const [isFullname, setIsFullname] = useState(false);
const [isRole, setIsRole] = useState(false);
const [isCompany, setIsCompany] = useState(false);
const [isactive, setIsActive] = useState(true);
const [isauthorized, setIsAuthorized] = useState(true);
const [activeTag, setActiveTag] = useState('');
const [location, setLocation] = useState('Edison');
const [fromdate, setFromDate] = useState(null);
const [todate, setToDate] = useState(null);
const tagColor = (obj) => obj === 'red' ? 'bg-red-500' : obj === 'green' ? 'bg-green-500' : obj === 'purple' ? 'bg-purple-500' : obj === 'yellow' ? 'bg-yellow-500' : 'bg-gray-500';
const activeTagColor = (obj) => activeTag === 'red' ? `bg-red-100 border-red-500` : activeTag === 'green' ? `bg-green-100 border-green-500`: activeTag === 'purple' ? `bg-purple-100 border-purple-500`: 'bg-white'
const tagOptions = ['red', 'green', 'purple', 'yellow', 'gray'].map(
  (obj, idx) => <li key={idx} onClick={() => setActiveTag(obj)} className={`${tagStyles} ${activeTag === obj ? `bg-${activeTag}-100 border-${activeTag}-500` : 'bg-white'}`}>
    <span className={`${tagColor(obj)} rounded w-2 h-2 mx-2`}>
    </span>
    <span>{obj}</span>
  </li>
  )
  const applyFilters = () => {
    const filteroptions = {
      'fullname': isFullname ? 'fullname' : '',
      'role': isRole ? 'role' : '',
      'company': isCompany ? 'company' : '',
      'isactive': isactive,
      'isauthorized': isauthorized,
      'tag': activeTag,
      'location': location,
      'from': fromdate,
      'to': todate
    }
    console.log(filteroptions);
    dispatch(fetchusers({"filters": filteroptions}));
  }
    return (
      <div className="w-full flex-col-style justify-start space-y-2 text-[0.9rem] font-light">
        <section className={sectionStyles}>
          <header className={headerStyles}>Sort by</header>
          <div className={`w-full h-full flex justify-around grid grid-rows-2 grid-flow-col gap-4 p-2`}>
            <select onChange={(e) => setIsFullname(e.target.value)}>
              <option></option>
            </select>
            <span onClick={() => setIsFullname(prev => !prev)} className={`${isFullname ? activeSortButtonStyles : sortButtonStyles}`}>Fullname</span>
            <span onClick={() => setIsFullname(prev => !prev)} className={`${isFullname ? activeSortButtonStyles : sortButtonStyles}`}>Fullname</span>
            <span onClick={() => setIsRole(prev => !prev)} className={`${isRole ? activeSortButtonStyles : sortButtonStyles}`}>Role</span>
            <span onClick={() => setIsCompany(prev => !prev)} className={`${isCompany ? activeSortButtonStyles : sortButtonStyles}`}>Company</span>
          </div>
        </section>
        <section className={sectionStyles}>
          <div className="w-full flex-row-style justify-between px-2">
            <span className={headerStyles}>Show only Active</span>
            <button type='button' onClick={() => {setIsActive(prev => !prev)}} className={`${isactive ? 'bg-blue-600' : 'bg-gray-400'} ${activebutton}`}></button>
          </div>
          <div className="w-full flex-row-style justify-between px-2">
            <span className={headerStyles}>Show Authorized</span>
            <button type='button' onClick={() => {setIsAuthorized(prev => !prev)}} className={`${isauthorized ? 'bg-blue-600' : 'bg-gray-400'} ${activebutton}`}></button>
          </div>
        </section>
        <section className={sectionStyles}>
          <div className="shadow w-full p-2 flex-col-style justify-around space-y-2">
            <span className={headerStyles}>Tags </span>
            <span className="w-full grid grid-rows-2 grid-flow-col gap-2">
              {tagOptions}
            </span>
          </div>
          <div className="shadow w-full flex-row-style justify-between p-2 ">
            <span className={headerStyles}>Location</span>
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
          <button type="button" className={resetbutton} onClick={() => {resetFilters()}}>Reset</button>
          <button type="button" className={applybutton} onClick={() => {applyFilters()}}>Apply</button>
        </section>
      </div>
    );
  }
  
  export default FilterForm;
  
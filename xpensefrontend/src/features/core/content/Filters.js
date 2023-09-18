















// // [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFilter } from '@fortawesome/free-solid-svg-icons';
// import { useDispatch, useSelector } from "react-redux";
// import Spinner from "../../../components/base/Spinner";
// import { setFilterStack, setUsersList } from "../coreSlice";
// import { useEffect, useState } from "react";
// import FilterFactory from "./FilterStyles";

// const eachFilter = 'p-2';
// const filterStyle = `border border-slate-400 min-w-fit rounded-xl flex-row-style justify-center capitalize text-sm font-normal px-2`;
// const stackStyles = 'list-none'

// // search functionality later on...

// const sortObjects = (obj, setStack, stack, userslist) => {
//   console.log(userslist, stack, 'FILTERS', obj);

//   setStack(obj)
//   // const dispatch = useDispatch();
//   // const userslist = useSelector((state) => state.expense.userslist);
//   console.log(userslist, stack, 'FILTERS');
//   const templist = [...userslist];
//   stack.map((filter) => {
//     templist.sort((a, b) => {
//       const fullnameA = a[filter].toLowerCase();
//       const fullnameB = b[filter].toLowerCase();
//       if (fullnameA < fullnameB) {
//         return -1;
//       }
//       if (fullnameA > fullnameB) {
//         return 1;
//       }
//       return 0;
//     });
//     console.log(templist, 'AFTEER FILTERS')
//     // dispatch(setUsersList(templist));
//   });

// }


// function Filters({type}) {
//   const dispatch = useDispatch();
//   const [stack, setStack] = useState([]);
//   const userKeys = [{fullname: ['Ascending', 'Descending']}, {role: ['Super Admin', 'Admin', 'Employee']}];
//   // const userKeys = ['fullname', 'role', 'is_active', 'company', 'authorized'];
//   const list = useSelector(state => state.expense.userslist); // should not mutate directly
//   let keys = type === 'users' ? userKeys : [];
//   const startsWithVal = '';
//   const [showOptions, setShowOptions] = useState({});

//   const handleToggle = (idx) => {
//     console.log(showOptions, 'OPTIONS')
//     setShowOptions(prevState => ({
//       ...prevState,
//       [idx]: !prevState[idx]
//     }));
//   };

//   function HandleSort(key, type, list, val=''){
//     const tempStack = [...stack, [key, type, list, val='']];
//     setStack(tempStack);
//     console.log(tempStack, key, 'BEFORE FACTORY');
//     const res = tempStack.map((obj) => {return FilterFactory(obj)});
//     // console.log(res, 'RESPUR');
//     // dispatch(setUsersList(...res));
//   }
//     return (
//       <div className="border-b border-slate-200 w-full min-h-[5%] flex-col-style justify-start px-4 space-x-2 overflow-y-scroll">
//         <div className="border-b border-slate-200 w-full min-h-[5%] flex-row-style justify-start flex-wrap px-4 py-2 space-x-2 overflow-y-scroll">
//             <FontAwesomeIcon icon={faFilter} /> <span className="text-sm">Filter By</span>
//               {keys.map((obj1, idx) => // Loop1
//                 <div key={idx}>
//                   {Object.entries(obj1).map(([filterKey, options], jdx) => // loop2
//                     <ul key={jdx}>
//                       <li onClick={() => {handleToggle(idx)}} key={jdx}>
//                         {filterKey}
//                       </li>
//                       {options.map((option, kdx) => // loop3
//                         <li 
//                         onClick={() => {HandleSort(filterKey, 'asc', list, startsWithVal)}}
//                         style={{display:showOptions[idx] ? 'block' : 'none'}} 
//                         key={kdx}>
//                           {option}
//                         </li>)}
//                     </ul>
//                   )}
//                 </div>
//               )}
//             {/* {keys.map((obj, idx) => <span onClick={() => {HandleSort(obj, 'desc', list, startsWithVal)}} className={filterStyle} key={idx}>{obj} <i className='fa fa-caret-down px-[4px]'></i></span>)} */}
//         </div>
//         <span className="w-full">
//             {stack.map((obj, idx) => <li className={stackStyles} key={idx}>{obj[0]}</li>)}
//         </span>
//       </div>
//     );
//   }
  
//   export default Filters;
  

//   // stack.map((filter, idx) => {
//   //   userslist.sort((a, b) => {
//   //     const A = a[filter].toUpperCase();
//   //     const B = b[filter].toUpperCase();
//   //     if(A < B){
//   //       return -1;
//   //     } else if(A > B){
//   //       return 1;
//   //     }else{
//   //       return 0;
//   //     }
//   //   })
//   // })

//   // const ordered = Object.keys(userslist).sort().reduce(
//   //   (obj, key) => { 
//   //     console.log(obj, key)
//   //     obj[key] = userslist[key]; 
//   //     return obj;
//   //   }, 
//   //   []
//   // );
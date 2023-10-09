// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import UsersList from "./UsersList";
import ExpenseList from "./ExpenseList";
import AllExpenseList from "./AllExpenseList";
import BaseDropdown from "../../components/base/BaseDropdown";
import { useDispatch, useSelector } from "react-redux";
import { processUsersDownloadReport, processUsersSearchData } from "../../features/core/state/processors";
import { fetchusers } from '../../features/core/state/coreThunks'; // './features/core/state/coreThunks';
import { setUsersList } from '../../features/core/coreSlice';
import Pagination from "../../components/base/Pagination";

const outerdiv = 'border-0 w-full h-full flex-col-style justify-start space-y-4 px-0 py-2 overscroll-contain';
const innerdiv_1 = (showSummary) => `border border-t-0 border-b-0 ${showSummary ? 'w-[75%]' : 'w-[90%]'} h-full rounded-lg shadow shadow-lg flex-col-style`;
const row4 = "w-full h-screen flex-col-style justify-start text-center overflow-y-scroll px-4";
const innerdiv_2 = (showSummary) => `h-full space-y-4 ${showSummary ? 'w-[25%] ' : 'w-[10%]'} overflow-scroll`;
const titleStyles = '';
const inner_2_12 = `border w-full h-fit overflow-y-scroll`;
const inner_2_2_1 = 'w-full flex-row-style justify-between font-medium p-2 bg-white';
const inner_2_2_2 = (showSummary) => `w-full h-full ${showSummary ? 'flex' : 'hidden'}`;

const list_actions = {'Delete': 'delete', 'Update': 'update'};
const initial_user_active_keys = ['id', 'fullname', 'email', 'is_active', 'role'];
const initial_expense_active_keys = ['id', 'payment_recepient', 'status'];

function ContentLayout() {
    const dispatch = useDispatch();
    const { type } = useParams();
    const users = useSelector(state => state.expense.userslist);
    const expenses = useSelector(state => state.expense.expenselist);
    const userreport = useSelector(state => state.expense.userreport);
    const max_pages = useSelector(state => state.expense.maxpagesForUsers);
    
    const [action, setAction] = useState(null);
    
    // ---------------- Columns state -------------------
    const [activeUserCols, setActiveUserCols] = useState(initial_user_active_keys);
    const [activeExpenseCols, setActiveExpenseCols] = useState(initial_expense_active_keys);

    // ---------------- Pagination state ------------------
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(1);
    const pageLimit = max_pages;

    // ---------------- Search text -------------------
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        if(pageNumber === max_pages && pageSize > max_pages){
          console.log("Content already loaded", pageNumber, pageLimit, pageSize)
        } else {
          pageNumber && dispatch(fetchusers({"filters":'', "page": pageNumber, "size": pageSize}));
        }
      }, [dispatch, pageNumber, pageSize])

    const typeContentMapper = {
        'users': <UsersList activecolumns={activeUserCols} activeAction={list_actions[action]}/>,
        'expenses' : <ExpenseList activecolumns={activeExpenseCols} activeAction={list_actions[action]}/>,
        'allexpenses' : <AllExpenseList activecolumns={activeExpenseCols} activeAction={list_actions[action]}/>,
    }

    const handleDownloadReport = () => {
        if(type === 'users'){
            processUsersDownloadReport(dispatch, users);
        } else if (type === 'expenses') {
            processUsersDownloadReport(dispatch, users);
        } else if (type === 'allexpenses') {
            processUsersDownloadReport(dispatch, users);
        }
    }

    const columnsMapper = () => {
        if(type === 'users'){
            return {
                values: activeUserCols,
                setFunc: setActiveUserCols,
                columns: (users.length && Object.keys(users[0]).filter((val) => val !== 'image')) || [],
                initialColumns: initial_user_active_keys
            }
        } else if (type === 'expenses') {
            return {
                values: activeExpenseCols,
                setFunc: setActiveExpenseCols,
                columns: (expenses.length && Object.keys(expenses[0]).filter((column) => !(column === 'expense_proof' || column === 'expense_tag'))) || [],
                initialColumns: initial_expense_active_keys

            }
        } else if (type === 'allexpenses') {
            return {
                values: activeExpenseCols,
                setFunc: setActiveExpenseCols,
                columns: (expenses.length && Object.keys(expenses[0]).filter((column) => !(column === 'expense_proof' || column === 'expense_tag'))) || [],
                initialColumns: initial_expense_active_keys

            }
        }
    }

    const paginationMapper = () => {
        if (type === 'users'){
            return {
                pageLimit: pageLimit,
                setPageSize: setPageSize,
                pageNumber: pageNumber,
                setPageNumber: setPageNumber,
                pageSize: pageSize
            }
        } else if (type === 'expenses') {
            return {
                pageLimit: pageLimit,
                setPageSize: setPageSize,
                pageNumber: pageNumber,
                setPageNumber: setPageNumber,
                pageSize: pageSize
            }
        } else if (type === 'allexpenses') {
            return {
                pageLimit: pageLimit,
                setPageSize: setPageSize,
                pageNumber: pageNumber,
                setPageNumber: setPageNumber,
                pageSize: pageSize
            }
        }
    }
    const handleSeachTextMapper = (e) => {
        setSearchText(e.target.value)
        if(type === 'users') {
            if (searchText.length > 4) {
                processUsersSearchData(dispatch, users, setUsersList, searchText);
            } else if (searchText.length < 1){
                // Make API call
                console.log('Fetch all results')
            }
        } else if (type === 'expenses') {
            if (searchText.length > 4) {
                processUsersSearchData(dispatch, users, setUsersList, searchText);
            }
        }
    }

    return (
        <div className={outerdiv}>
            <div className="w-full flex-row-style justify-end px-6">
                {/* <span>{userreport && userreport.id} report downloaded</span> */}
                <button className="border rounded-md w-fit h-8 px-2 text-md font-light opacity-90 bg-[#334155] text-white" onClick={handleDownloadReport}>Generate report <i className="fa fa-download"></i></button>
            </div>
            <div className="w-full flex-row-style justify-between py-2 px-6">
                <span className="border border-slate-400 flex-row-style justify-center bg-white px-2 rounded-full">
                    <input placeholder={`Search ${type === 'users' ? 'users' : 'expenses'} by keyword...`} className={`border-none w-80 h-7 bg-inherit outline-none px-2 text-sm rounded-full`} type="text" value={searchText} onChange={(e) => {handleSeachTextMapper(e)}} /> 
                    <i className="fa fa-search opacity-70 hover:opacity-50 cursor-pointer"></i>
                </span>
                <ColumnsDropdown args={columnsMapper()} />
            </div>
            <div className="border-b w-full h-fit flex-row-style justify-between px-6 pb-4">
                <div className="flex-row-style justify-start flex-grow space-x-2">
                    {action && <span className="opacity-70">Action </span>}<BaseDropdown options={list_actions} setValueFunction={setAction} title='Actions'/>
                    {type === 'users' ?  <span><FetchUsersCount /></span> : 
                    type === 'expenses' ? <span><FetchExpensesCount /></span> : 
                    type === 'allexpenses' ? <span><FetchAllExpensesCount /></span> : <></>}
                </div>
                <div className="w-fit flex-row-style justify-end space-x-2">
                    <Pagination args={paginationMapper()} />
                </div>
            </div>
            <div className={row4}> 
                {typeContentMapper[type]}
            </div>
        </div>
    );
}

export default ContentLayout;

const FetchUsersCount = () => {
    const userslist = useSelector(state => state.expense.userslist);
    return <span className="text-sm font-light">Total users: {userslist.length} (REAL COUNT FROM API)</span>
}

const FetchExpensesCount = () => {
    const expenselist = useSelector(state => state.expense.expenselist);
    return <span className="text-base font-light">Total expenses: {expenselist.length}</span>
}

const FetchAllExpensesCount = () => {
    const expenselist = useSelector(state => state.expense.expenselist);
    return <span className="text-base font-light">Total expenses: {expenselist.length}</span>
} 

const ColumnsDropdown = ({args: {values, setFunc, columns, initialColumns}}) => {
    const [showDropdownContent, setShowDropdownContent] = useState(false);
    const is_checked = (obj) => {
        const idx = values.findIndex((value) => value === obj);
        return idx === -1 ? false : true;
    }
    const handleColumnSelection = (obj) => {
        if (is_checked(obj)){
            setFunc(prev => prev.filter((value) => value !== obj))
        } else {
            setFunc(prev => [...prev, obj])
        }
    }
    const setAllColumns = () => {
        setFunc(columns);
    }
    const resetColumns = () => {
        setFunc(initialColumns);
    }
    return (
        <div className="group/dropdown relative text-sm">
            <span onClick={() => {setShowDropdownContent(prev => !prev)}} className="border-l border-slate-400 w-fit px-2 cursor-pointer"><i className="fa fa-cog opacity-70"></i> Columns({values.length}) <i className="fa fa-caret-down opacity-70"></i></span>
            <div className="absolute right-0 w-48 shadow-lg invisible grid grid-flow-row grid-cols-1 space-y-2 group-hover/dropdown:visible bg-white py-2">
                <span className="w-full flex-row-style justify-around"><span onClick={() => {setAllColumns()}} className="cursor-pointer hover:bg-gray-100 py-2 px-4">All</span><span onClick={() => {resetColumns()}} className="cursor-pointer hover:bg-gray-100 py-2 px-4"><i className='fa fa-refresh'></i> Reset</span></span>
                {columns.map((obj, idx) => <span className="cursor-pointer hover:bg-gray-100 px-4 tracking-wider capitalize" key={idx} onClick={() => handleColumnSelection(obj)}><input type="checkbox" checked={is_checked(obj)} readOnly/> {obj}</span>)}
            </div>
        </div>
    )
}
 
{/* Implement colored tags */ }
{/* Tags related to component */ }
{/* Summary of the data from the called component */ }

{/* Appropriate content from called component ========== 
                    Include Pagination...... and also ONE SEARCH BAR VARIOUS FUCTIONALITY 
                    Any data that enters/that received changes(when updates ot delets]) the expense tabLe its status should be pendinG(3) */}






// // [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s
// import { useParams } from "react-router";
// import { useState } from "react";

// import UsersList from "./UsersList";
// import ExpenseList from "./ExpenseList";
// import FilterForm from "./FilterForm";
// import Summary from "./Summary";

// const outerdiv = 'border-0 w-full h-full flex-row-style justify-center space-x-2 p-2';
// const innerdiv_1 = (showSummary) => `border border-t-0 border-b-0 ${showSummary ? 'w-[75%]' : 'w-[90%]'} h-full rounded-lg shadow shadow-lg flex-col-style`;
// const inner_1_1 = " w-full h-screen overflow-x-scroll overflow-y-scroll";
// const innerdiv_2 = (showSummary) => `h-full space-y-4 ${showSummary ? 'w-[25%] ' : 'w-[10%]'} overflow-scroll`;
// const titleStyles = '';
// const inner_2_12 = `border w-full h-fit overflow-y-scroll`;
// const inner_2_2_1 = 'w-full flex-row-style justify-between font-medium p-2 bg-white';
// const inner_2_2_2 = (showSummary) => `w-full h-full ${showSummary ? 'flex' : 'hidden'}`;

// function BaseDisplay() {
//     const { type } = useParams();
//     const [showTags, setShowTags] = useState(true);
//     const [showSummary, setShowSummary] = useState(true);

//     const typeContentMapper = {
//         'expenses' : <ExpenseList />,
//         'users': <UsersList />
//     }

//     // helpers
//     const title = (title) => <span className={titleStyles}>{title}</span>
//     const showHideButtons = (showValue, setFunction) => (
//         showValue ? 
//         <span onClick={() => { setFunction((prev) => !prev) }}><i className="fa fa-minus"></i></span> 
//         : <span onClick={() => { setFunction((prev) => !prev) }}><i className="fa fa-plus"></i></span>
//     )

//     return (
//         <div className={outerdiv}>
//             {/* Left */}
//             <div className={innerdiv_1(showSummary)}>
//                 <div className={inner_1_1}> {typeContentMapper[type]} </div>
//             </div>
//             {/* right */}
//             <div className={innerdiv_2(showSummary)}>
//                 {/* right top */}
//                 {/* <div className={inner_2_12}>
//                     <div className={inner_2_2_1}>
//                         {title("Filter form")}
//                         {showHideButtons(showTags, setShowTags)}
//                     </div>
//                     <div className={inner_2_2_2(showTags)}> <FilterForm type={type} /> </div>
//                 </div> */}
//                 {/* right bottom */}
//                 <div className={inner_2_12}>
//                     <div className={inner_2_2_1}>
//                         {title("Summary")}
//                         {showHideButtons(showSummary, setShowSummary)}
//                     </div>
//                     <div className={inner_2_2_2(showSummary)}> <Summary type={type} /> </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default BaseDisplay;

// {/* Implement colored tags */ }
// {/* Tags related to component */ }
// {/* Summary of the data from the called component */ }

// {/* Appropriate content from called component ========== 
//                     Include Pagination...... and also ONE SEARCH BAR VARIOUS FUCTIONALITY 
//                     Any data that enters/that received changes(when updates ot delets]) the expense tabLe its status should be pendinG(3) */}
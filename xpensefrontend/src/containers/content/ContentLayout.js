// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s
import { useParams } from "react-router";
import { useState } from "react";

import UsersList from "./UsersList";
import ExpenseList from "./ExpenseList";
import FilterForm from "./FilterForm";
import Summary from "./Summary";

const outerdiv = 'border-0 w-full h-full flex-row-style justify-center space-x-2 p-2';
const innerdiv_1 = (showSummary) => `border border-t-0 border-b-0 ${showSummary ? 'w-[75%]' : 'w-[90%]'} h-full rounded-lg shadow shadow-lg flex-col-style`;
const inner_1_1 = " w-full h-screen overflow-x-scroll overflow-y-scroll";
const innerdiv_2 = (showSummary) => `h-full space-y-4 ${showSummary ? 'w-[25%] ' : 'w-[10%]'} overflow-scroll`;
const titleStyles = '';
const inner_2_12 = `border w-full h-fit overflow-y-scroll`;
const inner_2_2_1 = 'w-full flex-row-style justify-between font-medium p-2 bg-white';
const inner_2_2_2 = (showSummary) => `w-full h-full ${showSummary ? 'flex' : 'hidden'}`;

function BaseDisplay() {
    const { type } = useParams();
    const [showTags, setShowTags] = useState(true);
    const [showSummary, setShowSummary] = useState(true);

    const typeContentMapper = {
        'expenses' : <ExpenseList />,
        'users': <UsersList />
    }

    // helpers
    const title = (title) => <span className={titleStyles}>{title}</span>
    const showHideButtons = (showValue, setFunction) => (
        showValue ? 
        <span onClick={() => { setFunction((prev) => !prev) }}><i className="fa fa-minus"></i></span> 
        : <span onClick={() => { setFunction((prev) => !prev) }}><i className="fa fa-plus"></i></span>
    )

    return (
        <div className={outerdiv}>
                <div className={inner_1_1}> 
                    {typeContentMapper[type]} 
                </div>
        </div>
    );
}

export default BaseDisplay;

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
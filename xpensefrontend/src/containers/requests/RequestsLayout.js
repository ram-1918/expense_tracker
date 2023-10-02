// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s
import { useParams } from "react-router";
import { useState } from "react";

import UsersList from "../content/UsersList";
import ExpenseList from "../content/ExpenseList";
import FilterForm from "../content/FilterForm";
import Summary from "../content/Summary";
import RegistrationRequestsList from "./RegistrationRequestsList";
import ExpenseRequestsList from "./ExpenseRequestsList";

const outerdiv = 'border-0 w-full h-full flex-row-style justify-center space-x-2 p-2';
const innerdiv_1 = `border border-t-0 border-b-0 w-full h-full flex-col-style overflow-x-scroll overflow-y-scroll`;
const inner_1_1 = "w-full px-4 overflow-y-scroll overscroll-contain";
const innerdiv_2 = (showTags, showSummary) => `h-full space-y-4 ${showTags || showSummary ? 'w-[25%] ' : 'w-[10%]'} overflow-scroll`;
const titleStyles = '';
const inner_2_12 = `border w-full h-fit overflow-y-scroll`;
const inner_2_2_1 = 'sticky top-0 right-0 w-full flex-row-style justify-between font-medium p-2 bg-white';
const inner_2_2_2 = (showSummary) => `w-full h-full ${showSummary ? 'flex' : 'hidden'}`;

function RequestsLayout() {
    const { type } = useParams();
    // const [showTags, setShowTags] = useState(true);
    // const [showSummary, setShowSummary] = useState(true);

    const typeContentMapper = {
        'registration' : <RegistrationRequestsList />,
        'expenses': <ExpenseRequestsList />,
    }
    return (
        <div className={outerdiv}>
            {/* Left */}
            <div className={innerdiv_1}>
                <div className={inner_1_1}> {typeContentMapper[type]} </div>
            </div>
        </div>
    );
}

export default RequestsLayout;
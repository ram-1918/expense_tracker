// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import UsersList from "../../features/core/content/main/UsersList";
import ExpenseList from "../../features/core/content/main/ExpenseList";

import Filters from "../../features/core/content/Filters";
import Tags from "../../features/core/content/FilterForm";
import Summary from "../../features/core/content/Summary";
import FilterForm from "../../features/core/content/FilterForm";

const base_title_headers = 'sticky top-0 right-0 w-full flex-row-style justify-between font-medium p-2 bg-white';

function BaseDisplay() {
    const { type } = useParams();
    const [showTags, setShowTags] = useState(true);
    const [showSummary, setShowSummary] = useState(true);

    return (
        <div className='border-0 w-full h-full flex-row-style justify-center space-x-2 p-2'>
            <div className={`border border-t-0 border-b-0 ${showTags && showSummary ? 'w-[85%]' : 'w-full'} h-full flex-col-style overflow-x-scroll overflow-y-scroll`}>
                {/* <Filters type={type} /> */}
                <div className="w-full px-4 overflow-y-scroll overscroll-contain">
                    {type === 'expenses' && <ExpenseList />} 
                    {type === 'users' && <UsersList />}
                </div>
            </div>
            <div className={`h-full space-y-4 ${showTags || showSummary ? 'w-[25%] ' : 'w-[10%]'}`}>
                <div className={`border w-full ${showTags ? 'h-fit' : 'h-fit'} overflow-y-scroll`}>
                    <div className={`${base_title_headers}`}>
                        <span>Filter Form</span>
                        {showTags ? 
                        <span onClick={() => {setShowTags((prev) => !prev)}}><i className="fa fa-minus"></i></span>
                        : <span onClick={() => {setShowTags((prev) => !prev)}}><i className="fa fa-plus"></i></span>}
                    </div>
                    <div className={`w-full h-full ${showTags ? 'flex' : 'hidden'}`}>
                        <FilterForm type={type} />
                    </div>
                </div>
                <div className={`border w-full ${showSummary ? 'h-fit' : 'h-fit'} overflow-y-scroll`}>
                    <div className={`${base_title_headers}`}>
                        <span>Summary</span>
                        {showSummary ? 
                        <span onClick={() => {setShowSummary((prev) => !prev)}}><i className="fa fa-minus"></i></span>
                        : <span onClick={() => {setShowSummary((prev) => !prev)}}><i className="fa fa-plus"></i></span>}
                    </div>
                    <div className={`w-full h-full ${showSummary ? 'flex' : 'hidden'}`}>
                        <Summary type={type} />
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default BaseDisplay;
  
                    {/* Implement colored tags */}
                        {/* Tags related to component */}
                        {/* Summary of the data from the called component */}

                    {/* Appropriate content from called component ========== 
                    Include Pagination...... and also ONE SEARCH BAR VARIOUS FUCTIONALITY 
                    Any data that enters/that received changes(when updates ot delets]) the expense tabLe its status should be pendinG(3) */}
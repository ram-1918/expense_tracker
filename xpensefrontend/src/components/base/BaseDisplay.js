
// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s

import Filters from "../xpenses/Filters";

function BaseDisplay() {
    const base_title_headers = ''
    return (
        <div className='border w-full h-full flex-row-style justify-around space-x-8 p-2'>
            <div className="border w-[20%] h-full flex-col-style justify-start space-y-8">
                <div className='border w-full h-[50%]'>
                    <span className={`${base_title_headers}`}>Filters</span>
                    <div>
                        Filters from called component
                        <Filters />
                    </div>
                </div>
                <div className='border w-full h-[45%] flex-col-style justify-start'>
                    <span className={`${base_title_headers}`}>Saved filters</span>
                    Top 3 filters will be saved. using Redis for storing the results would be appropriate. Needs clarification.
                    <div>
                        Appropriate Saved Filters from called component
                    </div>
                </div>
            </div>
            <div className="border w-[60%] h-full">
                <div>Main Header</div>
                <div>Main display</div>
                <div>
                    Appropriate content from called component ========== 
                    Include Pagination...... and also ONE SEARCH BAR VARIOUS FUCTIONALITY 
                </div>
            </div>
            <div className="border w-[20%] h-full space-y-8">
                <div className="border w-full h-[35%]">
                    <span className={`${base_title_headers}`}>Tags</span>
                    <div>
                        Tags related to component
                    </div>
                </div>
                <div className="border w-full h-[60%]">
                    <span className={`${base_title_headers}`}>Summary</span>
                    <div>
                        Summary of the data from the called component
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default BaseDisplay;
  
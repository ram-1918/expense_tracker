// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]

import { useState } from "react";


function Tags({tags, type}) {
  const [tagValue, setTagValue] = useState('');
  const tagStyle = 'border rounded-lg bg-gray-50 px-[5px] text-sm cursor-pointer hover:bg-gray-200 ';

    return (
      <div className="w-full flex-col-style justify-start">
        <input className={`border-b w-full px-2 bg-inherit outline-none text-md placeholder:text-sm mb-4`} placeholder='Search tags...' type="text" onChange={(e) => setTagValue(e.target.value)} />
        <div className="w-full h-full flex-row-style flex-wrap space-x-4 space-y-2">
          {type && tags.map((obj, idx) => <span className={tagStyle} key={idx}>{obj}</span>)}
        </div>
        {/* {type === 'expenses' && tags.map((obj, idx) => <span className={tagStyle} key={idx}>{obj}</span>)} */}
      </div>
    );
  }
  
  export default Tags;
  